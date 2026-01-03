import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  // Logika Dark Mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-primary font-bold" : "text-slate-600 dark:text-slate-400 hover:text-primary";
  };

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-900 dark:text-white">
            MoneyWich<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-2">
          {/* TOMBOL TOGGLE THEME */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-yellow-400">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* TOMBOL MOBILE MENU (HAMBURGER) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MENU LINK */}
        <div className={`${isOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-100 rounded-lg bg-slate-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-slate-800 md:dark:bg-transparent dark:border-slate-700">
            <li>
              <Link to="/" className={`block py-2 px-3 md:p-0 ${isActive("/")}`} aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link to="/brain" className={`block py-2 px-3 md:p-0 ${isActive("/brain")}`}>
                My Brain 🧠
              </Link>
            </li>
            <li>
              <Link to="/journey" className={`block py-2 px-3 md:p-0 ${isActive("/journey")}`}>
                Journey 🚀
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
