export const DateSelectorSkeleton = () => (
  <div className="flex xl:flex-col h-full xl:min-h-100 w-full px-3 my-3 xl:w-40 gap-2 shadow-lg sticky top-0 xl:top-[35vh] xl:mr-auto justify-start xl:justify-around z-20 rounded-md bg-stone-100 dark:bg-stone-800 p-3 xl:mb-6 overflow-hidden">
    {[...Array(7)].map((_, i) => (
      <div
        key={i}
        className="flex-shrink-0 xl:w-full w-20 h-8 rounded-full bg-stone-200 dark:bg-stone-700 animate-pulse"
      />
    ))}
  </div>
);

const GameSkeleton = () => (
  <div className="flex flex-col w-full mb-1">
    <div className="flex flex-col items-center w-full justify-center shadow-sm bg-stone-100 dark:bg-stone-800 rounded h-24 animate-pulse">
      {/* Header line */}
      <div className="flex w-full justify-between mb-2 px-2 pt-2">
        <div className="w-20 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
        <div className="w-16 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
      </div>
      {/* Matchup line */}
      <div className="flex flex-row items-center justify-center w-full xl:gap-10 pb-2">
        {/* Home Team */}
        <div className="w-1/2">
          <div className="flex flex-row items-center justify-start px-2 gap-3">
            <div className="flex flex-row items-center justify-center md:justify-start w-full">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0" />
              <div className="hidden md:flex flex-col gap-1 ml-2">
                <div className="w-16 h-3 bg-stone-200 dark:bg-stone-700 rounded" />
                <div className="w-24 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
              <div className="md:hidden w-8 h-5 bg-stone-200 dark:bg-stone-700 rounded ml-2" />
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-stone-200 dark:bg-stone-700 rounded" />
          </div>
        </div>

        <div className="w-4 h-1 bg-stone-200 dark:bg-stone-700 rounded" />

        {/* Away Team */}
        <div className="w-1/2">
          <div className="flex flex-row items-center justify-start px-2 gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-stone-200 dark:bg-stone-700 rounded" />
            <div className="flex flex-row items-center justify-center md:justify-end w-full">
              <div className="md:hidden w-8 h-5 bg-stone-200 dark:bg-stone-700 rounded mr-2" />
              <div className="hidden md:flex flex-col gap-1 mr-2 items-end">
                <div className="w-16 h-3 bg-stone-200 dark:bg-stone-700 rounded" />
                <div className="w-24 h-4 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const DatesSkeleton = () => (
  <div className="flex flex-col w-full xl:w-5xl xl:mr-auto xl:pr-40">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex flex-col w-full mb-8 xl:px-5">
        <div className="w-48 h-8 bg-stone-200 dark:bg-stone-800 rounded mb-4 animate-pulse" />
        <div className="space-y-3">
          <GameSkeleton />
          <GameSkeleton />
          <GameSkeleton />
        </div>
      </div>
    ))}
  </div>
);

export default function Loading() {
  return (
    <div
      className="flex flex-col xl:flex-row xl:w-7xl w-full px-3 xl:px-0 justify-center items-start"
      role="status"
    >
      <span className="sr-only">Loading...</span>
      <DateSelectorSkeleton />
      <DatesSkeleton />
    </div>
  );
}
