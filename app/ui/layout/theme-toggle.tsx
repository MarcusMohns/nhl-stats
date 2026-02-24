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
      onClick={toggleDarkMode}
      className="flex items-center justify-center color-white cursor-pointer group w-10 h-10 ml-10 rounded-md bg-stone-300 dark:bg-stone-900"
    >
      <SunIcon className="hidden dark:block h-6 w-6 group-hover:fill-yellow-500 group-hover:stroke-yellow-500" />
      <MoonIcon className="dark:hidden h-6 w-6 stroke-stone-600 group-hover:stroke-black" />
    </button>
  );
};

export default ThemeToggle;
