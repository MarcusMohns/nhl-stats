import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { TeamStatsModal } from "./team-stats-modal";
import { getTeamStats } from "../../../_actions";
import type { TeamType, SkaterType, GoalieType, GameType } from "@/app/types";
import type { ImageProps } from "next/image";

jest.mock("../../../_actions", () => ({ getTeamStats: jest.fn() }));

// Lightweight mocks for children to focus on `TeamStatsModal` behavior
jest.mock("../../../ui/modal", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal">{children}</div>
  ),
}));

jest.mock("./loading", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />,
}));
jest.mock("../../error-page", () => ({
  __esModule: true,
  default: ({ error }: { error: Error }) => (
    <div data-testid="error-page">{error.message}</div>
  ),
}));
jest.mock("./team-stats-player-card", () => ({
  __esModule: true,
  default: ({ player }: { player: SkaterType | GoalieType }) => (
    <div data-testid="player-card">
      {player.firstName.default} {player.lastName.default}
    </div>
  ),
}));
jest.mock("./weekly-schedule", () => ({
  __esModule: true,
  default: ({ games }: { games: GameType[] }) => (
    <div data-testid="weekly-schedule">{games.length} games</div>
  ),
}));
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) =>
    /* eslint-disable-line @next/next/no-img-element */ React.createElement(
      "img",
      props,
    ),
}));
jest.mock("../../link-out", () => ({
  __esModule: true,
  default: (props: { hrefString: string }) => (
    <a href={props.hrefString}>Link</a>
  ),
}));
jest.mock("../../chip", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chip">{children}</div>
  ),
}));

const mockTeam: TeamType = {
  teamName: { default: "Test Team" },
  teamCommonName: { default: "Test" },
  teamAbbrev: { default: "TT" },
  teamLogo: "/logo.png",
  teamLogoDark: "/logo-dark.png",
  rank: 1,
  wildCardSequence: 0,
  points: 100,
  winPctg: 0.75,
  conferenceName: "Eastern",
  divisionName: "Atlantic",
  wins: 50,
  losses: 20,
  otLosses: 10,
  l10Wins: 7,
  l10Losses: 2,
  l10OtLosses: 1,
  gamesPlayed: 80,
  goalDifferential: 70,
  streakCode: "W",
  streakCount: 3,
  clinchIndicator: "p",
};

const mockTeamStats = {
  topSkaters: [
    {
      playerId: 101,
      firstName: { default: "Skater" },
      lastName: { default: "One" },
      headshot: "/skater.png",
      positionCode: "C",
      gamesPlayed: 80,
      points: 100,
      goals: 40,
      assists: 60,
      plusMinus: 20,
      shootingPctg: 0.15,
    },
  ] as SkaterType[],
  topGoalies: [
    {
      playerId: 201,
      firstName: { default: "Goalie" },
      lastName: { default: "One" },
      headshot: "/goalie.png",
      gamesPlayed: 60,
      savePercentage: 0.92,
      goalsAgainstAverage: 2.5,
      saves: 1500,
    },
  ] as GoalieType[],
  games: [{ id: 1, gameDate: "2026-03-04" }] as GameType[],
};

describe("TeamStatsModal", () => {
  const handleCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state while data is being fetched", () => {
    (getTeamStats as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(
      <TeamStatsModal team={mockTeam} handleCloseModal={handleCloseModal} />,
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("calls `getTeamStats` with the provided team on mount", async () => {
    (getTeamStats as jest.Mock).mockResolvedValueOnce(mockTeamStats);
    render(
      <TeamStatsModal team={mockTeam} handleCloseModal={handleCloseModal} />,
    );
    await waitFor(() => expect(getTeamStats).toHaveBeenCalledWith(mockTeam));
  });

  it("shows an error UI when fetching fails", async () => {
    const error = { success: false, error: "fetch failed" };
    (getTeamStats as jest.Mock).mockResolvedValueOnce(error);
    render(
      <TeamStatsModal team={mockTeam} handleCloseModal={handleCloseModal} />,
    );
    const el = await screen.findByTestId("error-page");
    expect(el).toBeInTheDocument();
    expect(screen.getByText("fetch failed")).toBeInTheDocument();
  });

  it("renders team details and child components when fetch succeeds", async () => {
    (getTeamStats as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: mockTeamStats,
    });
    render(
      <TeamStatsModal team={mockTeam} handleCloseModal={handleCloseModal} />,
    );

    expect(await screen.findByText("Test Team")).toBeInTheDocument();
    expect(screen.getByText(/Rank:/i)).toBeInTheDocument();
    expect(screen.getByText(/75.0%/i)).toBeInTheDocument();
    expect(screen.getByText("Skater One")).toBeInTheDocument();
    expect(screen.getByText("Goalie One")).toBeInTheDocument();
    expect(screen.getByTestId("weekly-schedule")).toHaveTextContent("1 games");
  });
});
