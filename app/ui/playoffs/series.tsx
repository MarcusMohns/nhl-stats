import { SeriesType } from "@/app/types";
import Scoreboard from "./scoreboard";
import Image from "next/image";

const GameSeries = ({ series }: { series: SeriesType }) => {
  return (
    <div
      className={`flex flex-col text-center justify-center items-center w-full h-full xl:w-auto xl:h-auto`}
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
        <div
          title={series.seriesTitle}
          className="flex justify-center items-center border lg:border-2 p-2 rounded border-gray-300 dark:border-stone-700 xl:min-h-32 xl:min-w-64"
        >
          <Image
            src={series.seriesLogo}
            alt={series.seriesTitle}
            className="md:max-w-40 w-auto invert dark:invert-0 "
            width={883}
            height={251}
            loading="eager"
          />
        </div>
      ) : (
        <div
          title={series.seriesTitle}
          className="flex items-center w-[90%] md:w-full justify-center h-[40%] xl:h-32 xl:w-56 text-xs italic border-2 border-dashed border-gray-300 dark:border-stone-700 rounded"
        >
          {series.seriesTitle}
        </div>
      )}
    </div>
  );
};

export default GameSeries;
