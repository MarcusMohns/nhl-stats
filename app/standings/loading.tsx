const TableRowSkeleton = () => (
  <tr className="w-full border-b-2 border-stone-200 dark:border-stone-800/50">
    {/* Rank */}
    <td className="text-center p-2 h-[76px]">
      <div className="h-6 w-6 mx-auto bg-stone-300 dark:bg-stone-700 rounded" />
    </td>
    {/* Team */}
    <th scope="row" className="sm:px-2 py-2 sm:py-3">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-md bg-stone-300 dark:bg-stone-700 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="hidden md:block h-5 w-32 bg-stone-300 dark:bg-stone-700 rounded" />
          <div className="block md:hidden h-5 w-16 bg-stone-300 dark:bg-stone-700 rounded" />
        </div>
      </div>
    </th>
    {/* Stats */}
    {[...Array(6)].map((_, i) => (
      <td key={i} className="text-center p-2">
        <div className="h-6 w-8 mx-auto bg-stone-300 dark:bg-stone-700 rounded" />
      </td>
    ))}
    {/* L10 & Streak */}
    <td className="text-center p-2 hidden md:table-cell">
      <div className="h-6 w-20 mx-auto bg-stone-300 dark:bg-stone-700 rounded" />
    </td>
    <td className="text-center p-2 hidden md:table-cell">
      <div className="h-6 w-10 mx-auto bg-stone-300 dark:bg-stone-700 rounded" />
    </td>
  </tr>
);

const TableSkeleton = () => (
  <div className="mt-5">
    {/* Table Name */}
    <div className="h-8 w-40 bg-stone-200 dark:bg-stone-700 rounded mb-5" />
    <div className="w-full overflow-x-auto rounded-lg shadow-lg dark:shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-stone-200 dark:bg-stone-700">
          <tr className="h-12">
            {[...Array(10)].map((_, i) => (
              <th key={i} className="p-2">
                <div className="h-6 w-12 sm:w-16 mx-auto bg-stone-300 dark:bg-stone-600 rounded" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-stone-800">
          {[...Array(8)].map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Loading() {
  return (
    <div className="w-full xl:w-6xl animate-pulse h-max sm:p-5" role="status">
      <span className="sr-only">Loading...</span>
      {/* Tabs */}
      <div className="flex sm:flex-wrap text-sm sm:text-base font-bold mt-1 sm:rounded-sm shadow-lg sm:w-fit bg-stone-200 dark:bg-stone-800 p-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-24 sm:w-32 h-10 m-0.5 bg-stone-300 dark:bg-stone-700 rounded-sm gap-2 p-2"
          >
            <div className="w-5 h-5 bg-stone-400 dark:bg-stone-600 rounded-full" />
            <div className="w-16 h-4 bg-stone-400 dark:bg-stone-600 rounded" />
          </div>
        ))}
      </div>

      <TableSkeleton />
    </div>
  );
}
