"use client";
import { useEffect, useState, useMemo } from "react";
import type { TeamType } from "@/app/types";
import Modal from "@/app/ui/modal";
import Chip from "@/app/ui/chip";
import WeeklySchedule from "./weekly-schedule";
import LinkOut from "@/app/ui/link-out";
import Image from "next/image";
import { getTeamStats } from "@/app/_actions";
import ErrorPage from "@/app/ui/error-page";
import Loading from "./loading";
import PlayerCard from "./player-card";

type ModalProps = {
  handleCloseModal: () => void;
  team: TeamType;
};

export const TeamStatsModal = ({ handleCloseModal, team }: ModalProps) => {
  const [teamStats, setTeamStats] = useState<Awaited<
    ReturnType<typeof getTeamStats>
  > | null>(null);

  useEffect(() => {
    getTeamStats(team).then(setTeamStats);
  }, [team]);

  const chips = useMemo(
    () => [
      { name: "Rank", value: team.rank },
      { name: "Points", value: team.points },
      {
        name: "Win Percentage",
        value: `${(team.winPctg * 100).toFixed(1)}%`,
      },
      { name: "Conference", value: team.conferenceName },
      { name: "Division", value: team.divisionName },
    ],
    [team],
  );

  if (!teamStats) {
    return (
      <Modal closeModal={handleCloseModal}>
        <Loading />
      </Modal>
    );
  }

  if (teamStats instanceof Error) {
    return (
      <Modal closeModal={handleCloseModal}>
        <ErrorPage error={teamStats} reset={handleCloseModal} />
      </Modal>
    );
  }

  return (
    <Modal closeModal={handleCloseModal}>
      <div className="max-h-180 pr-2 overflow-y-scroll">
        <h1
          id="modal-title"
          className="flex flex-row justify-center items-center text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight"
        >
          {team.teamName.default}
          <LinkOut
            linkOutStyles="ml-3"
            hrefString={`https://www.nhl.com/${team.teamCommonName.default.replace(
              /\s+/g,
              "",
            )}`}
            aria-label={`Visit ${team.teamName.default} official site`}
          />
        </h1>
        <div className="m-2 flex flex-row p-2 ">
          <Image
            src={team.teamLogo}
            alt={`Logo of ${team.teamName.default}`}
            className="w-30 h-20 rounded-sm shadow-xl bg-gray-200 dark:hidden mr-2"
            width={960}
            height={640}
          />
          <Image
            src={team.teamLogoDark}
            className="w-30 h-20 rounded-sm shadow-xl bg-stone-800 hidden dark:block mr-2"
            alt={`Dark mode logo of ${team.teamName.default}`}
            width={960}
            height={640}
          />
          <ul className="flex flex-row flex-wrap justify-center items-start gap-1">
            {chips.map((chip) => (
              <li key={chip.name}>
                <Chip className="bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-200">
                  <span className="font-medium opacity-80">{chip.name}:</span>
                  <span className="ml-1">{chip.value}</span>
                </Chip>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="top-skater-stats">
            <div className="flex items-center mt-4 mb-2">
              <div
                className="flex-1 border-t border-stone-300 dark:border-stone-600"
                aria-hidden="true"
              />
              <h2 className="px-3 text-center font-semibold text-stone-600 dark:text-stone-300 uppercase text-sm">
                Top Point Scorers
              </h2>
              <div
                className="flex-1 border-t border-stone-300 dark:border-stone-600"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col gap-2">
              {teamStats.topSkaters.map((player) => (
                <PlayerCard player={player} key={player.playerId} />
              ))}
            </div>
          </div>
          <div className="top-goalie-stats">
            <div className="flex items-center mt-4 mb-2">
              <div
                className="flex-1 border-t border-stone-300 dark:border-stone-600"
                aria-hidden="true"
              />
              <h2 className="px-3 text-center font-semibold text-stone-600 dark:text-stone-300 uppercase text-sm">
                Top Goalies
              </h2>
              <div
                className="flex-1 border-t border-stone-300 dark:border-stone-600"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col gap-2">
              {teamStats.topGoalies.map((player) => (
                <PlayerCard player={player} key={player.playerId} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 mb-2">
          <div
            className="flex-1 border-t border-stone-300 dark:border-stone-600"
            aria-hidden="true"
          />
          <h2 className="px-3 text-center font-semibold text-stone-600 dark:text-stone-300 uppercase text-sm">
            This Weeks Games
          </h2>
          <div
            className="flex-1 border-t border-stone-300 dark:border-stone-600"
            aria-hidden="true"
          />
        </div>
        <WeeklySchedule games={teamStats.games} />
      </div>
    </Modal>
  );
};

export default TeamStatsModal;
