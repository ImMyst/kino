import { Result } from "./types";

export async function getUpcomingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1&region=FR`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = (await res.json()) as Result;

  return Response.json(data);
}
