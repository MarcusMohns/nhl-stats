"use client";

import { useState } from "react";
import LeagueTable from "./tables/league-table";
import ConferenceTable from "./tables/conference-table";
import DivisionTable from "./tables/division-table";
import WildCardTable from "./tables/wild-card-table";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import SelectTableButtons from "../select-table-buttons";
import type { StandingsType } from "@/app/types";
import {
  CheckBadgeIcon,
  XMarkIcon,
  GlobeAmericasIcon,
  ViewColumnsIcon,
  MapIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import {
  GlobeAmericasIcon as GlobeAmericasIconSolid,
  ViewColumnsIcon as ViewColumnsIconSolid,
  MapIcon as MapIconSolid,
  TicketIcon as TicketIconSolid,
} from "@heroicons/react/24/solid";

type StandingsClientProps = {
  standings: StandingsType;
};

const TABLE_TABS = [
  {
    name: "League",
    icon: (
      <GlobeAmericasIcon className="w-5 h-5 inline mr-1" aria-hidden="true" />
    ),
    iconSolid: (
      <GlobeAmericasIconSolid
        className="w-5 h-5 inline mr-1 text-blue-600 dark:text-blue-400"
        aria-hidden="true"
      />
    ),
  },
  {
    name: "Division",
    icon: (
      <ViewColumnsIcon className="w-5 h-5 inline mr-1" aria-hidden="true" />
    ),
    iconSolid: (
      <ViewColumnsIconSolid
        className="w-5 h-5 inline mr-1 text-teal-700 dark:text-teal-400"
        aria-hidden="true"
      />
    ),
  },
  {
    name: "Conference",
    icon: <MapIcon className="w-5 h-5 inline mr-1" aria-hidden="true" />,
    iconSolid: (
      <MapIconSolid
        className="w-5 h-5 inline mr-1 text-indigo-600 dark:text-indigo-400"
        aria-hidden="true"
      />
    ),
  },
  {
    name: "Wild Card",
    icon: <TicketIcon className="w-5 h-5 inline mr-1" aria-hidden="true" />,
    iconSolid: (
      <TicketIconSolid
        className="w-5 h-5 inline mr-1 text-amber-700 dark:text-amber-400"
        aria-hidden="true"
      />
    ),
  },
];

const StandingsClient = ({ standings }: StandingsClientProps) => {
  const [selectedTable, setSelectedTable] = useState<string>("League");
  const handleSelectedTable = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedTable(standing));
  };

  return (
    <section className="standings w-full xl:w-6xl animate-fade-in h-max sm:p-5">
      <SelectTableButtons
        buttons={TABLE_TABS}
        handleSelectedTable={handleSelectedTable}
        selectedTable={selectedTable}
      />
      {selectedTable === "League" && (
        <LeagueTable league={standings.League} selectedTable={selectedTable} />
      )}
      {selectedTable === "Conference" && (
        <ConferenceTable
          eastern={standings.Eastern}
          western={standings.Western}
          selectedTable={selectedTable}
        />
      )}
      {selectedTable === "Division" && (
        <DivisionTable
          central={standings.Central}
          atlantic={standings.Atlantic}
          metropolitan={standings.Metropolitan}
          pacific={standings.Pacific}
          selectedTable={selectedTable}
        />
      )}
      {/* rendered slightly different, needs parts of the other tables */}
      {selectedTable === "Wild Card" && (
        <WildCardTable
          central={standings.Central}
          atlantic={standings.Atlantic}
          metropolitan={standings.Metropolitan}
          pacific={standings.Pacific}
          eastern={standings.Eastern}
          western={standings.Western}
          selectedTable={selectedTable}
        />
      )}
      <div
        className="flex flex-row flex-wrap text-sm font-semibold uppercase p-3 gap-4"
        aria-hidden="true"
      >
        <span className="flex items-center gap-1">
          <XMarkIcon className="w-5 h-5 text-red-600 dark:text-red-500" /> =
          Eliminated
        </span>
        <span className="flex items-center gap-1">
          <CheckBadgeIcon className="w-5 h-5 text-green-600 dark:text-green-500" />{" "}
          = Qualified
        </span>
      </div>
    </section>
  );
};

export default StandingsClient;
