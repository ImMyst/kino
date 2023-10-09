import { TMDB_API_URL } from "../constants";
import { UpcomingMoviesResult } from "../types";

export async function getUpcomingMovies() {
  const res = await fetch(
    `${TMDB_API_URL}/movie/upcoming?language=fr-FR&page=1&region=FR`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = (await res.json()) as UpcomingMoviesResult;

  return Response.json(data);
}
