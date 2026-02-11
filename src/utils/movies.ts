import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { TMDB_API_URL } from "@/utils/constants";
import { getWeekEnd, toISODate } from "@/utils/dates";
import { queryKeys } from "@/utils/query-keys";
import type { TMovie, TUpcomingMoviesResult } from "@/utils/types";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchMovies = createServerFn().handler(async () => {
  const response = await fetch(
    `${TMDB_API_URL}/movie/upcoming?page=1&language=fr-FR&region=FR`,
    {
      method: "GET",
      headers,
    },
  );

  const json = (await response.json()) as TUpcomingMoviesResult;

  // Récupérer le réalisateur pour chaque film
  const moviesWithDirector = await Promise.all(
    json.results.map(async (movie) => {
      try {
        const creditsResponse = await fetch(
          `${TMDB_API_URL}/movie/${movie.id}/credits?language=fr-FR`,
          {
            method: "GET",
            headers,
          },
        );
        const credits = (await creditsResponse.json()) as {
          crew: { job: string; name: string }[];
        };
        const director = credits.crew.find(
          (member) => member.job === "Director",
        );

        return {
          ...movie,
          director: director?.name || null,
        };
      } catch {
        return {
          ...movie,
          director: null,
        };
      }
    }),
  );

  const movies = moviesWithDirector.sort(
    (a, b) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
  );

  return {
    ...json,
    results: movies,
  };
});

export const fetchMoviesByWeek = createServerFn()
  .inputValidator((data: { weekStart: string }) => data)
  .handler(async ({ data: { weekStart } }) => {
    const startDate = new Date(weekStart);
    const endDate = getWeekEnd(startDate);

    // Utiliser l'endpoint discover pour filtrer par date de sortie exacte
    // Cela fonctionne mieux que upcoming pour des semaines spécifiques
    const startDateStr = toISODate(startDate);
    const endDateStr = toISODate(endDate);

    const url = new URL(`${TMDB_API_URL}/discover/movie`);
    url.searchParams.set("language", "fr-FR");
    url.searchParams.set("region", "FR");
    url.searchParams.set("with_release_type", "2|3"); // 2=Theatrical limited, 3=Theatrical
    url.searchParams.set("release_date.gte", startDateStr);
    url.searchParams.set("release_date.lte", endDateStr);
    url.searchParams.set("sort_by", "release_date.asc");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
    });

    const json = (await response.json()) as TUpcomingMoviesResult;

    const filteredResults = json.results;

    // Récupérer le réalisateur pour chaque film
    const moviesWithDirector = await Promise.all(
      filteredResults.map(async (movie) => {
        try {
          const creditsResponse = await fetch(
            `${TMDB_API_URL}/movie/${movie.id}/credits?language=fr-FR`,
            {
              method: "GET",
              headers,
            },
          );
          const credits = (await creditsResponse.json()) as {
            crew: { job: string; name: string }[];
          };
          const director = credits.crew.find(
            (member) => member.job === "Director",
          );

          return {
            ...movie,
            director: director?.name || null,
          };
        } catch {
          return {
            ...movie,
            director: null,
          };
        }
      }),
    );

    const movies = moviesWithDirector.sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
    );

    return {
      ...json,
      results: movies,
    };
  });

export const getMovieDetail = createServerFn()
  .inputValidator((data: { movieId: string }) => data)
  .handler(async ({ data: { movieId } }) => {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${movieId}?language=fr-FR`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching movie detail: ${response.statusText}`);
    }

    const json = (await response.json()) as TMovie;
    return json;
  });

export const getMovieCredits = createServerFn()
  .inputValidator((data: { movieId: string }) => data)
  .handler(async ({ data: { movieId } }) => {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${movieId}/credits?language=fr-FR`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching movie credits: ${response.statusText}`);
    }

    const json = (await response.json()) as TMovie;
    return json;
  });

export const moviesQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.movies.list(),
    queryFn: fetchMovies,
  });
};

export const moviesByWeekQueryOptions = (weekStart: string) => {
  return queryOptions({
    queryKey: queryKeys.movies.byWeek(weekStart),
    queryFn: () => fetchMoviesByWeek({ data: { weekStart } }),
  });
};

export const movieDetailQueryOptions = ({ movieId }: { movieId: string }) => {
  return queryOptions({
    queryKey: queryKeys.movies.detail(movieId),
    queryFn: () => getMovieDetail({ data: { movieId } }),
  });
};

export const movieCastQueryOptions = ({ movieId }: { movieId: string }) => {
  return queryOptions({
    queryKey: queryKeys.movies.cast(movieId),
    queryFn: () => getMovieCredits({ data: { movieId } }),
  });
};
