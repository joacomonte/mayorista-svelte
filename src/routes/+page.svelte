<script lang="ts">
	import { generateChunks } from '$lib/aux';
	import type { PageProps } from './$types';
	import Card from './Card.svelte';

	let { data }: PageProps = $props();

	let values: any = data.data;

	let chunks = generateChunks(values);
</script>

<main>
  <div class='navBar'>
    <a href='/contact'>
      Contacto
    </a>
    <div class='navBar__tortuLogoContainer'>
	  <button type="button" onclick={() => window.scrollTo(0, 0)} aria-label="Scroll to top">
		<!-- <img src='/logoTortu.png' alt='Tortu Logo' /> -->
	  </button>
    </div>
  </div>
  
  <div class="pt-40"></div>

	<div class="cards-container">
		{#each chunks as chunk}
			<Card data={chunk} />
		{/each}
	</div>
</main>

<style>
	main {
		background-color: rgb(30, 30, 30);
  }
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
