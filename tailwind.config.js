/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // <--- INI KUNCINYA (Supaya bisa di-toggle manual)
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"], // Font keren mirip web lamamu
      },
      colors: {
        // Kita simpan warna custom di sini nanti
        primary: "#0ea5e9", // Sky-500
        dark: "#0f172a", // Slate-900 (Background lama)
      },
    },
  },
  plugins: [],
};
