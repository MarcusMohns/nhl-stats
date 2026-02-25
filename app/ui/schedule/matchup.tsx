import Image from "next/image";

type MatchupProps = {
  homeTeamAbbrev: string;
  homeTeamLogo: string;
  homeTeamDarkLogo: string;
  homeTeamScore?: number;
  awayTeamAbbrev: string;
  awayTeamLogo: string;
  awayTeamDarkLogo: string;
  awayTeamScore?: number;
};

const Matchup = ({
  homeTeamAbbrev,
  homeTeamLogo,
  homeTeamDarkLogo,
  homeTeamScore,
  awayTeamAbbrev,
  awayTeamLogo,
  awayTeamDarkLogo,
  awayTeamScore,
}: MatchupProps) => {
  return (
    <div className="flex flex-row items-center justify-center dark:text-stone-300  text-stone-800 w-full font-bold gap-10">
      <div className="flex flex-row items-center justify-center sm:min-w-30">
        <p>{awayTeamAbbrev}</p>
        <Image
          className="w-10 h-10 md:w-12 md:h-12 dark:hidden"
          src={awayTeamLogo}
          alt={`${awayTeamAbbrev} Logo`}
          width={960}
          height={640}
        />
        <Image
          className="w-10 h-10 md:w-12 md:h-12 hidden dark:block"
          src={awayTeamDarkLogo}
          alt={`${awayTeamAbbrev} Logo`}
          width={960}
          height={640}
        />
      </div>
      <h3 className="font-bold dark:text-stone-300 text-stone-800 text-3xl ">
        {awayTeamScore}
      </h3>
      -
      <h3 className="font-bold dark:text-stone-300 text-stone-800 text-3xl ">
        {homeTeamScore}
      </h3>
      <div className="flex flex-row items-center justify-center sm:min-w-30">
        <Image
          className="w-12 h-12 md:w-14 md:h-12 dark:hidden"
          src={homeTeamLogo}
          alt={`${homeTeamAbbrev} Logo`}
          width={960}
          height={640}
        />
        <Image
          className="w-12 h-12 md:w-14 md:h-12 hidden dark:block"
          src={homeTeamDarkLogo}
          alt={`${homeTeamAbbrev} Logo`}
          width={960}
          height={640}
        />
        <p>{homeTeamAbbrev}</p>
      </div>
    </div>
  );
};

export default Matchup;
