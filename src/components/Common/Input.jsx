const Input = ({ label, type = "text", value, onChange, error, style }) => {
  return (
    <div className="mb-4">
      <div
        className={`relative rounded border ${
          error ? "border-red-500" : "border-zinc-700"
        } bg-zinc-800`}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`peer w-full bg-transparent px-4 pt-5 pb-2 text-white focus:outline-none ${
            style ? style : ""
          }`}
        />

        <label
          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400 transition-all
            peer-focus:top-3 peer-focus:text-xs peer-focus:text-zinc-400
            ${value ? "top-2 text-xs" : ""}
          `}
        >
          {label}
        </label>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <span className="border border-red-500 rounded-4xl px-1">×</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
