import type { PlayoffsTeamType } from "@/app/types";
import Team from "./team";

type ScoreboardProps = {
  awayTeam: PlayoffsTeamType;
  homeTeam: PlayoffsTeamType;
  awayTeamScore: number;
  homeTeamScore: number;
  winningTeamId: number | undefined;
  url: string;
};

const Scoreboard = ({
  awayTeam,
  homeTeam,
  awayTeamScore,
  homeTeamScore,
  winningTeamId,
  url,
}: ScoreboardProps) => {
  return (
    <a
      className="flex flex-col justify-center bg-stone-200 dark:bg-stone-700/60 rounded-lg w-full md:w-52 md:h-28 sm:px-2 md:border border-stone-300 dark:border-stone-600 hover:border-stone-500 cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-stone-900"
      href={`https://www.nhl.com${url}`}
      target="_blank"
      aria-label={`${homeTeam.name} ${homeTeamScore}, ${awayTeam.name} ${awayTeamScore}. View game details.`}
      rel="noopener noreferrer"
    >
      <div className="border-b-2 border-stone-300 dark:border-stone-600">
        <Team
          score={homeTeamScore}
          team={homeTeam}
          winningTeamId={winningTeamId}
        />
      </div>
      <div>
        <Team
          score={awayTeamScore}
          team={awayTeam}
          winningTeamId={winningTeamId}
        />
      </div>
    </a>
  );
};

export default Scoreboard;
