import { LiveGameType } from "@/app/types";
import LiveChip from "../live-chip";
import { Suspense, useCallback, useState, lazy } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getReadablePeriod } from "@/app/lib/game-utils";
import PlayByPlayModalSkeleton from "./play-by-play/loading";

const PlayByPlayModal = lazy(() => import("./play-by-play/play-by-play-modal"));

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

  const period = getReadablePeriod(liveData.displayPeriod);

  return (
    <div className="flex flex-row items-center w-full gap-2">
      <LiveChip />
      <div
        title="Updates every 60 seconds"
        className="flex flex-row items-center overflow-hidden rounded border border-stone-200 bg-stone-100 shadow-sm dark:divide-stone-600 dark:border-stone-700 dark:bg-stone-700 text-xs font-bold text-stone-800 dark:text-stone-300 p-1 gap-2"
      >
        <span>{period}</span>
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
        <span>Play By Play</span>
        <ArrowPathIcon className="w-3 h-3" />
      </button>
      {isModalOpen && (
        <Suspense
          fallback={
            <PlayByPlayModalSkeleton handleCloseModal={handleCloseModal} />
          }
        >
          <PlayByPlayModal
            liveData={liveData}
            period={period}
            handleCloseModal={handleCloseModal}
          />
        </Suspense>
      )}
    </div>
  );
};

export default LiveDataRow;
