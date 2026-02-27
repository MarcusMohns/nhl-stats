import type { GameType } from "@/app/types";
import { utcToReadableDate } from "@/app/lib/schedule-utils";

type DateSelectorProps = {
  localSchedule: {
    date: string;
    games: (GameType & {
      localStartTime: string;
    })[];
  }[];
  activeDate: string;
  scrollToDate: (date: string) => void;
};

const DateSelector = ({
  localSchedule,
  activeDate,
  scrollToDate,
}: DateSelectorProps) => {
  return (
    <div
      className="flex xl:flex-col h-full xl:min-h-100 w-full px-3 my-3 xl:w-40 gap-2 shadow-lg sticky top-0 xl:top-[35vh] xl:mr-auto justify-start xl:justify-around z-20 rounded-md bg-stone-100 dark:bg-stone-800 p-3 xl:mb-6 flex overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {localSchedule.map((day) => {
        const isSelected = activeDate === day.date;
        return (
          <button
            key={day.date}
            onClick={() => scrollToDate(day.date)}
            className={`
                flex-shrink-0 xl:w-full px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 snap-start cursor-pointer
                ${
                  isSelected
                    ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 shadow-md"
                    : "text-stone-600 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-700"
                }
              `}
          >
            {utcToReadableDate(day.date)}
          </button>
        );
      })}
    </div>
  );
};

export default DateSelector;
