<script lang="ts">
	import { generateChunks, menuItems, scrollIntoView } from '$lib/aux';
	import BrandSlider from '../components/BrandSlider/BrandSlider.svelte';
	import Card from '../components/Card.svelte';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';

  export let data: PageData;

	let values: any = data.data;

	let chunks = generateChunks(values);

</script>

<main>
	<div class="navBar">
		<button onclick={() => goto('/contact')}>Contacto</button>
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
		{#each menuItems as { cardNumber, bgcolor, title }}
			<button
				class="menuTile"
				style="background-color: {bgcolor};"
				onclick={() => scrollIntoView(cardNumber)}>{title}</button
			>
		{/each}
	</div>

	<section class="flex flex-col justify-center items-center gap-4 my-10">
		<p class=" text-pretty text-center px-10 max-w-[800px]">
			Con tu compra colaboras con el programa de Residencias Universitarias de Fundación Sí.<br/>
			Porque el verdadero cambio está en la educación y por eso decidimos donarles cada mes el 1% de
			todas nuestras ventas.
		</p>
		<img class=" w-32 h-32" src={`/si.png`} alt="fundacion si" />
	</section>

  <div class="py-4">
    <BrandSlider/>
  </div>


	<div class="cards-container">
		{#each chunks as chunk, index}
			<Card data={chunk} {index} />
		{/each}
	</div>




</main>

<style>
	.cards-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		column-gap: 3rem;
		width: 100%;
		margin: auto;
	}

	@media (min-width: 1014px) {
		.cards-container {
			justify-content: space-around;
		}
	}
</style>
