// Parsing helpers for the Google Sheets product chunks.

export function cleanLabel(s: string): string {
	return (s ?? '').toString().replace(/[-\s]+$/, '').trim();
}

export function parsePrice(raw: any): number | null {
	if (!raw) return null;
	const m = String(raw).match(/\$\s*([\d.]+(?:,\d+)?)/);
	if (!m) return null;
	const num = m[1].replace(/\./g, '').replace(',', '.');
	const n = parseFloat(num);
	return isNaN(n) ? null : n;
}

export function formatARS(n: number): string {
	return new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		minimumFractionDigits: 0,
		maximumFractionDigits: n % 1 === 0 ? 0 : 2
	}).format(n);
}

// First price-looking value, scanning rows 3..10 (col1 first, then col0),
// plus the label that precedes it.
export function extractPrice(data: any): { value: number; label: string } | null {
	for (let r = 3; r <= 10; r++) {
		const row = data?.[r];
		if (!row) continue;
		for (const ci of [1, 0]) {
			const p = parsePrice(row[ci]);
			if (p != null) {
				const label = ci === 1 ? cleanLabel(row[0]) : '';
				return { value: p, label };
			}
		}
	}
	return null;
}

export function extractMinQty(data: any): number {
	const sub = (data?.[1]?.[0] ?? '').toString();
	const m = sub.match(/(\d+)\s*unidad/i);
	return m ? parseInt(m[1], 10) : 1;
}

export function isDiscountEligible(data: any): boolean {
	return (data ?? []).some((row: any[]) =>
		(row?.[0] ?? '').toString().includes('Descuento por monto')
	);
}

export interface Tier {
	threshold: number;
	pct: number;
}

export function parseTiers(chunks: any[]): Tier[] {
	for (const chunk of chunks ?? []) {
		const tiers: Tier[] = [];
		for (const row of chunk ?? []) {
			const m = (row?.[0] ?? '')
				.toString()
				.match(/Superando los \$([\d.]+)\s*=\s*(\d+)\s*%/i);
			if (m) tiers.push({ threshold: parseFloat(m[1].replace(/\./g, '')), pct: parseInt(m[2], 10) });
		}
		if (tiers.length) return tiers.sort((a, b) => a.threshold - b.threshold);
	}
	return [];
}

// Highest applicable discount % for a given eligible subtotal.
export function discountPctFor(subtotal: number, tiers: Tier[]): number {
	let pct = 0;
	for (const t of tiers) if (subtotal >= t.threshold) pct = t.pct;
	return pct;
}
