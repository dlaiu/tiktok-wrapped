<script>
  import { onMount } from 'svelte';

  let { stats } = $props();

  let visible = $state(false);
  let displayedPct = $state(0);
  let el;

  const top = stats.topClusters[0];
  const rest = stats.topClusters.slice(1);

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          animateCount(0, top.pct, 1000);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });

  function animateCount(from, to, duration) {
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      displayedPct = Math.round((from + (to - from) * ease) * 10) / 10;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
</script>

<div class="slide-inner" bind:this={el} class:visible>
  <div class="top-label">Your top video types</div>

  <div class="hero-block">
    <div class="rank-badge">#1</div>
    <div class="big-label">{top.label}</div>
    <div class="big-pct">{displayedPct}<span>%</span></div>
    <div class="count-label">{top.count.toLocaleString()} videos</div>
  </div>

  <div class="ranked-list">
    {#each rest as cluster, i}
      <div class="ranked-item" style="animation-delay: {(i + 1) * 120}ms">
        <span class="rank">#{i + 2}</span>
        <span class="cluster-label">{cluster.label}</span>
        <div class="bar-wrap">
          <div class="bar" style="width: {(cluster.pct / top.pct) * 100}%"></div>
        </div>
        <span class="cluster-stat">{cluster.pct}%</span>
      </div>
    {/each}
  </div>

  <div class="chevron">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </div>
</div>

<style>
  .slide-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(160deg, #1a0a00 0%, #0a0a0a 60%);
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

  .hero-block {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .rank-badge {
    display: inline-block;
    background: #ff9f1c;
    color: #000;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    margin-bottom: 0.75rem;
  }

  .big-label {
    font-size: clamp(1.6rem, 7vw, 2.5rem);
    font-weight: 900;
    color: #fff;
    margin-bottom: 0.5rem;
  }

  .big-pct {
    font-size: clamp(3.5rem, 16vw, 6rem);
    font-weight: 900;
    line-height: 1;
    color: #ff9f1c;
    text-shadow: 0 0 40px rgba(255, 159, 28, 0.4);
  }

  .big-pct span {
    font-size: 0.5em;
    font-weight: 300;
    opacity: 0.7;
  }

  .count-label {
    font-size: 0.9rem;
    color: #888;
    margin-top: 0.25rem;
  }

  .ranked-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .ranked-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(255,255,255,0.04);
    border-radius: 10px;
    padding: 0.7rem 1rem;
    opacity: 0;
    transform: translateX(-12px);
  }

  .slide-inner.visible .ranked-item {
    animation: slideIn 0.4s ease forwards;
  }

  @keyframes slideIn {
    to { opacity: 1; transform: translateX(0); }
  }

  .rank {
    font-size: 0.75rem;
    font-weight: 700;
    color: #ff9f1c;
    min-width: 1.8rem;
  }

  .cluster-label {
    font-size: 0.9rem;
    font-weight: 400;
    color: #ddd;
    min-width: 5rem;
  }

  .bar-wrap {
    flex: 1;
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    overflow: hidden;
  }

  .bar {
    height: 100%;
    background: #ff9f1c;
    border-radius: 2px;
    opacity: 0.6;
  }

  .cluster-stat {
    font-size: 0.8rem;
    color: #888;
    white-space: nowrap;
    min-width: 2.5rem;
    text-align: right;
  }

  .chevron {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    color: #555;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }
</style>
