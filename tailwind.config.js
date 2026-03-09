/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      spacing: {
        65: "16.25rem",    // 260px for min-h-65
        90: "22.5rem",     // 360px for h-90
        160: "40rem",      // 640px for w-160
        350: "87.5rem",    // 1400px for max-w-350
      },
    },
  },
  plugins: [],
}
