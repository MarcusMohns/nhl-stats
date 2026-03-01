import type { TeamType } from "@/app/types";

const STREAK_PRIORITY: Record<string, number> = {
  W: 2,
  OT: 1,
  L: 0,
};

const getStreakPriority = (streakCode: string) =>
  STREAK_PRIORITY[streakCode] ?? -1;

// Sorts by streak
export const sortByStreak = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => {
    const primarySort =
      getStreakPriority(b.streakCode) - getStreakPriority(a.streakCode);

    if (primarySort !== 0) return primarySort;

    if (a.streakCode === "L") {
      // Losing streaks: smaller is better (sort ascending)
      return a.streakCount - b.streakCount;
    }
    // Winning/OT streaks: larger is better (sort descending)
    return b.streakCount - a.streakCount;
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

const createSort =
  (compareFn: (a: TeamType, b: TeamType) => number) =>
  (standings: TeamType[]) =>
    standings.toSorted(compareFn);

export const sortFunctions: {
  // Our keys are the same as the buttons that trigger the sort, so we can use them to look up the correct sort function
  [key: string]: (standings: TeamType[]) => TeamType[];
} = {
  Team: createSort((a, b) =>
    a.teamName.default.localeCompare(b.teamName.default),
  ),
  Rank: createSort((a, b) => a.rank - b.rank),
  "Games Played": createSort((a, b) => b.gamesPlayed - a.gamesPlayed),
  Points: createSort((a, b) => b.points - a.points),
  Wins: createSort((a, b) => b.wins - a.wins),
  Losses: createSort((a, b) => b.losses - a.losses), // Descending: Most losses first
  "OT Losses": createSort((a, b) => b.otLosses - a.otLosses),
  "Goal Difference": createSort(
    (a, b) => b.goalDifferential - a.goalDifferential,
  ),
  "Last 10": createSort((a, b) => {
    const pointsA = a.l10Wins * 2 + a.l10OtLosses;
    const pointsB = b.l10Wins * 2 + b.l10OtLosses;
    return pointsB - pointsA;
  }),
  Streak: sortByStreak,
};
