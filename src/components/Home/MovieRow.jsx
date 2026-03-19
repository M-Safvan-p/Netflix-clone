import "../../style/movieRows.css";
import { useState } from "react";
import MovieRowCard from "./MovieRowCard";
import MovieDetailsModal from "./MovieDetailModal";
import Watch from "../../pages/watch/Watch";
import { useWatch } from "../../context/watchContext";

const MovieRow = ({ row }) => {
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [watchMovie, setWatchMovie] = useState(null);
  const { setWatchingMovieId } = useWatch();

  return (
    <section className="px-6 py-4">
      <p className="mb-4 text-2xl font-semibold tracking-wide text-white">
        {row.title}
      </p>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth rows">
        {row.movies.map((movie) => (
          <MovieRowCard
            key={movie.id}
            movie={movie}
            onClick={() => setDetailsMovie(movie)}
          />
        ))}
      </div>

      {detailsMovie && (
        <MovieDetailsModal
          movie={detailsMovie}
          onClose={() => setDetailsMovie(null)}
          onPlay={() => {
            setWatchMovie(detailsMovie);
            setDetailsMovie(null);
          }}
        />
      )}

      {watchMovie && (
        <Watch
          tmdbId={watchMovie.id}
          onClose={() => {
            setWatchMovie(null);
            setWatchingMovieId(null);
          }}
          onClick={() => setWatchingMovieId(watchMovie.id)}
        />
      )}
    </section>
  );
};

export default MovieRow;