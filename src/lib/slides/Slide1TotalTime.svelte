<script>
  import { onMount } from 'svelte';

  let { stats } = $props();

  let displayed = $state(0);
  let visible = $state(false);
  let el;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          animateCount(0, stats.totalHours, 1200);
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
      displayed = Math.round(from + (to - from) * ease);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
</script>

<div class="slide-inner" bind:this={el} class:visible>
  <div class="top-label">Your TikTok year in review</div>

  <div class="hero">
    <div class="big-number">{displayed.toLocaleString()}</div>
    <div class="unit">hours</div>
  </div>

  <div class="sub">
    You spent <strong>{stats.totalDays} days</strong> watching TikTok
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
    background: linear-gradient(160deg, #1a0010 0%, #0a0a0a 60%);
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
    margin-bottom: 3rem;
  }

  .hero {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .big-number {
    font-size: clamp(5rem, 22vw, 9rem);
    font-weight: 900;
    line-height: 1;
    color: #fe2c55;
    text-shadow: 0 0 40px rgba(254, 44, 85, 0.4);
  }

  .unit {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    font-weight: 300;
    color: #fe2c55;
    opacity: 0.8;
  }

  .sub {
    font-size: clamp(1rem, 4vw, 1.25rem);
    font-weight: 300;
    color: #ccc;
    text-align: center;
    max-width: 280px;
  }

  .sub strong {
    color: #fff;
    font-weight: 600;
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
