import { LiveGameType, PlayType } from "@/app/types";
import LiveChip from "../live-chip";
import Modal from "../modal";
import { useCallback, useState, useMemo } from "react";
import Image from "next/image";
import {
  TrophyIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  XMarkIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  ArrowPathIcon,
  HandRaisedIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

type Props = {
  liveData: LiveGameType;
};

const LiveDataRow = ({ liveData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Optimization: Create a map for O(1) player lookup instead of O(N) array.find
  const playerMap = useMemo(() => {
    return new Map(liveData.rosterSpots.map((p) => [p.playerId, p]));
  }, [liveData.rosterSpots]);

  const renderPlayer = (playerId: number | undefined) => {
    if (!playerId) return null;
    const player = playerMap.get(playerId);
    if (!player)
      return <span className="font-bold text-xs mx-1">#{playerId}</span>;

    return (
      <span className="inline-flex items-center gap-2 mx-1 align-middle bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full pr-3 pl-1 py-0.5 shadow-sm transition-transform hover:scale-105">
        <Image
          src={player.headshot}
          alt={player.lastName.default}
          width={24}
          height={24}
          className="rounded-full bg-stone-200 dark:bg-stone-700 w-6 h-6 object-cover"
        />
        <span className="text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-200">
          {player.lastName.default}
        </span>
      </span>
    );
  };

  const getTeamLogo = (teamId: number | undefined) => {
    if (!teamId) return null;
    if (liveData.homeTeam.id === teamId)
      return {
        light: liveData.homeTeam.logo,
        dark: liveData.homeTeam.darkLogo,
      };
    if (liveData.awayTeam.id === teamId)
      return {
        light: liveData.awayTeam.logo,
        dark: liveData.awayTeam.darkLogo,
      };
    return null;
  };

  const renderPlay = (play: PlayType) => {
    const { details, typeDescKey, timeInPeriod } = play;
    let content: React.ReactNode = (
      <span className="uppercase font-bold w-full text-stone-700 dark:text-stone-200 text-base">
        {typeDescKey.replace(/-/g, " ")}
      </span>
    );
    let icon = <EllipsisHorizontalIcon className="w-6 h-6" />;
    let rowClass =
      "flex items-center gap-4 border-b border-stone-100 dark:border-stone-800 p-3 text-sm transition-colors hover:bg-stone-50 dark:hover:bg-stone-800";

    if (details) {
      switch (typeDescKey) {
        case "goal":
          const teamLogo = getTeamLogo(details.eventOwnerTeamId);
          icon = teamLogo ? (
            <div>
              <Image
                src={teamLogo.dark}
                alt={`${liveData.homeTeam.abbrev} Logo`}
                width={48}
                height={48}
                className="rounded-full w-12 h-12 object-cover hidden dark:block"
              />
              <Image
                src={teamLogo.light}
                alt={`${liveData.awayTeam.abbrev} Logo`}
                width={48}
                height={48}
                className="rounded-full w-12 h-12 object-cover dark:hidden"
              />
            </div>
          ) : (
            <TrophyIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          );
          rowClass +=
            "bg-green-50/80 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/50";
          content = (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 px-2 py-0.5 rounded-full">
                  Goal
                </span>
                <span className="font-mono font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900/50 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 shadow-sm ml-auto">
                  {liveData.awayTeam.abbrev} {details.awayScore} -{" "}
                  {details.homeScore} {liveData.homeTeam.abbrev}
                </span>
              </div>

              {details.assist1PlayerId && (
                <div className="flex flex-col gap-1">
                  <div>
                    <span>Scored by</span>
                    {renderPlayer(details.scoringPlayerId)}
                  </div>
                  <div>
                    <span>Assisted by</span>
                    {renderPlayer(details.assist1PlayerId)}
                    {details.assist2PlayerId &&
                      renderPlayer(details.assist2PlayerId)}
                  </div>
                </div>
              )}
            </div>
          );
          break;
        case "penalty":
          icon = (
            <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
          );
          rowClass +=
            "bg-orange-50/80 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-800/20";
          content = (
            <span>
              Penalty on {renderPlayer(details.committedByPlayerId)} (
              {details.descKey}, {details.duration} min)
              {details.drawnByPlayerId && (
                <> Drawn by {renderPlayer(details.drawnByPlayerId)}</>
              )}
            </span>
          );
          break;
        case "shot-on-goal":
          icon = <BoltIcon className="w-5 h-5 text-stone-500" />;
          content = (
            <span>
              Shot by {renderPlayer(details.shootingPlayerId)} saved by{" "}
              {renderPlayer(details.goalieInNetId)}
            </span>
          );
          break;
        case "missed-shot":
          icon = <XMarkIcon className="w-5 h-5 text-stone-400" />;
          content = (
            <span>Missed shot by {renderPlayer(details.shootingPlayerId)}</span>
          );
          break;
        case "blocked-shot":
          icon = <ShieldExclamationIcon className="w-5 h-5 text-stone-400" />;
          content = (
            <span>
              Shot by {renderPlayer(details.shootingPlayerId)} blocked by{" "}
              {renderPlayer(details.blockingPlayerId)}
            </span>
          );
          break;
        case "hit":
          icon = <HandRaisedIcon className="w-5 h-5 text-stone-400" />;
          content = (
            <span>
              Hit by {renderPlayer(details.hittingPlayerId)} on{" "}
              {renderPlayer(details.hitteePlayerId)}
            </span>
          );
          break;
        case "faceoff":
          icon = <UserGroupIcon className="w-5 h-5 text-stone-500" />;
          content = (
            <span>
              Faceoff won by {renderPlayer(details.winningPlayerId)} vs{" "}
              {renderPlayer(details.losingPlayerId)}
            </span>
          );
          break;
        case "giveaway":
        case "takeaway":
          icon = <ArrowPathIcon className="w-5 h-5 text-stone-500" />;
          content = (
            <span>
              {typeDescKey.charAt(0).toUpperCase() + typeDescKey.slice(1)} by{" "}
              {renderPlayer(details.playerId)}.
            </span>
          );
          break;
      }
    }

    return (
      <div key={play.eventId} className={rowClass}>
        <div className="flex flex-col items-center">
          <span className="font-mono text-xs text-stone-300 w-10 shrink-0 pt-1">
            {timeInPeriod}
          </span>
          <div className="shrink-0 pt-0.5">{icon}</div>
        </div>
        <div className="flex-grow text-start leading-relaxed text-stone-800 dark:text-stone-200">
          {content}
        </div>
      </div>
    );
  };

  const displayedPeriod = useMemo(() => {
    switch (liveData.displayPeriod) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      case 4:
        return "OT";
      case 5:
        return "SO";
      default:
        return `${liveData.displayPeriod}`;
    }
  }, [liveData.displayPeriod]);

  const groupedPlays = useMemo(() => {
    const groups: { period: number; plays: PlayType[] }[] = [];
    let currentPeriod = -1;
    let currentGroup: { period: number; plays: PlayType[] } | null = null;

    liveData.plays.forEach((play) => {
      // Fallback for period property if strict typing isn't available
      const pVal = play.periodDescriptor?.number || 0;

      if (pVal !== currentPeriod) {
        currentPeriod = pVal;
        currentGroup = { period: pVal, plays: [] };
        groups.push(currentGroup);
      }
      if (currentGroup) {
        currentGroup.plays.push(play);
      }
    });
    return groups;
  }, [liveData.plays]);

  const getPeriodLabel = (period: number) => {
    switch (period) {
      case 1:
        return "1st Period";
      case 2:
        return "2nd Period";
      case 3:
        return "3rd Period";
      case 4:
        return "Overtime";
      case 5:
        return "Shootout";
      default:
        return `Period ${period}`;
    }
  };

  return (
    <div className="flex flex-row items-center w-full gap-2">
      <LiveChip />
      <div
        title="Updates every 60 seconds"
        className="flex flex-row items-center overflow-hidden rounded border border-stone-200 bg-stone-100 shadow-sm dark:divide-stone-600 dark:border-stone-700 dark:bg-stone-700 text-xs font-bold text-stone-800 dark:text-stone-300 p-1 gap-2"
      >
        <span>{displayedPeriod}</span>
        {liveData.clock.inIntermission ? (
          <span className="text-orange-600 dark:text-orange-400">INT</span>
        ) : (
          <span className="font-mono font-black tracking-widest">
            {liveData.clock.timeRemaining}
            <span className="animate-[ping_2s_steps(1)_infinite]">&apos;</span>
          </span>
        )}
      </div>

      <button
        onClick={handleOpenModal}
        className="flex flex-row items-center gap-2 text-stone-600 ml-auto dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors rounded-full border border-stone-200 bg-stone-100 shadow-sm dark:border-stone-700 dark:bg-stone-800 text-xs font-bold px-3 py-1 cursor-pointer"
      >
        <span>Live Updates</span>
        <ArrowPathIcon className="w-3 h-3" />
      </button>
      {isModalOpen && (
        <Modal closeModal={handleCloseModal}>
          <small className="text-xs text-start mb-2 text-stone-200 dark:text-stone-400">
            Updated every 60 seconds
          </small>
          {/* Scoreboard */}
          <div className="mb-6 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800/50">
            <div className="flex items-center justify-between">
              {/* Away Team */}
              <div className="flex flex-1 flex-row items-center">
                <div className="relative h-16 w-16">
                  <Image
                    src={liveData.awayTeam.logo}
                    alt={liveData.awayTeam.commonName.default}
                    fill
                    className="object-contain dark:hidden"
                  />
                  <Image
                    src={liveData.awayTeam.darkLogo}
                    alt={liveData.awayTeam.commonName.default}
                    fill
                    className="hidden object-contain dark:block"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">
                    {liveData.awayTeam.score}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    SOG: {liveData.awayTeam.sog}
                  </div>
                </div>
              </div>

              {/* Game Info */}
              <div className="flex flex-col items-center gap-1 px-4">
                <div className="text-sm font-bold uppercase text-stone-500">
                  {displayedPeriod}
                </div>
                <div className="font-mono text-xl font-black">
                  {liveData.clock.inIntermission
                    ? "INT"
                    : liveData.clock.timeRemaining}
                </div>
              </div>

              {/* Home Team */}
              <div className="flex flex-1 flex-row-reverse items-center">
                <div className="relative h-16 w-16">
                  <Image
                    src={liveData.homeTeam.logo}
                    alt={liveData.homeTeam.commonName.default}
                    fill
                    className="object-contain dark:hidden"
                  />
                  <Image
                    src={liveData.homeTeam.darkLogo}
                    alt={liveData.homeTeam.commonName.default}
                    fill
                    className="hidden object-contain dark:block"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">
                    {liveData.homeTeam.score}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    SOG: {liveData.homeTeam.sog}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-col justify-between gap-4 px-2 sm:flex-row sm:items-center">
            <h3 className="text-2xl font-bold dark:text-stone-100">
              Live Updates
            </h3>
          </div>
          <div className="flex flex-col-reverse max-h-[70vh] overflow-y-auto rounded-lg border border-stone-100 dark:border-stone-800">
            {groupedPlays.map((group, index) => (
              <div
                key={`${group.period}-${index}`}
                className="flex flex-col-reverse"
              >
                {group.plays.map(renderPlay)}
                <div className="sticky top-0 z-10 bg-stone-100/95 backdrop-blur-sm dark:bg-stone-800/95 py-1 px-4 font-bold text-xs uppercase tracking-wider border-b border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400">
                  {getPeriodLabel(group.period)}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LiveDataRow;
