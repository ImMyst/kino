import MovieCard from "@app/components/MovieCard";
import ReturnButton from "@app/components/ReturnButton";
import { TMDB_API_URL } from "@app/constants";
import type { MovieDetail } from "@app/types";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(`${TMDB_API_URL}/movie/${params.id}?language=fr-FR`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const movie: MovieDetail = await res.json();
  return json({ movie });
}

export default function MovieDetail() {
  const { movie } = useLoaderData<typeof loader>();

  return (
    <main className="relative flex flex-col items-center justify-center gap-10 p-12 max-w-screen-lg mx-auto">
      <ReturnButton to="/">{"<"}</ReturnButton>
      <MovieCard {...movie} />
      <span>{movie.overview}</span>
    </main>
  );
}
