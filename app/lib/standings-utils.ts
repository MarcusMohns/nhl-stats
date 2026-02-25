import { StandingsType, TeamType } from "../types";

export const fetchStandingsData = async () => {
  const standingsUrl = "https://api-web.nhle.com/v1/standings/now";
  const response = await fetch(standingsUrl, {
    next: { revalidate: 60 },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch standings data");
  }
  const data = await response.json();
  return data.standings as TeamType[];
};

export const organizeStandings = (standingsData: TeamType[]) =>
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
      if (!acc[team.conferenceName]) {
        acc[team.conferenceName] = [];
      }
      acc[team.conferenceName].push({
        ...teamAndDarkLogo,
        rank: acc[team.conferenceName].length + 1,
      });
      if (!acc[team.divisionName]) {
        acc[team.divisionName] = [];
      }
      acc[team.divisionName].push({
        ...teamAndDarkLogo,
        rank: acc[team.divisionName].length + 1,
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
