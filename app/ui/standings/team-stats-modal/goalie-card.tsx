import { GoalieType } from "@/app/types";
import LinkOut from "@/app/ui/link-out";
import Image from "next/image";

const GoalieCard = ({ player }: { player: GoalieType }) => {
  return (
    <div className="flex flex-row items-center shadow-sm bg-white dark:bg-stone-800 rounded mt-2">
      <Image
        src={player.headshot}
        alt={`Headshot of ${player.firstName.default} ${player.lastName.default}`}
        width={366}
        height={366}
        className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 ml-1"
      />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full text-md uppercase font-bold mb-2">
          <p className="ml-auto pl-6">
            {player.firstName.default} {player.lastName.default}
          </p>

          <LinkOut
            linkOutStyles="ml-auto w-6"
            hrefString={` https://www.nhl.com/player/${player.playerId}`}
            aria-label={`View NHL profile for ${player.firstName.default} ${player.lastName.default}`}
          />
        </div>
        <div className="grid grid-flow-col grid-rows-2 gap-1 font-medium text-start">
          <div className="flex flex-row items-center justify-start sm:mx-3">
            <Image src="/puck.svg" alt="Puck Icon" width={20} height={20} /> S:{" "}
            {player.savePercentage.toFixed(2)}%
          </div>
          <div className="sm:mx-3">
            🥅GAA: {player.goalsAgainstAverage.toFixed(2)}
          </div>
          <div className="sm:mx-3">🧤Saves: {player.saves} </div>
          <div className="sm:mx-3">🏒SA: {player.shotsAgainst}</div>
        </div>
      </div>
    </div>
  );
};

export default GoalieCard;
