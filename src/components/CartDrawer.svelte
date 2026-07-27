<script lang="ts">
	import { cart, setQty, setNotes, removeItem, clearCart } from '$lib/cart.svelte';
	import { formatARS, discountPctFor, type Tier } from '$lib/catalog';
	import { buildOrder, orderToText } from '$lib/order';
	import { downloadOrderPdf } from '$lib/pdf';
	import { ShoppingCart, X, Minus, Plus, Trash2, ArrowLeft, FileDown } from 'lucide-svelte';

	let { tiers = [] as Tier[] } = $props();

	let open = $state(false);

	let count = $derived(cart.items.reduce((a, i) => a + i.qty, 0));

	let eligibleSubtotal = $derived(
		cart.items.filter((i) => i.eligible).reduce((a, i) => a + i.qty * i.unitPrice, 0)
	);
	let otherSubtotal = $derived(
		cart.items.filter((i) => !i.eligible).reduce((a, i) => a + i.qty * i.unitPrice, 0)
	);
	let subtotal = $derived(eligibleSubtotal + otherSubtotal);

	let pct = $derived(discountPctFor(eligibleSubtotal, tiers));
	let discount = $derived(Math.round((eligibleSubtotal * pct) / 100));
	let total = $derived(subtotal - discount);

	// Next tier hint (based on the eligible subtotal)
	let nextTier = $derived(tiers.find((t) => eligibleSubtotal < t.threshold));

	$effect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	function checkout() {
		const msg = `Hola! Quiero hacer este pedido:\n\n${orderToText(buildOrder(cart.items, tiers))}`;

		window.open(
			`https://api.whatsapp.com/send?phone=5491173663259&text=${encodeURIComponent(msg)}`,
			'_blank'
		);
	}

	let downloading = $state(false);

	async function downloadPdf() {
		downloading = true;
		try {
			await downloadOrderPdf(buildOrder(cart.items, tiers));
		} finally {
			downloading = false;
		}
	}
</script>

<!-- floating button -->
{#if count > 0}
	<button
		id="cart-fab"
		type="button"
		class="fixed bottom-5 right-5 z-[150] flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
		onclick={() => (open = true)}
	>
		<ShoppingCart size={20} strokeWidth={2.2} />
		<span>{formatARS(total)}</span>
		<span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-blue-600">
			{count}
		</span>
	</button>
{/if}

<!-- drawer -->
{#if open}
	<div
		class="fixed inset-0 z-[160] bg-black/60"
		role="presentation"
		onclick={() => (open = false)}
	></div>

	<aside
		id="cart-drawer"
		class="fixed right-0 top-0 z-[161] flex h-dvh w-full max-w-md flex-col bg-white text-neutral-900 shadow-2xl"
		aria-label="Carrito"
	>
		<header class="flex items-center justify-between border-b border-neutral-200 px-4 py-3.5">
			<h2 class="text-base font-semibold tracking-tight">Tu pedido</h2>
			<button
				id="cart-close"
				type="button"
				class="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100"
				onclick={() => (open = false)}
				aria-label="Cerrar"
			>
				<X size={20} />
			</button>
		</header>

		<button
			id="cart-continue"
			type="button"
			class="mx-4 mt-3 flex items-center justify-center gap-2 rounded-xl border border-neutral-300 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-[0.98]"
			onclick={() => (open = false)}
		>
			<ArrowLeft size={18} /> Seguir comprando
		</button>

		<div class="flex-1 space-y-3 overflow-y-auto p-4">
			{#each cart.items as item (item.id)}
				<div class="flex gap-3 rounded-xl border border-neutral-200 p-2.5">
					<img src={item.image} alt={item.title} class="h-16 w-16 shrink-0 rounded-lg object-cover" />
					<div class="flex min-w-0 flex-1 flex-col gap-1.5">
						<div class="flex items-start justify-between gap-2">
							<div class="min-w-0">
								<p class="truncate text-sm font-semibold">{item.title}</p>
								<p class="text-xs text-neutral-500">
									{formatARS(item.unitPrice)} c/u
									{#if item.minQty > 1}· mín {item.minQty}{/if}
								</p>
							</div>
							<button
								type="button"
								class="shrink-0 text-neutral-400 hover:text-red-500"
								onclick={() => removeItem(item.id)}
								aria-label="Quitar"
							>
								<Trash2 size={16} />
							</button>
						</div>

						<div class="flex items-center justify-between gap-2">
							<div class="flex items-center rounded-lg border border-neutral-200">
								<button
									type="button"
									class="p-1.5 text-neutral-600 disabled:opacity-30"
									disabled={item.qty <= item.minQty}
									onclick={() => setQty(item.id, item.qty - 1)}
									aria-label="Menos"
								>
									<Minus size={14} />
								</button>
								<input
									type="number"
									class="w-12 border-0 bg-transparent text-center text-sm font-medium [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
									value={item.qty}
									min={item.minQty}
									onchange={(e) => setQty(item.id, e.currentTarget.valueAsNumber)}
								/>
								<button
									type="button"
									class="p-1.5 text-neutral-600"
									onclick={() => setQty(item.id, item.qty + 1)}
									aria-label="Más"
								>
									<Plus size={14} />
								</button>
							</div>
							<span class="text-sm font-bold tracking-tight">{formatARS(item.qty * item.unitPrice)}</span>
						</div>

						<input
							type="text"
							class="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none"
							placeholder="Notas: colores, cuánto de cada, personalización…"
							value={item.notes}
							oninput={(e) => setNotes(item.id, e.currentTarget.value)}
						/>
					</div>
				</div>
			{/each}
		</div>

		<!-- discount legend -->
		{#if tiers.length}
			<div class="border-t border-neutral-200 bg-neutral-50 px-4 py-3 text-xs">
				<p class="mb-1.5 font-semibold text-neutral-700">Descuento por monto (aluminio / inox)</p>
				<ul class="space-y-0.5">
					{#each tiers as t}
						{@const reached = eligibleSubtotal >= t.threshold}
						<li class="flex items-center gap-1.5 {reached ? 'font-semibold text-green-600' : 'text-neutral-500'}">
							<span>{reached ? '✓' : '•'}</span>
							<span>Superando {formatARS(t.threshold)} → {t.pct}% OFF</span>
						</li>
					{/each}
				</ul>
				{#if nextTier}
					<p class="mt-1.5 text-neutral-500">
						Te faltan <span class="font-semibold text-neutral-700">{formatARS(nextTier.threshold - eligibleSubtotal)}</span>
						en aluminio/inox para {nextTier.pct}% OFF.
					</p>
				{/if}
			</div>
		{/if}

		<!-- totals + checkout -->
		<footer class="space-y-2 border-t border-neutral-200 p-4">
			<div class="flex justify-between text-sm text-neutral-600">
				<span>Subtotal</span><span>{formatARS(subtotal)}</span>
			</div>
			{#if discount > 0}
				<div class="flex justify-between text-sm font-medium text-green-600">
					<span>Descuento {pct}%</span><span>-{formatARS(discount)}</span>
				</div>
			{/if}
			<div class="flex justify-between text-lg font-bold tracking-tight">
				<span>Total</span><span>{formatARS(total)}</span>
			</div>

			<button
				id="cart-checkout"
				type="button"
				class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3 font-semibold text-white active:scale-[0.98]"
				onclick={checkout}
			>
				<ShoppingCart size={18} /> Enviar pedido por WhatsApp
			</button>
			<button
				id="cart-download-pdf"
				type="button"
				class="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-[0.98] disabled:opacity-50"
				disabled={downloading}
				onclick={downloadPdf}
			>
				<FileDown size={18} /> {downloading ? 'Generando PDF…' : 'Descargar pedido en PDF'}
			</button>
			<button
				type="button"
				class="w-full py-1 text-xs text-neutral-400 hover:text-neutral-600"
				onclick={clearCart}
			>
				Vaciar carrito
			</button>
		</footer>
	</aside>
{/if}
