import type { GameType, LiveGameType } from "../types";

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

export const fetchLiveGame = async (id: string): Promise<LiveGameType> => {
  const liveGameUrl = `https://api-web.nhle.com/v1/gamecenter/"${id}"/play-by-play`;
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
    console.error("Error fetching schedule data from API", e);
    throw new Error("Error fetching data from the server ☹️");
  }
};
