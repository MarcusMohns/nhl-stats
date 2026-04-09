"use server";
import {
  TeamType,
  Result,
  PlayoffsType,
  LeaderBoardsType,
  StandingsType,
  TeamStatsType,
  GameWeekType,
  LiveGameType,
} from "./types";
import { organizeStandings, fetchStandingsData } from "./lib/standings-utils";
import { organizedLeaderboards } from "./lib/leaderboard-utils";
import { organizedTeamStats } from "./lib/team-stats-utils";
import { fetchSchedule } from "./lib/schedule-utils";
import { fetchPlayoffs } from "./lib/playoffs-utils";
import { fetchLiveGame } from "./lib/game-utils";
import { cacheLife } from "next/cache";

async function handleApiCall<T>(
  fetcher: () => Promise<T>,
  errorMessagePrefix: string,
): Promise<Result<T>> {
  try {
    const data = await fetcher();
    return { success: true, data };
  } catch (e) {
    console.error(errorMessagePrefix, e);
    return {
      success: false,
      error: String(e) || "Error fetching data from the server ☹️",
    };
  }
}

export const getLeaderboards = async (): Promise<Result<LeaderBoardsType>> => {
  "use cache";
  cacheLife("minutes");
  return handleApiCall(
    organizedLeaderboards,
    "Error fetching leaders data from API",
  );
};

export const getStandings = async (): Promise<Result<StandingsType>> => {
  "use cache";
  cacheLife("hours");
  const fetchAndOrganizeStandings = async () => {
    const standingsData = await fetchStandingsData();
    return organizeStandings(standingsData);
  };
  return handleApiCall(
    fetchAndOrganizeStandings,
    "Error fetching standings data from API",
  );
};

export const getTeamStats = async (
  team: TeamType,
): Promise<Result<TeamStatsType>> => {
  "use cache";
  cacheLife("hours");
  return handleApiCall(
    () => organizedTeamStats(team),
    "Error fetching team stats data from API",
  );
};

export const getSchedule = async (): Promise<Result<GameWeekType[]>> => {
  "use cache";
  cacheLife("minutes");
  return handleApiCall(fetchSchedule, "Error fetching schedule data from API");
};

export const getPlayoffs = async (): Promise<Result<PlayoffsType>> => {
  "use cache";
  cacheLife("hours");
  return handleApiCall(fetchPlayoffs, "Error fetching playoffs data from API");
};

export const getLiveGame = async (
  id: string,
): Promise<Result<LiveGameType>> => {
  return handleApiCall(
    () => fetchLiveGame(id),
    "Error fetching schedule data from API",
  );
};
