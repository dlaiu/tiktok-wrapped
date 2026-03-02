<script>
  import Slide1TotalTime from '$lib/slides/Slide1TotalTime.svelte';
  import Slide2BusiestDay from '$lib/slides/Slide2BusiestDay.svelte';
  import Slide3TopCreator from '$lib/slides/Slide3TopCreator.svelte';
  import Slide4TopType from '$lib/slides/Slide4TopType.svelte';
  import Slide5GenreOverTime from '$lib/slides/Slide5GenreOverTime.svelte';

  let { data } = $props();
  const { stats } = data;
</script>

<svelte:head>
  <title>TikTok Wrapped</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
</svelte:head>

<div class="slides-wrapper">
  <div class="slide"><Slide1TotalTime {stats} /></div>
  <div class="slide"><Slide2BusiestDay {stats} /></div>
  <div class="slide"><Slide3TopCreator {stats} /></div>
  <div class="slide"><Slide4TopType {stats} /></div>
  <div class="slide last"><Slide5GenreOverTime {stats} /></div>
</div>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background: #0a0a0a;
    font-family: 'Inter', sans-serif;
    color: #fff;
    overflow: hidden;
  }

  .slides-wrapper {
    height: 100svh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    background: #0a0a0a;
  }

  .slide {
    height: 100svh;
    scroll-snap-align: start;
    max-width: 430px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
  }
</style>
