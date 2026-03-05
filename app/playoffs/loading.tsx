const SeriesSkeleton = () => (
  <div className="lg:w-48 w-full h-28 my-2 animate-pulse bg-stone-200 dark:bg-stone-700 rounded-lg" />
);

const BracketSkeleton = ({ direction }: { direction: string }) => {
  return (
    <div
      className={`flex flex-row h-full justify-start ${direction} w-full lg:w-auto gap-4 grow`}
    >
      <div className="flex flex-col justify-around gap-4 w-full lg:w-auto">
        <SeriesSkeleton />
        <SeriesSkeleton />
      </div>
      <div className="flex flex-col justify-center w-full lg:w-auto">
        <SeriesSkeleton />
      </div>
    </div>
  );
};

const FinalsSkeleton = () => (
  <div className="flex flex-row items-center justify-center gap-4 my-8 w-full">
    <SeriesSkeleton />
    <div className="lg:w-48 w-full h-64 my-2 animate-pulse bg-stone-200 dark:bg-stone-700 rounded-lg" />
    <SeriesSkeleton />
  </div>
);

const Loading = () => {
  return (
    <div
      className="playoffs h-max sm:p-5 w-full max-w-7xl mx-auto mt-5"
      role="status"
    >
      <span className="sr-only">Loading...</span>
      <div className="flex flex-col w-full justify-center items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-2 sm:p-5 lg:p-10">
        {/* Logo Skeleton */}
        <div className="w-full h-32 bg-stone-200 dark:bg-stone-700 animate-pulse rounded mb-5" />
        {/* Text Skeleton */}
        <div className="w-64 h-4 bg-stone-200 dark:bg-stone-700 animate-pulse rounded mb-10" />

        {/* Top Brackets */}
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          <BracketSkeleton direction="flex-row" />
          <div className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700 mx-2" />
          <BracketSkeleton direction="flex-row-reverse" />
        </div>

        {/* Finals */}
        <FinalsSkeleton />

        {/* Bottom Brackets */}
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          <BracketSkeleton direction="flex-row" />
          <div className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700 mx-2" />
          <BracketSkeleton direction="flex-row-reverse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
