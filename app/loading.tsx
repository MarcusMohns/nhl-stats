import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full gap-12 py-10">
      {/* Hero Section Skeleton */}
      <section className="flex flex-col items-center text-center space-y-6 max-w-4xl px-6 w-full animate-pulse">
        {/* Title */}
        <div className="h-14 md:h-20 w-64 md:w-96 bg-stone-200 dark:bg-stone-800 rounded-xl" />

        {/* Description */}
        <div className="space-y-3 w-full max-w-2xl flex flex-col items-center">
          <div className="h-4 md:h-5 w-full bg-stone-200 dark:bg-stone-800 rounded-md" />
          <div className="h-4 md:h-5 w-2/3 bg-stone-200 dark:bg-stone-800 rounded-md" />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <div className="h-12 w-44 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="h-12 w-44 rounded-full bg-stone-200 dark:bg-stone-800" />
        </div>
      </section>

      {/* Features Grid Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col p-6 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 h-full min-h-[250px] animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Icon */}
            <div className="mb-4 p-3 rounded-xl bg-stone-200 dark:bg-stone-700 w-14 h-14" />

            {/* Title */}
            <div className="h-7 w-32 bg-stone-200 dark:bg-stone-700 rounded-md mb-3" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="h-4 w-3/4 bg-stone-200 dark:bg-stone-700 rounded" />
            </div>

            {/* Link text at bottom */}
            <div className="mt-auto pt-4 flex items-center">
              <div className="h-4 w-20 bg-stone-200 dark:bg-stone-700 rounded" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
