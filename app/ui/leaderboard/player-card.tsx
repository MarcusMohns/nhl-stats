import { PlayerType } from "@/app/types";
import LinkOut from "@/app/ui/link-out";
import Image from "next/image";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="flex flex-row items-center justify-between p-2 shadow-sm my-3 bg-stone-100 dark:bg-stone-800 rounded-lg w-full gap-2">
      <p className="font-bold text-3xl sm:text-5xl shrink-0 text-center w-20 md:w-24">
        {player.position === "G" && player.value.toString().length > 3
          ? player.value.toFixed(2) // If Goalie & value is a float, fix decimals
          : player.value}
      </p>
      <div className="flex items-center gap-4 flex-grow min-w-0">
        <Image
          src={player.headshot}
          alt=""
          aria-hidden="true"
          width={366}
          height={366}
          className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0"
        />
        <p className="text-stone-600 dark:text-stone-200 font-bold text-lg truncate">
          {player.firstName.default} {player.lastName.default}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4">
        <div className="flex flex-row gap-1 md:gap-2">
          <p className="bg-stone-200 dark:bg-stone-700 rounded p-1 text-base font-bold sm:text-xl text-center w-10">
            {player.position}
          </p>
          <p className="bg-stone-200 dark:bg-stone-700 rounded p-1 text-base font-bold sm:text-xl text-center w-14">
            #{player.sweaterNumber}
          </p>
        </div>
        <Image
          src={player.teamLogo}
          className="w-12 h-12 sm:w-16 sm:h-16 dark:hidden"
          alt={player.teamName.default}
          width={200}
          height={200}
        />
        <Image
          src={
            // The 'Dark' logo used for Washington is the old logo that doesn't work better for our dark mode anyways, so use the regular one for now.
            player.teamAbbrev === "WSH"
              ? player.teamLogo
              : `https://assets.nhle.com/logos/nhl/svg/${player.teamAbbrev}_dark.svg`
          }
          className="w-12 h-12 sm:w-16 sm:h-16 hidden dark:block"
          alt={player.teamName.default}
          width={200}
          height={200}
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
