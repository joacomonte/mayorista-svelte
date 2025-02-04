export function generateChunks(values: any) {
	const chunks = [];
	if (values && values.length > 0) {
		for (let i = 0; i < values.length; i += 15) {
			const chunk = values.slice(i, i + 15); // Fixed range to slice
			if (chunk.length === 15) {
				// Check if the chunk has 15 items
				chunks.push(chunk);
			}
		}
	}
	return chunks;
}

export function splitImagesURL(urlString: string) {
	if (!urlString) return [];
	return urlString.split(',').map((url) => url.trim());
}


interface MenuItem {cardNumber: number; bgcolor: string; title: string;}

export let menuItems: MenuItem[] = [
  { cardNumber: 0, bgcolor: '#F2C819', title: 'Sorbetes de colores - Alumino anodizado' },
  { cardNumber: 1, bgcolor: '#FF8734', title: 'Sorbetes de acero inoxidable' },
  { cardNumber: 3, bgcolor: '#E74741', title: 'Bombillas de mate' },
  { cardNumber: 4, bgcolor: '#ED12ED', title: 'Mates' },
  { cardNumber: 6, bgcolor: '#FF8AC5', title: 'Botellas y Vasos' },
  { cardNumber: 7, bgcolor: '#1A4BB2', title: 'Estuche y Limpiador' },
  { cardNumber: 8, bgcolor: '#0AB8F8', title: 'Exhibidores' },
  { cardNumber: 9, bgcolor: '#85BD6B', title: 'Personalizados' }
];