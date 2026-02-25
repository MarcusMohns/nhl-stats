"use client";

import { useState, useCallback } from "react";
import { LeaderBoardsType } from "@/app/types";
import PlayerCardList from "./player-card-list";
import SelectTableButtons from "@/app/ui/select-table-buttons";
import startViewTransitionWrapper from "@/app/lib/start-view-transition-wrapper";

type LeaderboardClientProps = {
  leaderboard: LeaderBoardsType;
};

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
    <section className="leaderboard h-max  w-full xl:w-7xl p-2 sm:p-5 animate-fade-in">
      <div className="flex flex-col items-center justify-center xl:flex-row w-full gap-10">
        <div className="w-full xl:w-xl">
          <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none text-2xl">
            Skaters
          </h3>
          <SelectTableButtons
            buttons={["Points", "Assists", "Goals"]}
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
            buttons={["Save%", "Shutouts", "GAA"]}
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
