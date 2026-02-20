"use server";
import { TeamType } from "./types";
import { organizeStandings, fetchStandingsData } from "./lib/standings-utils";
import { organizedLeaderboards } from "./lib/leaderboard-utils";
import { organizedTeamStats } from "./lib/team-stats-utils";

export const getLeaderboards = async () => {
  try {
    return await organizedLeaderboards();
  } catch (e) {
    console.error("Error fetching leaders data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};

export const getStandings = async () => {
  try {
    const standingsData = await fetchStandingsData();
    return organizeStandings(standingsData);
  } catch (e) {
    console.error("Error fetching standings data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};

export const getTeamStats = async (team: TeamType) => {
  try {
    return await organizedTeamStats(team);
  } catch (e) {
    console.error("Error fetching team stats data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};
