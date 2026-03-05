import ErrorPage from "./error";
import { getStandings } from "../_actions";
import StandingsClient from "../ui/standings/standings-client";

const Standings = async () => {
  const result = await getStandings();

  if (!result.success) {
    return <ErrorPage error={new Error(result.error)} reset={getStandings} />;
  }
  return <StandingsClient standings={result.data} />;
};

export default Standings;
