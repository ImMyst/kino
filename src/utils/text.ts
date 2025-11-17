import type { TMovie } from "./types";

const normalizeTitleForURL = (title: string): string => {
  return encodeURIComponent(
    title
      .toLowerCase()
      // Remove special characters
      .replace(/[:&'".?!,()]/g, "")
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove multiple hyphens
      .replace(/-+/g, "-")
      // Trim hyphens
      .replace(/^-+|-+$/g, ""),
  );
};

export const getLetterboxdLink = (movie: TMovie): string => {
  const title = movie.original_title;

  // Use the English or romanized title if available
  const slug = normalizeTitleForURL(title);

  // Use the release year if available
  const year = new Date(movie.release_date).getFullYear();

  return `https://letterboxd.com/film/${slug}`;
};
