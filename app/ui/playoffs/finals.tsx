import type { SeriesType } from "@/app/types";
import Series from "./series";

type FinalsProps = {
  series: SeriesType[];
};
const Finals = ({ series }: FinalsProps) => {
  return (
    <div className="flex items-center justify-center my-5 lg:my-0">
      {series.map((team, index) => (
        <Series key={index} series={team} />
      ))}
    </div>
  );
};

export default Finals;
