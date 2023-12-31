import { TMDB_API_URL } from "@app/types/constants";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

export async function getUpcomingMovieList() {
  return await fetch(
    `${TMDB_API_URL}/movie/upcoming?page=1&language=fr-FR&region=FR`,
    {
      method: "GET",
      headers,
    }
  );
}

export async function getMovieDetailCredit({ movieId }: { movieId?: string }) {
  return await fetch(
    `${TMDB_API_URL}/movie/${movieId}/credits?language=fr-FR`,
    {
      method: "GET",
      headers,
    }
  );
}

export async function getMovieDetail({ movieId }: { movieId?: string }) {
  return await fetch(`${TMDB_API_URL}/movie/${movieId}?language=fr-FR`, {
    method: "GET",
    headers,
  });
}
