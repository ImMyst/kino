import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import type { TUpcomingMovie } from "@/utils/types";

export function Movie({ movie }: { movie: TUpcomingMovie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
    : movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`
      : "";

  // Calculer si le film est nouveau (sortie dans les 7 prochains jours)
  const releaseDate = dayjs(movie.release_date);
  const today = dayjs();
  const daysDiff = releaseDate.diff(today, "day");
  const isNew = daysDiff >= 0 && daysDiff <= 7;

  return (
    <Link
      preload="intent"
      to="/movie/$movieId"
      params={{ movieId: movie.id.toString() }}
      className="group block"
    >
      <div className="flex flex-col gap-3 animate-fadeIn">
        {/* Container de l'affiche avec ratio fixe */}
        <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-neutral-800 shadow-md group-hover:shadow-xl transition-all duration-300">
          {/* Badge NEW */}
          {isNew && (
            <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg animate-pulse-glow">
              NEW
            </div>
          )}

          {/* Image de l'affiche */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-neutral-700 to-neutral-900 text-neutral-500">
              <span className="text-4xl">🎬</span>
            </div>
          )}

          {/* Overlay au survol avec informations */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            {movie.director && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-400">Réalisé par</span>
                <span className="text-sm font-semibold text-white">
                  {movie.director}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Informations sous l'affiche */}
        <div className="flex flex-col gap-1 px-1">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-tight group-hover:text-orange-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-neutral-400">
            {dayjs(movie.release_date).format("D MMM YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
}
