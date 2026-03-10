import tmdb from "../api/tmdb";

export const getRandomMovie = async () => {
  const res = await tmdb.get('/discover/movie?with_original_language=ml');
  
  const movies = res?.data?.results;
  if (!Array.isArray(movies) || movies.length === 0) return null;

  // Mix multiple entropy sources
  const entropy =
    Date.now() ^
    performance.now() ^
    Math.floor(Math.random() * 1e9);

  const randomIndex = Math.abs(entropy) % movies.length;
  return movies[randomIndex];
};

export const getTrendingMovies = async (page = 1) => {
  const res = await tmdb.get("/discover/movie", {
    params: {
      with_original_language: "ml",
      region: "IN",
      sort_by: "popularity.desc",
      page,
    },
  });

  if (res.status !== 200) {
    throw new Error("TMDB Malayalam movies fetch failed");
  }
  const filteredResults = res.data.results.filter(movie => movie.poster_path != null);

  return filteredResults;
};