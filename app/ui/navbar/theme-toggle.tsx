"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleDarkMode = () => {
    startViewTransitionWrapper(() =>
      setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    );
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="color-white text-black dark:text-white cursor-pointer p-2 ml-5"
    >
      <Image
        src="/sun.svg"
        width={24}
        height={24}
        alt="Switch to dark mode"
        className="dark:hidden hover:fill-yellow-400"
      />
      <Image
        src="/moon.svg"
        width={24}
        height={24}
        alt="Switch to light mode"
        className="hidden dark:block dark:invert"
      />
    </button>
  );
};

export default ThemeToggle;
