import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { TMDB_API_URL } from "@/utils/constants";
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

  const movies = json.results.sort(
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

export const moviesQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.movies.list(),
    queryFn: fetchMovies,
  });
};

export const movieDetailQueryOptions = ({ movieId }: { movieId: string }) => {
  return queryOptions({
    queryKey: queryKeys.movies.detail(movieId),
    queryFn: () => getMovieDetail({ data: { movieId } }),
  });
};
