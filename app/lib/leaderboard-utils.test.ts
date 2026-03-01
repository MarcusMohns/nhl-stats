import {
  fetchLeaderboardData,
  organizedLeaderboards,
} from "./leaderboard-utils";

global.fetch = jest.fn();

describe("leaderboard-utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchLeaderboardData", () => {
    it("fetches data for a specific category", async () => {
      const mockData = { goals: [{ name: "Player 1", value: 50 }] };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchLeaderboardData("goals", "skater");
      expect(result).toEqual(mockData.goals);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "skater-stats-leaders/current?categories=goals",
        ),
        expect.anything(),
      );
    });

    it("throws error on failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
      await expect(fetchLeaderboardData("goals", "skater")).rejects.toThrow();
    });
  });

  describe("organizedLeaderboards", () => {
    it("aggregates multiple categories into one object", async () => {
      // Mock implementation to return data based on the URL category
      (global.fetch as jest.Mock).mockImplementation(async (url) => {
        const categoryMatch = url.match(/categories=([^&]+)/);
        const category = categoryMatch ? categoryMatch[1] : "unknown";
        return {
          ok: true,
          json: async () => ({ [category]: [] }),
        };
      });

      const result = await organizedLeaderboards();
      const expectedKeys = [
        "Goals",
        "Assists",
        "Points",
        "GAA",
        "Save%",
        "Shutouts",
      ];
      expect(Object.keys(result)).toEqual(expect.arrayContaining(expectedKeys));
    });
  });
});
