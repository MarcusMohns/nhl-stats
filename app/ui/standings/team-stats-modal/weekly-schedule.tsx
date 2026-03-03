import type { GameType } from "@/app/types.js";
import LinkOut from "@/app/ui/link-out";
import LiveChip from "@/app/ui/live-chip";
import Image from "next/image";

type WeeklyScheduleProps = {
  games: GameType[];
};

const WeeklySchedule = ({ games }: WeeklyScheduleProps) => {
  if (games.length === 0) {
    return (
      <p className="text-center text-stone-500 dark:text-stone-400 py-4">
        No games scheduled this week
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {games.map((game) => {
        const getGameStatusClass = () => {
          if (
            game.gameOutcome === undefined ||
            game.homeTeam.score === undefined ||
            game.awayTeam.score === undefined
          ) {
            return "border-x-stone-100 dark:border-x-stone-800"; // TBD
          }
          const homeTeamWon = game.homeTeam.score > game.awayTeam.score;
          return homeTeamWon
            ? "border-l-green-500 border-r-red-500"
            : "border-l-red-500 border-r-green-500";
        };

        const date = new Date(game.startTimeUTC);

        return (
          <li
            key={game.gameDate}
            className={`flex items-center gap-4 p-3 w-full bg-white dark:bg-stone-800 rounded-lg shadow-sm border-x-4 ${getGameStatusClass()}`}
          >
            {/* Date or Live Chip */}
            <div className="flex flex-col items-center justify-center w-12 shrink-0 text-center">
              {game.gameState === "LIVE" ? (
                <LiveChip />
              ) : (
                <>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
                    {date.toLocaleDateString(undefined, {
                      weekday: "short",
                      timeZone: "UTC",
                    })}
                  </p>
                  <p className="font-bold text-lg text-stone-700 dark:text-stone-200">
                    {date.toLocaleDateString(undefined, {
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </p>
                </>
              )}
            </div>

            {/* Matchup */}
            <div className="flex-grow grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
              {/* Home Team */}
              <div className="flex items-center justify-end gap-2">
                <span className="font-semibold text-sm sm:text-base text-right">
                  {game.homeTeam.abbrev}
                </span>
                <Image
                  src={game.homeTeam.logo}
                  className="w-8 h-8 dark:hidden"
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
                <Image
                  src={game.homeTeam.darkLogo}
                  className="w-8 h-8 hidden dark:block"
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
              </div>

              {/* Score or VS */}
              <div className="text-center">
                {game.homeTeam.score !== undefined &&
                game.awayTeam.score !== undefined ? (
                  <div className="flex items-center justify-center gap-2 font-bold text-lg">
                    <span
                      className={
                        game.homeTeam.score < game.awayTeam.score
                          ? "text-stone-400 dark:text-stone-500"
                          : "text-stone-800 dark:text-stone-100"
                      }
                    >
                      {game.homeTeam.score}
                    </span>
                    <span className="text-stone-400 dark:text-stone-500">
                      -
                    </span>
                    <span
                      className={
                        game.homeTeam.score > game.awayTeam.score
                          ? "text-stone-400 dark:text-stone-500"
                          : "text-stone-800 dark:text-stone-100"
                      }
                    >
                      {game.awayTeam.score}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-stone-500 dark:text-stone-400">
                    vs
                  </span>
                )}
              </div>

              {/* Away Team */}
              <div className="flex items-center justify-start gap-2">
                <Image
                  src={game.awayTeam.logo}
                  className="w-8 h-8 dark:hidden"
                  alt=""
                  width={40}
                  height={40}
                  aria-hidden="true"
                />
                <Image
                  src={game.awayTeam.darkLogo}
                  className="w-8 h-8 hidden dark:block"
                  alt=""
                  width={40}
                  height={40}
                  aria-hidden="true"
                />
                <span className="font-semibold text-sm sm:text-base text-left">
                  {game.awayTeam.abbrev}
                </span>
              </div>
            </div>
            {game.gameCenterLink && (
              <LinkOut
                linkOutStyles="shrink-0 text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                hrefString={`https://www.nhl.com${game.gameCenterLink}`}
                aria-label={`View game center for ${game.homeTeam.abbrev} vs ${game.awayTeam.abbrev}`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default WeeklySchedule;
