const LeadersSkeleton = () => {
  return (
    <div className="h-max w-xl animate-pulse">
      <div className="mt-4 select-none px-2 w-28 h-8 bg-stone-200 dark:bg-stone-800 ml-2" />
      <div className="w-8/10 sm:w-45 mx-auto sm:mx-2 h-12 rounded bg-stone-200 dark:bg-stone-800 mt-2" />
      <div className="mt-3 select-none w-22 h-8 bg-stone-200 dark:bg-stone-800 ml-2" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full h-26" />
    </div>
  );
};

export const Loading = () => (
  <div className="leaderboard h-max sm:p-5">
    <h2
      className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none
        border-b border-gray-300 dark:border-stone-700"
      aria-label="Loading Section"
    >
      Leaderboard
    </h2>
    <div className="flex flex-col xl:flex-row w-full gap-5">
      <LeadersSkeleton />
      <LeadersSkeleton />
    </div>
  </div>
);

export default Loading;
