import MovieCard from "@app/components/MovieCard";
import { TMDB_API_URL } from "@app/constants";
import { UpcomingMoviesResult } from "@app/types";
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
  const res = await fetch(
    `${TMDB_API_URL}/movie/upcoming?language=fr-FR&page=1&region=FR`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
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
