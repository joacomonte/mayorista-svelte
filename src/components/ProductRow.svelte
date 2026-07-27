<script lang="ts">
	import { splitImagesURL } from '$lib/aux';
	import { addProduct, setQty, findItem } from '$lib/cart.svelte';
	import { ArrowUpRight, Plus, Minus } from 'lucide-svelte';

	let { data, index, showPrices = false, onopen } = $props();

	let images = splitImagesURL(data?.[11]?.[0] ?? '');
	let title = data?.[0]?.[0] ?? '';
	let subtitle = data?.[1]?.[0] ?? '';
	let material = [data?.[2]?.[0], data?.[2]?.[1]].filter(Boolean).join(' ');

	const clean = (s: string) => (s ?? '').replace(/[-\s]+$/, '').trim();

	let priceValue = $derived(showPrices ? (data?.[3]?.[1] ?? '') : '');
	let priceLabel = $derived(clean(data?.[3]?.[0] ?? ''));

	let inCart = $derived(findItem(title.trim()));
</script>

<div
	class="group relative flex items-stretch overflow-hidden rounded-xl bg-white text-left text-neutral-900 ring-1 ring-black/5 transition-all duration-200 hover:shadow-md hover:shadow-black/10"
>
	<button
		id="product-row-{index}"
		type="button"
		onclick={onopen}
		class="flex min-w-0 flex-1 items-center gap-3 p-2.5 text-left"
	>
		<!-- image -->
		<div
			class="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-50 sm:h-20 sm:w-20"
		>
			<img
				src={images[0] ?? ''}
				alt={title}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
			/>
			{#if images.length > 1}
				<span
					class="absolute bottom-0.5 right-0.5 rounded-full bg-black/50 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm"
				>
					+{images.length - 1}
				</span>
			{/if}
		</div>

		<!-- body -->
		<div class="flex min-w-0 flex-1 flex-col gap-0.5">
			<div class="flex items-start gap-1.5">
				<h2 class="truncate text-[14px] font-semibold leading-snug tracking-tight sm:text-[15px]">
					{title}
				</h2>
				<span
					class="mt-0.5 shrink-0 text-neutral-300 transition-colors group-hover:text-blue-600"
				>
					<ArrowUpRight size={13} strokeWidth={2.5} />
				</span>
			</div>

			{#if subtitle}
				<p class="truncate text-[11px] leading-snug text-neutral-500 sm:text-xs">{subtitle}</p>
			{/if}

			{#if priceValue}
				<div class="mt-0.5 flex items-baseline gap-1.5">
					<span class="text-[15px] font-bold tracking-tight text-neutral-900 sm:text-base">
						{priceValue}
					</span>
					{#if priceLabel}
						<span class="truncate text-[10px] font-medium text-neutral-400">{priceLabel}</span>
					{/if}
				</div>
			{:else if material}
				<span
					class="mt-0.5 inline-flex w-fit items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600"
				>
					{material}
				</span>
			{/if}
		</div>
	</button>

	<!-- add to cart -->
	{#if showPrices}
		<div class="flex shrink-0 items-center pr-2.5">
			{#if inCart}
				<div class="flex items-center gap-0.5 rounded-lg bg-neutral-100 p-0.5">
					<button
						type="button"
						class="rounded-md p-1.5 text-neutral-600 disabled:opacity-30"
						disabled={inCart.qty <= inCart.minQty}
						onclick={() => setQty(title.trim(), inCart.qty - 1)}
						aria-label="Menos"
					>
						<Minus size={15} />
					</button>
					<span class="min-w-5 text-center text-sm font-semibold tabular-nums">{inCart.qty}</span>
					<button
						type="button"
						class="rounded-md p-1.5 text-neutral-600"
						onclick={() => setQty(title.trim(), inCart.qty + 1)}
						aria-label="Más"
					>
						<Plus size={15} />
					</button>
				</div>
			{:else}
				<button
					type="button"
					class="flex items-center justify-center gap-1 rounded-lg bg-neutral-900 px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-blue-600 active:scale-[0.98]"
					onclick={() => addProduct(data)}
					aria-label="Agregar {title}"
				>
					<Plus size={15} strokeWidth={2.5} />
					<span class="hidden sm:inline">Agregar</span>
				</button>
			{/if}
		</div>
	{/if}
</div>
