import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, onClose }) => {
  const navigate = useNavigate();
  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-160 overflow-hidden rounded-xl bg-[#141414] shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-black/00 text-3xl text-white hover:bg-black/10"
          aria-label="Close"
        >
          ×
        </button>

        {/* Poster */}
        <div className="relative h-90 w-full">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="h-full w-full object-cover"
          />

          {/* Heavy Netflix gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative -mt-20 px-6 pb-6">
          {/* Title */}
          <h2 className="mb-3 text-2xl font-bold text-white">{movie.title}</h2>

          {/* Meta Row */}
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-300">
            <span className="font-medium text-white">
              {movie.release_date?.split("-")[0]}
            </span>

            <span className="rounded bg-white/20 px-2 py-0.5">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>

            <span className="rounded bg-white/20 px-2 py-0.5">Movie</span>
          </div>

          {/* Description */}
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-300">
            {movie.overview}
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/auth/signup")}
            className="inline-flex items-center gap-2 rounded-md bg-[#e50914] px-6 py-2 text-sm font-semibold text-white hover:bg-[#b20710]"
          >
            Get Started
            <span className="text-lg leading-none">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
