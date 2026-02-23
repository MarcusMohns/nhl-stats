import type { SeriesType } from "@/app/types";
import Series from "./series";
const Finals = ({ series }: { series: SeriesType[] }) => {
  return (
    <>
      {series.map((team, index) => (
        <Series key={index} series={team} />
      ))}
    </>
  );
};

export default Finals;
