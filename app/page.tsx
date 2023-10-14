import MovieCard from "@app/components/MovieCard";
import { type UpcomingMoviesResult } from "@app/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upcoming`, {
    cache: "no-store",
  });

  const data = (await response.json()) as UpcomingMoviesResult;
  const sortedMovies = data.results.sort((a, b) => {
    const releaseDateA = Date.parse(a.release_date);
    const releaseDateB = Date.parse(b.release_date);
    return releaseDateA - releaseDateB;
  });

  return (
    <main className="flex flex-wrap justify-center gap-10 p-12">
      {sortedMovies.map((movie) => (
        <MovieCard {...movie} key={movie.id} />
      ))}
    </main>
  );
}
