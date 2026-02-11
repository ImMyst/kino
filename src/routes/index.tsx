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

  const dates = movies.data.dates;
  const minDate = new Date(dates.minimum).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
  const maxDate = new Date(dates.maximum).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex flex-col gap-2 animate-scaleUp">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
          Sorties cinéma à venir
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-neutral-400 text-sm md:text-base">
            Du <span className="text-orange-400 font-medium">{minDate}</span> au{" "}
            <span className="text-orange-400 font-medium">{maxDate}</span>
          </p>
          <p className="text-neutral-500 text-sm">
            {movies.data.results.length} films
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.data.results.map((movie) => (
          <Movie movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
