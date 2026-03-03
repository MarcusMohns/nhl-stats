import type { GameType } from "@/app/types";
import LinkOut from "../link-out";
import LiveChip from "../live-chip";
import Matchup from "./matchup";

type GameProps = {
  game: GameType & { localStartTime: string };
};
const Game = ({ game }: GameProps) => {
  const GAME_OVER = game.gameState === "OFF" || game.gameState === "FINAL";
  const GAME_LIVE = game.gameState === "LIVE" || game.gameState === "CRIT";
  const homeTeamWon =
    GAME_OVER &&
    game.homeTeam.score !== undefined &&
    game.awayTeam.score !== undefined
      ? game.homeTeam.score > game.awayTeam.score
      : undefined;

  return (
    <article
      aria-label={`Game: ${game.awayTeam.abbrev} versus ${game.homeTeam.abbrev}`}
      className={`flex flex-col items-center w-full justify-center shadow-sm bg-stone-100 dark:bg-stone-800 dark:shadow-stone-800 p-1 px-2 rounded mb-1 ${
        GAME_OVER ? "opacity-60" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-start w-full gap-2">
        {GAME_LIVE ? (
          <LiveChip />
        ) : (
          <p className="flex items-center text-sm font-bold rounded">
            {game.localStartTime}
          </p>
        )}
        <div className="font-bold dark:text-stone-300 text-stone-800 bg-stone-200 dark:bg-stone-700 p-2 py-1 rounded text-xs w-max">
          {GAME_LIVE
            ? `Period: ${game.periodDescriptor.number}`
            : game.gameState}
        </div>
        {homeTeamWon !== undefined && (
          <p className="font-bold dark:text-stone-300 text-stone-800 bg-stone-200 dark:bg-stone-700 p-2 py-1 rounded text-xs w-max">
            {`${homeTeamWon ? game.homeTeam.abbrev : game.awayTeam.abbrev} won`}
          </p>
        )}
        <LinkOut
          linkOutStyles="flex items-center justify-end h-auto ml-auto"
          hrefString={`https://www.nhl.com${game.gameCenterLink}`}
          aria-label={`View game details for ${game.homeTeam.commonName} vs ${game.awayTeam.commonName}`}
        />
      </div>
      <Matchup
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
        gameOver={GAME_OVER}
        homeTeamWon={homeTeamWon}
      />
    </article>
  );
};

export default Game;
