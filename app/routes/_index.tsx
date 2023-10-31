import MovieCard from "@app/components/MovieCard";
import { UpcomingMoviesResult } from "@app/types/types";
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
    <main className="flex flex-wrap justify-center gap-10 p-12">
      {sortedMovies.map((movie) => (
        <MovieCard {...movie} key={movie.id} />
      ))}
    </main>
  );
}
