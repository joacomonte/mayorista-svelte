<script lang="ts">
	import { onMount } from 'svelte';
	import Splide from '@splidejs/splide';
	import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

	const images = Object.values(
		import.meta.glob<{ default: string }>('./logos/*.png', { eager: true })
	).map((img: { default: string }) => img.default);

	let splide: any;

	onMount(() => {
		new Splide('.splide', {
			perPage: 3,
			rewind: true,
			arrows: false,
      pagination: false,
		}).mount({ AutoScroll });
		return () => splide.destroy();
	});
</script>

<section class="splide w-full" aria-label="Carousel Example">
	<div class="splide__track">
		<ul class="splide__list">
			{#each images as img}
				<li class="splide__slide">
					<img src={img} alt="Logo" class="h-24 w-24 object-contain" />
				</li>
			{/each}
		</ul>
	</div>
</section>
