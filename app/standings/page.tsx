import ErrorPage from "./error";
import { getStandings } from "../_actions";
// import LeaderboardClient from "../ui/leaderboard/leaderboard-client";
import StandingsClient from "../ui/standings/standings-client";

const Leaderboard = async () => {
  const standings = await getStandings();

  if (standings instanceof Error) {
    // expected error
    return <ErrorPage error={standings} reset={getStandings} />;
  }
  return <StandingsClient standings={standings} />;
};

export default Leaderboard;
