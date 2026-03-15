import type { GameType } from "@/app/types";
import LinkOut from "../link-out";
import LiveChip from "../live-chip";
import Matchup from "./matchup";
import { getGameStatus } from "../../lib/schedule-utils";

type GameProps = {
  game: GameType & { localStartTime: string };
};
const Game = ({ game }: GameProps) => {
  const { status, winner } = getGameStatus(game);
  const homeTeamWon = winner === "home";

  return (
    <article
      aria-label={`Game: ${game.awayTeam.abbrev} versus ${game.homeTeam.abbrev}`}
      className={`flex flex-col items-center w-full border-x-4 justify-center shadow-sm bg-stone-100 dark:bg-stone-800 dark:shadow-stone-800 p-1 px-2 rounded mb-1 ${homeTeamWon !== undefined ? (homeTeamWon ? "border-l-green-500 border-r-red-500" : "border-l-red-500 border-r-green-500") : "border-x-stone-100 dark:border-x-stone-800"}
      `}
    >
      <div className="flex flex-row items-center justify-start w-full gap-2">
        <p className="flex items-center text-sm font-bold rounded">
          {game.localStartTime}
        </p>
        {status === "Live" ? (
          <LiveChip />
        ) : (
          <div className="font-bold dark:text-stone-300 text-stone-800 bg-stone-200 dark:bg-stone-700 p-2 py-1 rounded text-xs w-max">
            {status}
          </div>
        )}
        {homeTeamWon !== undefined && (
          <p className="font-bold dark:text-stone-300 text-stone-800 bg-stone-200 dark:bg-stone-700 p-2 py-1 rounded text-xs w-max">
            {`${homeTeamWon ? game.homeTeam.abbrev : game.awayTeam.abbrev} won`}
          </p>
        )}
        <LinkOut
          linkOutStyles="flex items-center justify-end h-auto ml-auto w-5 h-5 mr-1 text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          hrefString={`https://www.nhl.com${game.gameCenterLink}`}
          aria-label={`View game details for ${game.homeTeam.commonName} vs ${game.awayTeam.commonName}`}
        />
      </div>
      <Matchup
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
        homeTeamWon={homeTeamWon}
        isDone={status === "Done"}
        isScheduled={status === "Scheduled"}
      />
    </article>
  );
};

export default Game;
