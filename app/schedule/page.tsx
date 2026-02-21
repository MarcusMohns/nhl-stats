import { getSchedule } from "../_actions";
import ErrorPage from "./error";
import ScheduleClient from "../ui/schedule/schedule-client";

const Schedule = async () => {
  const schedule = await getSchedule();

  if (schedule instanceof Error) {
    // expected error
    return <ErrorPage error={schedule} reset={getSchedule} />;
  }
  return <ScheduleClient schedule={schedule} />;
};

export default Schedule;
