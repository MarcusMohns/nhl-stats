import { PlayoffsType } from "@/app/types";
import Bracket from "./bracket";
import Finals from "./finals";
import Image from "next/image";

type PlayoffsClientProps = {
  playoffs: PlayoffsType;
};

const PlayoffsClient = ({ playoffs }: PlayoffsClientProps) => {
  // The API returns the series in a specific order easter first then west
  const eastern = {
    roundOneTop: playoffs.series.slice(0, 2), // First round
    roundOneBottom: playoffs.series.slice(2, 4), // First round
    roundTwoTop: playoffs.series[8], // Second round
    roundTwoBottom: playoffs.series[9], // Second round
    conferenceFinal: playoffs.series[12], // Conference Finals
  };

  const western = {
    roundOneTop: playoffs.series.slice(4, 6), // First round
    roundOneBottom: playoffs.series.slice(6, 8), // First round
    roundTwoTop: playoffs.series[10], // Second round
    roundTwoBottom: playoffs.series[11], // Second round
    conferenceFinal: playoffs.series[13], // Conference Finals
  };

  const stanleyCupFinals = playoffs.series[14]; // Stanley Cup Finals

  return (
    <section
      aria-label="Playoff Bracket"
      className="playoffs h-max lg:p-5 w-full mx-auto animate-fade-in"
    >
      <div className="flex flex-col w-full justify-center items-center md:border md:border-stone-300 md:dark:border-stone-700 bg-stone-100 dark:bg-stone-800/30 md:shadow-lg rounded-lg p-2 lg:p-5 xl:p-10 xl:px-15">
        <Image
          src={playoffs.bracketLogo}
          className="invert dark:invert-0 mx-auto my-5 sm:my-0 md:mb-4 px-4 w-200 h-auto"
          alt="NHL Playoffs"
          width={800}
          height={107}
          loading="eager"
        />
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
