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
      className="flex flex-col justify-center bg-stone-200 dark:bg-stone-700/60 0 rounded-lg max-w-[90%] w-full
      md:w-50 md:h-30 sm:px-2 md:border-1 border-stone-300 dark:border-stone-600 hover:border-stone-500 cursor-pointer"
      href={`https://www.nhl.com${url}`}
      target="_blank"
      aria-label={`Detailed Game Information for ${homeTeam.name} vs ${awayTeam.name}`}
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
