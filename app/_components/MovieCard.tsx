import { FALLBACK_URL_IMAGE } from "@app/constants";
import { type UpcomingMovie } from "@app/types";

export default function MovieCard(movie: UpcomingMovie) {
  return (
    <div
      key={movie.id}
      className="flex flex-col p-2 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors shadow-sm rounded-md"
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
      <span className="font-semibold max-w-[200px] mt-2">{movie.title}</span>
      <span className="text-sm text-gray-500">
        {new Date(movie.release_date).toLocaleDateString("fr-FR")}
      </span>
    </div>
  );
}
