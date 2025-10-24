import { Link } from "@tanstack/react-router";
import type { TUpcomingMovie } from "@/utils/types";

export function Movie({ movie }: { movie: TUpcomingMovie }) {
  return (
    <Link
      preload="intent"
      to="/movie/$movieId"
      params={{ movieId: movie.id.toString() }}
    >
      <div className="w-[250px] gap-2">
        <img
          src={
            movie.poster_path || movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${
                  movie.poster_path ?? movie.backdrop_path
                }`
              : ""
          }
          alt=""
          width={250}
        />
        <h3 className="text-wrap text-2xl">{movie.title}</h3>
        <p className="truncate">{movie.overview}</p>
        <span>{new Date(movie.release_date).toLocaleDateString("fr-FR")}</span>
      </div>
    </Link>
  );
}
