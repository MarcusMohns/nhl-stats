export const fetchPlayoffs = async () => {
  const playoffsUrl = "https://api-web.nhle.com/v1/playoff-bracket/2025";

  const response = await fetch(playoffsUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch playoffs data");
  }
  const data = await response.json();
  return data;
};
