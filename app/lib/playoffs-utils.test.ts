import { fetchPlayoffs } from "./playoffs-utils";

global.fetch = jest.fn();

describe("fetchPlayoffs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches playoff data successfully", async () => {
    const mockData = { rounds: [], year: 2026 };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchPlayoffs();
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("playoff-bracket"),
      expect.anything(),
    );
  });

  it("throws error on failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(fetchPlayoffs()).rejects.toThrow(
      "Failed to fetch playoffs data",
    );
  });
});
