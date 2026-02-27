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
  return (
    <div key={game.id} className="flex flex-col w-full mb-1">
      <div
        className={`flex flex-col md:flex-row items-center w-full justify-center shadow-sm bg-stone-100 dark:bg-stone-800 dark:shadow-stone-800 p-1 px-2 rounded ${
          GAME_OVER ? "opacity-40" : ""
        }`}
      >
        <div className="flex flex-row items-center justify-start w-full md:w-auto gap-2">
          {GAME_LIVE ? (
            <LiveChip gameCenterLink={game.gameCenterLink} />
          ) : (
            <p className="flex items-center btext-sm font-bold rounded">
              {game.localStartTime}
            </p>
          )}
          <div className="font-bold dark:text-stone-300 text-stone-800 bg-stone-200 dark:bg-stone-700 p-2 py-1 rounded text-xs ">
            {GAME_LIVE
              ? `Period: ${game.periodDescriptor.number}`
              : game.gameState}
          </div>
          <LinkOut
            linkOutStyles="flex items-center justify-end h-auto ml-auto md:hidden"
            hrefString={`https://www.nhl.com${game.gameCenterLink}`}
            aria-label={`View game details for ${game.homeTeam.commonName} vs ${game.awayTeam.commonName}`}
          />
        </div>
        <Matchup
          homeTeamAbbrev={game.homeTeam.abbrev}
          homeTeamLogo={game.homeTeam.logo}
          homeTeamDarkLogo={game.homeTeam.darkLogo}
          homeTeamScore={game.homeTeam.score}
          awayTeamAbbrev={game.awayTeam.abbrev}
          awayTeamLogo={game.awayTeam.logo}
          awayTeamDarkLogo={game.awayTeam.darkLogo}
          awayTeamScore={game.awayTeam.score}
        />
        <LinkOut
          linkOutStyles="flex items-center h-auto hidden md:block"
          hrefString={`https://www.nhl.com${game.gameCenterLink}`}
          aria-label={`View game details for ${game.homeTeam.commonName} vs ${game.awayTeam.commonName}`}
        />
      </div>
    </div>
  );
};

export default Game;
