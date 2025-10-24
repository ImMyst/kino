import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { movieDetailQueryOptions } from "../utils/movies";

export const Route = createFileRoute("/movie/$movieId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      movieDetailQueryOptions({ movieId: params.movieId }),
    );
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: movie } = useSuspenseQuery(
    movieDetailQueryOptions({ movieId: params.movieId }),
  );

  return (
    <div className="flex items-center flex-col gap-4 mx-4">
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
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}
