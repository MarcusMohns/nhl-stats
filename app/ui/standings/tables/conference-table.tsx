import type {
  TeamType,
  ConferenceTableProps,
  TableStateType,
} from "@/app/types";
import StyledTable from "./styled-table";
import { useCallback, useReducer } from "react";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import { reducer } from "@/app/lib/standings-utils";

const ConferenceTable = ({
  eastern,
  western,
  selectedTable,
}: ConferenceTableProps) => {
  const initialState: TableStateType = {
    Eastern: { standings: eastern, sortedBy: "Points" },
    Western: { standings: western, sortedBy: "Points" },
  };

  // Create a table state using the reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      startViewTransitionWrapper(() =>
        // use the reducer to update the state
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
        standings={state.Eastern.standings}
        tableName={"Eastern"}
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Western.standings}
        tableName={"Western"}
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
    </>
  );
};

export default ConferenceTable;
