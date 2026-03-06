import { headers } from "next/headers";
import { getSchedule } from "../_actions";
import ErrorPage from "./error";
import ScheduleClient from "../ui/schedule/schedule-client";

const Schedule = async () => {
  const result = await getSchedule();
  const headersList = await headers();
  const locale = headersList.get("accept-language")?.split(",")[0] ?? "en-US";

  if (!result.success) {
    return <ErrorPage error={new Error(result.error)} reset={getSchedule} />;
  }
  return <ScheduleClient schedule={result.data} locale={locale} />;
};

export default Schedule;
