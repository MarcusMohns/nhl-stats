import { organizedTeamStats } from "./team-stats-utils";

global.fetch = jest.fn();

describe("team-stats-utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("organizedTeamStats fetches and combines data correctly", async () => {
    const mockTeam: any = { teamAbbrev: { default: "EDM" } };

    const mockTeamStats = {
      skaters: [
        { id: 1, points: 10 },
        { id: 2, points: 50 }, // Top skater
        { id: 3, points: 5 },
      ],
      goalies: [
        { id: 1, savePercentage: 0.9 },
        { id: 2, savePercentage: 0.95 }, // Top goalie
      ],
    };

    const mockSchedule = {
      games: [{ id: 100 }],
    };

    // Mock fetch to return different data based on URL
    (global.fetch as jest.Mock).mockImplementation(async (url) => {
      if (url.includes("club-stats")) {
        return { ok: true, json: async () => mockTeamStats };
      }
      if (url.includes("club-schedule")) {
        return { ok: true, json: async () => mockSchedule };
      }
      return { ok: false };
    });

    const result: any = await organizedTeamStats(mockTeam);

    expect(result).not.toBeInstanceOf(Error);

    // Check if games were attached
    expect(result.games).toEqual(mockSchedule.games);

    // Check if top skaters were sorted and sliced
    expect(result.topSkaters).toHaveLength(2);
    expect(result.topSkaters[0].points).toBe(50);

    // Check if top goalie was selected
    expect(result.topGoalie.savePercentage).toBe(0.95);
  });

  it("handles errors gracefully", async () => {
    const mockTeam: any = { teamAbbrev: { default: "EDM" } };
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
    const result = await organizedTeamStats(mockTeam);
    expect(result).toBeInstanceOf(Error);
  });
});
