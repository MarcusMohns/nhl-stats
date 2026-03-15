"use client";

import { useMemo, useRef } from "react";
import type { GameWeekType } from "@/app/types";
import { groupGamesByLocalDate } from "@/app/lib/schedule-utils";
import Dates from "./dates";
import DateSelector from "./date-selector";
import { useActiveDate } from "../../lib/hooks/use-active-date";
import { useHydration } from "@/app/lib/hooks/use-hydration";
import { DateSelectorSkeleton, DatesSkeleton } from "@/app/schedule/loading";

type ScheduleClientProps = {
  schedule: GameWeekType[];
};

const ScheduleClient = ({ schedule }: ScheduleClientProps) => {
  const userLocalSchedule = useMemo(
    // UTC is based on US timezones so in order to display the date correctly we need to convert it to local time
    () => groupGamesByLocalDate(schedule),
    [schedule],
  );

  // Check if the client has hydrated
  const hydrated = useHydration();

  // Put a ref on each date element to track which one is active
  const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Get the date currently in view and a function to scroll to a date (initialized after hydration)
  const { activeDate, scrollToDate } = useActiveDate(
    dateRefs,
    userLocalSchedule,
    hydrated,
  );

  return (
    <section
      aria-label="Game Schedule"
      className="schedule flex flex-col xl:flex-row xl:w-7xl w-full px-3 xl:px-0 justify-center items-start animate-fade-in"
    >
      {/* userLocalSchedule relies on the users locale & timezone to format the dates which isn't available on the server.
       Therefore, wait for the client to hydrate before rendering the schedule to avoid hydration mismatching
      */}
      {hydrated ? (
        <>
          <DateSelector
            userLocalSchedule={userLocalSchedule}
            activeDate={activeDate}
            scrollToDate={scrollToDate}
          />
          <Dates userLocalSchedule={userLocalSchedule} dateRefs={dateRefs} />
        </>
      ) : (
        <>
          <span className="sr-only">Loading...</span>
          <DateSelectorSkeleton />
          <DatesSkeleton />
        </>
      )}
    </section>
  );
};

export default ScheduleClient;
