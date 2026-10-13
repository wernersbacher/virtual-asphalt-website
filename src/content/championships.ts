import type { ChampionshipConfig } from "../lib/championship/types";

// The result server sends no CORS headers, so all requests (including the session logs
// linked in the export) go through our own Caddy proxy at cors.markuswernersbach.de.
const ASSETTO_HOST = "https://de5.assettohosting.com:60298";
const ASSETTO_PROXY = "https://cors.markuswernersbach.de/assetto";

const viaCorsProxy = (url: string) =>
  fetch(url.startsWith(ASSETTO_HOST) ? ASSETTO_PROXY + url.slice(ASSETTO_HOST.length) : url);

export const ferrariGt3Challenge: ChampionshipConfig = {
  url: `${ASSETTO_HOST}/championship/6f8f4bc7-2c32-48fe-8918-9a30c72c5e49/export-results`,
  points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
  dropResults: 1,
  dropUnit: "event",
  fetch: viaCorsProxy,
};
