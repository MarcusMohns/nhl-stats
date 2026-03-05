import ErrorPage from "./error";
import { getStandings } from "../_actions";
import StandingsClient from "../ui/standings/standings-client";

const Standings = async () => {
  const standings = await getStandings();

  if (standings instanceof Error) {
    // expected error
    return <ErrorPage error={standings} reset={getStandings} />;
  }
  return <StandingsClient standings={standings} />;
};

export default Standings;
