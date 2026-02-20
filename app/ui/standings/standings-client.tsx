"use client";

import { useState } from "react";
import LeagueTable from "./_components/tables/league-table";
import ConferenceTable from "./_components/tables/conference-table";
import DivisionTable from "./_components/tables/division-table";
import WildCardTable from "./_components/tables/wild-card-table";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import SelectTableButtons from "../select-table-buttons";
import type { StandingsType } from "@/app/types";

type StandingsClientProps = {
  standings: StandingsType;
};

const StandingsClient = ({ standings }: StandingsClientProps) => {
  const [selectedTable, setSelectedTable] = useState<string>("League");
  const handleSelectedTable = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedTable(standing));
  };

  return (
    <section className="standings h-max sm:p-5">
      <h1 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Standings
      </h1>
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
        ❌ = Eliminated ✅= Qualified
      </div>
    </section>
  );
};

export default StandingsClient;
