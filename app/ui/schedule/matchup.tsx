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
        className={`flex flex-row items-center justify-center px-2 rounded ${
          gameOver
            ? homeTeamWon
              ? "opacity-100"
              : "opacity-40"
            : "opacity-100"
        }`}
      >
        <p className="font-bold dark:text-stone-300 text-stone-800 text-3xl ">
          {homeTeam.score}
        </p>
        <div className="flex flex-row items-center justify-center sm:min-w-28">
          <Image
            className="w-12 h-12 md:w-14 md:h-12 dark:hidden"
            src={homeTeam.logo}
            alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
            width={960}
            height={640}
          />
          <Image
            className="w-12 h-12 md:w-14 md:h-12 hidden dark:block"
            src={homeTeam.darkLogo}
            alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
            width={960}
            height={640}
          />
          <p>{homeTeam.abbrev}</p>
        </div>
      </div>
      <span aria-hidden="true">-</span>
      {/* Away Team  */}
      <div
        title={`${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
        className={`flex flex-row items-center justify-center px-2 rounded  ${
          gameOver
            ? homeTeamWon
              ? "opacity-40"
              : "opacity-100"
            : "opacity-100"
        }`}
      >
        <div className="flex flex-row items-center justify-center sm:min-w-28">
          <p>{awayTeam.abbrev}</p>
          <Image
            className="w-10 h-10 md:w-12 md:h-12 dark:hidden"
            src={awayTeam.logo}
            alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
            width={960}
            height={640}
          />
          <Image
            className="w-10 h-10 md:w-12 md:h-12 hidden dark:block"
            src={awayTeam.darkLogo}
            alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
            width={960}
            height={640}
          />
        </div>
        <p className="font-bold dark:text-stone-300 text-stone-800 text-3xl ">
          {awayTeam.score}
        </p>
      </div>
    </div>
  );
};

export default Matchup;
