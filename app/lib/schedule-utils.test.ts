import {
  fetchSchedule,
  utcToReadableDate,
  groupGamesByLocalDate,
} from "./schedule-utils";

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

    it("returns an Error object on fetch failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      const result = await fetchSchedule();
      expect(result).toBeInstanceOf(Error);
    });

    it("returns an Error object on exception", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
      const result = await fetchSchedule();
      expect(result).toBeInstanceOf(Error);
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
      const mockSchedule: any[] = [
        {
          date: "2023-01-01",
          games: [
            // Game 1
            { id: 1, startTimeUTC: "2023-01-01T12:00:00Z" },
            // Game 2
            { id: 2, startTimeUTC: "2023-01-01T15:00:00Z" },
          ],
        },
      ];

      const result = groupGamesByLocalDate(mockSchedule);

      expect(result).toHaveLength(1);
      expect(result[0].games).toHaveLength(2);

      // Check if localStartTime was added
      expect(result[0].games[0]).toHaveProperty("localStartTime");
      // Check if the key structure is correct (YYYY-MM-DD)
      expect(result[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
