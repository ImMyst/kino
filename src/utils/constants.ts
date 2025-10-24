export const TMDB_API_URL = "https://api.themoviedb.org/3";

export const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};
