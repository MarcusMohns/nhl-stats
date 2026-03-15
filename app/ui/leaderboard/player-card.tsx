import { PlayerType } from "@/app/types";
import LinkOut from "@/app/ui/link-out";
import Image from "next/image";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="flex flex-row items-center justify-between p-2 shadow-sm my-3 bg-stone-100 dark:bg-stone-800 rounded-lg w-full gap-2 sm:gap-4">
      <p className="font-bold text-3xl sm:text-5xl shrink-0 text-center w-16 sm:w-24 mx-1">
        {player.position === "G" && player.value.toString().length > 3
          ? player.value.toFixed(2) // If Goalie & value is a float, fix decimals
          : player.value}
      </p>
      <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
        <Image
          src={player.headshot}
          alt={player.firstName.default}
          aria-hidden="true"
          width={64}
          height={64}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0 object-cover"
        />
        <div className="flex flex-col min-w-0">
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-semibold uppercase tracking-wide truncate">
            {player.firstName.default}
          </p>
          <p className="text-stone-800 dark:text-stone-100 font-bold text-sm sm:text-lg leading-tight break-words">
            {player.lastName.default}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-1 sm:gap-4 shrink-0">
        <div className="flex flex-row gap-1">
          <p className="bg-stone-200 dark:bg-stone-700 rounded px-1.5 py-0.5 text-xs sm:text-base font-bold text-center min-w-[2rem] sm:min-w-[2.5rem]">
            {player.position}
          </p>
          <p className="bg-stone-200 dark:bg-stone-700 rounded px-1.5 py-0.5 text-xs sm:text-base font-bold text-center min-w-[2.5rem] sm:min-w-[3.5rem]">
            #{player.sweaterNumber}
          </p>
        </div>
        <Image
          src={player.teamLogo}
          className="w-10 h-10 sm:w-16 sm:h-16 dark:hidden object-contain"
          alt={player.teamName.default}
          width={64}
          height={64}
        />
        <Image
          src={`https://assets.nhle.com/logos/nhl/svg/${player.teamAbbrev}_dark.svg`}
          className="w-10 h-10 sm:w-16 sm:h-16 hidden dark:block object-contain"
          alt={player.teamName.default}
          width={64}
          height={64}
        />
      </div>
      <LinkOut
        linkOutStyles="shrink-0"
        hrefString={`https://www.nhl.com/player/${player.id}`}
        aria-label={`View ${player.firstName.default}'s profile on NHL.com`}
      />
    </div>
  );
};

export default PlayerCard;
