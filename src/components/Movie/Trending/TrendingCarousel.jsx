import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../../services/tmdb.service";
import TrendingCard from "./TrendingCard";
import "../../../style/trending.css";
import MovieCard from "./TrendingModal";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();
        const movieList = Array.isArray(data) ? data : (data?.results || []);
        setMovies(movieList);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return <p className="px-4 text-gray-400">Loading...</p>;
  if (error) return <p className="px-4 text-red-500">{error}</p>;

  return (
    <section className="px-4 py-6 md:px-8">
      <h2 className="mb-4 p-5 text-3xl font-semibold text-white sm:text-xl md:text-3xl">
        Trending Now
      </h2>

      <div className="trending-carousel">
        {movies.map((movie, idx) => (
          <TrendingCard
            onClick={() => setSelectedMovie(movie)}
            key={movie.id}
            card={movie}
            index={idx + 1}
          />
        ))}
      </div>

      <MovieCard movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </section>
  );
};

export default TrendingMovies;