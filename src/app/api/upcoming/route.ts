export async function GET() {
  const upcomingMoviesRes = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1&region=FR`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }
  );
  const data = await upcomingMoviesRes.json();

  return Response.json({ data });
}
