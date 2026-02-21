"use client";

import { useMemo } from "react";
import type { GameWeekType } from "@/app/types";
import Game from "./game";
import { utcToReadableDate } from "@/app/lib/schedule-utils";
import { groupGamesByLocalDate } from "@/app/lib/schedule-utils";

type ScheduleClientProps = {
  schedule: GameWeekType[];
};

const ScheduleClient = ({ schedule }: ScheduleClientProps) => {
  const localSchedule = useMemo(
    // Group games by local date since the API returns all times in UTC, but the day and date are based on US Eastern time,
    // which can cause confusion for users in other timezones.
    () => groupGamesByLocalDate(schedule),
    [schedule],
  );
  return (
    <div className="flex flex-col lg:w-4xl w-full px-3 lg:px-0 align-center justify-center content-center">
      {localSchedule.map((day) => (
        <div key={day.date} className="flex flex-col w-full my-4">
          <h2 className="text-2xl font-bold text-start w-full border-b border-gray-300 dark:border-stone-700  capitalize dark:text-stone-300 my-1">
            {utcToReadableDate(day.date)}
          </h2>
          {day.games.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScheduleClient;
