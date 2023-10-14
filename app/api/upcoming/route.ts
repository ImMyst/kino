import { TMDB_API_URL } from "@app/constants";
import { type UpcomingMoviesResult } from "@app/types";
import ky from "ky";

export async function GET() {
  try {
    const res = await ky(
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
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur" });
  }
}
