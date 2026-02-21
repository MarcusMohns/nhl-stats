const LiveChip = ({ gameCenterLink }: { gameCenterLink: string }) => {
  return (
    <div className="flex flex-row items-center justify-center p-2 py-1 rounded bg-green-700">
      <p className="text-xs font-bold">Live</p>
      <span className="ml-1 w-3 h-3 rounded-full animate-pulse bg-red-500" />
    </div>
  );
};

export default LiveChip;
