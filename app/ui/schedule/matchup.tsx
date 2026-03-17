import Image from "next/image";
import { ScheduleTeamType, LiveTeamType } from "@/app/types";

type MatchupProps = {
  homeTeam: ScheduleTeamType | LiveTeamType;
  awayTeam: ScheduleTeamType | LiveTeamType;
  winner?: "home" | "away";
  status: "Done" | "Live" | "Scheduled" | "TBD";
};

const Matchup = ({ homeTeam, awayTeam, status, winner }: MatchupProps) => {
  const homeTeamWon = winner === "home";
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
            status === "Done"
              ? homeTeamWon
                ? "opacity-100"
                : "opacity-40"
              : "opacity-100"
          }`}
        >
          <div
            className={`flex items-center w-full ${
              status === "Scheduled"
                ? "justify-start flex-row-reverse"
                : "justify-end md:justify-center flex-row"
            }`}
          >
            <Image
              className="w-12 h-12 md:w-16 md:h-16 dark:hidden"
              src={homeTeam.logo}
              alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
              loading="eager"
              width={64}
              height={64}
            />
            <Image
              className="w-12 h-12 md:w-16 md:h-16 hidden dark:block"
              src={homeTeam.darkLogo}
              alt={`logo of the ${homeTeam.placeName.default} ${homeTeam.commonName.default}`}
              loading="eager"
              width={64}
              height={64}
            />
            <p className="md:hidden font-semibold dark:text-stone-300 text-stone-800 text-xl">
              {homeTeam.abbrev}
            </p>
            <div>
              <p
                className={`hidden md:block font-semibold dark:text-stone-300 text-stone-800 text-xs ${
                  status === "Scheduled" ? "md:text-end" : "md:text-start"
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
            status === "Done"
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
               status === "Scheduled"
                 ? "justify-end flex-row-reverse"
                 : "justify-start md:justify-center flex-row"
             }`}
          >
            <p className="md:hidden font-semibold dark:text-stone-300 text-stone-800 text-xl">
              {awayTeam.abbrev}
            </p>
            <div>
              <p
                className={`hidden md:block font-semibold dark:text-stone-300 text-stone-800 text-xs ${
                  status === "Scheduled" ? "md:text-start" : "md:text-end"
                }`}
              >
                {awayTeam.placeName.default}
              </p>
              <p className="hidden md:block font-bold dark:text-stone-50 text-stone-800 text-lg text-end">
                {awayTeam.commonName.default}
              </p>
            </div>
            <Image
              className="w-12 h-12 md:w-16 md:h-16 dark:hidden"
              src={awayTeam.logo}
              alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
              loading="eager"
              width={64}
              height={64}
            />
            <Image
              className="w-12 h-12 md:w-16 md:h-16 hidden dark:block"
              src={awayTeam.darkLogo}
              alt={`logo of the ${awayTeam.placeName.default} ${awayTeam.commonName.default}`}
              loading="eager"
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchup;
