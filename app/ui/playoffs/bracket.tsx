import type { SeriesType } from "@/app/types";
import Series from "./series";

type BracketProps = {
  roundOne: SeriesType[];
  roundTwo: SeriesType;
  direction: "flex-row" | "flex-row-reverse";
};
const Bracket = ({ roundOne, roundTwo, direction }: BracketProps) => {
  const itemPosition = direction === "flex-row" ? "items-start" : "items-end";
  return (
    <div
      className={`flex flex-row h-full w-full justify-center lg:justify-start ${direction} grow`}
    >
      <div className="flex flex-col items-center w-full md:w-auto">
        {roundOne.map((team, index) => (
          <Series key={index} series={team} />
        ))}
      </div>
      <div
        className={`flex flex-col justify-center w-full ${itemPosition} md:mx-5 lg:mx-10`}
      >
        <Series series={roundTwo} />
      </div>
    </div>
  );
};

export default Bracket;
