import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { useState } from "react";
import Netflix from "../../assets/icons/netflix.svg";
import { useWatch } from "../../context/watchContext";
import { LogoutService } from "../../services/auth.service";
import WatchlistModal from "../Home/WatchlistModal";

const ProtectedHeader = () => {
  const { watchingMovieId } = useWatch();
  const navigate = useNavigate();
  const [showWatchlist, setShowWatchlist] = useState(false);

  if (watchingMovieId) return null;

  const handleClick = async () => {
    try {
      await LogoutService();
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    "Home",
    "TV Shows",
    "Movies",
    "Games",
    "New & Popular",
    "Browse by Languages",
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-black/90 to-transparent">
      <div className="mx-auto flex h-16 items-center justify-between px-10">

        {/* Left */}
        <div className="flex items-center gap-10">
          <img
            onClick={() => navigate("/")}
            src={Netflix}
            alt="Netflix"
            className="h-7 w-auto cursor-pointer"
          />

          <nav className="flex items-center gap-5 text-sm text-zinc-300">
            {navItems.map((item) => (
              <NavLink
                key={item}
                to="#"
                className="hover:text-white transition"
              >
                {item}
              </NavLink>
            ))}

            <button
              onClick={() => setShowWatchlist(true)}
              className="hover:text-white transition"
            >
              My List
            </button>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 text-zinc-300">
          <button className="hover:text-white transition">
            <Search size={20} />
          </button>

          <span className="text-sm">Children</span>

          <button className="hover:text-white transition">
            <Bell size={20} />
          </button>

          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-sm font-semibold text-white">
            R
          </div>

          <button
            onClick={handleClick}
            className="px-2 py-1 rounded bg-red-500"
          >
            Logout
          </button>
        </div>

      </div>

      {showWatchlist && (
        <WatchlistModal onClose={() => setShowWatchlist(false)} />
      )}
    </header>
  );
};

export default ProtectedHeader;