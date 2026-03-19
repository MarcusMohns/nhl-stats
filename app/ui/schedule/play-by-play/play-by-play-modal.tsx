import Modal from "../../modal";
import Image from "next/image";
import { LiveGameType } from "@/app/types";
import Play from "./play";
import { useMemo } from "react";
import { getGroupedPlays } from "@/app/lib/game-utils";

type Props = {
  handleCloseModal: () => void;
  liveData: LiveGameType;
  period: string;
};

const PlayByPlayModal = ({ handleCloseModal, liveData, period }: Props) => {
  const groupedPlays = useMemo(
    () => getGroupedPlays(liveData.plays),
    [liveData.plays],
  );
  const playerMap = useMemo(() => {
    return new Map(liveData.rosterSpots.map((p) => [p.playerId, p]));
  }, [liveData.rosterSpots]);
  return (
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
              {period}
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
        <h3 className="text-2xl font-bold dark:text-stone-100">Live Updates</h3>
      </div>
      <div className="flex flex-col max-h-[40vh] lg:max-h-[60vh] overflow-y-auto rounded-lg border border-stone-100 dark:border-stone-800">
        {groupedPlays.map((group) => (
          <div key={group.period} className="flex flex-col">
            <div className="sticky top-0 z-10 bg-stone-100/95 backdrop-blur-sm dark:bg-stone-800/95 py-1 px-4 font-bold text-xs uppercase tracking-wider border-b border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400">
              {group.label}
            </div>
            {group.plays.map((play) => (
              <Play
                key={play.situationCode + play.timeRemaining + play.typeDescKey}
                liveData={liveData}
                playerMap={playerMap}
                play={play}
              />
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PlayByPlayModal;
