import MovieCard from "@app/components/MovieCard";
import ReturnButton from "@app/components/ReturnButton";
import type { MovieDetail } from "@app/types/types";
import { getMovieDetail } from "@app/utils/endpoints";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await getMovieDetail({ movieId: params.id });
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
