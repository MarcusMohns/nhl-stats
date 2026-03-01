import { StandingsType, TeamType } from "../types";

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
