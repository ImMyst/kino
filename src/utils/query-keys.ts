export const queryKeys = {
  movies: {
    list: () => ["movies", "list"],
    detail: (id: string) => ["movies", "detail", id],
    cast: (id: string) => ["movies", "cast", id],
  },
} as const;
