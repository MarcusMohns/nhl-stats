const PlayerCardSkeleton = () => (
  <div className="flex flex-row items-center w-full p-3 shadow-sm bg-stone-200 dark:bg-stone-800/50 rounded-lg border border-stone-300 dark:border-stone-700/50">
    <div className="relative shrink-0">
      <div className="w-16 h-16 rounded-full bg-stone-300 dark:bg-stone-700" />
    </div>
    <div className="flex flex-col flex-grow ml-4 overflow-hidden gap-2">
      <div className="h-5 w-48 bg-stone-300 dark:bg-stone-700 rounded" />
      <div className="flex flex-row gap-4 sm:gap-6">
        <div className="h-5 w-8 bg-stone-300 dark:bg-stone-700 rounded" />
        <div className="h-5 w-8 bg-stone-300 dark:bg-stone-700 rounded" />
        <div className="h-5 w-8 bg-stone-300 dark:bg-stone-700 rounded" />
        <div className="h-5 w-8 bg-stone-300 dark:bg-stone-700 rounded" />
      </div>
    </div>
  </div>
);

const GameCardSkeleton = () => (
  <div className="flex items-center gap-4 p-3 w-full bg-stone-200 dark:bg-stone-800/50 rounded-lg shadow-sm border-l-4 border-stone-400 dark:border-l-stone-600">
    <div className="flex flex-col items-center justify-center w-12 shrink-0 gap-1">
      <div className="h-3 w-8 bg-stone-300 dark:bg-stone-700 rounded" />
      <div className="h-6 w-6 bg-stone-300 dark:bg-stone-700 rounded" />
    </div>
    <div className="flex-grow grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
      <div className="flex items-center justify-end gap-2">
        <div className="h-5 w-10 bg-stone-300 dark:bg-stone-700 rounded" />
        <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700" />
      </div>
      <div className="h-5 w-5 bg-stone-300 dark:bg-stone-700 rounded" />
      <div className="flex items-center justify-start gap-2">
        <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700" />
        <div className="h-5 w-10 bg-stone-300 dark:bg-stone-700 rounded" />
      </div>
    </div>
    <div className="w-5 h-5 bg-stone-300 dark:bg-stone-700 rounded" />
  </div>
);

const DividerSkeleton = ({ textWidth = "w-40" }: { textWidth?: string }) => (
  <div className="flex items-center mt-4 mb-2">
    <div
      className="flex-1 border-t border-stone-300 dark:border-stone-600"
      aria-hidden="true"
    />
    <div
      className={`h-5 mx-3 bg-stone-300 dark:bg-stone-700 rounded ${textWidth}`}
    />
    <div
      className="flex-1 border-t border-stone-300 dark:border-stone-600"
      aria-hidden="true"
    />
  </div>
);

const Loading = () => {
  return (
    <div className="animate-pulse max-h-180 pr-2 overflow-y-auto" role="status">
      <span className="sr-only">Loading...</span>
      {/* Header */}
      <div className="h-8 bg-stone-300 dark:bg-stone-700 rounded w-3/4 mx-auto mt-2 mb-4" />

      {/* Info Section */}
      <div className="m-2 flex flex-row p-2">
        <div className="w-30 h-20 rounded-sm bg-stone-300 dark:bg-stone-700 mr-2 shrink-0" />
        <div className="flex flex-row flex-wrap justify-center items-start gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-7 w-28 bg-stone-300 dark:bg-stone-700 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Top Skaters */}
      <DividerSkeleton textWidth="w-48" />
      <div className="flex flex-col gap-2 px-2">
        <PlayerCardSkeleton />
        <PlayerCardSkeleton />
      </div>

      {/* Top Goalies */}
      <DividerSkeleton textWidth="w-32" />
      <div className="flex flex-col gap-2 px-2">
        <PlayerCardSkeleton />
        <PlayerCardSkeleton />
      </div>

      {/* Weekly Schedule */}
      <DividerSkeleton textWidth="w-44" />
      <div className="flex flex-col gap-2 px-2 pb-2">
        <GameCardSkeleton />
        <GameCardSkeleton />
      </div>
    </div>
  );
};

export default Loading;
