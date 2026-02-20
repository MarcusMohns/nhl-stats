"use client";

import { TeamType, StandingsTableType } from "@/app/types";
import StyledTable from "./styled-table";
import { useState, useCallback } from "react";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import { reverseStandings, sortFunctions } from "@/app/lib/sort-funcs";

type LeagueTablePropTypes = {
  league: TeamType[];
  selectedTable: string;
};

const LeagueTable = ({ league, selectedTable }: LeagueTablePropTypes) => {
  const [leagueState, setLeagueState] = useState<StandingsTableType>({
    standings: league,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      startViewTransitionWrapper(() =>
        setLeagueState((prevState) =>
          prevState.sortedBy === sortBy
            ? reverseStandings(prevState)
            : { standings: newStandings, sortedBy: sortBy },
        ),
      );
    },
    [setLeagueState],
  );

  return (
    <StyledTable
      standings={leagueState.standings}
      handleSort={handleSort}
      tableName={"League"}
      selectedTable={selectedTable}
      aria-label="League Standings Table"
    />
  );
};

export default LeagueTable;
