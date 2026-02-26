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
      className="flex flex-col h-max sticky items-center shadow-sm justify-start md:justify-center top-0 z-20 bg-white rounded dark:bg-stone-900 py-3 px-3 lg:mx-0 lg:px-0 mb-6 flex overflow-x-auto gap-2 snap-x"
      style={{ scrollbarWidth: "none" }}
    >
      {localSchedule.map((day) => {
        const isSelected = activeDate === day.date;
        return (
          <button
            key={day.date}
            onClick={() => scrollToDate(day.date)}
            className={`
                flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 snap-start border
                ${
                  isSelected
                    ? "bg-stone-800 text-white border-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-md transform scale-105"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-700"
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
