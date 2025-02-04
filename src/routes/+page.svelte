<script lang="ts">
	import { generateChunks } from "$lib/aux";
	import type { PageProps } from "./$types";
	import Card from "./Card.svelte";

  let { data }: PageProps = $props();
  let values = data.data

  let chunks = generateChunks(values);
  
  $effect(() => {
    console.log('Chunks updated:', chunks);
  });

</script>



<main>
  <div class="cards-container">
    <Card data={values}/>
  </div>
</main>
  
<style>
  .cards-container{
    width: 100%;
    max-width: 300px;
  }
</style>
