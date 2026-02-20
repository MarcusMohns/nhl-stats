import React from "react";
import type { TeamType } from "@/app/types";

type TableHeaderProps = {
  header: string;
  idx: number;
  standings: TeamType[];
  headers: {
    full: string[];
    abbreviated: string[];
  };
  tableName: string;
  handleSort: (
    standings: TeamType[],
    header: string,
    tableName: string,
  ) => void;
};

const TableHeader = ({
  header,
  handleSort,
  idx,
  standings,
  headers,
  tableName,
}: TableHeaderProps) => {
  // Hide headers for Last 10 and Streak on smaller screens
  const HIDDEN_HEADERS = ["Last 10", "Streak"];
  return (
    <th
      className={`text-gray-600 dark:text-stone-300 text-center p-2 relative select-none ${
        HIDDEN_HEADERS.includes(header) ? "hidden md:table-cell" : ""
      }`}
      title={header}
    >
      <button
        className="cursor-pointer"
        onClick={() => handleSort(standings, header, tableName)}
        aria-label={`Sort by ${header}`}
      >
        {/* Show full sized header on larger screens, abbreviated on smaller */}
        <p className="hidden 2xl:block">{header}</p>
        <p className="sm:block 2xl:hidden">{headers.abbreviated[idx]}</p>
      </button>
    </th>
  );
};

export default TableHeader;
