import type { TeamType, SkaterType, GoalieType, GameType } from "../types";

type TeamStatsResponse = {
  skaters: SkaterType[];
  goalies: GoalieType[];
};

type ScheduleResponse = {
  games: GameType[];
};

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      cache: "force-cache",
    });
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

export const organizedTeamStats = async (team: TeamType) => {
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
      .slice(0, 2);

    // todo sort by points
    const topGoalie = teamData.goalies.toSorted(
      (a, b) => b.savePercentage - a.savePercentage,
    )[0];

    return {
      ...teamData,
      topSkaters,
      topGoalie,
      games: gamesThisWeekData.games,
    };
  } catch (e) {
    console.error("Error fetching team data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};
