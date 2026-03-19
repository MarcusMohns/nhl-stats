import PlayByPlayPlayer from "./play-by-play-player";
import {
  PlayType,
  LiveGameType,
  RosterSpotType,
  RenderContextType,
  RenderResultType,
} from "@/app/types";
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

const renderers: Record<string, (ctx: RenderContextType) => RenderResultType> =
  // create a render function for each type of play that returns a RenderResultType
  {
    goal: ({ details, playerMap, liveData }) => {
      const teamLogo = getTeamLogo(details.eventOwnerTeamId, liveData);
      const icon = teamLogo ? (
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

      const content = (
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
                <PlayByPlayPlayer
                  map={playerMap}
                  id={details.scoringPlayerId}
                />
              </div>
              <div>
                <span>Assisted by</span>
                <PlayByPlayPlayer
                  map={playerMap}
                  id={details.assist1PlayerId}
                />
                <PlayByPlayPlayer
                  map={playerMap}
                  id={details.assist2PlayerId}
                />
              </div>
            </div>
          )}
        </div>
      );

      return {
        icon,
        content,
        extraClass:
          "bg-green-50/80 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/50",
      };
    },
    penalty: ({ details, playerMap }) => ({
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" />,
      content: (
        <span>
          Penalty on{" "}
          <PlayByPlayPlayer map={playerMap} id={details.committedByPlayerId} />{" "}
          ({details.descKey}, {details.duration} min)
          {details.drawnByPlayerId && (
            <>
              {" "}
              Drawn by{" "}
              <PlayByPlayPlayer map={playerMap} id={details.drawnByPlayerId} />
            </>
          )}
        </span>
      ),
      extraClass:
        "bg-orange-50/80 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-800/20",
    }),
    "shot-on-goal": ({ details, playerMap }) => ({
      icon: <BoltIcon className="h-5 w-5 text-stone-500" />,
      content: (
        <span>
          Shot by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.shootingPlayerId} />{" "}
          saved by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.goalieInNetId} />
        </span>
      ),
    }),
    "missed-shot": ({ details, playerMap }) => ({
      icon: <XMarkIcon className="h-5 w-5 text-stone-400" />,
      content: (
        <span>
          Missed shot by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.shootingPlayerId} />
        </span>
      ),
    }),
    "blocked-shot": ({ details, playerMap }) => ({
      icon: <ShieldExclamationIcon className="h-5 w-5 text-stone-400" />,
      content: (
        <span>
          Shot by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.shootingPlayerId} />{" "}
          blocked by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.blockingPlayerId} />
        </span>
      ),
    }),
    hit: ({ details, playerMap }) => ({
      icon: <HandRaisedIcon className="h-5 w-5 text-stone-400" />,
      content: (
        <span>
          Hit by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.hittingPlayerId} /> on{" "}
          <PlayByPlayPlayer map={playerMap} id={details.hitteePlayerId} />
        </span>
      ),
    }),
    faceoff: ({ details, playerMap }) => ({
      icon: <UserGroupIcon className="h-5 w-5 text-stone-500" />,
      content: (
        <span>
          Faceoff won by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.winningPlayerId} /> vs{" "}
          <PlayByPlayPlayer map={playerMap} id={details.losingPlayerId} />
        </span>
      ),
    }),
    giveaway: ({ details, playerMap, typeDescKey }) => ({
      icon: <ArrowPathIcon className="h-5 w-5 text-stone-500" />,
      content: (
        <span>
          {typeDescKey.charAt(0).toUpperCase() + typeDescKey.slice(1)} by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.playerId} />.
        </span>
      ),
    }),
    takeaway: ({ details, playerMap, typeDescKey }) => ({
      icon: <ArrowPathIcon className="h-5 w-5 text-stone-500" />,
      content: (
        <span>
          {typeDescKey.charAt(0).toUpperCase() + typeDescKey.slice(1)} by{" "}
          <PlayByPlayPlayer map={playerMap} id={details.playerId} />.
        </span>
      ),
    }),
  };

const Play = ({ liveData, playerMap, play }: Props) => {
  const { details, typeDescKey, timeInPeriod } = play;

  let result: RenderResultType = {
    // If we don't have details, render default
    icon: <EllipsisHorizontalIcon className="h-6 w-6" />,
    content: (
      <span className="w-full text-base font-bold uppercase text-stone-700 dark:text-stone-200">
        {typeDescKey.replace(/-/g, " ")}
      </span>
    ),
  };

  if (details && renderers[typeDescKey]) {
    // If we have details, we can render the play, access the render function and call it
    result = renderers[typeDescKey]({
      details,
      playerMap,
      liveData,
      typeDescKey,
    });
  }

  const rowClass = `flex items-center gap-4 border-b border-stone-100 p-3 text-sm transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800 ${
    result.extraClass || ""
  }`;

  return (
    <div className={rowClass}>
      <div className="flex flex-col items-center">
        <span className="w-10 shrink-0 pt-1 font-mono text-xs text-stone-300">
          {timeInPeriod}
        </span>
        <div className="shrink-0 pt-0.5">{result.icon}</div>
      </div>
      <div className="flex-grow text-start text-stone-800 leading-relaxed dark:text-stone-200">
        {result.content}
      </div>
    </div>
  );
};

export default Play;
