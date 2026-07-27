import { extractPrice, extractMinQty, isDiscountEligible } from './catalog';
import { splitImagesURL } from './aux';

export interface CartItem {
	id: string;
	title: string;
	image: string;
	unitPrice: number;
	priceLabel: string;
	minQty: number;
	eligible: boolean;
	qty: number;
	notes: string;
}

export const cart = $state<{ items: CartItem[] }>({ items: [] });

export function findItem(id: string): CartItem | undefined {
	return cart.items.find((i) => i.id === id);
}

export function addProduct(data: any): void {
	const title = (data?.[0]?.[0] ?? '').toString().trim();
	if (!title) return;

	const existing = findItem(title);
	if (existing) {
		existing.qty += existing.minQty;
		return;
	}

	const price = extractPrice(data);
	const minQty = extractMinQty(data);
	cart.items.push({
		id: title,
		title,
		image: splitImagesURL(data?.[11]?.[0] ?? '')[0] ?? '',
		unitPrice: price?.value ?? 0,
		priceLabel: price?.label ?? '',
		minQty,
		eligible: isDiscountEligible(data),
		qty: minQty,
		notes: ''
	});
}

export function setQty(id: string, qty: number): void {
	const item = findItem(id);
	if (!item) return;
	item.qty = Math.max(item.minQty, Math.round(qty || item.minQty));
}

export function setNotes(id: string, notes: string): void {
	const item = findItem(id);
	if (item) item.notes = notes;
}

export function removeItem(id: string): void {
	const idx = cart.items.findIndex((i) => i.id === id);
	if (idx !== -1) cart.items.splice(idx, 1);
}

export function clearCart(): void {
	cart.items.splice(0, cart.items.length);
}
