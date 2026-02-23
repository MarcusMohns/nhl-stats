import { getPlayoffs } from "../_actions";
import ErrorPage from "./error";
// import ScheduleClient from "../ui/schedule/schedule-client";
import PlayoffsClient from "../ui/playoffs/playoffs-client";

const Schedule = async () => {
  const playoffs = await getPlayoffs();

  if (playoffs instanceof Error) {
    // expected error
    return <ErrorPage error={playoffs} reset={getPlayoffs} />;
  }
  return <PlayoffsClient playoffs={playoffs} />;
};

export default Schedule;
