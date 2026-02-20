import ErrorPage from "./error";
import { getStandings } from "../_actions";
// import LeaderboardClient from "../ui/leaderboard/leaderboard-client";

const Leaderboard = async () => {
  const standings = await getStandings();

  if (standings instanceof Error) {
    // expected error
    return <ErrorPage error={standings} reset={getStandings} />;
  }
  // return <LeaderboardClient leaderboard={leaderboard} />;
};

export default Leaderboard;
