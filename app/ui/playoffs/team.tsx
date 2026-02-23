import type { PlayoffsTeamType } from "@/app/types";
import Image from "next/image";

type TeamProps = {
  team: PlayoffsTeamType;
  score: number;
  winningTeamId?: number;
};
const Team = ({ team, score, winningTeamId }: TeamProps) => {
  const opacityStyles =
    team.id === winningTeamId || winningTeamId == undefined
      ? "opacity-100"
      : "opacity-40";
  return (
    <div
      className={`flex items-center justify-center
        px-3 ${opacityStyles}`}
    >
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
        className="w-11 h-11 md:w-13 md:h-13  hidden dark:block"
        width={960}
        height={640}
      />
      <p className="font-bold tracking-wide leading-tight dark:text-stone-200 md:text-base text-xs">
        {team.abbrev}
      </p>
      <p className="font-bold text-lg dark:text-stone-200 px-1">{score}</p>
    </div>
  );
};

export default Team;
