// Shared order summary used by both the WhatsApp message and the PDF.

import { formatARS, discountPctFor, type Tier } from './catalog';
import type { CartItem } from './cart.svelte';

export interface OrderLine {
	title: string;
	qty: number;
	unitPrice: number;
	priceLabel: string;
	lineTotal: number;
	notes: string;
	eligible: boolean;
}

export interface OrderSummary {
	lines: OrderLine[];
	totalUnits: number;
	eligibleSubtotal: number;
	subtotal: number;
	pct: number;
	discount: number;
	total: number;
	date: string;
}

export function buildOrder(items: CartItem[], tiers: Tier[]): OrderSummary {
	const lines: OrderLine[] = items.map((i) => ({
		title: i.title.trim(),
		qty: i.qty,
		unitPrice: i.unitPrice,
		priceLabel: i.priceLabel,
		lineTotal: i.qty * i.unitPrice,
		notes: i.notes.trim(),
		eligible: i.eligible
	}));

	const eligibleSubtotal = lines
		.filter((l) => l.eligible)
		.reduce((a, l) => a + l.lineTotal, 0);
	const subtotal = lines.reduce((a, l) => a + l.lineTotal, 0);
	const pct = discountPctFor(eligibleSubtotal, tiers);
	const discount = Math.round((eligibleSubtotal * pct) / 100);

	return {
		lines,
		totalUnits: lines.reduce((a, l) => a + l.qty, 0),
		eligibleSubtotal,
		subtotal,
		pct,
		discount,
		total: subtotal - discount,
		date: new Intl.DateTimeFormat('es-AR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(new Date())
	};
}

// Plain-text order, formatted so the owner can read it straight off WhatsApp.
export function orderToText(o: OrderSummary): string {
	const parts: string[] = ['*PEDIDO MAYORISTA — Tortu*', `Fecha: ${o.date}`, ''];

	o.lines.forEach((l, idx) => {
		parts.push(`*${idx + 1}. ${l.title}*`);
		parts.push(`   Cantidad: ${l.qty} u.`);
		parts.push(
			`   Precio unitario: ${formatARS(l.unitPrice)}${l.priceLabel ? ` (${l.priceLabel})` : ''}`
		);
		parts.push(`   Subtotal: ${formatARS(l.lineTotal)}`);
		if (l.notes) parts.push(`   Notas: ${l.notes}`);
		parts.push('');
	});

	parts.push('———————————————');
	parts.push(`Unidades totales: ${o.totalUnits}`);
	parts.push(`Subtotal: ${formatARS(o.subtotal)}`);
	if (o.discount > 0) {
		parts.push(`Descuento ${o.pct}% (aluminio/inox): -${formatARS(o.discount)}`);
		parts.push(`   aplicado sobre ${formatARS(o.eligibleSubtotal)}`);
	}
	parts.push(`*TOTAL: ${formatARS(o.total)}*`);

	return parts.join('\n');
}

export function pdfFileName(o: OrderSummary): string {
	return `pedido-tortu-${o.date.replace(/\//g, '-')}.pdf`;
}
