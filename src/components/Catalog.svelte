<script lang="ts">
	import { menuItems } from '$lib/aux';
	import { parseTiers } from '$lib/catalog';
	import ProductCard from './ProductCard.svelte';
	import ProductRow from './ProductRow.svelte';
	import ProductModal from './ProductModal.svelte';
	import CartDrawer from './CartDrawer.svelte';
	import { LayoutGrid, List } from 'lucide-svelte';

	let { chunks, showPrices = false } = $props();

	let tiers = parseTiers(chunks);

	let view: 'grid' | 'list' = $state('grid');

	// Group chunks into category sections using menuItems start indices
	let sections = $derived(
		menuItems.map((item, i) => {
			const end = menuItems[i + 1]?.cardNumber ?? chunks.length;
			return { ...item, products: chunks.slice(item.cardNumber, end) };
		})
	);

	let selected: any = $state(null);

	$effect(() => {
		document.body.style.overflow = selected ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<div class="viewToggleWrap">
	<span class="viewToggleLabel">Modo de vista</span>
	<div class="viewToggle" role="group" aria-label="Cambiar vista del catálogo">
	<button
		id="view-grid"
		type="button"
		class:active={view === 'grid'}
		onclick={() => (view = 'grid')}
		aria-label="Vista de tarjetas"
		aria-pressed={view === 'grid'}
	>
		<LayoutGrid size={16} strokeWidth={2.2} />
		Tarjetas
	</button>
	<button
		id="view-list"
		type="button"
		class:active={view === 'list'}
		onclick={() => (view = 'list')}
		aria-label="Vista de lista"
		aria-pressed={view === 'list'}
	>
		<List size={16} strokeWidth={2.2} />
		Lista
	</button>
	</div>
</div>

{#each sections as { title, bgcolor, products }, i}
	{#if products.length > 0}
		<section class="categorySection" id="section-{i}">
			<h2 style="border-color: {bgcolor};">{title}</h2>
			{#if view === 'grid'}
				<div class="productGrid">
					{#each products as product, j}
						<ProductCard
							data={product}
							index={`${i}-${j}`}
							{showPrices}
							onopen={() => (selected = product)}
						/>
					{/each}
				</div>
			{:else}
				<div class="productList">
					{#each products as product, j}
						<ProductRow
							data={product}
							index={`${i}-${j}`}
							{showPrices}
							onopen={() => (selected = product)}
						/>
					{/each}
				</div>
			{/if}
		</section>
	{/if}
{/each}

{#if selected}
	<ProductModal data={selected} {showPrices} onclose={() => (selected = null)} />
{/if}

{#if showPrices}
	<CartDrawer {tiers} />
{/if}

<style>
	.categorySection {
		padding: 0 12px;
		margin-bottom: 28px;
		max-width: 1100px;
		margin-left: auto;
		margin-right: auto;
	}
	.categorySection h2 {
		font-size: 1.15rem;
		font-weight: 700;
		margin: 18px 0 12px;
		padding-left: 10px;
		border-left: 4px solid;
	}

	.productGrid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}
	@media (min-width: 640px) {
		.productGrid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 1014px) {
		.productGrid {
			grid-template-columns: repeat(4, 1fr);
			gap: 16px;
		}
	}

	/* list view: single column on mobile, 2 up on wider screens */
	.productList {
		display: grid;
		grid-template-columns: 1fr;
		gap: 8px;
	}
	@media (min-width: 768px) {
		.productList {
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
		}
	}

	.viewToggleWrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		margin: 4px auto 16px;
	}
	.viewToggleLabel {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #8a8a8a;
	}
	.viewToggle {
		display: flex;
		justify-content: center;
		gap: 6px;
		padding: 5px;
		width: fit-content;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 14px;
	}
	.viewToggle button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: 10px;
		font-size: 0.8rem;
		font-weight: 600;
		color: #cbcbcb;
		background: transparent;
		transition:
			background-color 0.15s,
			color 0.15s;
	}
	.viewToggle button.active {
		background: #fff;
		color: #171717;
	}
</style>
