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
    <main className="relative flex flex-col md:grid md:grid-cols-12 gap-4 pt-16 px-4 md:px-0 max-w-screen-lg mx-auto">
      <Link
        className="absolute top-2 left-2 font-semibold text-center bg-gray-100 hover:bg-gray-200 transition-colors
      flex items-center justify-center rounded-full p-2 px-4"
        to={"/"}
      >
        Retour
      </Link>
      <div className="md:col-span-6 lg:col-span-4">
        <MovieCard isDetail={true} movie={movie} />
      </div>
      <div className="md:col-span-6 lg:col-span-8 bg-gray-50 shadow-sm rounded-xl py-2 px-4">
        <span>{movie.overview}</span>
      </div>
    </main>
  );
}
