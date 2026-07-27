// PDF del pedido. pdfmake se carga dinámicamente para que no pese en el bundle inicial.

import { formatARS } from './catalog';
import { pdfFileName, type OrderSummary } from './order';

const GREY = '#6b7280';
const DARK = '#171717';

export async function downloadOrderPdf(o: OrderSummary): Promise<void> {
	const [{ default: pdfMake }, { default: vfs }, logoSvg] = await Promise.all([
		import('pdfmake/build/pdfmake'),
		import('pdfmake/build/vfs_fonts'),
		fetch('/tortu.svg')
			.then((r) => (r.ok ? r.text() : ''))
			.catch(() => '')
	]);
	pdfMake.addVirtualFileSystem(vfs);

	const body: any[] = [
		[
			{ text: 'Producto', style: 'th' },
			{ text: 'Cant.', style: 'th', alignment: 'right' },
			{ text: 'P. unitario', style: 'th', alignment: 'right' },
			{ text: 'Subtotal', style: 'th', alignment: 'right' }
		]
	];

	o.lines.forEach((l) => {
		body.push([
			{
				stack: [
					{ text: l.title, bold: true },
					...(l.priceLabel ? [{ text: l.priceLabel, style: 'meta' }] : []),
					...(l.notes ? [{ text: `Notas: ${l.notes}`, style: 'meta' }] : [])
				]
			},
			{ text: `${l.qty} u.`, alignment: 'right' },
			{ text: formatARS(l.unitPrice), alignment: 'right' },
			{ text: formatARS(l.lineTotal), alignment: 'right', bold: true }
		]);
	});

	const totals: any[] = [
		[
			{ text: 'Unidades totales', style: 'totalLabel' },
			{ text: `${o.totalUnits} u.`, style: 'totalValue' }
		],
		[
			{ text: 'Subtotal', style: 'totalLabel' },
			{ text: formatARS(o.subtotal), style: 'totalValue' }
		]
	];

	if (o.discount > 0) {
		totals.push([
			{
				text: `Descuento ${o.pct}% (aluminio/inox)`,
				style: 'totalLabel',
				color: '#16a34a'
			},
			{ text: `-${formatARS(o.discount)}`, style: 'totalValue', color: '#16a34a' }
		]);
	}

	totals.push([
		{ text: 'TOTAL', style: 'grandLabel' },
		{ text: formatARS(o.total), style: 'grandValue' }
	]);

	const docDefinition = {
		pageSize: 'A4',
		pageMargins: [36, 40, 36, 48],
		defaultStyle: { font: 'Roboto', fontSize: 10, color: DARK },
		content: [
			{
				columns: [
					...(logoSvg ? [{ svg: logoSvg, fit: [46, 60], width: 'auto' }] : []),
					{
						stack: [
							{ text: 'Pedido mayorista', style: 'title' },
							{ text: `Fecha: ${o.date}`, style: 'meta' }
						],
						alignment: 'right'
					}
				],
				margin: [0, 0, 0, 18]
			},
			{
				layout: 'lightHorizontalLines',
				table: { headerRows: 1, widths: ['*', 'auto', 'auto', 'auto'], body },
				margin: [0, 0, 0, 18]
			},
			{
				columns: [
					{ text: '', width: '*' },
					{
						width: 260,
						layout: 'noBorders',
						table: { widths: ['*', 'auto'], body: totals }
					}
				]
			}
		],
		styles: {
			title: { fontSize: 18, bold: true },
			th: { bold: true, fontSize: 9, color: GREY },
			meta: { fontSize: 8, color: GREY },
			totalLabel: { fontSize: 10, color: GREY },
			totalValue: { fontSize: 10, alignment: 'right' },
			grandLabel: { fontSize: 13, bold: true, margin: [0, 4, 0, 0] },
			grandValue: { fontSize: 13, bold: true, alignment: 'right', margin: [0, 4, 0, 0] }
		}
	};

	pdfMake.createPdf(docDefinition as any).download(pdfFileName(o));
}
