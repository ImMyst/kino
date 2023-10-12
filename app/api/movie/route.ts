import { TMDB_API_URL } from "../../constants";

export async function GET({ id }: { id: string }) {
  const res = await fetch(`${TMDB_API_URL}/movie/${id}?language=fr-FR`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json(data);
}
