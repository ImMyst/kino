import type { TUpcomingMovie } from "@/utils/types";

export function Movie({ movie }: { movie: TUpcomingMovie }) {
  return (
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
      />
      <h3 className="text-wrap text-2xl">{movie.title}</h3>
      <p className="truncate">{movie.overview}</p>
      <span>{new Date(movie.release_date).toLocaleDateString("fr-FR")}</span>
    </div>
  );
}
