export const fetchLeaderboardData = async (
  category: string,
  goalieOrSkater: string,
  limit: number = 5,
) => {
  const leadersUrl = `https://api-web.nhle.com/v1/${goalieOrSkater}-stats-leaders/current?categories=${category}&limit=${limit}`;

  const res = await fetch(leadersUrl, {
    // Cache the data for 2 minutes to avoid hitting API rate limits
    next: { revalidate: 60 },
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch player leaders for ${category}`);
  }

  const json = await res.json();
  // The API returns an object with 1 key (the category) whose value is the array of leaders
  return json[category];
};

export const organizedLeaderboards = async () => {
  const [goals, assists, points, gaa, savePctg, shutouts] = await Promise.all([
    fetchLeaderboardData("goals", "skater", 5),
    fetchLeaderboardData("assists", "skater", 5),
    fetchLeaderboardData("points", "skater", 5),
    fetchLeaderboardData("goalsAgainstAverage", "goalie", 5),
    fetchLeaderboardData("savePctg", "goalie", 5),
    fetchLeaderboardData("shutouts", "goalie", 5),
  ]);
  return {
    Goals: goals,
    Assists: assists,
    Points: points,
    GAA: gaa,
    "Save%": savePctg,
    Shutouts: shutouts,
  };
};
