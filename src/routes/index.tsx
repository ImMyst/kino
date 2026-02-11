import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { EmptyWeek } from "@/components/EmptyWeek";
import { Movie } from "@/components/Movie";
import { WeekNavigator } from "@/components/WeekNavigator";
import {
  canNavigateNext,
  canNavigatePrevious,
  formatWeekRange,
  getCurrentWeekStart,
  getNextWeek,
  getPreviousWeek,
  getWeekEnd,
  parseISODate,
  toISODate,
} from "@/utils/dates";
import { moviesByWeekQueryOptions } from "@/utils/movies";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { week?: string } => {
    return {
      week: typeof search.week === "string" ? search.week : undefined,
    };
  },
  component: App,
  loaderDeps: ({ search }) => ({ week: search.week }),
  loader: async ({ context, deps }) => {
    // Déterminer la semaine à afficher (query param ou semaine courante)
    const weekStart = deps.week ? deps.week : toISODate(getCurrentWeekStart());

    // Charger les données de la semaine
    await context.queryClient.ensureQueryData(
      moviesByWeekQueryOptions(weekStart),
    );

    // Précharger les semaines adjacentes pour une navigation fluide
    const weekStartDate = parseISODate(weekStart);

    if (canNavigatePrevious(weekStartDate)) {
      const prevWeek = toISODate(getPreviousWeek(weekStartDate));
      context.queryClient.prefetchQuery(moviesByWeekQueryOptions(prevWeek));
    }

    if (canNavigateNext(weekStartDate)) {
      const nextWeek = toISODate(getNextWeek(weekStartDate));
      context.queryClient.prefetchQuery(moviesByWeekQueryOptions(nextWeek));
    }
  },
});

function App() {
  const navigate = useNavigate();
  const search = Route.useSearch();

  // Déterminer la semaine affichée
  const weekStart = search.week
    ? parseISODate(search.week)
    : getCurrentWeekStart();

  const movies = useSuspenseQuery(
    moviesByWeekQueryOptions(toISODate(weekStart)),
  );

  // Mettre à jour le titre de la page
  useEffect(() => {
    const weekEnd = getWeekEnd(weekStart);
    const formattedWeek = formatWeekRange(weekStart, weekEnd);
    document.title = `Kino - Semaine du ${formattedWeek}`;
  }, [weekStart]);

  const handleWeekChange = (newWeekStart: Date) => {
    navigate({
      to: "/",
      search: { week: toISODate(newWeekStart) },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex flex-col gap-6 animate-scaleUp">
        <h1 className="text-4xl md:text-5xl md:text-left text-center font-bold text-neutral-900 dark:text-neutral-100">
          Sorties cinéma
        </h1>

        <WeekNavigator
          currentWeekStart={weekStart}
          onNavigate={handleWeekChange}
        />

        <p className="text-neutral-500 text-sm">
          {movies.data.results.length} film
          {movies.data.results.length > 1 ? "s" : ""} cette semaine
        </p>
      </div>

      {movies.data.results.length === 0 ? (
        <EmptyWeek weekStart={weekStart} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.data.results.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
