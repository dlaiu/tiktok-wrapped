import { $ as attr_class, e as escape_html, a0 as ensure_array_like, a1 as attr_style, a2 as stringify, a3 as attr, a4 as head } from "../../chunks/index.js";
function Slide1TotalTime($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { stats } = $$props;
    let displayed = 0;
    let visible = false;
    $$renderer2.push(`<div${attr_class("slide-inner svelte-jhk3rl", void 0, { "visible": visible })}><div class="top-label svelte-jhk3rl">Your TikTok year in review</div> <div class="hero svelte-jhk3rl"><div class="big-number svelte-jhk3rl">${escape_html(displayed.toLocaleString())}</div> <div class="unit svelte-jhk3rl">hours</div></div> <div class="sub svelte-jhk3rl">You spent <strong class="svelte-jhk3rl">${escape_html(stats.totalDays)} days</strong> watching TikTok</div> <div class="chevron svelte-jhk3rl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svelte-jhk3rl"><polyline points="6 9 12 15 18 9" class="svelte-jhk3rl"></polyline></svg></div></div>`);
  });
}
function Slide2BusiestDay($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { stats } = $$props;
    let visible = false;
    let displayedHours = 0;
    const top = stats.topDays[0];
    const rest = stats.topDays.slice(1);
    $$renderer2.push(`<div${attr_class("slide-inner svelte-m3331c", void 0, { "visible": visible })}><div class="top-label svelte-m3331c">Your busiest days</div> <div class="hero-block svelte-m3331c"><div class="rank-badge svelte-m3331c">#1</div> <div class="big-date svelte-m3331c">${escape_html(top.formattedDate)}</div> <div class="big-hours svelte-m3331c">${escape_html(displayedHours)} <span class="svelte-m3331c">hrs</span></div> <div class="video-count svelte-m3331c">${escape_html(top.videoCount)} videos</div></div> <div class="ranked-list svelte-m3331c"><!--[-->`);
    const each_array = ensure_array_like(rest);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let day = each_array[i];
      $$renderer2.push(`<div class="ranked-item svelte-m3331c"${attr_style(`animation-delay: ${stringify((i + 1) * 120)}ms`)}><span class="rank svelte-m3331c">#${escape_html(i + 2)}</span> <span class="day-name svelte-m3331c">${escape_html(day.formattedDate)}</span> <span class="day-stat svelte-m3331c">${escape_html(day.hours)}h · ${escape_html(day.videoCount)} videos</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="chevron svelte-m3331c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svelte-m3331c"><polyline points="6 9 12 15 18 9" class="svelte-m3331c"></polyline></svg></div></div>`);
  });
}
function Slide3TopCreator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { stats } = $$props;
    let visible = false;
    let displayedCount = 0;
    const top = stats.topCreators[0];
    const rest = stats.topCreators.slice(1);
    $$renderer2.push(`<div${attr_class("slide-inner svelte-urepxz", void 0, { "visible": visible })}><div class="top-label svelte-urepxz">Your top creators</div> <div class="hero-block svelte-urepxz"><div class="rank-badge svelte-urepxz">#1</div> <div class="creator-handle svelte-urepxz">@${escape_html(top.name)}</div> <div class="big-count svelte-urepxz">${escape_html(displayedCount.toLocaleString())}</div> <div class="count-label svelte-urepxz">videos watched</div></div> <div class="ranked-list svelte-urepxz"><!--[-->`);
    const each_array = ensure_array_like(rest);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let creator = each_array[i];
      $$renderer2.push(`<div class="ranked-item svelte-urepxz"${attr_style(`animation-delay: ${stringify((i + 1) * 120)}ms`)}><span class="rank svelte-urepxz">#${escape_html(i + 2)}</span> <span class="creator-name svelte-urepxz">@${escape_html(creator.name)}</span> <span class="creator-stat svelte-urepxz">${escape_html(creator.count.toLocaleString())} videos</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="chevron svelte-urepxz"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svelte-urepxz"><polyline points="6 9 12 15 18 9" class="svelte-urepxz"></polyline></svg></div></div>`);
  });
}
function Slide4TopType($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { stats } = $$props;
    let visible = false;
    let displayedPct = 0;
    const top = stats.topClusters[0];
    const rest = stats.topClusters.slice(1);
    $$renderer2.push(`<div${attr_class("slide-inner svelte-oy357g", void 0, { "visible": visible })}><div class="top-label svelte-oy357g">Your top video types</div> <div class="hero-block svelte-oy357g"><div class="rank-badge svelte-oy357g">#1</div> <div class="big-label svelte-oy357g">${escape_html(top.label)}</div> <div class="big-pct svelte-oy357g">${escape_html(displayedPct)}<span class="svelte-oy357g">%</span></div> <div class="count-label svelte-oy357g">${escape_html(top.count.toLocaleString())} videos</div></div> <div class="ranked-list svelte-oy357g"><!--[-->`);
    const each_array = ensure_array_like(rest);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let cluster = each_array[i];
      $$renderer2.push(`<div class="ranked-item svelte-oy357g"${attr_style(`animation-delay: ${stringify((i + 1) * 120)}ms`)}><span class="rank svelte-oy357g">#${escape_html(i + 2)}</span> <span class="cluster-label svelte-oy357g">${escape_html(cluster.label)}</span> <div class="bar-wrap svelte-oy357g"><div class="bar svelte-oy357g"${attr_style(`width: ${stringify(cluster.pct / top.pct * 100)}%`)}></div></div> <span class="cluster-stat svelte-oy357g">${escape_html(cluster.pct)}%</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="chevron svelte-oy357g"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svelte-oy357g"><polyline points="6 9 12 15 18 9" class="svelte-oy357g"></polyline></svg></div></div>`);
  });
}
function Slide5GenreOverTime($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { stats } = $$props;
    let visible = false;
    const months = stats.genreOverTime;
    const genres = stats.topGenres;
    const COLORS = ["#fe2c55", "#69c9d0", "#7b2ff7", "#ff9f1c", "#25f4ee"];
    function fmtMonth(m) {
      const [y, mo] = m.split("-");
      return new Date(+y, +mo - 1, 1).toLocaleString("default", { month: "short" });
    }
    const maxTotal = Math.max(...months.map((m) => genres.reduce((s, g) => s + (m.genres[g] || 0), 0)));
    $$renderer2.push(`<div${attr_class("slide-inner svelte-10dxt0e", void 0, { "visible": visible })}><div class="top-label svelte-10dxt0e">Your genres over time</div> <div class="chart-wrap svelte-10dxt0e"><svg class="chart svelte-10dxt0e"${attr("viewBox", `0 0 ${stringify(months.length * 28)} 160`)} preserveAspectRatio="none"><!--[-->`);
    const each_array = ensure_array_like(months);
    for (let mi = 0, $$length = each_array.length; mi < $$length; mi++) {
      let month = each_array[mi];
      const total = genres.reduce((s, g) => s + (month.genres[g] || 0), 0);
      const barH = maxTotal > 0 ? total / maxTotal * 140 : 0;
      const x = mi * 28 + 4;
      const barW = 20;
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(genres);
      for (let gi = 0, $$length2 = each_array_1.length; gi < $$length2; gi++) {
        let genre = each_array_1[gi];
        const segVal = month.genres[genre] || 0;
        const segH = total > 0 ? segVal / total * barH : 0;
        const prevH = genres.slice(0, gi).reduce(
          (s, g) => {
            const v = month.genres[g] || 0;
            return s + (total > 0 ? v / total * barH : 0);
          },
          0
        );
        if (segH > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<rect${attr("x", x)}${attr("y", 160 - prevH - segH)}${attr("width", barW)}${attr("height", segH)}${attr("fill", COLORS[gi])} opacity="0.85" rx="2"></rect>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg> <div class="x-labels svelte-10dxt0e"><!--[-->`);
    const each_array_2 = ensure_array_like(months);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let month = each_array_2[$$index_2];
      $$renderer2.push(`<span class="svelte-10dxt0e">${escape_html(fmtMonth(month.month))}</span>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="legend svelte-10dxt0e"><!--[-->`);
    const each_array_3 = ensure_array_like(genres);
    for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
      let genre = each_array_3[i];
      $$renderer2.push(`<div class="legend-item svelte-10dxt0e"><span class="dot svelte-10dxt0e"${attr_style(`background: ${stringify(COLORS[i])}`)}></span> <span class="genre-label svelte-10dxt0e">${escape_html(genre)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="footer svelte-10dxt0e">Swipe back up to replay</div></div>`);
  });
}
function _page($$renderer, $$props) {
  let { data } = $$props;
  const { stats } = data;
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>TikTok Wrapped</title>`);
    });
    $$renderer2.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/> <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&amp;display=swap" rel="stylesheet"/>`);
  });
  $$renderer.push(`<div class="slides-wrapper svelte-1uha8ag"><div class="slide svelte-1uha8ag">`);
  Slide1TotalTime($$renderer, { stats });
  $$renderer.push(`<!----></div> <div class="slide svelte-1uha8ag">`);
  Slide2BusiestDay($$renderer, { stats });
  $$renderer.push(`<!----></div> <div class="slide svelte-1uha8ag">`);
  Slide3TopCreator($$renderer, { stats });
  $$renderer.push(`<!----></div> <div class="slide svelte-1uha8ag">`);
  Slide4TopType($$renderer, { stats });
  $$renderer.push(`<!----></div> <div class="slide last svelte-1uha8ag">`);
  Slide5GenreOverTime($$renderer, { stats });
  $$renderer.push(`<!----></div></div>`);
}
export {
  _page as default
};
