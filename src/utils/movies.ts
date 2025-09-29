import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { TMDB_API_URL } from "@/utils/constants";
import { queryKeys } from "@/utils/query-keys";
import type { TUpcomingMoviesResult } from "@/utils/types";

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

  const movies = json.results.sort(
    (a, b) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
  );

  return {
    ...json,
    results: movies,
  };
});

export const moviesQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.movies.list(),
    queryFn: fetchMovies,
  });
};
