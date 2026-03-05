"use client";

import type {
  TeamType,
  DivisionTablePropsType,
  TableStateType,
} from "@/app/types";
import StyledTable from "./styled-table";
import { useCallback, useReducer } from "react";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import { reducer } from "@/app/lib/standings-utils";

const DivisionTable = ({
  central,
  atlantic,
  metropolitan,
  pacific,
  selectedTable,
}: DivisionTablePropsType) => {
  const initialState: TableStateType = {
    Central: { standings: central, sortedBy: "Points" },
    Atlantic: { standings: atlantic, sortedBy: "Points" },
    Metropolitan: { standings: metropolitan, sortedBy: "Points" },
    Pacific: { standings: pacific, sortedBy: "Points" },
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
        standings={state.Central.standings}
        tableName={"Central"}
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Atlantic.standings}
        tableName={"Atlantic"}
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Metropolitan.standings}
        tableName={"Metropolitan"}
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={state.Pacific.standings}
        tableName={"Pacific"}
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
    </>
  );
};

export default DivisionTable;
