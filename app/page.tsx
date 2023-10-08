import { FALLBACK_URL_IMAGE } from "./constants";
import { getUpcomingMovies } from "./get-upcoming-movies";
import { Result } from "./types";

export default async function Home() {
  const response = await getUpcomingMovies();

  const data = (await response.json()) as Result;
  const sortedMovies = data.results.sort((a, b) => {
    const releaseDateA = Date.parse(a.release_date);
    const releaseDateB = Date.parse(b.release_date);
    return releaseDateA - releaseDateB;
  });

  return (
    <main className="flex flex-wrap justify-center gap-10 p-12">
      {sortedMovies.map((movie) => (
        <div
          className="flex flex-col p-2 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors shadow-sm rounded-md"
          key={movie.id}
        >
          <img
            src={
              movie.poster_path || movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${
                    movie.poster_path ?? movie.backdrop_path
                  }`
                : FALLBACK_URL_IMAGE
            }
            width={200}
            height={300}
            className="w-52 h-72 object-cover rounded-md"
            alt={
              movie.poster_path || movie.backdrop_path
                ? movie.title
                : "No image for this movie found"
            }
          />
          <span className="font-semibold max-w-[200px] mt-2">
            {movie.title}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(movie.release_date).toLocaleDateString()}
          </span>
        </div>
      ))}
    </main>
  );
}
