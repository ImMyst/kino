import MovieCard from "@app/components/MovieCard";
import type { MovieCredit, Movie } from "@app/types/types";
import { getMovieDetail, getMovieDetailCredit } from "@app/utils/endpoints";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const movieDetailResponse = await getMovieDetail({ movieId: params.id });
  const movieCreditResponse = await getMovieDetailCredit({
    movieId: params.id,
  });

  const movieDetail: Movie = await movieDetailResponse.json();
  const movieCredit: MovieCredit = await movieCreditResponse.json();

  const movie = {
    ...movieDetail,
    id: movieDetail.id,
    cast: movieCredit.cast,
    crew: movieCredit.crew,
  };

  return json({ movie });
}

export default function MovieDetail() {
  const { movie } = useLoaderData<typeof loader>();

  return (
    <main className="relative flex flex-col items-center justify-center gap-10 p-12 max-w-screen-lg mx-auto">
      <Link
        className="absolute top-4 left-4 font-semibold text-center bg-gray-100 hover:bg-gray-200 transition-colors
      flex items-center justify-center rounded-full p-2 px-4"
        to={"/"}
      >
        Retour
      </Link>
      <MovieCard isDetail={true} movie={movie} />
      <span>{movie.overview}</span>
    </main>
  );
}
