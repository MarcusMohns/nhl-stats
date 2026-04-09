import type {
  TeamType,
  SkaterType,
  GoalieType,
  GameType,
  TeamStatsType,
} from "../types";

type TeamStatsResponse = {
  skaters: SkaterType[];
  goalies: GoalieType[];
  season: string;
  gameType: number;
};

type ScheduleResponse = {
  games: GameType[];
};

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    return (await response.json()) as T;
  } catch (e) {
    console.error(`Error fetching data from ${url}`, e);
    throw e;
  }
};

export const organizedTeamStats = async (
  team: TeamType,
): Promise<TeamStatsType> => {
  const teamUrl = `https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/now`;
  const gamesUrl = `https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`;

  try {
    const [teamData, gamesThisWeekData] = await Promise.all([
      fetchData<TeamStatsResponse>(teamUrl),
      fetchData<ScheduleResponse>(gamesUrl),
    ]);
    if (!teamData || !gamesThisWeekData) throw new Error("Error getting data");

    const topSkaters = teamData.skaters
      .toSorted((a, b) => b.points - a.points)
      .slice(0, 3);

    const topGoalies = teamData.goalies
      .toSorted((a, b) => b.savePercentage - a.savePercentage)
      .slice(0, 2);

    return {
      ...teamData,
      topSkaters,
      topGoalies,
      games: gamesThisWeekData.games,
    };
  } catch (e) {
    console.error("Error fetching team data from API", e);
    throw new Error("Error fetching data from the server ☹️");
  }
};
