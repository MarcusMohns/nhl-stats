import type { PlayoffsTeamType } from "@/app/types";
import Image from "next/image";

type TeamProps = {
  team: PlayoffsTeamType;
  score: number;
  winningTeamId?: number;
};
const Team = ({ team, score, winningTeamId }: TeamProps) => {
  const opacityStyles =
    team.id === winningTeamId || winningTeamId === undefined
      ? "opacity-100"
      : "opacity-40";
  return (
    <div
      className={`flex items-center justify-center min-w-17
        md:px-3 ${opacityStyles}`}
    >
      <div className="flex items-center justify-center flex-row">
        <Image
          src={team.logo}
          alt={`${team.name} Logo`}
          className="w-11 h-11 md:w-13 md:h-13 dark:hidden"
          width={960}
          height={640}
        />
        <Image
          src={team.darkLogo}
          alt={`${team.name} Logo`}
          className="w-11 h-11 md:w-13 md:h-13 hidden dark:block"
          width={960}
          height={640}
        />
        <p className="hidden xs:block font-semibold text-xl tracking-wide leading-tight dark:text-stone-300 md:text-base text-xs">
          {team.abbrev}
        </p>
      </div>
      <p className="font-bold text-xl md:text-2xl tracking-wide leading-tight dark:text-stone-100 ml-auto mr-2 sm:mr-0">
        {score}
      </p>
    </div>
  );
};

export default Team;
