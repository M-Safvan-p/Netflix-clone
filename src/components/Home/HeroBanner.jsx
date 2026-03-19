import { useEffect, useState } from "react";
import { getRandomMovie } from "../../services/tmdb.service";
import ProtectedHeader from "../../components/layout/ProtectedHeader";
import MovieDetailModal from "./MovieDetailModal"
import HeroContent from "./HeroContent";
import WatchModal from "../../pages/watch/Watch";
import Loader from "../Common/Loader";
import { useWatch } from "../../context/watchContext";

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchMovieId, setWatchMovieId] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const { setWatchingMovieId } = useWatch();

  useEffect(() => {
    const fetchMovie = async () => {
      const m = await getRandomMovie();
      setMovie(m);
      setLoading(false);
    };

    fetchMovie();
  }, []);

  if (isLoading) return <Loader />;

  const backgroundImage = `https://image.tmdb.org/t/p/w1280${
    movie ? movie.backdrop_path : ""
  }`;

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      <ProtectedHeader />

      <HeroContent
        movie={movie}
        onClick={() => setSelectedMovie(movie)}
        onPlay={() => setWatchMovieId(movie.id)}
      />

      <div
        className="
        pointer-events-none
        absolute bottom-0 left-0 right-0
        h-48
        bg-linear-to-b
        from-transparent
        via-[#050505]/30
        to-[#161616]
      "
      />

      {/* Blur layer */}
      <div
        className="
        pointer-events-none
        absolute bottom-0 left-0 right-0
        backdrop-blur-xs
        bg-[#000000]/10
      "
      />

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlay={() => {
            setWatchMovieId(selectedMovie.id);
            setSelectedMovie(null);
          }}
        />
      )}

      {watchMovieId && (
        <WatchModal
          onClose={() => {
            setWatchMovieId(null);
            setWatchingMovieId(null);
          }}
          onClick={() => setWatchingMovieId(watchMovieId)}
          tmdbId={watchMovieId}
        />
      )}
    </div>
  );
};

export default HeroBanner;
