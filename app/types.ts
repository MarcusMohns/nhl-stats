export type TeamType = {
  clinchIndicator?: string;
  rank: number;
  teamName: { default: string };
  teamAbbrev: { default: string };
  teamCommonName: { default: string };
  teamLogo: string;
  teamLogoDark: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  goalDifferential: number;
  l10Wins: number;
  l10Losses: number;
  l10OtLosses: number;
  streakCode: string;
  streakCount: number;
  conferenceName: string;
  divisionName: string;
  wildCardSequence: number;
  winPctg: number;
};

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
export type PlayoffsTeamType = {
  id: number;
  abbrev: string;
  name: {
    default: string;
    fr?: string;
  };
  commonName: {
    default: string;
  };
  placeNameWithPreposition: {
    default: string;
    fr?: string;
  };
  logo: string;
  darkLogo: string;
};

export type RenderContextType = {
  details: NonNullable<PlayType["details"]>;
  playerMap: Map<number, RosterSpotType>;
  liveData: LiveGameType;
  typeDescKey: string;
};

export type RenderResultType = {
  icon: React.ReactNode;
  content: React.ReactNode;
  extraClass?: string;
};

export type ScheduleTeamType = {
  id: number;
  commonName: {
    default: string;
  };
  placeName: {
    default: string;
    fr?: string;
  };
  placeNameWithPreposition: {
    default: string;
    fr?: string;
  };
  abbrev: string;
  logo: string;
  darkLogo: string;
  awaySplitSquad: boolean;
  radioLink?: string;
  hotelLink?: string;
  hotelDesc?: string;
  score?: number;
};

export type StandingsTableType = {
  standings: TeamType[];
  sortedBy: string;
};
export type SkaterType = {
  assists: number;
  avgShiftsPerGame: number;
  avgTimeOnIcePerGame: number;
  faceoffWinPctg: number;
  firstName: { default: string };
  gameWinningGoals: number;
  gamesPlayed: number;
  goals: number;
  headshot: string;
  lastName: { default: string };
  overtimeGoals: number;
  penaltyMinutes: number;
  playerId: number;
  plusMinus: number;
  points: number;
  positionCode: string;
  powerPlayGoals: number;
  shootingPctg: number;
  shorthandedGoals: number;
  shots: number;
};

export type GoalieType = {
  assists: number;
  firstName: { default: string };
  gamesPlayed: number;
  gamesStarted: number;
  goals: number;
  goalsAgainst: number;
  goalsAgainstAverage: number;
  headshot: string;
  lastName: { default: string };
  losses: number;
  overtimeLosses: number;
  penaltyMinutes: number;
  playerId: number;
  points: number;
  savePercentage: number;
  saves: number;
  shotsAgainst: number;
  shutouts: number;
  ties: number;
  timeOnIce: number;
  wins: number;
};

export type TeamStatsType = {
  skaters: SkaterType[];
  goalies: GoalieType[];
  gameType: number;
  games: GameType[];
  season: string;
  topSkaters: SkaterType[];
  topGoalies: GoalieType[];
};

export type GameWeekType = {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  games: GameType[];
};

export type StandingsType = {
  [key: string]: TeamType[];
  League: TeamType[];
  Western: TeamType[];
  Eastern: TeamType[];
  Central: TeamType[];
  Atlantic: TeamType[];
  Metropolitan: TeamType[];
  Pacific: TeamType[];
};

export type GameType = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  gameOutcome?: { lastPeriodType: string };
  venue: {
    default: string;
    es?: string;
    fr?: string;
  };
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: string;
  gameScheduleState: string;
  tvBroadcasts: {
    id: number;
    market: string;
    countryCode: string;
    network: string;
    sequenceNumber: number;
  }[];
  awayTeam: ScheduleTeamType;
  homeTeam: ScheduleTeamType;
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  ticketsLink?: string;
  ticketsLinkFr?: string;
  gameCenterLink: string;
  threeMinRecap?: string;
  threeMinRecapFr?: string;
  condensedGame?: string;
  condensedGameFr?: string;
};

export type LeaderBoardsType = {
  [key: string]: PlayerType[];
  Goals: PlayerType[];
  Assists: PlayerType[];
  Points: PlayerType[];
  GAA: PlayerType[];
  "Save%": PlayerType[];
  Shutouts: PlayerType[];
};

export type PlayerType = {
  firstName: { default: string };
  headshot: string;
  id: number;
  lastName: { default: string };
  position: string;
  sweaterNumber: number;
  teamAbbrev: string;
  teamLogo: string;
  teamName: { default: string };
  value: number;
};

export type PlayoffsType = {
  bracketLogo: string;
  bracketLogoFr: string;
  series: SeriesType[];
};

export type SeriesType = {
  seriesUrl?: string;
  seriesTitle: string;
  seriesAbbrev: string;
  seriesLetter: string;
  playoffRound: number;
  topSeedRank: number;
  topSeedRankAbbrev?: string;
  topSeedWins: number;
  bottomSeedRank: number;
  bottomSeedRankAbbrev?: string;
  bottomSeedWins: number;
  topSeedTeam?: PlayoffsTeamType;
  bottomSeedTeam?: PlayoffsTeamType;
  seriesLogo?: string;
  seriesLogoFr?: string;
  winningTeamId?: number;
};

export type DivisionTablePropsType = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  selectedTable: string;
};

export type ConferenceTableProps = {
  eastern: TeamType[];
  western: TeamType[];
  selectedTable: string;
};

export type TableStateType = {
  [key: string]: StandingsTableType;
};

export type ActionType = {
  type: "SORT";
  tableName: string;
  sortBy: string;
  currentStandings: TeamType[];
};

export type LiveGameType = {
  id: number;
  season: number;
  gameType: number;
  limitedScoring: boolean;
  gameDate: string;
  venue: VenueType;
  venueLocation: VenueLocationType;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: TvBroadcastType[];
  gameState: string;
  gameScheduleState: string;
  periodDescriptor: PeriodDescriptorType;
  awayTeam: LiveTeamType;
  homeTeam: LiveTeamType;
  shootoutInUse: boolean;
  otInUse: boolean;
  clock: ClockType;
  displayPeriod: number;
  maxPeriods: number;
  gameOutcome?: GameOutcomeType;
  plays: PlayType[];
  rosterSpots: RosterSpotType[];
  regPeriods: number;
  summary: LiveGameSummaryType;
};

export type VenueType = {
  default: string;
};

export type VenueLocationType = {
  default: string;
};

export type TvBroadcastType = {
  id: number;
  market: string;
  countryCode: string;
  network: string;
  sequenceNumber: number;
};

export type PeriodDescriptorType = {
  number: number;
  periodType: string;
  maxRegulationPeriods: number;
};

export type LiveTeamType = {
  id: number;
  commonName: {
    default: string;
  };
  abbrev: string;
  score: number;
  sog: number;
  logo: string;
  darkLogo: string;
  placeName: {
    default: string;
  };
  placeNameWithPreposition: {
    default: string;
    fr?: string;
  };
};

export type ClockType = {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
};

export type GameOutcomeType = {
  lastPeriodType: string;
};

export type PlayType = {
  eventId: number;
  periodDescriptor: PeriodDescriptorType;
  timeInPeriod: string;
  timeRemaining: string;
  situationCode: string;
  homeTeamDefendingSide: string;
  typeCode: number;
  typeDescKey: string;
  sortOrder: number;
  details?: PlayDetailsType;
  pptReplayUrl?: string;
};

export type PlayDetailsType = {
  eventOwnerTeamId?: number;
  losingPlayerId?: number;
  winningPlayerId?: number;
  xCoord?: number;
  yCoord?: number;
  zoneCode?: string;
  reason?: string;
  secondaryReason?: string;
  blockingPlayerId?: number;
  shootingPlayerId?: number;
  goalieInNetId?: number;
  shotType?: string;
  awaySOG?: number;
  homeSOG?: number;
  hittingPlayerId?: number;
  hitteePlayerId?: number;
  scoringPlayerId?: number;
  scoringPlayerTotal?: number;
  assist1PlayerId?: number;
  assist1PlayerTotal?: number;
  assist2PlayerId?: number;
  assist2PlayerTotal?: number;
  awayScore?: number;
  homeScore?: number;
  highlightClipSharingUrl?: string;
  highlightClipSharingUrlFr?: string;
  highlightClip?: number;
  highlightClipFr?: number;
  discreteClip?: number;
  discreteClipFr?: number;
  playerId?: number;
  typeCode?: string;
  descKey?: string;
  duration?: number;
  committedByPlayerId?: number;
  drawnByPlayerId?: number;
};

export type RosterSpotType = {
  teamId: number;
  playerId: number;
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
    cs?: string;
    de?: string;
    fi?: string;
    sk?: string;
    sv?: string;
  };
  sweaterNumber: number;
  positionCode: string;
  headshot: string;
};

export type LiveGameSummaryType = {
  iceSurface?: IceSurfaceType;
};

export type IceSurfaceType = {
  awayTeam: IceSurfaceTeamType;
  homeTeam: IceSurfaceTeamType;
};

export type IceSurfaceTeamType = {
  forwards: OnIcePlayerType[];
  defensemen: OnIcePlayerType[];
  goalies: OnIcePlayerType[];
  penaltyBox: OnIcePlayerType[];
};

export type OnIcePlayerType = {
  playerId: number;
  name: {
    default: string;
    cs?: string;
    fi?: string;
    sk?: string;
    sv?: string;
  };
  sweaterNumber: number;
  positionCode: string;
  headshot: string;
  totalSOI: number;
};
