import MovieCard from "@app/components/MovieCard";
import type { UpcomingMoviesResult } from "@app/types/types";
import { cn } from "@app/utils/cn";
import { getUpcomingMovieList } from "@app/utils/endpoints";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Kino" },
    {
      name: "description",
      content: "Kino is a small site to follow cinema releases in France",
    },
  ];
};

export async function loader() {
  const res = await getUpcomingMovieList();
  const movies: UpcomingMoviesResult = await res.json();
  return json({ movies });
}

export default function Index() {
  const { movies } = useLoaderData<typeof loader>();

  const sortedMovies = movies.results.sort((a, b) => {
    const releaseDateA = Date.parse(a.release_date);
    const releaseDateB = Date.parse(b.release_date);
    return releaseDateA - releaseDateB;
  });

  return (
    <main
      className={cn("flex flex-wrap justify-center gap-10 p-12", {
        "h-screen": sortedMovies.length <= 0,
      })}
    >
      {sortedMovies.length ? (
        sortedMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
      ) : (
        <span className="flex items-center font-semibold text-center text-2xl justify-center">
          Pas de films disponibles pour le moment
        </span>
      )}
    </main>
  );
}
