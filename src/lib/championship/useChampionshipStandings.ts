import { useEffect, useMemo, useState } from "react";

import { getCachedChampionship, loadChampionship } from "./load";
import { computeStandings } from "./standings";
import type { ChampionshipConfig, ChampionshipData } from "./types";

/**
 * Loads and computes the standings of a championship.
 * Pass a stable config object (e.g. a module constant), otherwise the data is re-requested on every render.
 */
export function useChampionshipStandings(config: ChampionshipConfig) {
  const [data, setData] = useState<ChampionshipData | undefined>(() =>
    getCachedChampionship(config),
  );
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let active = true;
    loadChampionship(config).then(
      (result) => {
        if (!active) return;
        setData(result);
        setError(undefined);
      },
      (err: unknown) =>
        active && setError(err instanceof Error ? err : new Error(String(err))),
    );
    return () => {
      active = false;
    };
  }, [config]);

  const standings = useMemo(
    () => (data ? computeStandings(data, config) : undefined),
    [data, config],
  );

  return { standings, error, loading: !data && !error };
}
