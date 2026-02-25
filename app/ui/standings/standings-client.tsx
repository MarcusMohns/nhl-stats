"use client";

import { useState } from "react";
import LeagueTable from "./tables/league-table";
import ConferenceTable from "./tables/conference-table";
import DivisionTable from "./tables/division-table";
import WildCardTable from "./tables/wild-card-table";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import SelectTableButtons from "../select-table-buttons";
import type { StandingsType } from "@/app/types";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";

type StandingsClientProps = {
  standings: StandingsType;
};

const StandingsClient = ({ standings }: StandingsClientProps) => {
  const [selectedTable, setSelectedTable] = useState<string>("League");
  const handleSelectedTable = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedTable(standing));
  };

  return (
    <section className="standings w-full xl:w-6xl animate-fade-in h-max sm:p-5">
      <SelectTableButtons
        buttons={["League", "Division", "Conference", "Wild Card"]}
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
      <div className="flex flex-row text-sm font-semibold uppercase p-3 gap-1">
        <XMarkIcon className="w-5 h-5 text-red-500" /> = Eliminated{" "}
        <CheckBadgeIcon className="w-5 h-5 text-green-500" /> = Qualified
      </div>
    </section>
  );
};

export default StandingsClient;
