// pages/watch/Watch.jsx
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getMovieVideos } from "../../services/tmdb.service";
import Loader from "../../components/Common/Loader";
import TrailerNotAvailable from "./TrailerNotAvailable";

const Watch = ({ tmdbId, onClose, onClick }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await getMovieVideos(tmdbId);

        const trailer = res.results.find(
          (v) =>
            v.site === "YouTube" && v.type === "Trailer" && v.official === true,
        );

        setVideoKey(trailer?.key ?? null);
      } catch (err) {
        console.error(err);
        setVideoKey(null);
      } finally {
        setLoading(false);
        onClick?.();
      }
    };

    fetchTrailer();
  }, [tmdbId, onClick]);

  if (loading) {
    return <Loader />;
  }

  if (!videoKey) {
    return <TrailerNotAvailable onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute left-4 top-12 z-50 text-white text-xl"
      >
        <ArrowLeft />
      </button>

      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
};

export default Watch;
