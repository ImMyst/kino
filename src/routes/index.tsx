import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Movie } from "@/components/Movie";
import { moviesQueryOptions } from "@/utils/movies";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(moviesQueryOptions());
  },
});

function App() {
  const movies = useSuspenseQuery(moviesQueryOptions());

  return (
    <div className="flex flex-wrap gap-8 justify-center w-full">
      {movies.data.results.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
