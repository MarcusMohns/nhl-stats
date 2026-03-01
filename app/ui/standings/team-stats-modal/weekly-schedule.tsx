import type { GameType } from "@/app/types.js";
import LinkOut from "@/app/ui/link-out";
import LiveChip from "@/app/ui/live-chip";
import Image from "next/image";

type WeeklyScheduleProps = {
  games: GameType[];
  teamAbbrev: string;
};

const WeeklySchedule = ({ games, teamAbbrev }: WeeklyScheduleProps) => {
  if (games.length === 0) {
    return "No games scheduled this week";
  }

  return (
    <div>
      {games.map((game) => (
        <div
          key={game.gameDate}
          className={`flex flex-row shadow-md font-medium my-1 p-2 w-full bg-white dark:bg-stone-800
${
  // Set the background color based on the outcome of the game
  game.gameOutcome &&
  game.homeTeam.score !== undefined &&
  game.awayTeam.score !== undefined
    ? teamAbbrev === game.homeTeam.abbrev
      ? game.homeTeam.score > game.awayTeam.score
        ? "bg-green-200 dark:bg-green-800 win"
        : "bg-red-200 dark:bg-red-500 loss"
      : game.awayTeam.score > game.homeTeam.score
        ? "bg-green-200 dark:bg-green-800 win"
        : "bg-red-200 dark:bg-red-500 loss"
    : "bg-gray-100 dark:bg-stone-800 tbd"
}
`}
        >
          {game.gameState === "LIVE" ? (
            <LiveChip />
          ) : (
            <p className="date min-w-25">{game.gameDate}</p>
          )}
          <div className="match w-full flex flex-row self-center justify-center">
            <div className="team flex flex-row">
              <p className="team-name">{game.homeTeam.abbrev}</p>
              <Image
                src={game.homeTeam.logo}
                className="w-10 dark:hidden"
                alt={`Logo of ${game.homeTeam.abbrev}`}
                width={40}
                height={40}
              />
              <Image
                src={game.homeTeam.darkLogo}
                className="w-10 hidden dark:block"
                alt={`Logo of ${game.homeTeam.abbrev}`}
                width={40}
                height={40}
              />
              <p className="home-team-score min-w-2">
                {game.homeTeam.score !== undefined ? game.homeTeam.score : "-"}
              </p>
            </div>
            <p className="mx-2">vs</p>
            <div className="team flex flex-row">
              <p className="away-team-score min-w-2">
                {game.awayTeam.score !== undefined ? game.awayTeam.score : "-"}
              </p>
              <Image
                src={game.awayTeam.logo}
                className="w-10 dark:hidden"
                alt={`Logo of ${game.awayTeam.abbrev}`}
                width={40}
                height={40}
              />
              <Image
                src={game.awayTeam.darkLogo}
                className="w-10 hidden dark:block"
                alt={`Logo of ${game.awayTeam.abbrev}`}
                width={40}
                height={40}
              />
              <p>{game.awayTeam.abbrev}</p>
            </div>
          </div>

          {game.gameCenterLink && (
            <LinkOut
              linkOutStyles="ml-auto"
              hrefString={`https://www.nhl.com${game.gameCenterLink}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklySchedule;
