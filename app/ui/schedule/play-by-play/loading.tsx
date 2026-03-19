import Modal from "../../modal";

type Props = {
  handleCloseModal: () => void;
};

const PlayByPlayModalSkeleton = ({ handleCloseModal }: Props) => {
  return (
    <Modal closeModal={handleCloseModal}>
      <div className="h-4 w-32 bg-stone-200 dark:bg-stone-800 rounded mb-2 animate-pulse" />
      {/* Scoreboard Skeleton */}
      <div className="mb-6 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800/50 animate-pulse">
        <div className="flex items-center justify-between">
          {/* Away Team */}
          <div className="flex flex-1 flex-row items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-stone-200 dark:bg-stone-700" />
            <div className="flex flex-col gap-2 items-center">
              <div className="h-8 w-8 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="h-3 w-16 bg-stone-200 dark:bg-stone-700 rounded" />
            </div>
          </div>

          {/* Game Info */}
          <div className="flex flex-col items-center gap-2 px-4">
            <div className="h-4 w-10 bg-stone-200 dark:bg-stone-700 rounded" />
            <div className="h-7 w-16 bg-stone-200 dark:bg-stone-700 rounded" />
          </div>

          {/* Home Team */}
          <div className="flex flex-1 flex-row-reverse items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-stone-200 dark:bg-stone-700" />
            <div className="flex flex-col gap-2 items-center">
              <div className="h-8 w-8 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="h-3 w-16 bg-stone-200 dark:bg-stone-700 rounded" />
            </div>
          </div>
        </div>
      </div>
      {/* Header Skeleton */}
      <div className="mb-4 h-8 w-40 bg-stone-200 dark:bg-stone-800 rounded animate-pulse" />

      {/* Plays List Skeleton */}
      <div className="flex flex-col gap-0 rounded-lg border border-stone-100 dark:border-stone-800 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-stone-100 dark:border-stone-800 p-3 animate-pulse"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-3 w-8 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="h-6 w-6 rounded-full bg-stone-200 dark:bg-stone-700" />
            </div>
            <div className="h-4 flex-grow bg-stone-200 dark:bg-stone-700 rounded" />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PlayByPlayModalSkeleton;
