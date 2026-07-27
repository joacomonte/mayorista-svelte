<script lang="ts">
	import { splitImagesURL } from '$lib/aux';
	import { addProduct } from '$lib/cart.svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
	import '@splidejs/splide/dist/css/splide.min.css';

	let { data, showPrices = false, onclose } = $props();

	let images = splitImagesURL(data?.[11]?.[0] ?? '');
	let title = data?.[0]?.[0] ?? '';

	let whatsappURL = $derived(
		`https://api.whatsapp.com/send?phone=5491173663259&text=${encodeURIComponent(
			`Hola! Quería consultar por *${title}*`
		)}`
	);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div
	id="product-modal-backdrop"
	class="modalBackdrop"
	onclick={onclose}
	role="presentation"
></div>

<div class="modal" role="dialog" aria-modal="true" aria-label={title} id="product-modal">
	<button id="product-modal-close" class="modal__close" type="button" onclick={onclose} aria-label="Cerrar">
		✕
	</button>

	<div class="modal__image">
		{#if images.length > 1}
			<Splide
				options={{
					rewind: true,
					arrows: false,
					focus: 'center',
					perMove: 1,
					perPage: 1,
					autoHeight: true,
					pagination: true
				}}
				aria-label={title}
			>
				{#each images as url}
					<SplideSlide>
						<img src={url} alt={title} />
					</SplideSlide>
				{/each}
			</Splide>
		{:else}
			<img src={images[0] ?? ''} alt={title} />
		{/if}
	</div>

	<div class="modal__body">
		<h1 class="text-xl font-semibold">{title}</h1>

		{#if data[1]?.[0]}
			<p class="font-bold">{data[1][0]}</p>
		{/if}

		<div class="[&>p]:inline-block">
			{#if data[2]?.[0]}<p>{data[2][0]}</p>{/if}
			{#if data[2]?.[1]}<p>{data[2][1]}</p>{/if}
		</div>

		{#if showPrices && data[3]?.[0]}
			<div class="[&>p]:inline-block">
				{#if data[3]?.[0]}<p>{data[3][0]}</p>{/if}
				{#if data[3]?.[1]}<p>{data[3][1]}</p>{/if}
			</div>
			<div class="[&>p]:inline-block">
				{#if data[4]?.[0]}<p>{data[4][0]}</p>{/if}
				{#if data[4]?.[1]}<p>{data[4][1]}</p>{/if}
			</div>
			<div class="[&>p]:inline-block">
				{#if data[5]?.[0]}<p>{data[5][0]}</p>{/if}
				{#if data[5]?.[1]}<p>{data[5][1]}</p>{/if}
			</div>

			<section class="mt-3">
				{#if data[6]?.[0]}<p class="font-bold">{data[6][0]}</p>{/if}
				{#if data[7]?.[0]}<p>{data[7][0]}</p>{/if}
				{#if data[8]?.[0]}<p>{data[8][0]}</p>{/if}
				{#if data[9]?.[0]}<p>{data[9][0]}</p>{/if}
				{#if data[10]?.[0]}<p>{data[10][0]}</p>{/if}
			</section>
		{/if}

		{#if showPrices}
			<button
				id="product-add-cart"
				type="button"
				class="modal__addcart"
				onclick={() => {
					addProduct(data);
					onclose();
				}}
			>
				Agregar al carrito
			</button>
		{/if}

		<a id="product-whatsapp-cta" class="modal__whatsapp" href={whatsappURL} target="_blank" rel="noopener">
			<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
				<path
					d="M12 2a10 10 0 0 0-8.53 15.23L2 22l4.9-1.42A10 10 0 1 0 12 2Zm5.4 14.2c-.23.65-1.34 1.24-1.85 1.28-.5.05-.97.24-3.26-.68-2.76-1.09-4.5-3.9-4.64-4.08-.13-.18-1.1-1.46-1.1-2.8 0-1.32.7-1.97.94-2.24.24-.27.53-.34.7-.34h.5c.17 0 .38-.06.6.46.22.53.76 1.85.82 1.98.07.14.11.3.02.48-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.14.13-.28.28-.12.55.16.27.7 1.16 1.51 1.88 1.04.92 1.91 1.21 2.18 1.35.27.13.43.11.58-.07.16-.18.67-.78.85-1.05.18-.27.35-.22.6-.13.24.09 1.55.73 1.82.86.27.14.44.2.51.32.06.11.06.65-.16 1.31Z"
				/>
			</svg>
			Consultar por WhatsApp
		</a>
	</div>
</div>

<style>
	.modalBackdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 300;
	}

	.modal {
		position: fixed;
		z-index: 301;
		background: white;
		color: rgb(39, 39, 39);
		overflow-y: auto;
		/* bottom-sheet on mobile */
		left: 0;
		right: 0;
		bottom: 0;
		max-height: 88dvh;
		border-radius: 1.25rem 1.25rem 0 0;
	}

	@media (min-width: 768px) {
		.modal {
			left: 50%;
			top: 50%;
			right: auto;
			bottom: auto;
			transform: translate(-50%, -50%);
			width: min(520px, 92vw);
			max-height: 88dvh;
			border-radius: 1.25rem;
		}
	}

	.modal__close {
		position: sticky;
		top: 10px;
		margin-left: calc(100% - 46px);
		z-index: 2;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.55);
		color: white;
		font-size: 1rem;
		line-height: 1;
	}

	.modal__image {
		margin-top: -46px;
	}
	.modal__image img {
		width: 100%;
		object-fit: contain;
		max-height: 45dvh;
	}

	.modal__body {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 12px 16px calc(16px + env(safe-area-inset-bottom));
	}

	.modal__addcart {
		margin-top: 14px;
		width: 100%;
		background-color: #171717;
		color: white;
		font-weight: 600;
		border-radius: 0.75rem;
		padding: 12px;
	}

	.modal__whatsapp {
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background-color: #25d366;
		color: white;
		font-weight: 600;
		border-radius: 0.75rem;
		padding: 12px;
	}

	:global(.splide__pagination__page) {
		background: #bbb;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		margin: 0 5px;
		transition: background 0.3s ease;
	}
	:global(.splide__pagination__page.is-active) {
		background: #0149ff;
		transform: scale(1.2);
	}
</style>
