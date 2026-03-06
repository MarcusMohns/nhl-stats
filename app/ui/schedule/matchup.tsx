import Image from "next/image";
import { ScheduleTeamType } from "@/app/types";

type MatchupProps = {
  homeTeam: ScheduleTeamType;
  awayTeam: ScheduleTeamType;
  homeTeamWon: boolean | undefined;
  isDone: boolean;
  isScheduled: boolean;
};

const Matchup = ({
  homeTeam,
  awayTeam,
  isDone,
  isScheduled,
  homeTeamWon,
}: MatchupProps) => {
  const label = `${homeTeam.abbrev} ${homeTeam.score} - ${awayTeam.score} ${awayTeam.abbrev}`;
  return (
    <div
      title={label}
      aria-label={label}
      className="flex flex-row items-center justify-center dark:text-stone-300 text-stone-800 w-full xl:gap-10"
    >
      {/* Home Team  */}
      <div className="w-1/2">
        <div
          title={`${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
          className={`flex flex-row items-center justify-start px-2 gap-3 rounded ${
            isDone
              ? homeTeamWon
                ? "opacity-100"
                : "opacity-40"
              : "opacity-100"
          }`}
        >
          <div
            className={`flex items-center justify-center w-full ${
              isScheduled
                ? "justify-start flex-row-reverse"
                : "justify-start flex-row"
            }`}
          >
            <Image
              className="w-12 h-12 md:w-16 md:h-16 dark:hidden"
              src={homeTeam.logo}
              alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
              loading="eager"
              width={960}
              height={640}
            />
            <Image
              className="w-12 h-12 md:w-16 md:h-16 hidden dark:block"
              src={homeTeam.darkLogo}
              alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
              loading="eager"
              width={960}
              height={640}
            />
            <p className="md:hidden font-semibold dark:text-stone-300 text-stone-800 text-xl">
              {homeTeam.abbrev}
            </p>
            <div>
              <p
                className={`hidden md:block font-semibold dark:text-stone-300 text-stone-800 text-xs ${
                  isScheduled ? "md:text-end" : "md:text-end"
                }`}
              >
                {homeTeam.placeName.default}
              </p>
              <p className="hidden md:block font-bold dark:text-stone-50 text-stone-800 text-lg">
                {homeTeam.commonName.default}
              </p>
            </div>
          </div>
          <p className="font-bold dark:text-stone-300 text-stone-800 text-4xl md:text-5xl">
            {homeTeam.score}
          </p>
        </div>
      </div>
      {/* Separator  */}
      <span aria-hidden="true" className="md:text-3xl">
        -
      </span>
      {/* Away Team  */}
      <div className="w-1/2">
        <div
          title={`${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
          className={`flex flex-row items-center justify-start px-2 gap-3 rounded  ${
            isDone
              ? homeTeamWon
                ? "opacity-40"
                : "opacity-100"
              : "opacity-100"
          }`}
        >
          <p className="font-bold dark:text-stone-300 text-stone-800 text-4xl md:text-5xl">
            {awayTeam.score}
          </p>
          <div
            className={`flex flex-row items-center w-full 
             ${
               isScheduled
                 ? "justify-end flex-row-reverse"
                 : "justify-start flex-row"
             }`}
          >
            <p className="md:hidden font-semibold dark:text-stone-300 text-stone-800 text-xl">
              {awayTeam.abbrev}
            </p>
            <div>
              <p
                className={`hidden md:block font-semibold dark:text-stone-300 text-stone-800 text-xs ${
                  isScheduled ? "md:text-start" : "md:text-end"
                }`}
              >
                {awayTeam.placeName.default}
              </p>
              <p className="hidden md:block font-bold dark:text-stone-50 text-stone-800 text-lg">
                {awayTeam.commonName.default}
              </p>
            </div>
            <Image
              className="w-10 h-10 md:w-16 md:h-16 dark:hidden"
              src={awayTeam.logo}
              alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
              loading="eager"
              width={960}
              height={640}
            />
            <Image
              className="w-10 h-10 md:w-16 md:h-16 hidden dark:block"
              src={awayTeam.darkLogo}
              alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
              loading="eager"
              width={960}
              height={640}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchup;
