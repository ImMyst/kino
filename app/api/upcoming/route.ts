import { TMDB_API_URL } from "@app/constants";
import { type UpcomingMoviesResult } from "@app/types";

export async function GET() {
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
  const movies = (await res.json()) as UpcomingMoviesResult;

  return Response.json({ movies }, { status: 200 });
}
