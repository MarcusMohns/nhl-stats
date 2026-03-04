import { PlayoffsType } from "@/app/types";
import Bracket from "./bracket";
import Finals from "./finals";
import Image from "next/image";

type PlayoffsClientProps = {
  playoffs: PlayoffsType;
};

const PlayoffsClient = ({ playoffs }: PlayoffsClientProps) => {
  // The API returns the series in a specific order, the first four series are the first round the next two are the second round and the last two are the conference finals
  const eastern = {
    roundOneTop: playoffs.series.slice(0, 2),
    roundOneBottom: playoffs.series.slice(2, 4),
    roundTwoTop: playoffs.series[8],
    roundTwoBottom: playoffs.series[9],
    conferenceFinal: playoffs.series[12],
  };

  const western = {
    roundOneTop: playoffs.series.slice(4, 6),
    roundOneBottom: playoffs.series.slice(6, 8),
    roundTwoTop: playoffs.series[10],
    roundTwoBottom: playoffs.series[11],
    conferenceFinal: playoffs.series[13],
  };

  const stanleyCupFinals = playoffs.series[14];

  return (
    <section
      aria-label="Playoff Bracket"
      className="playoffs h-max lg:p-5 w-full mx-auto animate-fade-in mt-5"
    >
      <div className="flex flex-col w-full justify-center items-center bg-stone-50 dark:bg-stone-800 rounded-lg p-2 lg:p-5 xl:p-10 xl:px-15">
        <Image
          src={playoffs.bracketLogo}
          className="invert dark:invert-0 mx-auto my-5 sm:my-0 px-4 w-200 h-auto"
          alt="NHL Playoffs"
          width={1993}
          height={266}
          loading="eager"
        />
        {/* <small className="w-[90%] text-center mb-10 text-xs font-semibold text-stone-600 dark:text-stone-400 tracking-wide">
          If the playoffs started today (updated after each game ends)
        </small> */}
        <div className="flex items-center justify-center gap-1 w-full">
          <Bracket
            roundOne={western.roundOneTop}
            roundTwo={western.roundTwoTop}
            direction="flex-row"
          />
          <div
            aria-hidden="true"
            className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700"
          />
          <Bracket
            roundOne={eastern.roundOneTop}
            roundTwo={eastern.roundTwoTop}
            direction="flex-row-reverse"
          />
        </div>
        <Finals
          series={[
            western.conferenceFinal,
            stanleyCupFinals,
            eastern.conferenceFinal,
          ]}
        />

        <div className="flex items-center justify-center gap-1 w-full">
          <Bracket
            roundOne={western.roundOneBottom}
            roundTwo={western.roundTwoBottom}
            direction="flex-row"
          />
          <div
            aria-hidden="true"
            className="xl:hidden w-px h-48 bg-stone-300 dark:bg-stone-700"
          />
          <Bracket
            roundOne={eastern.roundOneBottom}
            roundTwo={eastern.roundTwoBottom}
            direction="flex-row-reverse"
          />
        </div>
      </div>
    </section>
  );
};

export default PlayoffsClient;
