import Link from "next/link";
import HockeyGame from "./experience/hockey-game";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
        Not Found
      </h2>
      <p className="text-stone-600 dark:text-stone-400">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
      >
        Return Home
      </Link>
      <HockeyGame />
    </div>
  );
}
