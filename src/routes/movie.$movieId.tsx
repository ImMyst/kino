import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect } from "react";

import { CastCard } from "@/components/CastCard";
import {
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  LanguageIcon,
  MovieBadge,
} from "@/components/MovieBadge";
import { getLetterboxdSearchUrl } from "@/utils/letterboxd";
import {
  movieCastQueryOptions,
  movieDetailQueryOptions,
} from "../utils/movies";

export const Route = createFileRoute("/movie/$movieId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      movieDetailQueryOptions({ movieId: params.movieId }),
    );

    await context.queryClient.ensureQueryData(
      movieCastQueryOptions({ movieId: params.movieId }),
    );
  },
});

function RouteComponent() {
  const params = Route.useParams();

  const { data: movie } = useSuspenseQuery(
    movieDetailQueryOptions({ movieId: params.movieId }),
  );

  const { data: cast } = useSuspenseQuery(
    movieCastQueryOptions({ movieId: params.movieId }),
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Mettre à jour le titre de la page
    document.title = `Kino - ${movie.title}`;
  }, [movie.title]);

  const director = cast.crew.find((crew) => crew.job === "Director");
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`
    : "";
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
    : "";

  // Générer l'URL Letterboxd
  const letterboxdUrl = getLetterboxdSearchUrl(
    movie.title,
    dayjs(movie.release_date).year(),
  );

  // Formater la durée avec Day.js duration plugin
  const formatRuntime = (minutes: number) => {
    const d = dayjs.duration(minutes, "minutes");
    const hours = d.hours();
    const mins = d.minutes();

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    return `${mins}min`;
  };

  return (
    <div className="relative min-h-screen">
      {/* Backdrop avec overlay */}
      {backdropUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backdropUrl})`,
              filter: "blur(8px)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/90 to-black/70" />
        </>
      )}

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 animate-scaleUp">
          {/* Colonne gauche - Affiche */}
          <div className="flex justify-center lg:justify-start">
            <div className="sticky top-4 flex flex-col gap-3">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="rounded-lg shadow-2xl w-full max-w-[350px]"
                />
              ) : (
                <div className="w-full max-w-[350px] aspect-2/3 rounded-lg bg-linear-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
                  <span className="text-8xl">🎬</span>
                </div>
              )}

              {/* Badge Letterboxd */}
              <a
                href={letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-sm w-full max-w-[350px]"
              >
                <span>Voir sur Letterboxd</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Colonne droite - Informations */}
          <div className="flex flex-col gap-6 text-white overflow-y-auto">
            {/* En-tête du film */}
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-0.5 font-nohemi">
                {movie.title}
              </h1>
              {director && (
                <p className="text-lg md:text-xl text-neutral-400 font-outfit">
                  de{" "}
                  <span className="text-orange-400 font-medium">
                    {director.name}
                  </span>
                </p>
              )}
              {movie.tagline && (
                <p className="text-lg md:text-xl lg:text-2xl text-orange-400 italic font-outfit">
                  {movie.tagline}
                </p>
              )}
              <p className="text-xl text-neutral-300 font-outfit">
                {dayjs(movie.release_date).year()}
              </p>
            </div>

            {/* Rating circulaire et badges */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {movie.runtime > 0 && (
                  <MovieBadge
                    icon={<ClockIcon className="w-3.5 h-3.5" />}
                    label={formatRuntime(movie.runtime)}
                    variant="default"
                  />
                )}
                <MovieBadge
                  icon={<CalendarIcon className="w-3.5 h-3.5" />}
                  label={dayjs(movie.release_date).format("D MMMM YYYY")}
                  variant="default"
                />
                {movie.original_language && (
                  <MovieBadge
                    icon={<LanguageIcon className="w-3.5 h-3.5" />}
                    label={movie.original_language.toUpperCase()}
                    variant="default"
                  />
                )}
              </div>
            </div>

            {/* Genres */}
            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <MovieBadge
                    key={genre.id}
                    label={genre.name}
                    variant="orange"
                  />
                ))}
              </div>
            )}

            {/* Synopsis */}
            {movie.overview && (
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400 font-nohemi">
                  Synopsis
                </h2>
                <div className="relative">
                  <p className="text-neutral-200 leading-relaxed text-base md:text-lg font-outfit">
                    {movie.overview}
                  </p>
                </div>
              </div>
            )}

            {/* Casting */}
            {cast.cast.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400 font-nohemi">
                  Casting principal
                </h2>
                <div className="flex flex-wrap gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-neutral-800">
                  {cast.cast.slice(0, 10).map((actor) => (
                    <CastCard key={actor.id} cast={actor} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
