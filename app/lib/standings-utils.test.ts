import { fetchStandingsData, organizeStandings } from "./standings-utils";
import type { TeamType } from "../types";

global.fetch = jest.fn();

describe("standings-utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchStandingsData", () => {
    it("fetches standings data", async () => {
      const mockData = { standings: [{ teamName: "Oilers" }] };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchStandingsData();
      expect(result).toEqual(mockData.standings);
    });
  });

  describe("organizeStandings", () => {
    it("organizes teams into correct hierarchy and adds ranks", () => {
      const mockTeams = [
        {
          teamAbbrev: { default: "EDM" },
          conferenceName: "Western",
          divisionName: "Pacific",
        },
        {
          teamAbbrev: { default: "TOR" },
          conferenceName: "Eastern",
          divisionName: "Atlantic",
        },
      ] as unknown as TeamType[];

      const result = organizeStandings(mockTeams);

      // Check League
      expect(result.League).toHaveLength(2);
      expect(result.League[0].rank).toBe(1);
      expect(result.League[1].rank).toBe(2);
      expect(result.League[0].teamLogoDark).toContain("EDM_dark.svg");

      // Check Conferences
      expect(result.Western).toHaveLength(1);
      expect(result.Eastern).toHaveLength(1);
      expect(result.Western[0].rank).toBe(1);

      // Check Divisions
      expect(result.Pacific).toHaveLength(1);
      expect(result.Atlantic).toHaveLength(1);
    });
  });
});
