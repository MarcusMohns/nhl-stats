import type { GameType } from "@/app/types";

export type GameStatus = "Done" | "Live" | "Scheduled" | "TBD";
export type GameWinner = "home" | "away" | undefined;

export function getGameStatus(game: GameType): {
  status: GameStatus;
  winner: GameWinner;
} {
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

  return { status, winner };
}
