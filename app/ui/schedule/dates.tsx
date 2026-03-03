import type { GameType } from "@/app/types";
import { utcToReadableDate } from "@/app/lib/schedule-utils";
import Game from "./game";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

type DatesProps = {
  localSchedule: {
    date: string;
    games: (GameType & {
      localStartTime: string;
    })[];
  }[];
  dateRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
};

const Dates = ({ localSchedule, dateRefs }: DatesProps) => {
  return (
    <div className="flex flex-col w-full xl:w-5xl xl:mr-auto xl:pr-40">
      {localSchedule.map((day) => (
        <div
          ref={(el) => {
            dateRefs.current[day.date] = el;
          }}
          id={`date-${day.date}`}
          key={day.date}
          className="flex flex-col w-full mb-8 xl:px-5"
          aria-labelledby={`heading-${day.date}`}
        >
          <h2
            id={`heading-${day.date}`}
            className="font-bold dark:text-stone-300 text-stone-800 text-xl mb-4 leading-tight tracking-wide capitalize flex items-center opacity-90"
          >
            <CalendarDaysIcon
              aria-hidden="true"
              className="w-6 h-6 inline mb-1 mr-2 text-stone-500 dark:text-stone-400"
            />
            {utcToReadableDate(day.date)}
          </h2>
          <ul className="flex flex-col gap-1">
            {day.games.map((game) => (
              <li key={game.id}>
                <Game game={game} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Dates;
