import ErrorPage from "./error";
import { getLeaderboards } from "../_actions";
import LeaderboardClient from "../ui/leaderboard/leaderboard-client";

const Leaderboard = async () => {
  const leaderboard = await getLeaderboards();

  if (leaderboard instanceof Error) {
    // expected error
    return <ErrorPage error={leaderboard} reset={getLeaderboards} />;
  }
  return <LeaderboardClient leaderboard={leaderboard} />;
};

export default Leaderboard;
