import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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

  console.log(movie);

  const director = cast.crew.find((crew) => crew.job === "Director");

  return (
    <div className="flex items-center flex-col gap-2 mx-12">
      <img
        width={200}
        src={
          movie.poster_path || movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${
                movie.poster_path ?? movie.backdrop_path
              }`
            : ""
        }
        alt=""
      />
      <div className="flex items-center flex-col gap-1">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="text-sm">{director?.name ?? "N/A"}</p>
        {/* <a
          href={getLetterboxdLink(movie)}
          className="underline hover:decoration-blue-500"
        >
          Letterboxd
        </a> */}
        <p>{new Date(movie.release_date).toLocaleDateString("fr-FR")}</p>
        {movie.genres.length > 0 && (
          <p className="flex gap-1">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </p>
        )}
      </div>
      <p>{movie.overview}</p>
    </div>
  );
}
