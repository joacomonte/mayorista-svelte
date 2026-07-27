<script lang="ts">
	import { generateChunks, menuItems, scrollIntoView } from '$lib/aux';
	import BrandSlider from '../../components/BrandSlider/BrandSlider.svelte';
	import Catalog from '../../components/Catalog.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let values: any = data.data;

	let chunks = generateChunks(values);
</script>

<main class="pb-10">
	<div class="navBar">
		<a href="/contact"> Contacto </a>
		<div class="navBar__tortuLogoContainer">
			<button
				type="button"
				onclick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
				aria-label="Scroll to top"
			>
				<img src="/logoTortu.png" alt="Tortu Logo" />
			</button>
		</div>
	</div>

	<div class="flex flex-col pt-16">
		{#each menuItems as { bgcolor, title }, i}
			<button
				class="menuTile"
				style="background-color: {bgcolor};"
				onclick={() => scrollIntoView(`section-${i}`)}>{title}</button
			>
		{/each}
	</div>

	<section class="flex flex-col items-center justify-center gap-3 px-6 pt-6 pb-4 text-center">
		<p class="max-w-[600px] text-pretty text-sm text-neutral-300">
			Con tu compra colaboras con el programa de Residencias Universitarias de Fundación Sí:
			donamos cada mes el 1% de todas nuestras ventas.
		</p>
		<img class="h-16 w-16" src={`/si.png`} alt="fundacion si" />
	</section>

	<div class="pb-4">
		<BrandSlider />
	</div>

	<Catalog {chunks} showPrices={true} />
</main>
