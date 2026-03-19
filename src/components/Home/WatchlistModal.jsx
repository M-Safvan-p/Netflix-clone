import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { getWatchlist, removeFromWatchlist } from "../../services/db.service";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Common/Loader";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const WatchlistModal = ({ onClose }) => {
  const { user, isLoading: authLoading } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user?.uid) {
          setError("Please login to view your watchlist");
          setLoading(false);
          return;
        }

        const movies = await getWatchlist(user.uid);
        setWatchlist(movies || []);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user, authLoading]);

  const handleRemove = async (movieId) => {
    try {
      await removeFromWatchlist(user.uid, movieId);

      // ✅ safer state update
      setWatchlist((prev) =>
        prev.filter((movie) => movie.id !== movieId)
      );
    } catch (err) {
      console.error("Error removing:", err);
      setError("Failed to remove movie");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-[#141414] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#141414] border-b border-zinc-700 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">My Watchlist</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-black/70 p-2 hover:bg-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : watchlist.length === 0 ? (
            <p className="text-zinc-400 text-center py-8">
              Your watchlist is empty. Add some movies!
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {watchlist.map((movie) => (
                <div
                  key={movie.id} // ✅ fixed
                  className="group relative rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={`${IMAGE_BASE_URL}${movie.posterPath}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-3">
                    <p className="text-white font-semibold text-center px-2 line-clamp-2">
                      {movie.title}
                    </p>

                    <button
                      onClick={() => handleRemove(movie.id)} // ✅ fixed
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded flex items-center gap-2 transition"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;