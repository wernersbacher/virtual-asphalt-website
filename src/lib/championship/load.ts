import type {
  AcsmChampionshipExport,
  AcsmSession,
  ChampionshipConfig,
  ChampionshipData,
} from "./types";

const DEFAULT_MAX_AGE_MS = 10 * 60 * 1000;

interface CacheEntry {
  promise: Promise<ChampionshipData>;
  /** Last successfully loaded data, kept while a refresh is running */
  data?: ChampionshipData;
}

// Module scope: survives router navigation, so results are only fetched once per page load
const cache = new Map<string, CacheEntry>();

const cacheKey = (config: ChampionshipConfig) =>
  `${config.url}|${config.polePoints ? "quali" : "race"}`;

async function fetchJson<T>(url: string, config: ChampionshipConfig): Promise<T> {
  const response = await (config.fetch ?? fetch)(url);
  if (!response.ok) {
    throw new Error(`Loading ${url} failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

/** Session type from the file name, e.g. ".../2026_9_28_21_1_RACE.json" -> "RACE" */
const sessionTypeOf = (url: string) => /_([A-Z]+)\.json$/i.exec(url)?.[1]?.toUpperCase();

const byDate = (a: AcsmSession, b: AcsmSession) => Date.parse(a.Date) - Date.parse(b.Date);

async function fetchChampionship(config: ChampionshipConfig): Promise<ChampionshipData> {
  const wantedTypes = new Set(config.polePoints ? ["RACE", "QUALIFY"] : ["RACE"]);
  const championship = await fetchJson<AcsmChampionshipExport>(config.url, config);

  const events = await Promise.all(
    championship.results.map(async (event) => {
      const sessions = await Promise.all(
        event.log
          .filter((url) => {
            const type = sessionTypeOf(url);
            return type === undefined || wantedTypes.has(type);
          })
          .map((url) => fetchJson<AcsmSession>(url, config)),
      );
      return {
        name: event.name,
        races: sessions.filter((s) => s.Type === "RACE").toSorted(byDate),
        qualifyings: sessions.filter((s) => s.Type === "QUALIFY").toSorted(byDate),
      };
    }),
  );

  return {
    name: championship.name,
    events: events.filter((event) => event.races.length > 0),
    fetchedAt: Date.now(),
  };
}

/** Loads a championship with all race results. Concurrent and repeated calls share one request. */
export function loadChampionship(config: ChampionshipConfig): Promise<ChampionshipData> {
  const key = cacheKey(config);
  const cached = cache.get(key);
  const maxAge = config.maxAgeMs ?? DEFAULT_MAX_AGE_MS;
  if (cached && (!cached.data || Date.now() - cached.data.fetchedAt < maxAge)) {
    return cached.promise;
  }

  const entry: CacheEntry = { promise: fetchChampionship(config), data: cached?.data };
  entry.promise.then(
    (data) => {
      entry.data = data;
    },
    () => {
      // allow a retry; outdated data (if any) is kept and refreshed on the next call anyway
      if (!entry.data) cache.delete(key);
    },
  );
  cache.set(key, entry);
  return entry.promise;
}

/** Returns already loaded data (possibly outdated) without triggering a request */
export function getCachedChampionship(config: ChampionshipConfig) {
  return cache.get(cacheKey(config))?.data;
}
