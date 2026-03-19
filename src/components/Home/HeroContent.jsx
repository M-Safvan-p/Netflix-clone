import NETFLIX from "../../assets/icons/netflix.svg";
import { Info } from "lucide-react";

const HeroContent = ({ movie, onClick, onPlay }) => {
  if (!movie) return null;

  const title = movie.title || movie.original_title;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  const overview =
    movie.overview?.length > 180
      ? movie.overview.slice(0, 180) + "..."
      : movie.overview;

  return (
    <div className="pl-[5%] py-[30vh] text-white relative z-10 max-w-[45%]">
      {/* Title */}
      <h1 className="text-7xl font-extrabold leading-tight mb-4 relative">
        {title}
      </h1>

      {/* Meta row */}
      <div className="mb-3 flex items-center gap-4 text-sm text-gray-200">
        {year && <span>{year}</span>}
        {rating && (
          <span className="rounded bg-white/20 px-2 py-0.5">★ {rating}</span>
        )}
      </div>

      {/* Overview */}
      {overview && (
        <p className="mb-6 max-w-xl text-md leading-relaxed text-gray-200">
          {overview}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onPlay}
          className="flex items-center gap-2 rounded bg-white px-6 py-2 text-black font-semibold hover:bg-gray-200 transition"
        >
          ▶ Play
        </button>

        <button
          onClick={onClick}
          className="flex items-center gap-2 rounded bg-gray-500/70 px-6 py-2 text-white font-semibold hover:bg-gray-500 transition"
        >
          <Info /> More Info
        </button>
      </div>
    </div>
  );
};

export default HeroContent;