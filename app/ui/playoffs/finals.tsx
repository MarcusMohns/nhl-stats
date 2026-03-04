import type { SeriesType } from "@/app/types";
import Series from "./series";

type FinalsProps = {
  series: SeriesType[];
};
const Finals = ({ series }: FinalsProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Series series={series[0]} />
      <div
        aria-hidden="true"
        className="mt-4 h-px w-1/4 bg-stone-300 dark:bg-stone-700 md:h-auto md:w-10 md:bg-transparent md:border-t-2 md:border md:border-stone-300 md:dark:border-stone-600"
      />
      <Series series={series[1]} />
      <div
        aria-hidden="true"
        className="mt-4 h-px w-1/4 bg-stone-300 dark:bg-stone-700 md:h-auto md:w-10 md:bg-transparent md:border-t-2 md:border md:border-stone-300 md:dark:border-stone-600"
      />
      <Series series={series[2]} />
    </div>
  );
};

export default Finals;
