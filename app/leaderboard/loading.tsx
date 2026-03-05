const PlayerCardSkeleton = () => (
  <div className="flex flex-row items-center justify-between p-2 shadow-sm my-3 bg-stone-100 dark:bg-stone-800 rounded-lg w-full gap-2 animate-pulse">
    <div className="w-16 h-10 sm:h-12 bg-stone-200 dark:bg-stone-700 rounded shrink-0" />
    <div className="flex items-center gap-4 flex-grow min-w-0">
      <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0" />
      <div className="w-32 h-6 bg-stone-200 dark:bg-stone-700 rounded" />
    </div>
    <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4">
      <div className="flex flex-row gap-1 md:gap-2">
        <div className="w-10 h-8 bg-stone-200 dark:bg-stone-700 rounded" />
        <div className="w-14 h-8 bg-stone-200 dark:bg-stone-700 rounded" />
      </div>
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-stone-200 dark:bg-stone-700 rounded-full" />
    </div>
  </div>
);

const LeadersSkeleton = () => {
  return (
    <div className="w-full xl:max-w-2xl">
      {/* Title */}
      <div className="h-8 w-32 bg-stone-200 dark:bg-stone-800 rounded mt-5 mb-2 animate-pulse" />

      {/* Tabs */}
      <div className="flex gap-1 mb-4 animate-pulse">
        <div className="w-24 h-10 bg-stone-200 dark:bg-stone-800 rounded" />
        <div className="w-24 h-10 bg-stone-200 dark:bg-stone-800 rounded" />
        <div className="w-24 h-10 bg-stone-200 dark:bg-stone-800 rounded" />
      </div>

      {/* Cards */}
      {[...Array(5)].map((_, i) => (
        <PlayerCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default function Loading() {
  return (
    <div className="section-loading h-max w-full p-2" role="status">
      <span className="sr-only">Loading...</span>
      <div className="flex flex-col items-center justify-center xl:flex-row w-full gap-10">
        <LeadersSkeleton />
        <LeadersSkeleton />
      </div>
    </div>
  );
}
