import MovieCard from "@app/components/MovieCard";
import { type MovieDetail } from "@app/types";

export const dynamic = "force-dynamic";

export default async function MovieDetail({
  params,
}: {
  params: { id: number };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/movie/${params.id}`,
    {
      cache: "no-store",
    }
  );

  const movie = (await response.json()) as MovieDetail;
  return (
    <main className="flex flex-wrap justify-center gap-10 p-12 max-w-screen-lg mx-auto">
      <MovieCard {...movie} />
      <p>{movie?.overview}</p>
    </main>
  );
}
