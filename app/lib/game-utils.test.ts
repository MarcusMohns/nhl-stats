import {
  getGameStatus,
  getReadablePeriod,
  getGroupedPlays,
  fetchLiveGame,
  getTeamLogo,
} from "./game-utils";
import type { GameType, LiveGameType, PlayType } from "../types";

// Mock global fetch
global.fetch = jest.fn();

describe("game-utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getGameStatus", () => {
    it("returns 'Done' for OFF or FINAL states", () => {
      const gameOFF = {
        gameState: "OFF",
        homeTeam: {},
        awayTeam: {},
      } as GameType;
      const gameFINAL = {
        gameState: "FINAL",
        homeTeam: {},
        awayTeam: {},
      } as GameType;

      expect(getGameStatus(gameOFF).status).toBe("Done");
      expect(getGameStatus(gameFINAL).status).toBe("Done");
    });

    it("returns 'Live' for LIVE or CRIT states", () => {
      const gameLIVE = {
        gameState: "LIVE",
        homeTeam: {},
        awayTeam: {},
      } as GameType;
      const gameCRIT = {
        gameState: "CRIT",
        homeTeam: {},
        awayTeam: {},
      } as GameType;

      expect(getGameStatus(gameLIVE).status).toBe("Live");
      expect(getGameStatus(gameCRIT).status).toBe("Live");
    });

    it("returns 'Scheduled' for FUT state", () => {
      const gameFUT = {
        gameState: "FUT",
        homeTeam: {},
        awayTeam: {},
      } as GameType;
      expect(getGameStatus(gameFUT).status).toBe("Scheduled");
    });

    it("returns 'TBD' for unknown states", () => {
      const gameUnknown = {
        gameState: "UNKNOWN",
        homeTeam: {},
        awayTeam: {},
      } as unknown as GameType;
      expect(getGameStatus(gameUnknown).status).toBe("TBD");
    });

    it("determines the winner correctly when game is Done", () => {
      const homeWin = {
        gameState: "FINAL",
        homeTeam: { score: 5 },
        awayTeam: { score: 2 },
      } as GameType;

      const awayWin = {
        gameState: "OFF",
        homeTeam: { score: 1 },
        awayTeam: { score: 3 },
      } as GameType;

      expect(getGameStatus(homeWin).winner).toBe("home");
      expect(getGameStatus(awayWin).winner).toBe("away");
    });

    it("returns undefined winner if scores are missing or game is not Done", () => {
      const gameLive = {
        gameState: "LIVE",
        homeTeam: { score: 5 },
        awayTeam: { score: 2 },
      } as GameType;

      expect(getGameStatus(gameLive).winner).toBeUndefined();
    });
  });

  describe("getReadablePeriod", () => {
    it("returns correct labels for standard periods", () => {
      expect(getReadablePeriod(1)).toBe("1st");
      expect(getReadablePeriod(2)).toBe("2nd");
      expect(getReadablePeriod(3)).toBe("3rd");
    });

    it("returns OT and SO for overtime/shootout", () => {
      expect(getReadablePeriod(4)).toBe("OT");
      expect(getReadablePeriod(5)).toBe("SO");
    });

    it("returns 'Period' for unknown values", () => {
      expect(getReadablePeriod(undefined)).toBe("Period");
      expect(getReadablePeriod(0)).toBe("Period");
      expect(getReadablePeriod(6)).toBe("Period");
    });
  });

  describe("getGroupedPlays", () => {
    it("groups plays by period and reverses order so newest is first", () => {
      const plays = [
        { eventId: 1, periodDescriptor: { number: 1 } },
        { eventId: 2, periodDescriptor: { number: 1 } },
        { eventId: 3, periodDescriptor: { number: 2 } },
        { eventId: 4, periodDescriptor: { number: 2 } },
      ] as PlayType[];

      const result = getGroupedPlays(plays);

      // Should have 2 groups
      expect(result).toHaveLength(2);

      // Group 0 should be period 2 (most recent period first)
      expect(result[0].period).toBe(2);
      expect(result[0].label).toBe("2nd");
      // Plays within period 2 should be reversed (newest first: 4 then 3)
      expect(result[0].plays).toHaveLength(2);
      expect(result[0].plays[0].eventId).toBe(4);
      expect(result[0].plays[1].eventId).toBe(3);

      // Group 1 should be period 1
      expect(result[1].period).toBe(1);
      expect(result[1].label).toBe("1st");
      // Plays within period 1 should be reversed (newest first: 2 then 1)
      expect(result[1].plays).toHaveLength(2);
      expect(result[1].plays[0].eventId).toBe(2);
      expect(result[1].plays[1].eventId).toBe(1);
    });

    it("handles empty plays array", () => {
      expect(getGroupedPlays([])).toEqual([]);
    });
  });

  describe("fetchLiveGame", () => {
    it("fetches live game data successfully", async () => {
      const mockData = { id: 123, plays: [] };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchLiveGame("123");
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api-web.nhle.com/v1/gamecenter/123/play-by-play",
        expect.objectContaining({ next: { revalidate: 60 } }),
      );
    });

    it("throws error on fetch failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(fetchLiveGame("123")).rejects.toThrow(
        "Error fetching data from the server ☹️",
      );
    });
  });

  describe("getTeamLogo", () => {
    const mockLiveData = {
      homeTeam: {
        id: 1,
        logo: "home-light",
        darkLogo: "home-dark",
        abbrev: "HOM",
      },
      awayTeam: {
        id: 2,
        logo: "away-light",
        darkLogo: "away-dark",
        abbrev: "AWY",
      },
    } as LiveGameType;

    it("returns home team logo object", () => {
      const result = getTeamLogo(1, mockLiveData);
      expect(result).toEqual({
        light: "home-light",
        dark: "home-dark",
        abbrev: "HOM",
      });
    });

    it("returns away team logo object", () => {
      const result = getTeamLogo(2, mockLiveData);
      expect(result).toEqual({
        light: "away-light",
        dark: "away-dark",
        abbrev: "AWY",
      });
    });

    it("returns null for unknown team id or undefined", () => {
      expect(getTeamLogo(99, mockLiveData)).toBeNull();
      expect(getTeamLogo(undefined, mockLiveData)).toBeNull();
    });
  });
});
