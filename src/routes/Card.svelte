<script lang="ts">
	import { splitImagesURL } from '$lib/aux';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	let { data } = $props();

	const images = $derived(splitImagesURL(data[11]?.[0] ?? ''));
</script>

<article class="card-container">
	{#if data[0]?.[0]}
		<h1>Title: {data[0][0]}</h1>
	{/if}

	<section>
		<h2>Subtitles</h2>
		{#if data[1]?.[0]}
			<p>{data[1][0]}</p>
		{/if}
		{#if data[6]?.[0]}
			<p>{data[6][0]}</p>
		{/if}
	</section>

	<section>
		{#if data[2]?.[0] || data[2]?.[1]}
			<div>
				{#if data[2]?.[0]}
					<p>{data[2][0]}</p>
				{/if}
				{#if data[2]?.[1]}
					<p>{data[2][1]}</p>
				{/if}
			</div>
		{/if}

		{#if data[3]?.[0] || data[3]?.[1]}
			<div>
				{#if data[3]?.[0]}
					<p>{data[3][0]}</p>
				{/if}
				{#if data[3]?.[1]}
					<p>{data[3][1]}</p>
				{/if}
			</div>
		{/if}

		{#if data[4]?.[0] || data[4]?.[1]}
			<div>
				{#if data[4]?.[0]}
					<p>{data[4][0]}</p>
				{/if}
				{#if data[4]?.[1]}
					<p>{data[4][1]}</p>
				{/if}
			</div>
		{/if}

		{#if data[5]?.[0] || data[5]?.[1]}
			<div>
				{#if data[5]?.[0]}
					<p>{data[5][0]}</p>
				{/if}
				{#if data[5]?.[1]}
					<p>{data[5][1]}</p>
				{/if}
			</div>
		{/if}
	</section>

	<section>
		{#if data[7]?.[0]}
			<p>{data[7][0]}</p>
		{/if}
		{#if data[8]?.[0]}
			<p>{data[8][0]}</p>
		{/if}
		{#if data[9]?.[0]}
			<p>{data[9][0]}</p>
		{/if}
		{#if data[10]?.[0]}
			<p>{data[10][0]}</p>
		{/if}
	</section>

	<section class="card-image-container">
		{#if images.length > 1}
			<Splide options={{ rewind: true, arrows: false }} aria-label="Svelte Splide Example">
				{#each images as url}
					<SplideSlide>
						<img src={url} alt="" />
					</SplideSlide>
				{/each}
			</Splide>
		{:else}
			<img src={images[0] ?? ''} alt="" />
		{/if}
	</section>
</article>

<style>
	.card-container {
		width: 100%;
		padding: 1rem;
		background-color: rgb(230, 230, 230);
		border-radius: 2rem;
	}

	.card-image-container {
		height: 200px;
		width: 200px;
	}
</style>
