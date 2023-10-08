import { FALLBACK_URL_IMAGE } from "./constants";
import { Result } from "./types";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/upcoming`
  );

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
          {movie.poster_path || movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${
                movie.poster_path ?? movie.backdrop_path
              }`}
              width={200}
              height={300}
              className="w-52 h-72 object-cover rounded-md"
              alt={movie.title}
            />
          ) : (
            <img
              width={200}
              height={300}
              className="w-52 h-72 object-fill rounded-md"
              src={FALLBACK_URL_IMAGE}
              alt="No image for this movie found"
            />
          )}
          <div className="flex">
            <span className="font-semibold max-w-[200px] mt-2">
              {movie.title}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {new Date(movie.release_date).toLocaleDateString()}
          </span>
        </div>
      ))}
    </main>
  );
}
