
const AuthFooter = () => {
  return (
    <footer className="bg-black px-6 py-12 text-sm text-[#b3b3b3]">
      <div className="mx-auto max-w-6xl">
        {/* Top text */}
        <p className="mb-8">
          Questions? Call{" "}
          <a href="tel:0008009191743" className="hover:underline">
            000-800-919-1743
          </a>
        </p>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 sm:grid-cols-3 md:grid-cols-4">
          {[
            "FAQ",
            "Help Centre",
            "Terms of Use",
            "Privacy",
            "Cookie Preferences",
            "Corporate Information",
          ].map((item) => (
            <a key={item} href="#" className="hover:underline">
              {item}
            </a>
          ))}
        </div>

        {/* Language selector */}
        <div className="mt-10">
          <button className="flex items-center gap-2 rounded border border-[#333] px-4 py-2 text-white hover:bg-[#1a1a1a]">
            <span className="text-sm">🌐</span>
            <span>English</span>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
