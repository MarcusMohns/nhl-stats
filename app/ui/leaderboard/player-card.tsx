import { PlayerType } from "@/app/types";
import LinkOut from "@/app/ui/link-out";
import Image from "next/image";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="flex flex-row items-center justify-between p-3 shadow-md bg-white dark:bg-stone-800/80 backdrop-blur-sm rounded-xl w-full gap-3 sm:gap-4 border border-stone-200 dark:border-stone-700/50 transition-all hover:scale-[1.01] hover:shadow-lg dark:hover:bg-stone-800">
      <p className="font-black text-3xl sm:text-5xl shrink-0 text-center w-16 sm:w-24 mx-1 text-stone-800 dark:text-stone-100">
        {player.position === "G" && player.value.toString().length > 3
          ? player.value.toFixed(2) // If Goalie & value is a float, fix decimals
          : player.value}
      </p>
      <div className="flex items-center gap-3 sm:gap-4 flex-grow min-w-0">
        <Image
          src={player.headshot}
          alt={player.firstName.default}
          aria-hidden="true"
          width={64}
          height={64}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0 object-cover ring-2 ring-stone-100 dark:ring-stone-600"
        />
        <div className="flex flex-col min-w-0">
          <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
            {player.firstName.default}
          </p>
          <p className="text-stone-800 dark:text-stone-100 font-bold text-sm sm:text-lg leading-tight break-words">
            {player.lastName.default}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4 shrink-0">
        <div className="flex flex-row gap-1">
          <p className="bg-stone-100 dark:bg-stone-700/50 rounded-md px-2 py-1 text-xs sm:text-sm font-bold text-center min-w-[2rem] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600">
            {player.position}
          </p>
          <p className="bg-stone-100 dark:bg-stone-700/50 rounded-md px-2 py-1 text-xs sm:text-sm font-bold text-center min-w-[2.5rem] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600">
            #{player.sweaterNumber}
          </p>
        </div>
        <Image
          src={player.teamLogo}
          className="w-10 h-10 sm:w-14 sm:h-14 dark:hidden object-contain"
          alt={player.teamName.default}
          width={56}
          height={56}
        />
        <Image
          src={`https://assets.nhle.com/logos/nhl/svg/${player.teamAbbrev}_dark.svg`}
          className="w-10 h-10 sm:w-14 sm:h-14 hidden dark:block object-contain"
          alt={player.teamName.default}
          width={56}
          height={56}
        />
      </div>
      <LinkOut
        linkOutStyles="shrink-0 text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        hrefString={`https://www.nhl.com/player/${player.id}`}
        aria-label={`View ${player.firstName.default}'s profile on NHL.com`}
      />
    </div>
  );
};

export default PlayerCard;
