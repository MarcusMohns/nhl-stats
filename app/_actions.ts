"use server";
import {
  TeamType,
  Result,
  PlayoffsType,
  LeaderBoardsType,
  StandingsType,
  TeamStatsType,
  GameWeekType,
} from "./types";
import { organizeStandings, fetchStandingsData } from "./lib/standings-utils";
import { organizedLeaderboards } from "./lib/leaderboard-utils";
import { organizedTeamStats } from "./lib/team-stats-utils";
import { fetchSchedule } from "./lib/schedule-utils";
import { fetchPlayoffs } from "./lib/playoffs-utils";

export const getLeaderboards = async (): Promise<Result<LeaderBoardsType>> => {
  try {
    const data = await organizedLeaderboards();
    return { success: true, data };
  } catch (e) {
    console.error("Error fetching leaders data from API", e);
    return {
      success: false,
      error: String(e) || "Error fetching data from the server ☹️",
    };
  }
};

export const getStandings = async (): Promise<Result<StandingsType>> => {
  try {
    const standingsData = await fetchStandingsData();
    const data = organizeStandings(standingsData);
    return { success: true, data };
  } catch (e) {
    console.error("Error fetching standings data from API", e);
    return {
      success: false,
      error: String(e) || "Error fetching data from the server ☹️",
    };
  }
};

export const getTeamStats = async (
  team: TeamType,
): Promise<Result<TeamStatsType>> => {
  try {
    const data = await organizedTeamStats(team);
    return { success: true, data };
  } catch (e) {
    console.error("Error fetching team stats data from API", e);
    return {
      success: false,
      error: String(e) || "Error fetching data from the server ☹️",
    };
  }
};

export const getSchedule = async (): Promise<Result<GameWeekType[]>> => {
  try {
    const data = await fetchSchedule();
    return { success: true, data };
  } catch (e) {
    console.error("Error fetching schedule data from API", e);
    return {
      success: false,
      error: String(e) || "Error fetching data from the server ☹️",
    };
  }
};

export const getPlayoffs = async (): Promise<Result<PlayoffsType>> => {
  try {
    const data = await fetchPlayoffs();
    return { success: true, data };
  } catch (e) {
    console.error("Error fetching playoffs data from API", e);
    return {
      success: false,
      error: String(e) || "Error fetching data from the server ☹️",
    };
  }
};
