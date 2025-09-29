export const queryKeys = {
  movies: {
    list: () => ["movies", "list"],
    detail: (id: string) => ["movies", "detail", id],
  },
} as const;
