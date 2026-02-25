import { SeriesType } from "@/app/types";
import Scoreboard from "./scoreboard";
import Image from "next/image";

const GameSeries = ({ series }: { series: SeriesType }) => {
  return (
    <div
      className={`flex flex-col text-center justify-center items-center md:mx-2 my-1 w-full md:w-auto`}
      title={series.seriesTitle}
    >
      <p className="font-bold dark:text-stone-300 leading-tight tracking-wide select-none text-sm">
        {series.seriesAbbrev}
      </p>
      {series.seriesUrl && series.bottomSeedTeam && series.topSeedTeam ? (
        <Scoreboard
          awayTeam={series.bottomSeedTeam}
          homeTeam={series.topSeedTeam}
          awayTeamScore={series.bottomSeedWins}
          homeTeamScore={series.topSeedWins}
          winningTeamId={series.winningTeamId}
          url={series.seriesUrl}
        />
      ) : series.seriesLogo ? (
        <div className="border-1 lg:border-2 p-2 rounded border-gray-300 dark:border-stone-700">
          <Image
            src={series.seriesLogo}
            alt={`${series.seriesAbbrev} Series Logo`}
            className="md:max-w-40 w-auto invert dark:invert-0 "
            width={883}
            height={251}
            loading="eager"
          />
        </div>
      ) : (
        <div
          className="flex flex-col justify-center bg-stone-200/50 dark:bg-stone-700/60 0 rounded-lg 
      lg:w-50 lg:h-30 min-h-20 min-w-17 md:px-3 max-w-[90%] w-full text-sm font-semibold text-stone-500 dark:text-stone-400 italic grow"
        >
          {series.seriesTitle}
        </div>
      )}
    </div>
  );
};

export default GameSeries;
