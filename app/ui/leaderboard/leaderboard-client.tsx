"use client";

import { useState, useCallback } from "react";
import { LeaderBoardsType } from "@/app/types";
import PlayerCardList from "./player-card-list";
import SelectTableButtons from "@/app/ui/select-table-buttons";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import {
  StarIcon,
  UserGroupIcon,
  TrophyIcon,
  ShieldCheckIcon,
  NoSymbolIcon,
  PercentBadgeIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  TrophyIcon as TrophyIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  NoSymbolIcon as NoSymbolIconSolid,
  PercentBadgeIcon as PercentBadgeIconSolid,
} from "@heroicons/react/24/solid";

type LeaderboardClientProps = {
  leaderboard: LeaderBoardsType;
};

const SKATER_TABS = [
  {
    name: "Points",
    icon: <StarIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <StarIconSolid className="w-5 h-5 inline mr-1 text-yellow-500 dark:text-yellow-400" />
    ),
  },
  {
    name: "Assists",
    icon: <UserGroupIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <UserGroupIconSolid className="w-5 h-5 inline mr-1 text-blue-500 dark:text-blue-400" />
    ),
  },
  {
    name: "Goals",
    icon: <TrophyIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <TrophyIconSolid className="w-5 h-5 inline mr-1 text-orange-500 dark:text-orange-400" />
    ),
  },
];
const GOALIE_TABS = [
  {
    name: "Save%",
    icon: <PercentBadgeIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <PercentBadgeIconSolid className="w-5 h-5 inline mr-1 text-emerald-500 dark:text-emerald-300" />
    ),
  },
  {
    name: "Shutouts",
    icon: <NoSymbolIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <NoSymbolIconSolid className="w-5 h-5 inline mr-1 text-red-500 dark:text-red-400" />
    ),
  },
  {
    name: "GAA",
    icon: <ShieldCheckIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <ShieldCheckIconSolid className="w-5 h-5 inline mr-1 text-indigo-500 dark:text-indigo-300" />
    ),
  },
];

const LeaderboardClient = ({ leaderboard }: LeaderboardClientProps) => {
  const [selectedSkaterLeaders, setSelectedSkaterLeaders] =
    useState<string>("Points");
  const [selectedGoalieLeaders, setSelectedGoalieLeaders] =
    useState<string>("Save%");

  const handleSelectedSkaterLeaders = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedSkaterLeaders(standing));
  }, []);
  const handleSelectedGoalieLeaders = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedGoalieLeaders(standing));
  }, []);

  const goalieLeaders = leaderboard[selectedGoalieLeaders];
  const skaterLeaders = leaderboard[selectedSkaterLeaders];

  return (
    <section className="leaderboard h-max w-full xl:w-7xl p-2 sm:p-5 animate-fade-in">
      <div className="flex flex-col items-center justify-center xl:flex-row w-full gap-10">
        <div className="w-full xl:w-xl">
          <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none text-2xl">
            Skaters
          </h3>
          <SelectTableButtons
            buttons={SKATER_TABS}
            selectedTable={selectedSkaterLeaders}
            handleSelectedTable={handleSelectedSkaterLeaders}
          />
          <h2 className="font-bold dark:text-stone-300 my-5 pt-2 px-1 text-lg uppercase leading-tight tracking-wide select-none">
            {selectedSkaterLeaders}
          </h2>
          <PlayerCardList players={skaterLeaders} />
        </div>
        <div className="w-full xl:w-xl">
          <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none text-2xl px-2">
            Goalies
          </h3>
          <SelectTableButtons
            buttons={GOALIE_TABS}
            selectedTable={selectedGoalieLeaders}
            handleSelectedTable={handleSelectedGoalieLeaders}
          />
          <h2 className="font-bold dark:text-stone-300 my-5 pt-2 px-1 text-lg uppercase leading-tight tracking-wide select-none">
            {selectedGoalieLeaders}
          </h2>
          <PlayerCardList players={goalieLeaders} />
        </div>
      </div>
    </section>
  );
};

export default LeaderboardClient;
