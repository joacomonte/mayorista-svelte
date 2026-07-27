<script lang="ts">
	import { splitImagesURL } from '$lib/aux';
	import { cart, addProduct, setQty, findItem } from '$lib/cart.svelte';
	import { ArrowUpRight, Plus, Minus } from 'lucide-svelte';

	let { data, index, showPrices = false, onopen } = $props();

	let images = splitImagesURL(data?.[11]?.[0] ?? '');
	let title = data?.[0]?.[0] ?? '';
	let subtitle = data?.[1]?.[0] ?? '';
	let material = [data?.[2]?.[0], data?.[2]?.[1]].filter(Boolean).join(' ');

	const clean = (s: string) => (s ?? '').replace(/[-\s]+$/, '').trim();

	let priceValue = $derived(showPrices ? (data?.[3]?.[1] ?? '') : '');
	let priceLabel = $derived(clean(data?.[3]?.[0] ?? ''));
	let extraValue = $derived(showPrices ? (data?.[4]?.[1] ?? '') : '');
	let extraLabel = $derived(clean(data?.[4]?.[0] ?? ''));

	let inCart = $derived(findItem(title.trim()));
</script>

<div
	class="group relative flex flex-col overflow-hidden rounded-2xl bg-white text-left text-neutral-900 ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
>
	<button id="product-card-{index}" type="button" onclick={onopen} class="flex flex-1 flex-col text-left">
		<!-- image -->
		<div class="relative aspect-square w-full overflow-hidden bg-neutral-50">
			<img
				src={images[0] ?? ''}
				alt={title}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
			/>
			{#if images.length > 1}
				<span
					class="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
				>
					+{images.length - 1} fotos
				</span>
			{/if}
		</div>

		<!-- body -->
		<div class="flex flex-1 flex-col gap-1.5 p-3.5">
			<div class="flex items-start justify-between gap-2">
				<h2 class="text-[15px] font-semibold leading-snug tracking-tight">{title}</h2>
				<span
					class="mt-0.5 shrink-0 rounded-full bg-neutral-100 p-1 text-neutral-400 transition-colors group-hover:bg-blue-600 group-hover:text-white"
				>
					<ArrowUpRight size={13} strokeWidth={2.5} />
				</span>
			</div>

			{#if subtitle}
				<p class="text-xs leading-snug text-neutral-500">{subtitle}</p>
			{/if}

			{#if priceValue}
				<div class="mt-auto flex flex-col gap-0.5 border-t border-neutral-100 pt-2.5">
					<div class="flex items-baseline gap-1.5">
						<span class="text-lg font-bold tracking-tight text-neutral-900">{priceValue}</span>
						{#if priceLabel}
							<span class="text-[11px] font-medium text-neutral-400">{priceLabel}</span>
						{/if}
					</div>
					{#if extraValue}
						<span class="text-[11px] text-neutral-500">+ {extraValue} {extraLabel.toLowerCase()}</span>
					{/if}
				</div>
			{:else if material}
				<span
					class="mt-auto inline-flex w-fit items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600"
				>
					{material}
				</span>
			{/if}
		</div>
	</button>

	<!-- add to cart -->
	{#if showPrices}
		<div class="px-3.5 pb-3.5">
			{#if inCart}
				<div class="flex items-center justify-between rounded-xl bg-neutral-100 p-1">
					<button
						type="button"
						class="rounded-lg p-2 text-neutral-600 disabled:opacity-30"
						disabled={inCart.qty <= inCart.minQty}
						onclick={() => setQty(title.trim(), inCart.qty - 1)}
						aria-label="Menos"
					>
						<Minus size={16} />
					</button>
					<span class="text-sm font-semibold">{inCart.qty} en carrito</span>
					<button
						type="button"
						class="rounded-lg p-2 text-neutral-600"
						onclick={() => setQty(title.trim(), inCart.qty + 1)}
						aria-label="Más"
					>
						<Plus size={16} />
					</button>
				</div>
			{:else}
				<button
					type="button"
					class="flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 active:scale-[0.98]"
					onclick={() => addProduct(data)}
				>
					<Plus size={16} strokeWidth={2.5} /> Agregar
				</button>
			{/if}
		</div>
	{/if}
</div>
