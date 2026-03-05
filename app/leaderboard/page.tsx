import ErrorPage from "./error";
import { getLeaderboards } from "../_actions";
import LeaderboardClient from "../ui/leaderboard/leaderboard-client";

const Leaderboard = async () => {
  const result = await getLeaderboards();

  if (!result.success) {
    return (
      <ErrorPage error={new Error(result.error)} reset={getLeaderboards} />
    );
  }
  return <LeaderboardClient leaderboard={result.data} />;
};

export default Leaderboard;
