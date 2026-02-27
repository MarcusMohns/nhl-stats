"use client";

import { useMemo, useRef } from "react";
import type { GameWeekType } from "@/app/types";
import { groupGamesByLocalDate } from "@/app/lib/schedule-utils";
import Dates from "./dates";
import DateSelector from "./date-selector";
import { useActiveDate } from "../../lib/hooks/use-active-date";

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

  // Put a ref on each date element to track which one is active
  const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { activeDate, scrollToDate } = useActiveDate(dateRefs, localSchedule);

  return (
    <section className="schedule flex flex-col xl:flex-row xl:w-7xl w-full px-3 xl:px-0 justify-center items-start animate-fade-in">
      <DateSelector
        localSchedule={localSchedule}
        activeDate={activeDate}
        scrollToDate={scrollToDate}
      />
      <Dates localSchedule={localSchedule} dateRefs={dateRefs} />
    </section>
  );
};

export default ScheduleClient;
