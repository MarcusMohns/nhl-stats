import PlayByPlayPlayer from "./play-by-play-player";
import { PlayType, LiveGameType, RosterSpotType } from "@/app/types";
import React from "react";
import { getTeamLogo } from "@/app/lib/game-utils";
import Image from "next/image";
import {
  EllipsisHorizontalIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  XMarkIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  ArrowPathIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

type Props = {
  liveData: LiveGameType;
  playerMap: Map<number, RosterSpotType>;
  play: PlayType;
};

const Play = ({ liveData, playerMap, play }: Props) => {
  const { details, typeDescKey, timeInPeriod } = play;

  // Create default content
  let content: React.ReactNode = (
    <span className="w-full text-base font-bold uppercase text-stone-700 dark:text-stone-200">
      {typeDescKey.replace(/-/g, " ")}
    </span>
  );
  let icon = <EllipsisHorizontalIcon className="h-6 w-6" />;
  let rowClass =
    "flex items-center gap-4 border-b border-stone-100 p-3 text-sm transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800";

  if (details) {
    // Replace content with details if available
    switch (typeDescKey) {
      case "goal":
        const teamLogo = getTeamLogo(details.eventOwnerTeamId, liveData);
        icon = teamLogo ? (
          <div>
            <Image
              src={teamLogo.dark}
              alt={`${teamLogo.abbrev} Logo`}
              width={48}
              height={48}
              className="hidden h-12 w-12 rounded-full object-cover dark:block"
            />
            <Image
              src={teamLogo.light}
              alt={`${teamLogo.abbrev} Logo`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover dark:hidden"
            />
          </div>
        ) : (
          <TrophyIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        );
        rowClass +=
          " bg-green-50/80 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/50";
        content = (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-green-700 dark:bg-green-800 dark:text-green-100">
                Goal
              </span>
              <span className="ml-auto rounded border border-stone-200 bg-white px-2 py-0.5 font-mono font-bold text-stone-700 shadow-sm dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-300">
                {liveData.awayTeam.abbrev} {details.awayScore} -{" "}
                {details.homeScore} {liveData.homeTeam.abbrev}
              </span>
            </div>

            {details.assist1PlayerId && (
              <div className="flex flex-col gap-1">
                <div>
                  <span>Scored by</span>
                  {details.scoringPlayerId && (
                    <PlayByPlayPlayer
                      player={playerMap.get(details.scoringPlayerId)}
                      id={details.scoringPlayerId}
                    />
                  )}
                </div>
                <div>
                  <span>Assisted by</span>
                  {details.assist1PlayerId && (
                    <PlayByPlayPlayer
                      player={playerMap.get(details.assist1PlayerId)}
                      id={details.assist1PlayerId}
                    />
                  )}
                  {details.assist2PlayerId && (
                    <PlayByPlayPlayer
                      player={playerMap.get(details.assist2PlayerId)}
                      id={details.assist2PlayerId}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        );
        break;
      case "penalty":
        icon = <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" />;
        rowClass +=
          " bg-orange-50/80 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-800/20";
        content = (
          <span>
            Penalty on{" "}
            {details.committedByPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.committedByPlayerId)}
                id={details.committedByPlayerId}
              />
            )}{" "}
            ({details.descKey}, {details.duration} min)
            {details.drawnByPlayerId && (
              <>
                {" "}
                Drawn by{" "}
                <PlayByPlayPlayer
                  player={playerMap.get(details.drawnByPlayerId)}
                  id={details.drawnByPlayerId}
                />
              </>
            )}
          </span>
        );
        break;
      case "shot-on-goal":
        icon = <BoltIcon className="h-5 w-5 text-stone-500" />;
        content = (
          <span>
            Shot by{" "}
            {details.shootingPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.shootingPlayerId)}
                id={details.shootingPlayerId}
              />
            )}{" "}
            saved by{" "}
            {details.goalieInNetId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.goalieInNetId)}
                id={details.goalieInNetId}
              />
            )}
          </span>
        );
        break;
      case "missed-shot":
        icon = <XMarkIcon className="h-5 w-5 text-stone-400" />;
        content = (
          <span>
            Missed shot by{" "}
            {details.shootingPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.shootingPlayerId)}
                id={details.shootingPlayerId}
              />
            )}
          </span>
        );
        break;
      case "blocked-shot":
        icon = <ShieldExclamationIcon className="h-5 w-5 text-stone-400" />;
        content = (
          <span>
            Shot by{" "}
            {details.shootingPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.shootingPlayerId)}
                id={details.shootingPlayerId}
              />
            )}{" "}
            blocked by{" "}
            {details.blockingPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.blockingPlayerId)}
                id={details.blockingPlayerId}
              />
            )}
          </span>
        );
        break;
      case "hit":
        icon = <HandRaisedIcon className="h-5 w-5 text-stone-400" />;
        content = (
          <span>
            Hit by{" "}
            {details.hittingPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.hittingPlayerId)}
                id={details.hittingPlayerId}
              />
            )}{" "}
            on{" "}
            {details.hitteePlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.hitteePlayerId)}
                id={details.hitteePlayerId}
              />
            )}
          </span>
        );
        break;
      case "faceoff":
        icon = <UserGroupIcon className="h-5 w-5 text-stone-500" />;
        content = (
          <span>
            Faceoff won by{" "}
            {details.winningPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.winningPlayerId)}
                id={details.winningPlayerId}
              />
            )}{" "}
            vs{" "}
            {details.losingPlayerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.losingPlayerId)}
                id={details.losingPlayerId}
              />
            )}
          </span>
        );
        break;
      case "giveaway":
      case "takeaway":
        icon = <ArrowPathIcon className="h-5 w-5 text-stone-500" />;
        content = (
          <span>
            {typeDescKey.charAt(0).toUpperCase() + typeDescKey.slice(1)} by{" "}
            {details.playerId && (
              <PlayByPlayPlayer
                player={playerMap.get(details.playerId)}
                id={details.playerId}
              />
            )}
            .
          </span>
        );
        break;
    }
  }

  return (
    <div className={rowClass}>
      <div className="flex flex-col items-center">
        <span className="w-10 shrink-0 pt-1 font-mono text-xs text-stone-300">
          {timeInPeriod}
        </span>
        <div className="shrink-0 pt-0.5">{icon}</div>
      </div>
      <div className="flex-grow text-start text-stone-800 leading-relaxed dark:text-stone-200">
        {content}
      </div>
    </div>
  );
};

export default Play;
