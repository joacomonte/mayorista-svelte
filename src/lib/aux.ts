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
