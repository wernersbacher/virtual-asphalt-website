import type {
  AcsmSession,
  ChampionshipConfig,
  ChampionshipData,
  ChampionshipStandings,
  DriverStanding,
  EventCell,
  RaceCell,
  RaceStatus,
} from "./types";

// Server Manager reports this value if a driver has no valid lap
const NO_LAP_TIME = 999999999;

const isValidLapTime = (time: number) => time > 0 && time < NO_LAP_TIME;

interface SessionEntry {
  status: RaceStatus;
  position?: number;
  fastestLap: boolean;
}

/** Classifies all drivers of a race session, keyed by driver guid */
export function classifyRace(
  session: AcsmSession,
  minLapRatio?: number,
): Map<string, SessionEntry> {
  const lapCount = new Map<string, number>();
  for (const lap of session.Laps) {
    lapCount.set(lap.DriverGuid, (lapCount.get(lap.DriverGuid) ?? 0) + 1);
  }
  const winnerLaps = Math.max(
    0,
    ...session.Result.map((r) => lapCount.get(r.DriverGuid) ?? 0),
  );
  const requiredLaps = Math.max(1, Math.ceil((minLapRatio ?? 0) * winnerLaps));

  const entries = new Map<string, SessionEntry>();
  let position = 0;
  let fastest: { guid: string; time: number } | undefined;

  // Result is already ordered by finishing position
  for (const result of session.Result) {
    const laps = lapCount.get(result.DriverGuid) ?? 0;
    let status: RaceStatus;
    if (result.Disqualified) status = "dsq";
    else if (laps === 0) status = "dns";
    else if (laps < requiredLaps) status = "dnf";
    else status = "classified";

    const entry: SessionEntry = { status, fastestLap: false };
    if (status === "classified") {
      entry.position = ++position;
      if (
        isValidLapTime(result.BestLap) &&
        (!fastest || result.BestLap < fastest.time)
      ) {
        fastest = { guid: result.DriverGuid, time: result.BestLap };
      }
    }
    entries.set(result.DriverGuid, entry);
  }

  const fastestEntry = fastest && entries.get(fastest.guid);
  if (fastestEntry) fastestEntry.fastestLap = true;
  return entries;
}

function findPoleSitter(qualifying: AcsmSession | undefined) {
  const best = qualifying?.Result.find(
    (r) => !r.Disqualified && isValidLapTime(r.BestLap),
  );
  return best?.DriverGuid;
}

/** "Event at Spa, completed on Monday, ..." -> "Spa" */
export function shortEventName(name: string) {
  return /^Event at (.+?), completed on/.exec(name)?.[1] ?? name;
}

/** Marks the `count` lowest scoring items as dropped; at least one result always counts */
function markDropped(items: Array<{ points: number; dropped: boolean }>, count: number) {
  const dropCount = Math.min(count, items.length - 1);
  if (dropCount <= 0) return;
  items
    .map((item, index) => ({ item, index }))
    // lowest points first, on equal points the later result is dropped
    .toSorted((a, b) => a.item.points - b.item.points || b.index - a.index)
    .slice(0, dropCount)
    .forEach(({ item }) => {
      item.dropped = true;
    });
}

/** Compares finishing positions: more wins first, then more second places, ... */
function compareCountback(a: Array<number>, b: Array<number>) {
  const maxPosition = Math.max(0, ...a, ...b);
  for (let pos = 1; pos <= maxPosition; pos++) {
    const diff =
      b.filter((p) => p === pos).length - a.filter((p) => p === pos).length;
    if (diff !== 0) return diff;
  }
  return 0;
}

export function computeStandings(
  data: ChampionshipData,
  config: ChampionshipConfig,
): ChampionshipStandings {
  const pointsFor = (position?: number) =>
    position === undefined ? 0 : (config.points[position - 1] ?? 0);

  const events = data.events.map((event) => ({
    event,
    races: event.races.map((race) => classifyRace(race, config.minLapRatio)),
    pole: config.polePoints ? findPoleSitter(event.qualifyings[0]) : undefined,
  }));

  // Collect all drivers who took part in at least one race, latest name/team wins
  const drivers = new Map<string, { name: string; team: string; nation: string }>();
  for (const { event, races } of events) {
    event.races.forEach((session, raceIndex) => {
      for (const [guid, entry] of races[raceIndex]) {
        if (entry.status === "dns" && !drivers.has(guid)) continue;
        const car = session.Cars.find((c) => c.Driver.Guid === guid);
        const result = session.Result.find((r) => r.DriverGuid === guid);
        drivers.set(guid, {
          name: car?.Driver.Name || result?.DriverName || guid,
          team: car?.Driver.Team ?? "",
          nation: car?.Driver.Nation ?? "",
        });
      }
    });
  }

  const standings = [...drivers].map(([guid, info]) => {
    const positions: Array<number> = [];
    const eventCells: Array<EventCell> = events.map(({ races, pole }) => {
      const raceCells: Array<RaceCell> = races.map((race, raceIndex) => {
        const entry = race.get(guid);
        const isPole = raceIndex === 0 && pole === guid;
        let points = pointsFor(entry?.position);
        if (entry?.fastestLap) points += config.fastestLapPoints ?? 0;
        if (isPole) points += config.polePoints ?? 0;
        if (entry?.position !== undefined) positions.push(entry.position);
        return {
          status: entry?.status ?? "dns",
          position: entry?.position,
          points,
          fastestLap: entry?.fastestLap ?? false,
          pole: isPole,
          dropped: false,
        };
      });
      return {
        races: raceCells,
        points: raceCells.reduce((sum, r) => sum + r.points, 0),
        dropped: false,
      };
    });

    const dropResults = config.dropResults ?? 0;
    if ((config.dropUnit ?? "event") === "event") {
      markDropped(eventCells, dropResults);
    } else {
      markDropped(eventCells.flatMap((e) => e.races), dropResults);
    }

    const grossPoints = eventCells.reduce((sum, e) => sum + e.points, 0);
    const points = eventCells.reduce(
      (sum, e) =>
        e.dropped
          ? sum
          : sum + e.races.reduce((s, r) => (r.dropped ? s : s + r.points), 0),
      0,
    );

    return { guid, ...info, points, grossPoints, events: eventCells, positions };
  });

  standings.sort(
    (a, b) =>
      b.points - a.points ||
      compareCountback(a.positions, b.positions) ||
      a.name.localeCompare(b.name),
  );

  return {
    name: data.name.trim(),
    events: events.map(({ event }) => ({
      name: shortEventName(event.name),
      date: event.races[0]?.Date,
      raceCount: event.races.length,
    })),
    drivers: standings.map(
      ({ positions: _positions, ...driver }, index): DriverStanding => ({
        ...driver,
        position: index + 1,
      }),
    ),
  };
}
