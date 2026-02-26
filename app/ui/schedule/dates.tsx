import React from "react";
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
    <div>
      {localSchedule.map((day) => (
        <div
          ref={(el) => {
            dateRefs.current[day.date] = el;
          }}
          id={`date-${day.date}`}
          key={day.date}
          className="flex flex-col w-full mb-8"
        >
          <h2 className="font-bold dark:text-stone-300 text-stone-800 text-xl mb-4 leading-tight tracking-wide select-none capitalize flex items-center opacity-90">
            <CalendarDaysIcon className="w-6 h-6 inline mb-1 mr-2 text-stone-500 dark:text-stone-400" />
            {utcToReadableDate(day.date)}
          </h2>
          <div className="space-y-3">
            {day.games.map((game) => (
              <Game key={game.id} game={game} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// prevent rerenders when props haven't changed; dateRefs is stable via useRef
export default React.memo(Dates);
