"use client";

import { useState, useCallback } from "react";
import { LeaderBoardsType } from "@/app/types";
import PlayerCard from "./player-card";
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
    icon: <StarIcon aria-hidden="true" className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <StarIconSolid
        aria-hidden="true"
        className="w-5 h-5 inline mr-1 text-amber-500 dark:text-amber-400"
      />
    ),
  },
  {
    name: "Assists",
    icon: <SparklesIcon aria-hidden="true" className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <SparklesIconSolid
        aria-hidden="true"
        className="w-5 h-5 inline mr-1 text-cyan-500 dark:text-cyan-400"
      />
    ),
  },
  {
    name: "Goals",
    icon: <FireIcon aria-hidden="true" className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <FireIconSolid
        aria-hidden="true"
        className="w-5 h-5 inline mr-1 text-rose-500 dark:text-rose-400"
      />
    ),
  },
];
const GOALIE_TABS = [
  {
    name: "Save%",
    icon: (
      <ShieldCheckIcon aria-hidden="true" className="w-5 h-5 inline mr-1" />
    ),
    iconSolid: (
      <ShieldCheckIconSolid
        aria-hidden="true"
        className="w-5 h-5 inline mr-1 text-emerald-500 dark:text-emerald-400"
      />
    ),
  },
  {
    name: "Shutouts",
    icon: <LockClosedIcon aria-hidden="true" className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <LockClosedIconSolid
        aria-hidden="true"
        className="w-5 h-5 inline mr-1 text-amber-500 dark:text-amber-400"
      />
    ),
  },
  {
    name: "GAA",
    icon: <ChartBarIcon aria-hidden="true" className="w-5 h-5 inline mr-1" />,
    iconSolid: (
      <ChartBarIconSolid
        aria-hidden="true"
        className="w-5 h-5 inline mr-1 text-blue-500 dark:text-blue-400"
      />
    ),
  },
];

const LeaderboardClient = ({ leaderboard }: LeaderboardClientProps) => {
  const [selectedSkaterLeaders, setSelectedSkaterLeaders] = useState<string>(
    SKATER_TABS[0].name,
  );
  const [selectedGoalieLeaders, setSelectedGoalieLeaders] = useState<string>(
    GOALIE_TABS[0].name,
  );

  const handleSelectedSkaterLeaders = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedSkaterLeaders(standing));
  }, []);
  const handleSelectedGoalieLeaders = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedGoalieLeaders(standing));
  }, []);

  const goalieLeaders = leaderboard[selectedGoalieLeaders];
  const skaterLeaders = leaderboard[selectedSkaterLeaders];

  return (
    <section className="leaderboard w-full max-w-7xl mx-auto p-2 sm:p-4 animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full items-start">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <h2 className="font-black text-stone-700 dark:text-stone-200 uppercase tracking-widest text-3xl drop-shadow-sm">
              Skaters
            </h2>
            <SelectTableButtons
              buttons={SKATER_TABS}
              selectedTable={selectedSkaterLeaders}
              handleSelectedTable={handleSelectedSkaterLeaders}
            />
          </div>
          <ul className="w-full flex flex-col gap-2">
            {skaterLeaders.map((player) => (
              <li key={player.id}>
                <PlayerCard player={player} />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <h2 className="font-black text-stone-700 dark:text-stone-200 uppercase tracking-widest text-3xl drop-shadow-sm">
              Goalies
            </h2>
            <SelectTableButtons
              buttons={GOALIE_TABS}
              selectedTable={selectedGoalieLeaders}
              handleSelectedTable={handleSelectedGoalieLeaders}
            />
          </div>
          <ul className="w-full flex flex-col gap-2">
            {goalieLeaders.map((player) => (
              <li key={player.id}>
                <PlayerCard player={player} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardClient;
