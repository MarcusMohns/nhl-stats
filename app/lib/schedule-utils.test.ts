import {
  fetchSchedule,
  utcToReadableDate,
  groupGamesByLocalDate,
  getGameStatus,
} from "./schedule-utils";
import type { GameWeekType, GameType } from "../types";

// Mock global fetch
global.fetch = jest.fn();

describe("schedule-utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchSchedule", () => {
    it("returns gameWeek data on success", async () => {
      const mockData = { gameWeek: [{ date: "2023-01-01", games: [] }] };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchSchedule();
      expect(result).toEqual(mockData.gameWeek);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api-web.nhle.com/v1/schedule/now",
        expect.objectContaining({ next: { revalidate: 60 } }),
      );
    });

    it("throws an Error on fetch failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(fetchSchedule()).rejects.toThrow(
        "Error fetching data from the server ☹️",
      );
    });

    it("throws an Error on exception", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
      await expect(fetchSchedule()).rejects.toThrow(
        "Error fetching data from the server ☹️",
      );
    });
  });

  describe("utcToReadableDate", () => {
    it("formats date correctly", () => {
      // Note: The exact output depends on the system locale, so we check for string type
      // and ensure it doesn't throw.
      const dateStr = "2023-10-12T19:00:00Z";
      const result = utcToReadableDate(dateStr);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("groupGamesByLocalDate", () => {
    it("groups games by local date", () => {
      // Mock data representing a schedule response
      const mockSchedule = [
        {
          date: "2023-01-01",
          games: [
            // Game 1
            { id: 1, startTimeUTC: "2023-01-01T12:00:00Z" },
            // Game 2
            { id: 2, startTimeUTC: "2023-01-01T15:00:00Z" },
          ],
        },
      ] as unknown as GameWeekType[];

      const result = groupGamesByLocalDate(mockSchedule);

      expect(result).toHaveLength(1);
      expect(result[0].games).toHaveLength(2);

      // Check if localStartTime was added
      expect(result[0].games[0]).toHaveProperty("localStartTime");
      // Check if the date is a formatted string
      expect(typeof result[0].date).toBe("string");
      expect(result[0].date.length).toBeGreaterThan(0);
    });
  });

  describe("getGameStatus", () => {
    it('should return "Done" for gameState "OFF" and determine winner', () => {
      const game = {
        gameState: "OFF",
        homeTeam: { score: 3 },
        awayTeam: { score: 2 },
      } as unknown as GameType;
      const { status, winner } = getGameStatus(game);
      expect(status).toBe("Done");
      expect(winner).toBe("home");
    });

    it('should return "Done" for gameState "FINAL" and determine winner', () => {
      const game = {
        gameState: "FINAL",
        homeTeam: { score: 1 },
        awayTeam: { score: 4 },
      } as unknown as GameType;
      const { status, winner } = getGameStatus(game);
      expect(status).toBe("Done");
      expect(winner).toBe("away");
    });

    it('should return "Live" for gameState "LIVE"', () => {
      const game = { gameState: "LIVE" } as GameType;
      const { status, winner } = getGameStatus(game);
      expect(status).toBe("Live");
      expect(winner).toBeUndefined();
    });

    it('should return "Live" for gameState "CRIT"', () => {
      const game = { gameState: "CRIT" } as GameType;
      const { status, winner } = getGameStatus(game);
      expect(status).toBe("Live");
      expect(winner).toBeUndefined();
    });

    it('should return "Scheduled" for gameState "FUT"', () => {
      const game = { gameState: "FUT" } as GameType;
      const { status, winner } = getGameStatus(game);
      expect(status).toBe("Scheduled");
      expect(winner).toBeUndefined();
    });

    it('should return "TBD" for other gameStates', () => {
      const game = { gameState: "PRE" } as GameType;
      const { status, winner } = getGameStatus(game);
      expect(status).toBe("TBD");
      expect(winner).toBeUndefined();
    });

    it("should return undefined winner if scores are missing for a done game", () => {
      const game = {
        gameState: "OFF",
        homeTeam: {},
        awayTeam: {},
      } as unknown as GameType;
      const { status, winner } = getGameStatus(game);
      expect(status).toBe("Done");
      expect(winner).toBeUndefined();
    });
  });
});
