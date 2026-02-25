import type { SeriesType } from "@/app/types";
import Series from "./series";
const Bracket = ({
  roundOne,
  roundTwo,
  direction,
}: {
  roundOne: SeriesType[];
  roundTwo: SeriesType;
  direction: "flex-row" | "flex-row-reverse";
}) => {
  return (
    <div className={`flex flex-row h-full justify-start ${direction} grow`}>
      <div className="flex flex-col items-center w-full md:w-auto">
        {roundOne.map((team, index) => (
          <Series key={index} series={team} />
        ))}
      </div>
      <div className="flex flex-col justify-around items-start ml-1">
        <Series series={roundTwo} />
      </div>
    </div>
  );
};

export default Bracket;
