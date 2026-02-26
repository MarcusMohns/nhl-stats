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
    <div className="flex flex-col md:flex-row lg:w-4xl w-full px-3 lg:px-0 justify-center content-center animate-fade-in relative">
      <DateSelector
        localSchedule={localSchedule}
        activeDate={activeDate}
        scrollToDate={scrollToDate}
      />
      <Dates localSchedule={localSchedule} dateRefs={dateRefs} />
    </div>
  );
};

export default ScheduleClient;
