import { Film, ArrowLeft } from "lucide-react";

const TrailerNotAvailable = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center gap-4">
      <Film size={60} className="text-zinc-400" />

      <h2 className="text-xl font-semibold">
        Trailer Not Available
      </h2>

      <p className="text-zinc-400 text-sm">
        Sorry, this movie does not have a trailer yet.
      </p>

      <button
        onClick={onClose}
        className="flex items-center gap-2 mt-4 px-4 py-2 border border-zinc-500 rounded-lg hover:bg-white hover:text-black transition"
      >
        <ArrowLeft size={18} />
        Go Back
      </button>
    </div>
  );
};

export default TrailerNotAvailable;