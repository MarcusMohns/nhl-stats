import { sortByStreak, reverseStandings, sortFunctions } from "./sort-funcs";
import type { TeamType } from "@/app/types";

// Helper to create partial TeamType objects for testing
const createTeam = (
  overrides: Partial<TeamType> & { teamName?: { default: string } },
): TeamType => {
  return {
    teamName: { default: "Team", ...overrides.teamName },
    rank: 0,
    gamesPlayed: 0,
    points: 0,
    wins: 0,
    losses: 0,
    otLosses: 0,
    goalDifferential: 0,
    l10Wins: 0,
    l10OtLosses: 0,
    streakCode: "",
    streakCount: 0,
    ...overrides,
  } as unknown as TeamType;
};

describe("sort-funcs", () => {
  describe("sortByStreak", () => {
    it("sorts by streak priority (W > OT > L)", () => {
      const teams = [
        createTeam({
          streakCode: "L",
          streakCount: 1,
          teamName: { default: "Loser" },
        }),
        createTeam({
          streakCode: "W",
          streakCount: 1,
          teamName: { default: "Winner" },
        }),
        createTeam({
          streakCode: "OT",
          streakCount: 1,
          teamName: { default: "OT" },
        }),
      ];

      const sorted = sortByStreak(teams);
      expect(sorted.map((t) => t.streakCode)).toEqual(["W", "OT", "L"]);
    });

    it("sorts Winning streaks descending (larger count is better)", () => {
      const teams = [
        createTeam({ streakCode: "W", streakCount: 1 }),
        createTeam({ streakCode: "W", streakCount: 5 }),
        createTeam({ streakCode: "W", streakCount: 3 }),
      ];

      const sorted = sortByStreak(teams);
      expect(sorted.map((t) => t.streakCount)).toEqual([5, 3, 1]);
    });

    it("sorts OT streaks descending (larger count is better)", () => {
      const teams = [
        createTeam({ streakCode: "OT", streakCount: 1 }),
        createTeam({ streakCode: "OT", streakCount: 2 }),
      ];

      const sorted = sortByStreak(teams);
      expect(sorted.map((t) => t.streakCount)).toEqual([2, 1]);
    });

    it("sorts Losing streaks ascending (smaller count is better)", () => {
      const teams = [
        createTeam({ streakCode: "L", streakCount: 5 }),
        createTeam({ streakCode: "L", streakCount: 1 }),
        createTeam({ streakCode: "L", streakCount: 3 }),
      ];

      const sorted = sortByStreak(teams);
      expect(sorted.map((t) => t.streakCount)).toEqual([1, 3, 5]);
    });

    it("handles unknown streak codes by placing them last", () => {
      const teams = [
        createTeam({ streakCode: "Unknown", streakCount: 1 }),
        createTeam({ streakCode: "L", streakCount: 1 }),
        createTeam({ streakCode: "W", streakCount: 1 }),
      ];

      const sorted = sortByStreak(teams);
      // Priority: W (2) > L (0) > Unknown (-1)
      expect(sorted.map((t) => t.streakCode)).toEqual(["W", "L", "Unknown"]);
    });
  });

  describe("reverseStandings", () => {
    it("reverses the standings array", () => {
      const state = {
        standings: [
          createTeam({ teamName: { default: "A" } }),
          createTeam({ teamName: { default: "B" } }),
          createTeam({ teamName: { default: "C" } }),
        ],
        sortedBy: "Team",
      };

      const result = reverseStandings(state);
      expect(result.standings.map((t) => t.teamName.default)).toEqual([
        "C",
        "B",
        "A",
      ]);
      expect(result.sortedBy).toBe("Team");
    });
  });

  describe("sortFunctions", () => {
    it("sorts by Team (alphabetical)", () => {
      const teams = [
        createTeam({ teamName: { default: "B" } }),
        createTeam({ teamName: { default: "A" } }),
      ];
      const sorted = sortFunctions["Team"](teams);
      expect(sorted.map((t) => t.teamName.default)).toEqual(["A", "B"]);
    });

    it("sorts by Rank (ascending)", () => {
      const teams = [createTeam({ rank: 2 }), createTeam({ rank: 1 })];
      const sorted = sortFunctions["Rank"](teams);
      expect(sorted.map((t) => t.rank)).toEqual([1, 2]);
    });

    it("sorts by Games Played (descending)", () => {
      const teams = [
        createTeam({ gamesPlayed: 10 }),
        createTeam({ gamesPlayed: 20 }),
      ];
      const sorted = sortFunctions["Games Played"](teams);
      expect(sorted.map((t) => t.gamesPlayed)).toEqual([20, 10]);
    });

    it("sorts by Points (descending)", () => {
      const teams = [createTeam({ points: 50 }), createTeam({ points: 60 })];
      const sorted = sortFunctions["Points"](teams);
      expect(sorted.map((t) => t.points)).toEqual([60, 50]);
    });

    it("sorts by Wins (descending)", () => {
      const teams = [createTeam({ wins: 10 }), createTeam({ wins: 15 })];
      const sorted = sortFunctions["Wins"](teams);
      expect(sorted.map((t) => t.wins)).toEqual([15, 10]);
    });

    it("sorts by Losses (descending)", () => {
      // Note: The implementation sorts losses descending (b - a), meaning higher losses come first.
      // This might be counter-intuitive for a "good" ranking, but matches the code provided.
      const teams = [createTeam({ losses: 5 }), createTeam({ losses: 10 })];
      const sorted = sortFunctions["Losses"](teams);
      expect(sorted.map((t) => t.losses)).toEqual([10, 5]);
    });

    it("sorts by OT Losses (descending)", () => {
      const teams = [createTeam({ otLosses: 2 }), createTeam({ otLosses: 5 })];
      const sorted = sortFunctions["OT Losses"](teams);
      expect(sorted.map((t) => t.otLosses)).toEqual([5, 2]);
    });

    it("sorts by Goal Difference (descending)", () => {
      const teams = [
        createTeam({ goalDifferential: -5 }),
        createTeam({ goalDifferential: 5 }),
      ];
      const sorted = sortFunctions["Goal Difference"](teams);
      expect(sorted.map((t) => t.goalDifferential)).toEqual([5, -5]);
    });

    it("sorts by Last 10 (calculated points descending)", () => {
      // Team A: 5 wins (10 pts) + 1 OT loss (1 pt) = 11 pts
      // Team B: 6 wins (12 pts) + 0 OT loss (0 pt) = 12 pts
      const teams = [
        createTeam({ l10Wins: 5, l10OtLosses: 1, teamName: { default: "A" } }),
        createTeam({ l10Wins: 6, l10OtLosses: 0, teamName: { default: "B" } }),
      ];
      const sorted = sortFunctions["Last 10"](teams);
      expect(sorted.map((t) => t.teamName.default)).toEqual(["B", "A"]);
    });

    it("sorts by Streak using sortByStreak", () => {
      // Just verifying it maps to the correct function
      const teams = [
        createTeam({ streakCode: "L", streakCount: 1 }),
        createTeam({ streakCode: "W", streakCount: 1 }),
      ];
      const sorted = sortFunctions["Streak"](teams);
      expect(sorted.map((t) => t.streakCode)).toEqual(["W", "L"]);
    });
  });
});
