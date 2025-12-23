import { Link } from "@tanstack/react-router";
import type { TUpcomingMovie } from "@/utils/types";

export function Movie({ movie }: { movie: TUpcomingMovie }) {
  return (
    <Link
      preload="intent"
      to="/movie/$movieId"
      className="hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md transition-transform"
      params={{ movieId: movie.id.toString() }}
    >
      <div className="w-[250px] flex flex-col gap-2">
        <div className="flex flex-col gap-2">
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
          <h3 className="text-wrap leading-7 text-2xl">{movie.title}</h3>
          <div className="flex justify-between items-center">
            <span>
              {new Date(movie.release_date).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
