import {
  fetchStandingsData,
  organizeStandings,
  reducer,
  reverseStandings,
  sortByStreak,
  sortFunctions,
} from "./standings-utils";
import type { TeamType, TableStateType, ActionType } from "../types";

global.fetch = jest.fn();

describe("standings-utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchStandingsData", () => {
    it("fetches standings data", async () => {
      const mockData = { standings: [{ teamName: "Oilers" }] };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchStandingsData();
      expect(result).toEqual(mockData.standings);
    });
  });

  describe("organizeStandings", () => {
    it("organizes teams into correct hierarchy and adds ranks", () => {
      const mockTeams = [
        {
          teamAbbrev: { default: "EDM" },
          conferenceName: "Western",
          divisionName: "Pacific",
        },
        {
          teamAbbrev: { default: "TOR" },
          conferenceName: "Eastern",
          divisionName: "Atlantic",
        },
      ] as unknown as TeamType[];

      const result = organizeStandings(mockTeams);

      // Check League
      expect(result.League).toHaveLength(2);
      expect(result.League[0].rank).toBe(1);
      expect(result.League[1].rank).toBe(2);
      expect(result.League[0].teamLogoDark).toContain("EDM_dark.svg");

      // Check Conferences
      expect(result.Western).toHaveLength(1);
      expect(result.Eastern).toHaveLength(1);
      expect(result.Western[0].rank).toBe(1);

      // Check Divisions
      expect(result.Pacific).toHaveLength(1);
      expect(result.Atlantic).toHaveLength(1);
    });
  });

  describe("sortByStreak", () => {
    it("sorts teams by streak correctly", () => {
      const teams = [
        { streakCode: "L", streakCount: 3 },
        { streakCode: "W", streakCount: 5 },
        { streakCode: "OT", streakCount: 2 },
        { streakCode: "L", streakCount: 1 },
        { streakCode: "W", streakCount: 2 },
      ] as TeamType[];

      const sorted = sortByStreak(teams);

      expect(sorted.map((t) => `${t.streakCode}${t.streakCount}`)).toEqual([
        "W5",
        "W2",
        "OT2",
        "L1",
        "L3",
      ]);
    });
  });

  describe("reverseStandings", () => {
    it("reverses the order of standings", () => {
      const state = {
        standings: [{ rank: 1 }, { rank: 2 }, { rank: 3 }] as TeamType[],
        sortedBy: "Rank",
      };

      const reversed = reverseStandings(state);

      expect(reversed.standings.map((t) => t.rank)).toEqual([3, 2, 1]);
      expect(reversed.sortedBy).toBe("Rank");
    });
  });

  describe("sortFunctions", () => {
    const teams = [
      { teamName: { default: "Jets" }, points: 90, rank: 3 },
      { teamName: { default: "Canucks" }, points: 100, rank: 1 },
      { teamName: { default: "Oilers" }, points: 95, rank: 2 },
    ] as TeamType[];

    it("sorts by Team name", () => {
      const sorted = sortFunctions.Team(teams);
      expect(sorted.map((t) => t.teamName.default)).toEqual([
        "Canucks",
        "Jets",
        "Oilers",
      ]);
    });

    it("sorts by Points", () => {
      const sorted = sortFunctions.Points(teams);
      expect(sorted.map((t) => t.points)).toEqual([100, 95, 90]);
    });

    it("sorts by Rank", () => {
      const sorted = sortFunctions.Rank(teams);
      expect(sorted.map((t) => t.rank)).toEqual([1, 2, 3]);
    });
  });

  describe("reducer", () => {
    const initialState: TableStateType = {
      TestTable: {
        standings: [
          { teamName: { default: "B" }, points: 10 },
          { teamName: { default: "A" }, points: 20 },
        ] as TeamType[],
        sortedBy: "Team",
      },
    };

    it("sorts by a new column", () => {
      const action: ActionType = {
        type: "SORT",
        tableName: "TestTable",
        sortBy: "Points",
        currentStandings: initialState.TestTable.standings,
      };

      const newState = reducer(initialState, action);
      const newTableState = newState.TestTable;

      expect(newTableState.sortedBy).toBe("Points");
      expect(newTableState.standings.map((t) => t.points)).toEqual([20, 10]);
    });

    it("reverses sort on the same column", () => {
      // First sort by points
      const firstAction: ActionType = {
        type: "SORT",
        tableName: "TestTable",
        sortBy: "Points",
        currentStandings: initialState.TestTable.standings,
      };
      const firstState = reducer(initialState, firstAction);

      // Then sort by points again to reverse
      const secondAction: ActionType = {
        type: "SORT",
        tableName: "TestTable",
        sortBy: "Points",
        currentStandings: firstState.TestTable.standings,
      };
      const secondState = reducer(firstState, secondAction);
      const newTableState = secondState.TestTable;

      expect(newTableState.sortedBy).toBe("Points");
      expect(newTableState.standings.map((t) => t.points)).toEqual([10, 20]);
    });

    it("returns default state for unknown action", () => {
      const action = {
        type: "UNKNOWN",
      } as unknown as ActionType;
      const newState = reducer(initialState, action);
      expect(newState).toEqual(initialState);
    });
  });
});
