<script>
  export let cell;
  const state = { isClicked: false };

  let {
    img,
    title,
    subtitle1,
    modelo1,
    precio1,
    modelo2,
    precio2,
    modelo3,
    precio3,
    modelo4,
    precio4,
    subtitle2,
    label1,
    label2,
    label3,
    label4
  } = cell;
</script>

<div class="genericCard" bind:this={state.ref}>
  {#if title}
    <h1>{title}</h1>
  {/if}

  <!-- {#if img && img.length > 1}
    <Swiper pagination={true} modules={['Pagination']} class="mySwiper">
      {#each img as src, index}
        <div class="swiper-slide">
          <div
            class="genericCard__imgContainer"
            on:click={() => (state.isClicked = !state.isClicked)}
          >
            {#if src}
              <img src={`/${src}`} alt="img" />
            {:else}
              <p>Imagen no disponible</p>
            {/if}
          </div>
        </div>
      {/each}
    </Swiper>
  {:else if img && img.length === 1}
    <div class="genericCard__imgContainer" on:click={() => (state.isClicked = !state.isClicked)}>
      {#if img[0]}
        <img src={`/${img[0]}`} alt="img" />
      {:else}
        <p>Imagen no disponible</p>
      {/if}
    </div>
  {/if} -->

  <div class="genericCard__description">
    {#if subtitle1}
      <h2>{subtitle1}</h2>
    {/if}

    {#if modelo1}
      <p>{modelo1} {precio1}</p>
    {/if}
    {#if modelo2}
      <p>{modelo2} {precio2}</p>
    {/if}
    {#if modelo3}
      <p>{modelo3} {precio3}</p>
    {/if}
    {#if modelo4}
      <p>{modelo4} {precio4}</p>
    {/if}

    {#if subtitle2}
      <h2>{subtitle2}</h2>
    {/if}

    {#if label1}
      <p>{label1}</p>
    {/if}
    {#if label2}
      <p>{label2}</p>
    {/if}
    {#if label3}
      <p>{label3}</p>
    {/if}
    {#if label4}
      <p>{label4}</p>
    {/if}
  </div>
</div>
