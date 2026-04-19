/**
 * Génère l'URL de recherche Letterboxd pour un film
 * Format : https://letterboxd.com/search/{titre-slug}/
 */
export function getLetterboxdSearchUrl(title: string): string {
  // Nettoyer et slugifier le titre
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .replace(/-+/g, " ")
    .trim();

  return `https://letterboxd.com/search/${encodeURIComponent(slug)}/`;
}
