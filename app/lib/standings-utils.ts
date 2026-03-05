import { StandingsType, TeamType, TableStateType, ActionType } from "../types";

export const fetchStandingsData = async (): Promise<TeamType[]> => {
  const standingsUrl = "https://api-web.nhle.com/v1/standings/now";
  const response = await fetch(standingsUrl, {
    next: { revalidate: 60 },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch standings data");
  }
  const data = (await response.json()) as { standings: TeamType[] };
  return data.standings;
};

export const organizeStandings = (standingsData: TeamType[]): StandingsType =>
  standingsData.reduce(
    // Add the teams into correct League, Conference and Division - then set to state
    (acc: StandingsType, team: TeamType) => {
      const teamLogoDark = `https://assets.nhle.com/logos/nhl/svg/${team.teamAbbrev.default}_dark.svg`;
      const teamAndDarkLogo = { ...team, teamLogoDark };
      // Dark Logo is missing from the API call for some reason, add it manually for now.
      acc.League.push({
        ...teamAndDarkLogo,
        rank: acc.League.length + 1,
      });

      const conf = team.conferenceName;
      if (!acc[conf]) {
        acc[conf] = [];
      }
      acc[conf].push({
        ...teamAndDarkLogo,
        rank: acc[conf].length + 1,
      });

      const div = team.divisionName;
      if (!acc[div]) {
        acc[div] = [];
      }
      acc[div].push({
        ...teamAndDarkLogo,
        rank: acc[div].length + 1,
      });
      return acc;
    },
    {
      League: [],
      Western: [],
      Eastern: [],
      Central: [],
      Atlantic: [],
      Metropolitan: [],
      Pacific: [],
    },
  );

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

export const reducer = (
  state: TableStateType,
  action: ActionType,
): TableStateType => {
  // Accept a state and an action, and return a new table state
  switch (action.type) {
    case "SORT": {
      const { tableName, sortBy, currentStandings } = action;
      const currentTableState = state[tableName];

      // If the table is already sorted by this column, reverse it
      if (currentTableState.sortedBy === sortBy) {
        return {
          ...state,
          [tableName]: reverseStandings(currentTableState),
        };
      }
      // Otherwise, sort the table by the new column
      const newStandings = sortFunctions[sortBy](currentStandings);
      return {
        ...state,
        [tableName]: {
          standings: newStandings,
          sortedBy: sortBy,
        },
      };
    }
    default:
      return state;
  }
};
