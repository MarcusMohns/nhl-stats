import type { GameType, LiveGameType, PlayType } from "../types";

export const getGameStatus = (game: GameType) => {
  {
    const status =
      game.gameState === "OFF" || game.gameState === "FINAL"
        ? "Done"
        : game.gameState === "LIVE" || game.gameState === "CRIT"
          ? "Live"
          : game.gameState === "FUT"
            ? "Scheduled"
            : "TBD";

    const winner =
      status === "Done" &&
      game.homeTeam.score !== undefined &&
      game.awayTeam.score !== undefined
        ? game.homeTeam.score > game.awayTeam.score
          ? "home"
          : "away"
        : undefined;

    return { status, winner } as {
      status: "Done" | "Live" | "Scheduled" | "TBD";
      winner?: "home" | "away";
    };
  }
};

export const getReadablePeriod = (period: number | undefined) => {
  switch (period) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 4:
      return "OT";
    case 5:
      return "SO";
    default:
      return "Period";
  }
};
export const getGroupedPlays = (plays: PlayType[]) => {
  // Group plays by period
  const groupedPlays = plays.reduce((acc, play) => {
    const period = play.periodDescriptor.number;
    const existingGroup = acc.get(period);
    if (existingGroup) {
      // Add play to existing period group at the beginning since we want to show the most recent play first
      existingGroup.unshift(play);
    } else {
      // Create a new period group
      acc.set(period, [play]);
    }
    return acc;
  }, new Map<number, PlayType[]>());

  return (
    Array.from(groupedPlays.entries())
      .map(([period, plays]) => ({
        period,
        label: getReadablePeriod(period),
        plays: plays,
      }))
      // Reverse the array so the most recent period is first
      .reverse()
  );
};

export const fetchLiveGame = async (id: string): Promise<LiveGameType> => {
  const liveGameUrl = `https://api-web.nhle.com/v1/gamecenter/${id}/play-by-play`;
  try {
    const response = await fetch(liveGameUrl, {
      // Cache the data for 1 minute server side
      next: { revalidate: 60 },
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching live game data from API", e);
    throw new Error("Error fetching data from the server ☹️");
  }
};

export const getTeamLogo = (
  teamId: number | undefined,
  liveData: LiveGameType,
) => {
  if (!teamId) return null;
  if (liveData.homeTeam.id === teamId)
    return {
      light: liveData.homeTeam.logo,
      dark: liveData.homeTeam.darkLogo,
      abbrev: liveData.homeTeam.abbrev,
    };
  if (liveData.awayTeam.id === teamId)
    return {
      light: liveData.awayTeam.logo,
      dark: liveData.awayTeam.darkLogo,
      abbrev: liveData.awayTeam.abbrev,
    };
  return null;
};
