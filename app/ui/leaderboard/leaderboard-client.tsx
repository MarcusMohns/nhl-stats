"use client";

import { useState, useCallback } from "react";
import { LeaderBoardsType } from "@/app/types";
import PlayerCardList from "./player-card-list";
import SelectTableButtons from "@/app/ui/select-table-buttons";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";
import {
  StarIcon,
  SparklesIcon,
  FireIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  SparklesIcon as SparklesIconSolid,
  FireIcon as FireIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  LockClosedIcon as LockClosedIconSolid,
  ChartBarIcon as ChartBarIconSolid,
} from "@heroicons/react/24/solid";

type LeaderboardClientProps = {
  leaderboard: LeaderBoardsType;
};

const SKATER_TABS = [
  {
    name: "Points",
    icon: <StarIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <StarIconSolid className="w-5 h-5 inline mr-1 text-amber-500 dark:text-amber-400" />
    ),
  },
  {
    name: "Assists",
    icon: <SparklesIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <SparklesIconSolid className="w-5 h-5 inline mr-1 text-cyan-500 dark:text-cyan-400" />
    ),
  },
  {
    name: "Goals",
    icon: <FireIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <FireIconSolid className="w-5 h-5 inline mr-1 text-rose-500 dark:text-rose-400" />
    ),
  },
];
const GOALIE_TABS = [
  {
    name: "Save%",
    icon: <ShieldCheckIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <ShieldCheckIconSolid className="w-5 h-5 inline mr-1 text-emerald-500 dark:text-emerald-400" />
    ),
  },
  {
    name: "Shutouts",
    icon: <LockClosedIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <LockClosedIconSolid className="w-5 h-5 inline mr-1 text-amber-500 dark:text-amber-400" />
    ),
  },
  {
    name: "GAA",
    icon: <ChartBarIcon className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <ChartBarIconSolid className="w-5 h-5 inline mr-1 text-blue-500 dark:text-blue-400" />
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
          <PlayerCardList players={goalieLeaders} />
        </div>
      </div>
    </section>
  );
};

export default LeaderboardClient;
