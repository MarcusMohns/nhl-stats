"use client";

import { Suspense, useMemo, useRef } from "react";
import type { GameWeekType } from "@/app/types";
import { groupGamesByLocalDate } from "@/app/lib/schedule-utils";
import Dates from "./dates";
import DateSelector from "./date-selector";
import { useActiveDate } from "../../lib/hooks/use-active-date";
import { useHydration } from "@/app/lib/hooks/use-hydration";

type ScheduleClientProps = {
  schedule: GameWeekType[];
};

const ScheduleClient = ({ schedule }: ScheduleClientProps) => {
  const localSchedule = useMemo(
    // Group games by local date since the API returns all times in UTC,
    // but the day and date are based on US Eastern time,
    // which can cause confusion for users in other timezones.
    () => groupGamesByLocalDate(schedule),
    [schedule],
  );

  // Put a ref on each date element to track which one is active
  const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { activeDate, scrollToDate } = useActiveDate(dateRefs, localSchedule);
  const hydrated = useHydration();

  return (
    <section
      aria-label="Game Schedule"
      className="schedule flex flex-col xl:flex-row xl:w-7xl w-full px-3 xl:px-0 justify-center items-start animate-fade-in"
    >
      {hydrated ? (
        <>
          <DateSelector
            localSchedule={localSchedule}
            activeDate={activeDate}
            scrollToDate={scrollToDate}
          />
          <Dates localSchedule={localSchedule} dateRefs={dateRefs} />
        </>
      ) : (
        <div>Loading..</div>
      )}
    </section>
  );
};

export default ScheduleClient;
