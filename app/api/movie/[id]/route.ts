import { TMDB_API_URL } from "@app/constants";
import { type MovieDetail } from "@app/types";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (params.id) {
    const res = await fetch(
      `${TMDB_API_URL}/movie/${params.id}?language=fr-FR`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const movie = (await res.json()) as MovieDetail;

    return Response.json({ movie }, { status: 200 });
  }
}
