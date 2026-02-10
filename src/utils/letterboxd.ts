/**
 * Génère l'URL de recherche Letterboxd pour un film
 * Format : https://letterboxd.com/search/{titre-slug}/
 */
export function getLetterboxdSearchUrl(title: string, year?: number): string {
  // Nettoyer et slugifier le titre
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  const searchTerm = year ? `${slug} ${year}` : slug;

  return `https://letterboxd.com/search/${encodeURIComponent(searchTerm)}/`;
}
