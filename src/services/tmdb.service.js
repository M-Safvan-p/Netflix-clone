import tmdb from "../api/tmdb";

export const getRandomMovie = async () => {

  // TMDB usually has many pages, we randomize page
  const randomPage = Math.floor(Math.random() * 50) + 1;

  const res = await tmdb.get("/discover/movie", {
    params: {
      with_original_language: "ml",
      page: randomPage
    }
  });

  const movies = res?.data?.results || [];

  const moviesWithPoster = movies.filter(
    (movie) => movie.poster_path && movie.backdrop_path
  );

  if (moviesWithPoster.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * moviesWithPoster.length);

  return moviesWithPoster[randomIndex];
};

export const getTrendingMovies = async (page = 2) => {
  const res = await tmdb.get("/discover/movie", {
    params: {
      with_original_language: "ml",
      sort_by: "popularity.desc",
      page,
    },
  });

  if (res.status !== 200) {
    throw new Error("TMDB Malayalam movies fetch failed");
  }

  const filteredResults = res.data.results.filter(
    (movie) => movie.poster_path != null && movie.backdrop_path != null
  );

  return { ...res.data, results: filteredResults };
};

export const getRelatedMovies = async (movieId, page = 1) => {
  const res = await tmdb.get(`/movie/${movieId}/recommendations`, {
    params: { page }
  });

  if (res.status !== 200) {
    throw new Error("TMDB related movies fetch failed");
  }

  const filteredResults = res.data.results.filter(movie => movie.poster_path != null && movie.backdrop_path != null);
  return filteredResults; // array of MovieDetails
};

export const getMovieVideos = async (movieId) => {
  const { data } = await tmdb.get(`/movie/${movieId}/videos`);
  return data;
};

export const getAllMovieRows = async () => {
  const rowsData = [];

  try {
    // New on Netflix
    const newOnNetflix = await tmdb.get("/discover/movie", {
      params: {
        with_original_language: "ml",
        with_watch_providers: 8,
        watch_region: "IN",
        sort_by: "primary_release_date.desc",
      },
    });
    const newMovies = (newOnNetflix.data.results || []).filter(
      (m) => m.poster_path != null && m.backdrop_path != null
    );
    if (newMovies.length > 0) {
      rowsData.push({ title: "New on Netflix", movies: newMovies });
    }
  } catch (err) {
    console.error("Error fetching New on Netflix:", err);
  }

  try {
    // Today's Top (Trending)
    const trendingRes = await tmdb.get("/trending/movie/day");
    const trendingMovies = (trendingRes.data.results ||  []).filter(
      (m) => m.poster_path
    );
    if (trendingMovies.length > 0) {
      rowsData.push({ title: "Today's Top", movies: trendingMovies });
    }
  } catch (err) {
    console.error("Error fetching Today's Top:", err);
  }

  try {
    // Top Rated
    const topRated = await tmdb.get("/movie/top_rated");
    const topRatedMovies = (topRated.data.results || []).filter(
      (m) => m.poster_path
    );
    if (topRatedMovies.length > 0) {
      rowsData.push({ title: "Top Rated", movies: topRatedMovies });
    }
  } catch (err) {
    console.error("Error fetching Top Rated:", err);
  }

  try {
    // Action
    const action = await tmdb.get("/discover/movie", {
      params: { with_genres: 28 },
    });
    const actionMovies = (action.data.results || []).filter(
      (m) => m.poster_path
    );
    if (actionMovies.length > 0) {
      rowsData.push({ title: "Action", movies: actionMovies });
    }
  } catch (err) {
    console.error("Error fetching Action movies:", err);
  }

  try {
    // Popular
    const popular = await tmdb.get("/movie/popular");
    const popularMovies = (popular.data.results || []).filter(
      (m) => m.poster_path
    );
    if (popularMovies.length > 0) {
      rowsData.push({ title: "Popular", movies: popularMovies });
    }
  } catch (err) {
    console.error("Error fetching Popular movies:", err);
  }

  return rowsData;
};