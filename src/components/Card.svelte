<script lang="ts">
	import { splitImagesURL } from '$lib/aux';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';

	let { data, index } = $props();

	let images = splitImagesURL(data?.[11]?.[0] ?? '');

</script>

<article class="card-container" id="{index}">
	<!-- IMAGE -->
	<section class="card-image-container">
		{#if images.length > 1}
			<Splide
				options={{
					rewind: true,
					arrows: false,
					focus: 'center',
					perMove: 1,
					perPage: 1,
					autoHeight: true
				}}
				aria-label="Svelte Splide Example"
			>
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

	<!-- TITLE -->
	{#if data[0]?.[0]}
		<h1 class="mx-auto w-full py-2 text-center text-2xl font-medium">{data[0][0]}</h1>
	{/if}

	<div class="p-4">
		<!-- SUBTITLE -->
		<section>
			{#if data[1]?.[0]}
				<p class=" font-bold">{data[1][0]}</p>
			{/if}
		</section>

		<section>
			<div class="[&>p]:inline-block">
				{#if data[2]?.[0]}
					<p>{data[2][0]}</p>
				{/if}
				{#if data[2]?.[1]}
					<p>{data[2][1]}</p>
				{/if}
			</div>

			<div class="[&>p]:inline-block">
				{#if data[3]?.[0]}
					<p>{data[3][0]}</p>
				{/if}
				{#if data[3]?.[1]}
					<p>{data[3][1]}</p>
				{/if}
			</div>

			<div class="[&>p]:inline-block">
				{#if data[4]?.[0]}
					<p>{data[4][0]}</p>
				{/if}
				{#if data[4]?.[1]}
					<p>{data[4][1]}</p>
				{/if}
			</div>

			<div class="[&>p]:inline-block">
				{#if data[5]?.[0]}
					<p>{data[5][0]}</p>
				{/if}
				{#if data[5]?.[1]}
					<p>{data[5][1]}</p>
				{/if}
			</div>
		</section>

		<section class="mt-4">
			{#if data[6]?.[0]}
				<p class="font-bold">{data[6][0]}</p>
			{/if}
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
	</div>
</article>

<style>
	.card-container {
    color: rgb(39, 39, 39);
		margin: auto;
		width: 100%;
		max-width: 475px;
		background-color: rgb(231, 231, 231);
		border-radius: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	@media (max-width: 500px) {
		.card-container {
			width: 95vw;
		}
	}
	@media (min-width: 1014px) {
		.card-container {
			width: 95vw;
			height: 725px;
		}
	}

	.card-image-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		border-radius: 1.5rem;
		overflow: hidden;

		& img {
			width: 100%;
			object-fit: cover;
			max-height: 400px;
		}
	}
</style>
