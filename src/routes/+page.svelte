<script lang="ts">
	import { generateChunks, menuItems } from '$lib/aux';
	import type { PageProps } from './$types';
	import Card from './Card.svelte';

	let { data }: PageProps = $props();

	let values: any = data.data;

	let chunks = generateChunks(values);

  function scrollIntoView(id: any) {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  }

</script>

<main>
	<div class="navBar">
		<a href="/contact"> Contacto </a>
		<div class="navBar__tortuLogoContainer">
			<button type="button" onclick={() => window.scrollTo(0, 0)} aria-label="Scroll to top">
				<!-- <img src='/logoTortu.png' alt='Tortu Logo' /> -->
			</button>
		</div>
	</div>

	<div class="flex flex-col pt-16">
		{#each menuItems as { cardNumber, bgcolor, title }}
			<button class="menuTile" style="background-color: {bgcolor};" onclick={() => scrollIntoView(cardNumber)}
				>{title}</button
			>
		{/each}
	</div>

	<div class="pt-10"></div>

	<div class="cards-container">
		{#each chunks as chunk, index}
			<Card data={chunk} index={index} />
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
