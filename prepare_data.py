#!/usr/bin/env python3
"""
Prepare stats.json for the TikTok Wrapped front-end.
Run from the front-end/ directory:
    python prepare_data.py
"""
import json
import os
import pandas as pd
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS

BASE = os.path.join(os.path.dirname(__file__), "..")
OUT  = os.path.join(os.path.dirname(__file__), "src", "lib", "stats.json")

# ── 1. Load and merge both metadata CSVs ─────────────────────────────────────
meta1 = pd.read_csv(os.path.join(BASE, "tiktok_metadata_COMPLETE_SUCCESSFUL_ONLY.csv"))
meta2 = pd.read_csv(os.path.join(BASE, "tiktok_metadata_2026.csv"))

# Align columns — meta1 may be missing video_id
if "video_id" not in meta1.columns:
    meta1["video_id"] = meta1["video_url"].str.extract(r"/video/(\d+)")[0]

df = pd.concat([meta1, meta2], ignore_index=True)
df = df.drop_duplicates(subset="video_id", keep="last")
df["duration"] = pd.to_numeric(df["duration"], errors="coerce").fillna(0)
df["watch_date"] = pd.to_datetime(df["watch_date"], errors="coerce")

print(f"Combined rows (deduped): {len(df):,}")

# ── 2. Load clustered data ────────────────────────────────────────────────────
clustered = pd.read_csv(os.path.join(BASE, "tiktok_clustered.csv"))
clustered["watch_date_parsed"] = pd.to_datetime(clustered["watch_date_parsed"], errors="coerce")

summaries = pd.read_csv(os.path.join(BASE, "cluster_summaries.csv"))

# Derive cluster labels via TF-IDF on title + description (not transcript)
# Each cluster is treated as one document; top distinctive term = label.
EXTRA_STOPS = {
    "like", "just", "know", "don", "yeah", "oh", "really", "think", "going",
    "got", "want", "ve", "ll", "re", "get", "make", "watch", "video",
    "tiktok", "people", "fyp", "foryou", "viral", "trending", "new", "one",
    "time", "day", "year", "way", "good", "come", "use", "look", "also",
    "need", "say", "thing", "take", "see", "back", "first", "even", "give",
    "try", "let", "right", "check", "share", "follow", "click", "link",
    "bio", "comment", "love", "ft", "amp", "via",
}
TFIDF_STOPS = list(ENGLISH_STOP_WORDS | EXTRA_STOPS)

valid_cluster_ids_for_tfidf = set(
    summaries[(summaries["cluster"] != -1) & (summaries["ad_pct"] < 50)]["cluster"]
)
cv_tfidf = clustered[
    clustered["cluster"].isin(valid_cluster_ids_for_tfidf) & (~clustered["is_ad"])
].copy()
cv_tfidf["text_clean"] = cv_tfidf["title"].fillna("") + " " + cv_tfidf["description"].fillna("")

docs = (
    cv_tfidf.groupby("cluster")["text_clean"]
    .apply(lambda x: " ".join(x))
    .reset_index()
)
docs.columns = ["cluster", "text"]

vec = TfidfVectorizer(
    max_features=20000,
    stop_words=TFIDF_STOPS,
    ngram_range=(1, 2),
    min_df=2,
    token_pattern=r"[a-zA-Z]{3,}",
)
mat = vec.fit_transform(docs["text"])
terms = vec.get_feature_names_out()

def top_terms_for_cluster(cluster_id, n=10):
    idx = docs[docs["cluster"] == cluster_id].index
    if len(idx) == 0:
        return []
    scores = mat[idx[0]].toarray()[0]
    return [terms[i] for i in scores.argsort()[::-1][:n]]

# Known acronyms/proper nouns to uppercase after title-casing
UPPERCASE_TERMS = {"Nyc", "Dnd", "Ttrpg", "Usa", "Nba", "Nfl", "Mlb", "Nhl", "Sg", "Lgbtq"}
TERM_OVERRIDES  = {"Dnd": "D&D", "Ttrpg": "TTRPG"}

def format_label(term):
    label = term.title()
    if label in TERM_OVERRIDES:
        return TERM_OVERRIDES[label]
    if label in UPPERCASE_TERMS:
        return label.upper()
    return label

# Assign labels — pick first term not already used by a higher-ranked cluster
used_labels = set()
cluster_label_map = {}
for cid in docs["cluster"]:
    for term in top_terms_for_cluster(cid):
        label = format_label(term)
        if label not in used_labels:
            cluster_label_map[cid] = label
            used_labels.add(label)
            break
    else:
        cluster_label_map[cid] = f"Cluster {cid}"

summaries["label"] = summaries["cluster"].map(cluster_label_map).fillna("Unknown")

# ── 3. Slide 1 — Total watch time ─────────────────────────────────────────────
total_seconds = int(df["duration"].sum())
total_hours   = round(total_seconds / 3600, 1)
total_days    = round(total_seconds / 86400, 1)

print(f"Total seconds: {total_seconds:,}  hours: {total_hours}  days: {total_days}")

# ── 4. Slide 2 — Busiest days ─────────────────────────────────────────────────
df["date_only"] = df["watch_date"].dt.date

daily = (
    df.groupby("date_only")
      .agg(total_duration=("duration", "sum"), video_count=("video_id", "count"))
      .reset_index()
      .sort_values("total_duration", ascending=False)
      .head(5)
)

def fmt_date(d):
    return datetime.strptime(str(d), "%Y-%m-%d").strftime("%B %-d, %Y")

top_days = [
    {
        "date": str(row["date_only"]),
        "formattedDate": fmt_date(row["date_only"]),
        "hours": round(row["total_duration"] / 3600, 1),
        "videoCount": int(row["video_count"]),
    }
    for _, row in daily.iterrows()
]

# ── 5. Slide 3 — Top creators (filter ads via clustered) ─────────────────────
ad_video_ids = set(
    clustered.loc[clustered["is_ad"] == True, "video_id"].astype(str)
)
df_no_ads = df[~df["video_id"].astype(str).isin(ad_video_ids)]

top_creators_raw = (
    df_no_ads["creator"]
      .dropna()
      .value_counts()
      .head(5)
)
top_creators = [
    {"name": name, "count": int(count)}
    for name, count in top_creators_raw.items()
]

# ── 6. Slide 4 — Top video types (clusters) ──────────────────────────────────
# Filter out noise cluster (-1) and clusters with ≥50% ads
valid_summaries = summaries[(summaries["cluster"] != -1) & (summaries["ad_pct"] < 50)].copy()
valid_cluster_ids = set(valid_summaries["cluster"])

clustered_valid = clustered[
    (clustered["cluster"].isin(valid_cluster_ids)) &
    (clustered["is_ad"] == False)
].copy()

cluster_counts = clustered_valid["cluster"].value_counts().reset_index()
cluster_counts.columns = ["cluster", "count"]
cluster_counts = cluster_counts.merge(
    valid_summaries[["cluster", "label"]], on="cluster"
).sort_values("count", ascending=False).head(5)

total_valid = cluster_counts["count"].sum()
top_clusters = [
    {
        "label": row["label"],
        "count": int(row["count"]),
        "pct": round(100 * row["count"] / total_valid, 1) if total_valid else 0,
    }
    for _, row in cluster_counts.iterrows()
]

# ── 7. Slide 5 — Genre over time ─────────────────────────────────────────────
top5_cluster_ids = [r["label"] for r in top_clusters]
top5_cluster_map  = {
    row["label"]: row["cluster"]
    for _, row in cluster_counts.iterrows()
}

clustered_top5 = clustered_valid[
    clustered_valid["cluster"].isin([top5_cluster_map[l] for l in top5_cluster_ids])
].copy()

# Map cluster id → label
id_to_label = {top5_cluster_map[l]: l for l in top5_cluster_ids}
clustered_top5["label"] = clustered_top5["cluster"].map(id_to_label)

monthly = (
    clustered_top5
      .groupby(["month", "label"])
      .size()
      .reset_index(name="count")
      .pivot(index="month", columns="label", values="count")
      .fillna(0)
      .astype(int)
      .reset_index()
      .sort_values("month")
)

genre_over_time = [
    {
        "month": row["month"],
        "genres": {col: int(row[col]) for col in monthly.columns if col != "month"},
    }
    for _, row in monthly.iterrows()
]

# ── 8. Write output ───────────────────────────────────────────────────────────
stats = {
    "totalSeconds": total_seconds,
    "totalHours": total_hours,
    "totalDays": total_days,
    "topDays": top_days,
    "topCreators": top_creators,
    "topClusters": top_clusters,
    "genreOverTime": genre_over_time,
    "topGenres": top5_cluster_ids,
}

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w") as f:
    json.dump(stats, f, indent=2)

print(f"\nWrote {OUT}")
print(f"  topDays:     {[d['formattedDate'] for d in top_days]}")
print(f"  topCreators: {[c['name'] for c in top_creators]}")
print(f"  topClusters: {[c['label'] for c in top_clusters]}")
print(f"  months:      {len(genre_over_time)} months")
