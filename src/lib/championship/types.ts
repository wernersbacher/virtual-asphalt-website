// Raw data as exported by Assetto Corsa Server Manager (e.g. assettohosting.com)

/** Response of `/championship/<id>/export-results` */
export interface AcsmChampionshipExport {
  name: string;
  results: Array<{ name: string; log: Array<string> }>;
}

export interface AcsmDriver {
  Guid: string;
  Name: string;
  Nation: string;
  Team: string;
}

export interface AcsmCar {
  CarId: number;
  Driver: AcsmDriver;
  Model: string;
  Skin: string;
}

export interface AcsmLap {
  CarId: number;
  DriverGuid: string;
  LapTime: number;
  Cuts: number;
}

export interface AcsmResult {
  CarId: number;
  CarModel: string;
  DriverGuid: string;
  DriverName: string;
  BestLap: number;
  TotalTime: number;
  Disqualified: boolean;
}

/** One session file from `/results/download/<file>.json` */
export interface AcsmSession {
  Type: string;
  TrackName: string;
  TrackConfig: string;
  Date: string;
  SessionFile: string;
  Cars: Array<AcsmCar>;
  Laps: Array<AcsmLap>;
  Result: Array<AcsmResult>;
}

// Loaded and prepared data

export interface ChampionshipEventData {
  name: string;
  /** Race sessions, ordered by start time */
  races: Array<AcsmSession>;
  /** Qualifying sessions, ordered by start time (only loaded if pole points are configured) */
  qualifyings: Array<AcsmSession>;
}

export interface ChampionshipData {
  name: string;
  events: Array<ChampionshipEventData>;
  fetchedAt: number;
}

// Configuration

export interface ChampionshipConfig {
  /** URL of the championship export, e.g. https://host:port/championship/<id>/export-results */
  url: string;
  /** Points for P1, P2, ... – positions beyond the list score 0 */
  points: Array<number>;
  /** Number of worst results that are not counted (default 0) */
  dropResults?: number;
  /** Whether a dropped result is a single race or a whole event with all its races (default "event") */
  dropUnit?: "race" | "event";
  /** Bonus for the fastest lap of a race (classified drivers only, default 0) */
  fastestLapPoints?: number;
  /** Bonus for the best qualifying time of an event, counted with the first race of the event (default 0) */
  polePoints?: number;
  /** Share of the winner's laps (0–1) a driver must complete to be classified (default: one lap) */
  minLapRatio?: number;
  /** Replaces the native fetch for all requests, e.g. to route them through a CORS proxy */
  fetch?: (url: string) => Promise<Response>;
  /** How long loaded data is reused before it is fetched again (default 10 minutes) */
  maxAgeMs?: number;
}

// Computed standings

export type RaceStatus = "classified" | "dnf" | "dsq" | "dns";

export interface RaceCell {
  status: RaceStatus;
  /** Finishing position, only set for classified drivers */
  position?: number;
  points: number;
  fastestLap: boolean;
  pole: boolean;
  dropped: boolean;
}

export interface EventCell {
  races: Array<RaceCell>;
  points: number;
  dropped: boolean;
}

export interface DriverStanding {
  position: number;
  guid: string;
  name: string;
  team: string;
  nation: string;
  /** Points after drop results */
  points: number;
  /** Points without drop results */
  grossPoints: number;
  events: Array<EventCell>;
}

export interface EventInfo {
  name: string;
  date?: string;
  raceCount: number;
}

export interface ChampionshipStandings {
  name: string;
  events: Array<EventInfo>;
  drivers: Array<DriverStanding>;
}
