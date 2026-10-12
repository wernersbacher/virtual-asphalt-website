import { useChampionshipStandings } from "../lib/championship/useChampionshipStandings";
import type { ChampionshipConfig, RaceCell } from "../lib/championship/types";
import { cn } from "../lib/utils";

import { InfoBlock } from "./InfoBlock";

interface ChampionshipStandingsProps {
  config: ChampionshipConfig;
  /** Overrides the championship name from the server */
  title?: string;
}

const statusLabel = { dnf: "DNF", dsq: "DSQ", dns: "–" } as const;

function RaceResultCell({ race }: { race: RaceCell }) {
  const label =
    race.status === "classified" ? `P${race.position}` : statusLabel[race.status];
  const hints = [
    race.pole && "Pole position",
    race.fastestLap && "Fastest lap",
    race.dropped && "Dropped result",
  ].filter(Boolean);
  return (
    <td
      className={cn(
        "px-2 py-1 text-center whitespace-nowrap",
        race.dropped && "line-through opacity-50",
      )}
      title={hints.join(", ") || undefined}
    >
      <span className="block font-semibold">
        {race.status === "dns" ? "–" : race.points}
      </span>
      {race.status !== "dns" && (
        <span
          className={cn(
            "block text-xs text-gray-500 dark:text-gray-400",
            race.fastestLap && "text-purple-600 dark:text-purple-400",
          )}
        >
          {label}
          {race.pole && " ●"}
        </span>
      )}
    </td>
  );
}

export function ChampionshipStandings({ config, title }: ChampionshipStandingsProps) {
  const { standings, error, loading } = useChampionshipStandings(config);

  if (error && !standings) {
    return (
      <InfoBlock color="red" title="Standings unavailable">
        The results could not be loaded. Please try again later.
      </InfoBlock>
    );
  }
  if (loading || !standings) {
    return <p className="text-center text-gray-500 py-8">Loading standings…</p>;
  }

  const showRaceRow = standings.events.some((e) => e.raceCount > 1);
  const dropResults = config.dropResults ?? 0;
  const dropUnit = config.dropUnit ?? "event";

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{title ?? standings.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {dropResults > 0
          ? `${dropResults} drop result${dropResults > 1 ? "s" : ""}: the worst ${
              dropResults > 1 ? `${dropResults} ${dropUnit}s are` : `${dropUnit} is`
            } not counted.`
          : "No drop results: every race counts."}
      </p>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th rowSpan={showRaceRow ? 2 : 1} className="px-2 py-1 text-right">
                #
              </th>
              <th rowSpan={showRaceRow ? 2 : 1} className="px-2 py-1 text-left">
                Driver
              </th>
              <th rowSpan={showRaceRow ? 2 : 1} className="px-2 py-1 text-right">
                Points
              </th>
              {standings.events.map((event, i) => (
                <th
                  key={i}
                  colSpan={event.raceCount}
                  className="px-2 py-1 text-center whitespace-nowrap border-l border-gray-300 dark:border-gray-600"
                  title={event.date && new Date(event.date).toLocaleDateString()}
                >
                  {event.name}
                </th>
              ))}
            </tr>
            {showRaceRow && (
              <tr>
                {standings.events.flatMap((event, i) =>
                  Array.from({ length: event.raceCount }, (_, r) => (
                    <th
                      key={`${i}-${r}`}
                      className={cn(
                        "px-2 py-1 text-center text-xs font-normal",
                        r === 0 && "border-l border-gray-300 dark:border-gray-600",
                      )}
                    >
                      R{r + 1}
                    </th>
                  )),
                )}
              </tr>
            )}
          </thead>
          <tbody>
            {standings.drivers.map((driver) => (
              <tr
                key={driver.guid}
                className="border-t border-gray-200 dark:border-gray-700 odd:bg-white/40 dark:odd:bg-white/5"
              >
                <td className="px-2 py-1 text-right font-semibold">{driver.position}</td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <span className="block font-medium">{driver.name}</span>
                  {driver.team && (
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {driver.team}
                    </span>
                  )}
                </td>
                <td
                  className="px-2 py-1 text-right font-bold"
                  title={
                    driver.grossPoints !== driver.points
                      ? `${driver.grossPoints} points without drop results`
                      : undefined
                  }
                >
                  {driver.points}
                </td>
                {driver.events.flatMap((event, i) =>
                  event.races.map((race, r) => (
                    <RaceResultCell
                      key={`${i}-${r}`}
                      race={{ ...race, dropped: race.dropped || event.dropped }}
                    />
                  )),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Struck-through results are dropped and not counted.
        {config.fastestLapPoints ? " Purple: fastest lap." : ""}
        {config.polePoints ? " ●: pole position." : ""}
      </p>
    </div>
  );
}
