import { getSchedule } from "../_actions";
import ErrorPage from "./error";
import ScheduleClient from "../ui/schedule/schedule-client";

const Schedule = async () => {
  const result = await getSchedule();

  if (!result.success) {
    return <ErrorPage error={new Error(result.error)} reset={getSchedule} />;
  }
  return <ScheduleClient schedule={result.data} />;
};

export default Schedule;
