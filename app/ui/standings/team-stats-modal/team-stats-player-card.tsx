import { GoalieType, SkaterType } from "@/app/types";
import LinkOut from "@/app/ui/link-out";
import Image from "next/image";

const TeamStatsPlayerCard = ({
  player,
}: {
  player: SkaterType | GoalieType;
}) => {
  //Check if player is a goalie
  const isGoalie = (p: SkaterType | GoalieType): p is GoalieType =>
    "savePercentage" in p;

  const stats = isGoalie(player)
    ? // If goalie, show goalie stats
      [
        { label: "Games Played", value: player.gamesPlayed, short: "GP" },
        {
          label: "Save %",
          value: player.savePercentage.toFixed(3),
          short: "SV%",
        },
        {
          label: "GAA",
          value: player.goalsAgainstAverage.toFixed(2),
          short: "GAA",
        },
        { label: "Saves", value: player.saves, short: "Saves" },
      ]
    : // If skater, show skater stats
      [
        { label: "Games Played", value: player.gamesPlayed, short: "GP" },
        { label: "Points", value: player.points, short: "P" },
        { label: "Goals", value: player.goals, short: "G" },
        { label: "Assists", value: player.assists, short: "A" },
        { label: "Plus/Minus", value: player.plusMinus, short: "+/-" },
        {
          label: "Shooting Percentage",
          value: player.shootingPctg.toFixed(2),
          short: "SH%",
        },
      ];

  return (
    <div className="flex flex-row items-center w-full p-3 shadow-sm bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700/50 transition-colors hover:bg-stone-50 dark:hover:bg-stone-700/30">
      <div className="relative shrink-0">
        <Image
          src={player.headshot}
          alt={`Headshot of ${player.firstName.default} ${player.lastName.default}`}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 object-cover ring-2 ring-stone-100 dark:ring-stone-600"
        />
      </div>

      <div className="flex flex-col flex-grow ml-4 overflow-hidden">
        <div className="flex flex-row items-center justify-between w-full mb-1">
          <h3 className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100 truncate">
            {player.firstName.default} {player.lastName.default}
            {isGoalie(player) ? (
              <span className="ml-1" aria-label="Position: Goalie">
                (G)
              </span>
            ) : (
              <span
                className="ml-1"
                aria-label={`Position: ${player.positionCode}`}
              >
                ({player.positionCode})
              </span>
            )}
          </h3>
          <LinkOut
            linkOutStyles="w-5 h-5 mr-1 text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            hrefString={`https://www.nhl.com/player/${player.playerId}`}
            aria-label={`View NHL profile for ${player.firstName.default} ${player.lastName.default}`}
          />
        </div>

        <div
          role="group"
          aria-label="Player Statistics"
          className="flex flex-row flex-wrap gap-4 sm:gap-6 text-sm"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center"
              title={stat.label}
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <span className="text-[10px] sm:text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {stat.short}
              </span>
              <span className="font-bold text-stone-700 dark:text-stone-200">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamStatsPlayerCard;
