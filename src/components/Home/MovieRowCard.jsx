import { useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const MovieRowCard = ({ movie, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!movie || !movie.poster_path) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-40 h-60 cursor-pointer group transition-transform duration-300 hover:scale-105"
    >
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="w-full h-full object-cover rounded-lg"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-opacity-60 rounded-lg flex items-end p-4 transition-opacity duration-300">
          <p className="text-white text-sm font-semibold truncate">
            {movie.title || movie.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieRowCard;