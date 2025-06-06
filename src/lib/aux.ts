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

export function scrollIntoView(id: any) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
}


interface MenuItem {cardNumber: number; bgcolor: string; title: string;}

export let menuItems: MenuItem[] = [
  { cardNumber: 0, bgcolor: '#F2C819', title: 'Sorbetes Reutilizables' },
  { cardNumber: 4, bgcolor: '#FF8734', title: 'Bombillas de mate' },
  { cardNumber: 6, bgcolor: '#E74741', title: 'Mates' },
  { cardNumber: 9, bgcolor: '#FF8AC5', title: 'Botellas y Vasos' },
  { cardNumber: 13, bgcolor: '#ED12ED', title: 'Estuche y Limpiador' },
  { cardNumber: 15, bgcolor: '#0AB8F8', title: 'Exhibidores' },
  { cardNumber: 18, bgcolor: '#85BD6B', title: 'Personalizados' }
];