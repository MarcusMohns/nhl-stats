import { SeriesType } from "@/app/types";
import Scoreboard from "./scoreboard";
import Image from "next/image";

const GameSeries = ({ series }: { series: SeriesType }) => {
  const isFinals = series.seriesAbbrev === "SCF";
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
          className={`flex justify-center items-center border lg:border-2 p-2 rounded border-gray-300 dark:border-stone-700 ${
            isFinals
              ? "w-full h-full xs:w-32 xs:h-52 lg:h-64 lg:w-64"
              : "w-full h-full xs:w-32 xs:h-32 lg:h-32 lg:w-64"
          }`}
        >
          <Image
            src={series.seriesLogo}
            alt={series.seriesTitle}
            className="h-full w-full object-contain invert dark:invert-0"
            width={isFinals ? 360 : 452}
            height={isFinals ? 537 : 120}
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
