const SeriesSkeleton = () => (
  <div className="w-full md:w-52 h-28 my-2 animate-pulse bg-stone-200 dark:bg-stone-700 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700/50" />
);

const BracketSkeleton = ({
  direction,
}: {
  direction: "flex-row" | "flex-row-reverse";
}) => {
  return (
    <div
      className={`flex flex-row h-full w-full justify-center lg:justify-start ${direction} grow gap-4 md:gap-0`}
    >
      <div className="flex flex-col items-center justify-around w-full md:w-auto gap-4 md:gap-8">
        <SeriesSkeleton />
        <SeriesSkeleton />
      </div>
      <div className="flex flex-col justify-center w-full md:w-auto md:mx-5 lg:mx-10">
        <SeriesSkeleton />
      </div>
    </div>
  );
};

const FinalsSkeleton = () => (
  <div className="flex flex-row items-center justify-center gap-2 my-8 w-full">
    <SeriesSkeleton />
    <div className="hidden md:block w-8 h-px bg-stone-300 dark:bg-stone-600" />
    {/* Stanley Cup Final Placeholder */}
    <div className="w-32 h-48 lg:w-64 lg:h-64 animate-pulse bg-stone-200 dark:bg-stone-700 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700/50" />
    <div className="hidden md:block w-8 h-px bg-stone-300 dark:bg-stone-600" />
    <SeriesSkeleton />
  </div>
);

const Loading = () => {
  return (
    <div className="playoffs h-max lg:p-5 w-full mx-auto mt-5" role="status">
      <span className="sr-only">Loading...</span>
      <div className="flex flex-col w-full justify-center items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-2 lg:p-5 xl:p-10 xl:px-15">
        {/* Logo Skeleton */}
        <div className="w-64 h-16 bg-stone-200 dark:bg-stone-700 animate-pulse rounded-lg mb-5 mx-auto w-full max-w-200 h-30" />

        {/* Text Skeleton */}
        <div className="w-48 h-4 bg-stone-200 dark:bg-stone-700 animate-pulse rounded my-10" />

        {/* Top Brackets */}
        <div className="flex flex-row items-center justify-center gap-1 w-full">
          <BracketSkeleton direction="flex-row" />
          <div className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700 mx-2" />
          <BracketSkeleton direction="flex-row-reverse" />
        </div>

        {/* Finals */}
        <FinalsSkeleton />

        {/* Bottom Brackets */}
        <div className="flex flex-row items-center justify-center gap-1 w-full">
          <BracketSkeleton direction="flex-row" />
          <div className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700 mx-2" />
          <BracketSkeleton direction="flex-row-reverse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
