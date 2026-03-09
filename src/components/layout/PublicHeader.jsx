import { useNavigate } from "react-router-dom";
import Netflix from "../../assets/icons/netflix.svg";

const PublicHeader = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth/login");
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-5">
        <img src={Netflix} alt="Netflix" className="h-10 w-auto" />

        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="appearance-none rounded border border-zinc-500 bg-black/60 px-4 py-1.5 text-sm text-white focus:outline-none">
              <option value="en">English</option>
              <option value="ml">Malayalam</option>
            </select>
          </div>

          <button
            onClick={handleClick}
            className="rounded bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
