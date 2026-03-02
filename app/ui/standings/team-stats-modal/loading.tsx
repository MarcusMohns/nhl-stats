const Loading = () => {
  console.log("is this ireally itt");
  return (
    <div className="p-4 animate-pulse h-full">
      {/* Header */}
      <div className="h-8 bg-stone-200 dark:bg-stone-700 rounded w-3/4 mx-auto mb-6" />

      {/* Info Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="w-24 h-16 bg-stone-200 dark:bg-stone-700 rounded-md" />
        <div className="flex-grow flex flex-wrap gap-2">
          <div className="h-8 w-24 bg-stone-200 dark:bg-stone-700 rounded-full" />
          <div className="h-8 w-20 bg-stone-200 dark:bg-stone-700 rounded-full" />
          <div className="h-8 w-32 bg-stone-200 dark:bg-stone-700 rounded-full" />
          <div className="h-8 w-28 bg-stone-200 dark:bg-stone-700 rounded-full" />
        </div>
      </div>

      {/* Stats Sections */}
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-6 w-40 bg-stone-200 dark:bg-stone-700 rounded mb-3" />
            <div className="space-y-2">
              <div className="h-20 bg-stone-200 dark:bg-stone-700 rounded" />
              {i === 0 && (
                <div className="h-20 bg-stone-200 dark:bg-stone-700 rounded" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
