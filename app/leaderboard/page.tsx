import ErrorPage from "./error";
import { fetchLeaderboard } from "../_actions";
import LeaderboardClient from "../ui/leaderboard/leaderboard-client";

const Leaderboard = async () => {
  const leaderboard = await fetchLeaderboard();

  if (leaderboard instanceof Error) {
    // expected error
    return <ErrorPage error={leaderboard} reset={fetchLeaderboard} />;
  }
  return <LeaderboardClient leaderboard={leaderboard} />;
};

export default Leaderboard;
