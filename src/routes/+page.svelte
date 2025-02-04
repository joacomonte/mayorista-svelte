<script lang="ts">
	import { generateChunks } from '$lib/aux';
	import type { PageProps } from './$types';
	import Card from './Card.svelte';

	let { data }: PageProps = $props();
	let values = data.data;

	let chunks = generateChunks(values);

	$effect(() => {
		console.log('Chunks updated:', chunks);
	});
</script>

<main>
	<div class="cards-container">
		{#each chunks as chunk}
			<Card data={chunk} />
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
