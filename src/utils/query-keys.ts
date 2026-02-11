export const queryKeys = {
  movies: {
    all: () => ["movies"] as const,
    list: () => [...queryKeys.movies.all(), "list"] as const,
    byWeek: (week: string) =>
      [...queryKeys.movies.all(), "week", week] as const,
    detail: (id: string) => [...queryKeys.movies.all(), "detail", id] as const,
    cast: (id: string) => [...queryKeys.movies.all(), "cast", id] as const,
  },
} as const;
