"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const isDarkMode = theme === "dark";

  const toggleDarkMode = () => {
    startViewTransitionWrapper(() => setTheme(isDarkMode ? "light" : "dark"));
  };

  if (!isDarkMode) {
    return (
      <button
        onClick={toggleDarkMode}
        aria-label="Switch to dark mode"
        className="color-white text-black dark:text-white cursor-pointer p-2 ml-5"
      >
        <Image
          src="/sun.svg"
          width={24}
          height={24}
          alt="Switch to dark mode"
          className="hover:fill-yellow-400"
        />
      </button>
    );
  }

  if (isDarkMode) {
    return (
      <button
        onClick={toggleDarkMode}
        aria-label="Switch to light mode"
        className="color-white text-black dark:text-white cursor-pointer p-2 ml-5"
      >
        <Image
          src="/moon.svg"
          width={24}
          height={24}
          alt="Switch to light mode"
          className="dark:invert"
        />
      </button>
    );
  }
};

export default ThemeToggle;
