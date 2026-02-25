import { PlayoffsType } from "@/app/types";
import Bracket from "./bracket";
import Finals from "./finals";
import Image from "next/image";

const PlayoffsClient = ({ playoffs }: { playoffs: PlayoffsType }) => {
  const roundOneEasternTop = playoffs.series.slice(0, 2);
  const roundOneEasternBottom = playoffs.series.slice(2, 4);
  const roundOneWesternTop = playoffs.series.slice(4, 6);
  const roundOneWesternBottom = playoffs.series.slice(6, 8);
  const roundTwoEasternTop = playoffs.series[8];
  const roundTwoEasternBottom = playoffs.series[9];
  const roundTwoWesternTop = playoffs.series[10];
  const roundTwoWesternBottom = playoffs.series[11];

  const easternFinals = playoffs.series[12];
  const westernFinals = playoffs.series[13];
  const stanleyCupFinals = playoffs.series[14];

  return (
    <section className="playoffs h-max sm:p-5 w-full xl:w-4/5 animate-fade-in mt-5">
      <div className="flex flex-col w-full justify-center items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-2 sm:p-5 md:p-10">
        <Image
          src={playoffs.bracketLogo}
          className="invert dark:invert-0 mx-auto my-5 sm:my-0 px-4"
          alt="NHL Playoff Logo"
          width={1993}
          height={266}
          loading="eager"
        />
        {/* If The Playoffs Started Today */}
        {/* Matchups update after each game ends */}
        <small className="w-[90%] text-center mb-10 text-start text-xs font-semibold text-stone-600 dark:text-stone-400 tracking-wide">
          If the playoffs started today (updated after each game ends)
        </small>
        <div className="flex items-center justify-center gap-1 w-full">
          <Bracket
            roundOne={roundOneWesternTop}
            roundTwo={roundTwoWesternTop}
            direction="flex-row"
          />
          <div className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700 mx-2" />
          <Bracket
            roundOne={roundOneEasternTop}
            roundTwo={roundTwoEasternTop}
            direction="flex-row-reverse"
          />
        </div>
        <Finals series={[westernFinals, stanleyCupFinals, easternFinals]} />

        <div className="flex items-center justify-center gap-1 w-full">
          <Bracket
            roundOne={roundOneWesternBottom}
            roundTwo={roundTwoWesternBottom}
            direction="flex-row"
          />
          <div className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700 mx-2" />
          <Bracket
            roundOne={roundOneEasternBottom}
            roundTwo={roundTwoEasternBottom}
            direction="flex-row-reverse"
          />
        </div>
      </div>
    </section>
  );
};

export default PlayoffsClient;
