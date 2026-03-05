import { getPlayoffs } from "../_actions";
import ErrorPage from "./error";
import PlayoffsClient from "../ui/playoffs/playoffs-client";

const Schedule = async () => {
  const result = await getPlayoffs();

  if (!result.success) {
    return <ErrorPage error={new Error(result.error)} reset={getPlayoffs} />;
  }
  return <PlayoffsClient playoffs={result.data} />;
};

export default Schedule;
