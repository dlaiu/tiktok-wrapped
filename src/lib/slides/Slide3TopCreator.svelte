<script>
  import { onMount } from 'svelte';

  let { stats } = $props();

  let visible = $state(false);
  let displayedCount = $state(0);
  let el;

  const top = stats.topCreators[0];
  const rest = stats.topCreators.slice(1);

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          animateCount(0, top.count, 1000);
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
      displayedCount = Math.round(from + (to - from) * ease);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
</script>

<div class="slide-inner" bind:this={el} class:visible>
  <div class="top-label">Your top creators</div>

  <div class="hero-block">
    <div class="rank-badge">#1</div>
    <div class="creator-handle">@{top.name}</div>
    <div class="big-count">{displayedCount.toLocaleString()}</div>
    <div class="count-label">videos watched</div>
  </div>

  <div class="ranked-list">
    {#each rest as creator, i}
      <div class="ranked-item" style="animation-delay: {(i + 1) * 120}ms">
        <span class="rank">#{i + 2}</span>
        <span class="creator-name">@{creator.name}</span>
        <span class="creator-stat">{creator.count.toLocaleString()} videos</span>
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
    background: linear-gradient(160deg, #0d001a 0%, #0a0a0a 60%);
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
    background: #7b2ff7;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    margin-bottom: 0.75rem;
  }

  .creator-handle {
    font-size: clamp(1.4rem, 6vw, 2rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
    word-break: break-all;
  }

  .big-count {
    font-size: clamp(3.5rem, 16vw, 6rem);
    font-weight: 900;
    line-height: 1;
    color: #7b2ff7;
    text-shadow: 0 0 40px rgba(123, 47, 247, 0.5);
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
    gap: 0.75rem;
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
    color: #7b2ff7;
    min-width: 1.8rem;
  }

  .creator-name {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 400;
    color: #ddd;
  }

  .creator-stat {
    font-size: 0.8rem;
    color: #888;
    white-space: nowrap;
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
