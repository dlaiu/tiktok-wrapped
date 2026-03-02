<script>
  import { onMount } from 'svelte';

  let { stats } = $props();

  let visible = $state(false);
  let el;

  const months = stats.genreOverTime;
  const genres = stats.topGenres;

  // Colors for each genre in order
  const COLORS = ['#fe2c55', '#69c9d0', '#7b2ff7', '#ff9f1c', '#25f4ee'];

  // Format month label: "2025-09" → "Sep"
  function fmtMonth(m) {
    const [y, mo] = m.split('-');
    return new Date(+y, +mo - 1, 1).toLocaleString('default', { month: 'short' });
  }

  // Compute stacked bar data
  const maxTotal = Math.max(
    ...months.map(m => genres.reduce((s, g) => s + (m.genres[g] || 0), 0))
  );

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<div class="slide-inner" bind:this={el} class:visible>
  <div class="top-label">Your genres over time</div>

  <div class="chart-wrap">
    <svg class="chart" viewBox="0 0 {months.length * 28} 160" preserveAspectRatio="none">
      {#each months as month, mi}
        {@const total = genres.reduce((s, g) => s + (month.genres[g] || 0), 0)}
        {@const barH = maxTotal > 0 ? (total / maxTotal) * 140 : 0}
        {@const x = mi * 28 + 4}
        {@const barW = 20}
        <!-- stacked segments -->
        {#each genres as genre, gi}
          {@const segVal = month.genres[genre] || 0}
          {@const segH = total > 0 ? (segVal / total) * barH : 0}
          {@const prevH = genres.slice(0, gi).reduce((s, g) => {
            const v = month.genres[g] || 0;
            return s + (total > 0 ? (v / total) * barH : 0);
          }, 0)}
          {#if segH > 0}
            <rect
              x={x}
              y={160 - prevH - segH}
              width={barW}
              height={segH}
              fill={COLORS[gi]}
              opacity="0.85"
              rx="2"
            />
          {/if}
        {/each}
      {/each}
    </svg>

    <!-- X-axis labels -->
    <div class="x-labels">
      {#each months as month}
        <span>{fmtMonth(month.month)}</span>
      {/each}
    </div>
  </div>

  <!-- Legend -->
  <div class="legend">
    {#each genres as genre, i}
      <div class="legend-item">
        <span class="dot" style="background: {COLORS[i]}"></span>
        <span class="genre-label">{genre}</span>
      </div>
    {/each}
  </div>

  <div class="footer">Swipe back up to replay</div>
</div>

<style>
  .slide-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(160deg, #00141a 0%, #0a0a0a 60%);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .slide-inner.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .top-label {
    font-size: 0.85rem;
    font-weight: 300;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 2rem;
  }

  .chart-wrap {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .chart {
    width: 100%;
    height: 160px;
    display: block;
  }

  .x-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    padding: 0 4px;
  }

  .x-labels span {
    font-size: 0.6rem;
    color: #666;
    flex: 1;
    text-align: center;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .genre-label {
    font-size: 0.8rem;
    color: #ccc;
  }

  .footer {
    font-size: 0.75rem;
    color: #555;
    letter-spacing: 0.08em;
  }
</style>
