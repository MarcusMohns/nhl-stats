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
    <section className="leaderboard h-max w-full p-2 animate-fade-in">
      <div className="flex flex-col items-center justify-center xl:flex-row w-full gap-10">
        <div className="w-full xl:max-w-2xl">
          <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none text-2xl">
            Skaters
          </h3>
          <SelectTableButtons
            buttons={SKATER_TABS}
            selectedTable={selectedSkaterLeaders}
            handleSelectedTable={handleSelectedSkaterLeaders}
          />
          <ul className="w-full">
            {skaterLeaders.map((player) => (
              <li key={player.id}>
                <PlayerCard player={player} />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full xl:max-w-2xl">
          <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none text-2xl">
            Goalies
          </h3>
          <SelectTableButtons
            buttons={GOALIE_TABS}
            selectedTable={selectedGoalieLeaders}
            handleSelectedTable={handleSelectedGoalieLeaders}
          />
          <ul className="w-full">
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
