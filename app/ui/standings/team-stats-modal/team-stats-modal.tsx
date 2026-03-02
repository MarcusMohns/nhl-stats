"use client";
import { useEffect, useState, useMemo } from "react";
import type { TeamType } from "@/app/types";
import Modal from "@/app/ui/modal";
import Chip from "@/app/ui/chip";
import SkaterCard from "./skater-card";
import GoalieCard from "./goalie-card";
import TeamThisWeekSchedule from "./weekly-schedule";
import LinkOut from "@/app/ui/link-out";
import Image from "next/image";
import { getTeamStats } from "@/app/_actions";
import ErrorPage from "@/app/ui/error-page";
import Loading from "./loading";

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
      <div className="h-180">
        <h1 className="flex flex-row justify-center items-center text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
          {team.teamName.default}
          <LinkOut
            linkOutStyles="ml-3"
            hrefString={`https://www.nhl.com/${team.teamCommonName.default.replace(
              /\s+/g,
              "",
            )}`}
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
          <div className="flex flex-column gap-1 flex-wrap">
            {chips.map((chip) => (
              <Chip color="text-white" bgColor="bg-gray-600" key={chip.name}>
                <p>
                  {chip.name}: {chip.value}
                </p>
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="top-skater-stats">
            <h2 className="text-start font-semibold text-stone-600 dark:text-stone-300 uppercase text-sm mt-2">
              Top Point Scorers
            </h2>
            <div className="flex flex-col gap-2">
              {teamStats.topSkaters.map((player) => (
                <SkaterCard player={player} key={player.playerId} />
              ))}
            </div>
          </div>
          <div className="top-goalie-stats">
            <h2 className="text-start font-semibold text-stone-600 dark:text-stone-300 uppercase text-sm mt-2">
              Top Goalie
            </h2>
            <GoalieCard
              player={teamStats.goalies[0]}
              key={teamStats.goalies[0].playerId}
            />
          </div>
        </div>
        <h2 className="text-start font-semibold text-stone-600 dark:text-stone-300 uppercase text-sm mt-2">
          This Weeks Games
        </h2>
        <TeamThisWeekSchedule
          games={teamStats.games}
          teamAbbrev={team.teamAbbrev.default}
        />
      </div>
    </Modal>
  );
};

export default TeamStatsModal;
