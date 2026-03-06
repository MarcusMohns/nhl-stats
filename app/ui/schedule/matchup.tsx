import Image from "next/image";
import { ScheduleTeamType } from "@/app/types";

type MatchupProps = {
  homeTeam: ScheduleTeamType;
  awayTeam: ScheduleTeamType;
  gameOver: boolean;
  homeTeamWon: boolean | undefined;
};

const Matchup = ({
  homeTeam,
  awayTeam,
  gameOver,
  homeTeamWon,
}: MatchupProps) => {
  const label = `${homeTeam.abbrev} ${homeTeam.score} - ${awayTeam.score} ${awayTeam.abbrev}`;
  return (
    <div
      title={label}
      aria-label={label}
      className="flex flex-row items-center mt-1 md:mt-0 justify-around sm:justify-center dark:text-stone-300  text-stone-800 w-full font-bold sm:gap-10"
    >
      {/* Home Team  */}
      <div
        title={`${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
        className={`flex flex-row items-center justify-center px-2 gap-3 rounded ${
          gameOver
            ? homeTeamWon
              ? "opacity-100"
              : "opacity-40"
            : "opacity-100"
        }`}
      >
        <div className="flex flex-row items-center justify-center sm:min-w-28">
          <Image
            className="w-12 h-12 md:w-full md:h-14 dark:hidden object-contain"
            src={homeTeam.logo}
            alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
            loading="eager"
            width={960}
            height={640}
          />
          <Image
            className="w-12 h-12 md:w-full md:h-14 hidden dark:block object-contain"
            src={homeTeam.darkLogo}
            alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
            loading="eager"
            width={960}
            height={640}
          />
          <p>{homeTeam.abbrev}</p>
        </div>
        <p className="font-bold dark:text-stone-300 text-stone-800 text-3xl ">
          {homeTeam.score}
        </p>
      </div>
      <span aria-hidden="true">-</span>
      {/* Away Team  */}
      <div
        title={`${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
        className={`flex flex-row items-center justify-center px-2 gap-3 rounded  ${
          gameOver
            ? homeTeamWon
              ? "opacity-40"
              : "opacity-100"
            : "opacity-100"
        }`}
      >
        <p className="font-bold dark:text-stone-300 text-stone-800 text-3xl ">
          {awayTeam.score}
        </p>
        <div className="flex flex-row items-center justify-center sm:min-w-28">
          <p>{awayTeam.abbrev}</p>
          <Image
            className="w-10 h-10 md:w-full md:h-14 dark:hidden object-contain"
            src={awayTeam.logo}
            alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
            loading="eager"
            width={960}
            height={640}
          />
          <Image
            className="w-10 h-10 md:w-full md:h-14 hidden dark:block object-contain"
            src={awayTeam.darkLogo}
            alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
            loading="eager"
            width={960}
            height={640}
          />
        </div>
      </div>
    </div>
  );
};

export default Matchup;
