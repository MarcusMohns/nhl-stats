import type { TeamType, TableStateType } from "@/app/types";
import { useCallback, useMemo, useReducer } from "react";
import StyledTable from "./styled-table";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import { reducer } from "@/app/lib/standings-utils";

type WildCardTableProps = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  western: TeamType[];
  eastern: TeamType[];
  selectedTable: string;
};

const WildCardTable = ({
  central,
  atlantic,
  metropolitan,
  pacific,
  western,
  eastern,
  selectedTable,
}: WildCardTableProps) => {
  const qualified = useMemo(() => {
    // Create an object containing the top 3 teams from each conference
    const topThreeCentral = central.slice(0, 3);
    const topThreeAtlantic = atlantic.slice(0, 3);
    const topThreeMetropolitan = metropolitan.slice(0, 3);
    const topThreePacific = pacific.slice(0, 3);
    const teamsQualified = [
      // Create filter array of currently already qualified teams (not eligible to be a wild card team)
      ...topThreeCentral.map((team) => team.teamName.default),
      ...topThreeAtlantic.map((team) => team.teamName.default),
      ...topThreeMetropolitan.map((team) => team.teamName.default),
      ...topThreePacific.map((team) => team.teamName.default),
    ];
    return {
      // Keep all teams eligible for wild card (those not already qualified)
      east: eastern.filter(
        (team) => !teamsQualified.includes(team.teamName.default),
      ),
      // Keep all teams eligible for wild card (those not already qualified)
      west: western.filter(
        (team) => !teamsQualified.includes(team.teamName.default),
      ),
      // Return top 3 teams from each conference (The 3 currently qualified teams)
      central: topThreeCentral,
      atlantic: topThreeAtlantic,
      metropolitan: topThreeMetropolitan,
      pacific: topThreePacific,
    };
  }, [central, atlantic, metropolitan, pacific, eastern, western]);

  const initialState: TableStateType = {
    Central: { standings: qualified.central, sortedBy: "Points" },
    Atlantic: { standings: qualified.atlantic, sortedBy: "Points" },
    Metropolitan: { standings: qualified.metropolitan, sortedBy: "Points" },
    Pacific: { standings: qualified.pacific, sortedBy: "Points" },
    Western: { standings: qualified.west, sortedBy: "Points" },
    Eastern: { standings: qualified.east, sortedBy: "Points" },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      startViewTransitionWrapper(() =>
        dispatch({
          type: "SORT",
          tableName: argument,
          sortBy,
          currentStandings: oldStandings,
        }),
      );
    },
    [],
  );

  return (
    <>
      <StyledTable
        standings={state.Atlantic.standings}
        tableName={"Atlantic"}
        aria-label="Atlantic Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Metropolitan.standings}
        tableName={"Metropolitan"}
        aria-label="Metropolitan Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Eastern.standings}
        tableName={"Eastern"}
        aria-label="Eastern Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Central.standings}
        tableName={"Central"}
        aria-label="Central Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Pacific.standings}
        tableName={"Pacific"}
        aria-label="Pacific Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Western.standings}
        tableName={"Western"}
        aria-label="Western Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
    </>
  );
};

export default WildCardTable;
