export const fetchPlayoffs = async () => {
  const playoffsUrl = "https://api-web.nhle.com/v1/playoff-bracket/2026";

  const response = await fetch(playoffsUrl, {
    // Cache the data for 5 minutes server side
    next: { revalidate: 300 },
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch playoffs data");
  }
  const data = await response.json();
  return data;
};
