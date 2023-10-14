import { type MovieDetail } from "@app/types";
import MovieCard from "@components/MovieCard";
import Link from "next/link";

export default async function MovieDetail({
  params,
}: {
  params: { id: number };
}) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/movie/${params.id}`,
    {
      cache: "no-cache",
    }
  );

  const movie = (await response.json()) as MovieDetail;
  return (
    <main className="flex flex-wrap justify-center gap-10 p-12 max-w-screen-lg mx-auto">
      <MovieCard {...movie} />
      <p>{movie.overview}</p>
    </main>
  );
}
