"use client";
import { useTheme } from "next-themes";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleDarkMode = () => {
    startViewTransitionWrapper(() =>
      setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    );
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleDarkMode}
      className="flex items-center justify-center cursor-pointer group w-10 h-10 rounded-md bg-stone-200 dark:bg-stone-900 ml-10"
    >
      <SunIcon
        aria-hidden="true"
        className="hidden dark:block h-6 w-6 group-hover:fill-yellow-500 group-hover:stroke-yellow-500"
      />
      <MoonIcon
        aria-hidden="true"
        className="dark:hidden h-6 w-6 stroke-stone-600 group-hover:stroke-black"
      />
    </button>
  );
};

export default ThemeToggle;
