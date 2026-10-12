import { describe, expect, it } from "vitest";

import { computeStandings, shortEventName } from "./standings";
import type { AcsmSession, ChampionshipConfig, ChampionshipData } from "./types";

/** Builds a race: drivers in finishing order as [guid, laps, bestLap?] */
function race(
  date: string,
  drivers: Array<[string, number, number?]>,
  type = "RACE",
): AcsmSession {
  return {
    Type: type,
    TrackName: "track",
    TrackConfig: "",
    Date: date,
    SessionFile: date,
    Cars: drivers.map(([guid], i) => ({
      CarId: i,
      Model: "car",
      Skin: "",
      Driver: { Guid: guid, Name: guid.toUpperCase(), Nation: "", Team: `team-${guid}` },
    })),
    Laps: drivers.flatMap(([guid, laps], i) =>
      Array.from({ length: laps }, () => ({ CarId: i, DriverGuid: guid, LapTime: 1, Cuts: 0 })),
    ),
    Result: drivers.map(([guid, , bestLap], i) => ({
      CarId: i,
      CarModel: "car",
      DriverGuid: guid,
      DriverName: guid.toUpperCase(),
      BestLap: bestLap ?? 100000 + i,
      TotalTime: 1,
      Disqualified: false,
    })),
  };
}

const config: ChampionshipConfig = { url: "", points: [10, 6, 4, 2] };

const data = (...events: Array<Array<AcsmSession>>): ChampionshipData => ({
  name: "Test Cup ",
  fetchedAt: 0,
  events: events.map((races, i) => ({
    name: `Event at Track ${i}, completed on Monday`,
    races: races.filter((r) => r.Type === "RACE"),
    qualifyings: races.filter((r) => r.Type === "QUALIFY"),
  })),
});

describe("computeStandings", () => {
  it("sums points and sorts by points", () => {
    const result = computeStandings(
      data(
        [race("1", [["a", 5], ["b", 5], ["c", 5]])],
        [race("2", [["b", 5], ["a", 5], ["c", 5]]), race("3", [["b", 5], ["c", 5]])],
      ),
      config,
    );
    expect(result.name).toBe("Test Cup");
    expect(result.events.map((e) => [e.name, e.raceCount])).toEqual([
      ["Track 0", 1],
      ["Track 1", 2],
    ]);
    expect(result.drivers.map((d) => [d.guid, d.points])).toEqual([
      ["b", 26],
      ["a", 16],
      ["c", 14],
    ]);
    expect(result.drivers[1].events[1].races[1].status).toBe("dns");
  });

  it("drops the worst event, including events without participation", () => {
    const result = computeStandings(
      data(
        [race("1", [["a", 5], ["b", 5]])],
        [race("2", [["b", 5]])],
        [race("3", [["a", 5], ["b", 5]])],
      ),
      { ...config, dropResults: 1 },
    );
    const a = result.drivers.find((d) => d.guid === "a");
    expect(a?.grossPoints).toBe(20);
    expect(a?.points).toBe(20);
    expect(a?.events.map((e) => e.dropped)).toEqual([false, true, false]);
    const b = result.drivers.find((d) => d.guid === "b");
    expect(b?.points).toBe(16);
  });

  it("drops single races when configured", () => {
    const result = computeStandings(
      data([race("1", [["a", 5], ["b", 5]]), race("2", [["b", 5], ["a", 5]])]),
      { ...config, dropResults: 1, dropUnit: "race" },
    );
    const a = result.drivers.find((d) => d.guid === "a");
    expect(a?.points).toBe(10);
    expect(a?.events[0].races.map((r) => r.dropped)).toEqual([false, true]);
  });

  it("never drops all results", () => {
    const result = computeStandings(data([race("1", [["a", 5]])]), {
      ...config,
      dropResults: 3,
    });
    expect(result.drivers[0].points).toBe(10);
  });

  it("classifies drivers with too few laps as DNF and skips drivers without laps", () => {
    const result = computeStandings(
      data([race("1", [["a", 10], ["b", 4], ["c", 9], ["ghost", 0]])]),
      { ...config, minLapRatio: 0.5 },
    );
    expect(result.drivers.map((d) => d.guid)).toEqual(["a", "c", "b"]);
    const [a, c, b] = result.drivers.map((d) => d.events[0].races[0]);
    expect([a.position, c.position, b.status]).toEqual([1, 2, "dnf"]);
    expect(c.points).toBe(6);
  });

  it("awards fastest lap and pole points", () => {
    const result = computeStandings(
      data([
        race("0", [["b", 3, 90000], ["a", 3, 91000]], "QUALIFY"),
        race("1", [["a", 5, 95000], ["b", 5, 94000]]),
        race("2", [["a", 5, 95000], ["b", 5, 96000]]),
      ]),
      { ...config, fastestLapPoints: 1, polePoints: 3 },
    );
    const b = result.drivers.find((d) => d.guid === "b");
    expect(b?.events[0].races.map((r) => [r.points, r.pole, r.fastestLap])).toEqual([
      [10, true, true],
      [6, false, false],
    ]);
  });

  it("breaks ties by countback", () => {
    // a: P1 + P4 = 12, b: P2 + P2 = 12 -> a has more wins
    const result = computeStandings(
      data(
        [race("1", [["a", 5], ["b", 5], ["c", 5], ["d", 5]])],
        [race("2", [["c", 5], ["b", 5], ["d", 5], ["a", 5]])],
      ),
      config,
    );
    expect(result.drivers.slice(0, 2).map((d) => [d.guid, d.points])).toEqual([
      ["c", 14],
      ["a", 12],
    ]);
    expect(result.drivers[2]).toMatchObject({ guid: "b", points: 12 });
  });
});

describe("shortEventName", () => {
  it("extracts the track name", () => {
    expect(
      shortEventName(
        "Event at Lilski Road America, completed on Monday, October 12, 2026 9:27 PM (CEST)",
      ),
    ).toBe("Lilski Road America");
    expect(shortEventName("Custom")).toBe("Custom");
  });
});
