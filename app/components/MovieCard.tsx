import Badge from "@app/components/Badge";
import { FALLBACK_URL_IMAGE } from "@app/types/constants";
import { type Movie, type UpcomingMovie } from "@app/types/types";
import { cn } from "@app/utils/cn";
import { convertMinutesToHoursAndMinutes } from "@app/utils/functions";
import { Link } from "@remix-run/react";

export default function MovieCard({
  movie,
  isDetail = false,
}: {
  movie: UpcomingMovie | Movie;
  isDetail?: boolean;
}) {
  const directors = isDetail
    ? (movie as Movie).crew?.filter((c) => c.job === "Director")
    : undefined;

  const actors = isDetail
    ? (movie as Movie).cast.sort((a, b) => a.order - b.order).slice(0, 7)
    : undefined;

  return (
    <Link prefetch="intent" to={`/movie/${movie.id}`}>
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
              className={cn("object-cover cover rounded-lg min-w-full", {
                "w-52 h-64": !isDetail,
                "w-80 h-96": isDetail,
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
          {directors?.length && (
            <div className="text-center mt-2">
              <span className="font-semibold">De:</span>
              {directors.map((director) => (
                <span key={director.id} className="ml-1.5">
                  {director.name}
                </span>
              ))}
            </div>
          )}
          {actors?.length && (
            <div className="flex flex-wrap max-w-xs text-center justify-center mt-3">
              <span className="font-semibold mr-1.5">Avec:</span>
              {actors.map((actor, index) => (
                <span key={actor.id}>
                  {actor.name}
                  {index !== actors.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </section>
        {isDetail && (
          <div className="flex max-w-xs mt-4 gap-2 self-center justify-center flex-wrap">
            {(movie as Movie).genres.map((genre) => (
              <Badge key={genre.id}>{genre.name}</Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
