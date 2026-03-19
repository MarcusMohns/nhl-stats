import Image from "next/image";
import { RosterSpotType } from "@/app/types";

type Props = {
  player: RosterSpotType | undefined;
  id: number;
};
const PlayByPlayPlayer = ({ player, id }: Props) => {
  if (!player) {
    return <span className="mx-1 text-xs font-bold">#{id}</span>;
  }
  return (
    <span className="mx-1 inline-flex transform items-center gap-2 align-middle transition-transform hover:scale-105 rounded-full border border-stone-200 bg-white py-0.5 pr-3 pl-1 shadow-sm dark:border-stone-700 dark:bg-stone-800">
      <Image
        src={player.headshot}
        alt={player.lastName.default}
        width={24}
        height={24}
        className="h-6 w-6 rounded-full bg-stone-200 object-cover dark:bg-stone-700"
      />
      <span className="text-xs font-bold text-stone-700 sm:text-sm dark:text-stone-200">
        {player.lastName.default}
      </span>
    </span>
  );
};

export default PlayByPlayPlayer;
