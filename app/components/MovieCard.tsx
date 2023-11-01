import Badge from "@app/components/Badge";
import { FALLBACK_URL_IMAGE } from "@app/types/constants";
import { type MovieDetail, type UpcomingMovie } from "@app/types/types";
import { cn } from "@app/utils/cn";
import { convertMinutesToHoursAndMinutes } from "@app/utils/functions";
import { Link } from "@remix-run/react";

export default function MovieCard(movie: UpcomingMovie | MovieDetail) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        key={movie.id}
        className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm rounded-xl"
      >
        <section className="flex justify-center text-center items-center flex-col">
          <div className="relative">
            <img
              src={
                movie.poster_path || movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${
                      movie.poster_path ?? movie.backdrop_path
                    }`
                  : FALLBACK_URL_IMAGE
              }
              className={cn("object-contain rounded-lg min-w-full", {
                "w-52": "genre_ids" in movie,
                "w-64": "genres" in movie,
              })}
              alt={
                movie.poster_path || movie.backdrop_path
                  ? movie.title
                  : "No image for this movie found"
              }
            />
            {"runtime" in movie && (
              <Badge variant="blurred" className="absolute top-2 right-2">
                {convertMinutesToHoursAndMinutes(movie.runtime)}
              </Badge>
            )}
          </div>

          <span className="font-semibold max-w-[200px] mt-2">
            {movie.title}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(movie.release_date).toLocaleDateString("fr-FR")}
          </span>
        </section>
        {"genres" in movie && (
          <div className="flex max-w-xs mt-4 gap-2 justify-center flex-wrap">
            {movie.genres.map((genre) => (
              <Badge key={genre.id}>{genre.name}</Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
