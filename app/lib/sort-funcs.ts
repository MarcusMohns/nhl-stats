import type { TeamType } from "@/app/types";

const getStreakPriority = (streakCode: string) => {
  switch (streakCode) {
    case "W":
      return 2;
    case "OT":
      return 1;
    case "L":
      return 0;
    default:
      return -1;
  }
};

// Sorts by streak
export const sortByStreak = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => {
    const primarySort =
      getStreakPriority(b.streakCode) - getStreakPriority(a.streakCode);

    if (primarySort !== 0) {
      return primarySort;
    } else if (a.streakCode === "L") {
      // Losing streaks: smaller is better (sort ascending)
      return a.streakCount - b.streakCount;
    } else {
      // Winning/OT streaks: larger is better (sort descending)
      return b.streakCount - a.streakCount;
    }
  });

// Reverse the standings (typically called on the second click of the sort button)
export const reverseStandings = (state: {
  standings: TeamType[];
  sortedBy: string;
}) => {
  return {
    standings: state.standings.toReversed(),
    sortedBy: state.sortedBy,
  };
};

export const sortFunctions: {
  [key: string]: (standings: TeamType[]) => TeamType[];
} = {
  // All the sort functions for our standings - called by running sortFunctions[key](standings)
  Team: (standings) =>
    standings.toSorted((a, b) =>
      a.teamName.default.localeCompare(b.teamName.default),
    ),
  Rank: (standings) => standings.toSorted((a, b) => a.rank - b.rank),
  "Games Played": (standings) =>
    standings.toSorted((a, b) => b.gamesPlayed - a.gamesPlayed),
  Points: (standings) => standings.toSorted((a, b) => b.points - a.points),
  Wins: (standings) => standings.toSorted((a, b) => b.wins - a.wins),
  Losses: (standings) => standings.toSorted((a, b) => b.losses - a.losses),
  "OT Losses": (standings) =>
    standings.toSorted((a, b) => b.otLosses - a.otLosses),
  "Goal Difference": (standings) =>
    standings.toSorted((a, b) => b.goalDifferential - a.goalDifferential),
  "Last 10": (standings) => standings.toSorted((a, b) => b.l10Wins - a.l10Wins),
  //   "Last 10": (standings) => todo try
  //     standings.toSorted((a, b) => {
  //       const pointsA = a.l10Wins * 2 + a.l10OtLosses;
  //       const pointsB = b.l10Wins * 2 + b.l10OtLosses;
  //       return pointsB - pointsA;
  //     }),
  Streak: (standings) => sortByStreak(standings),
};
