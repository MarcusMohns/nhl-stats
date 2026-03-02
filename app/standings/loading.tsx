const TableRowSkeleton = () => (
  <div className="flex items-center w-full h-12 border-b border-stone-200 dark:border-stone-700/50 px-2 gap-4">
    <div className="w-6 h-6 bg-stone-200 dark:bg-stone-800 rounded animate-pulse shrink-0" />
    <div className="flex items-center flex-grow gap-3">
      <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 animate-pulse shrink-0" />
      <div className="w-24 sm:w-48 h-5 bg-stone-200 dark:bg-stone-800 rounded animate-pulse" />
    </div>
    <div className="w-8 h-6 bg-stone-200 dark:bg-stone-800 rounded animate-pulse shrink-0" />
    <div className="w-8 h-6 bg-stone-200 dark:bg-stone-800 rounded animate-pulse shrink-0 hidden sm:block" />
    <div className="w-8 h-6 bg-stone-200 dark:bg-stone-800 rounded animate-pulse shrink-0 hidden md:block" />
    <div className="w-8 h-6 bg-stone-200 dark:bg-stone-800 rounded animate-pulse shrink-0 hidden md:block" />
    <div className="w-8 h-6 bg-stone-200 dark:bg-stone-800 rounded animate-pulse shrink-0 hidden lg:block" />
  </div>
);

const Loading = () => {
  return (
    <div className="section-loading h-max sm:p-5 w-full max-w-7xl mx-auto">
      <h2
        className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none
        border-b border-gray-300 dark:border-stone-700"
      >
        Standings
      </h2>

      {/* Tabs Skeleton */}
      <div className="flex gap-1 mb-6 mx-2 p-1 bg-stone-200 dark:bg-stone-800 rounded-sm w-fit shadow-lg">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-24 h-10 rounded-sm bg-stone-300 dark:bg-stone-700 animate-pulse"
          />
        ))}
      </div>

      {/* Table Title */}
      <div className="w-32 h-8 mb-4 mx-2 bg-stone-200 dark:bg-stone-800 rounded animate-pulse" />

      {/* Table */}
      <div className="w-full bg-white dark:bg-stone-900/50 rounded-lg shadow-sm overflow-hidden border border-stone-200 dark:border-stone-800">
        {/* Header */}
        <div className="flex items-center w-full h-10 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-2 gap-4">
          <div className="w-6 h-4 bg-stone-300 dark:bg-stone-700 rounded animate-pulse" />
          <div className="flex-grow h-4 bg-stone-300 dark:bg-stone-700 rounded animate-pulse max-w-[200px]" />
          <div className="w-8 h-4 bg-stone-300 dark:bg-stone-700 rounded animate-pulse" />
          <div className="w-8 h-4 bg-stone-300 dark:bg-stone-700 rounded animate-pulse hidden sm:block" />
          <div className="w-8 h-4 bg-stone-300 dark:bg-stone-700 rounded animate-pulse hidden md:block" />
        </div>

        {[...Array(15)].map((_, index) => (
          <TableRowSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
