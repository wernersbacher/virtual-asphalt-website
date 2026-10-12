import corsfix from "corsfix";

import type { ChampionshipConfig } from "../lib/championship/types";

// The result server sends no CORS headers, so the requests go through corsfix.com.
// On the free tier this only works via the corsfix SDK.
const viaCorsProxy = (url: string) => corsfix.fetch(url);

export const ferrariGt3Challenge: ChampionshipConfig = {
  url: "https://de5.assettohosting.com:60298/championship/6f8f4bc7-2c32-48fe-8918-9a30c72c5e49/export-results",
  points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
  dropResults: 1,
  dropUnit: "event",
  fetch: viaCorsProxy,
};
