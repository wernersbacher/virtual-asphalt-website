import { useEffect, useState } from "react";

type Round = {
  roundNumber: number;
  track: string;
  carsDescription?: string | null;
  formatDescription?: string | null;
  startTime: string;
};

type Registration = {
  isOpen: boolean;
  deadline?: string | null;
  maxParticipants?: number | null;
  currentCount: number;
};

type Competition = {
  id: string;
  partnerSlug?: string | null;
  partnerName: string;
  name: string;
  type: string;
  game: string;
  formatDescription?: string | null;
  description?: string | null;
  posterCdnPath?: string | null;
  platform?: string | null;
  rounds: Round[];
  registration: Registration;
};

export default function Competitions() {
  const [competitions, setCompetitions] = useState<Competition[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://cdn.pitvox.com/competitions/index.json"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setCompetitions(data.competitions ?? []);
      } catch (err: unknown) {
        if (!cancelled) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading)
    return <div className="text-center py-8">Loading competitions...</div>;

  if (error)
    return (
      <div className="text-center text-red-600 py-8">
        Error loading competitions: {error}
      </div>
    );

  if (!competitions || competitions.length === 0)
    return <div className="text-center py-8">No competitions found.</div>;

  const visible = competitions.filter(
    (c) => (c.partnerSlug ?? c.partnerName?.toLowerCase() ?? "") === "virtual-asphalt"
  );

  if (visible.length === 0)
    return <div className="text-center py-8">No competitions found.</div>;

  return (
    <div className="space-y-6">
      {visible.map((c) => {
        const posterUrl = c.posterCdnPath
          ? `https://cdn.pitvox.com/${c.posterCdnPath}`
          : null;

        return (
          <div
            key={c.id}
            className="border border-slate-200 dark:border-slate-700 rounded-md p-4 shadow-sm bg-white dark:bg-slate-900"
          >
            <div className="flex items-start gap-4">
                {posterUrl && (
                <img
                  src={posterUrl}
                  alt={`${c.name} poster`}
                  className="w-28 h-28 object-cover rounded-md border border-slate-200 dark:border-slate-700"
                />
              )}

              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{c.name}</h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {c.platform ?? ""} · {c.type}
                  </div>
                </div>

                {c.description && (
                  <p className="mt-2 text-slate-700 dark:text-slate-300">{c.description}</p>
                )}

                {c.formatDescription && (
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Format:</span> {c.formatDescription}
                  </div>
                )}
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-4">
                  <span className="font-medium">Registration:</span>{" "}
                  <div>
                    {c.registration.isOpen ? (
                      <span className="text-green-600 dark:text-green-400">Open</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">Closed</span>
                    )}{" "}
                    {c.registration.maxParticipants && (
                      <span>
                        · {c.registration.currentCount}/{c.registration.maxParticipants}
                      </span>
                    )}
                  </div>

                  {c.registration.isOpen && (
                    <a
                      href={`https://pitvox.com/p/${c.partnerSlug ?? "virtual-asphalt"}/competitions/${c.id}/register`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    >
                      Register
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Rounds</h4>
              <div className="space-y-2">
                {c.rounds.map((r) => (
                  <div
                    key={`${c.id}-r-${r.roundNumber}`}
                    className="border border-slate-200 dark:border-slate-700 rounded p-2 bg-slate-50 dark:bg-slate-800"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Round {r.roundNumber}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">{r.track}</div>
                        {r.carsDescription && (
                          <div className="text-sm text-slate-600 dark:text-slate-300">{r.carsDescription}</div>
                        )}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(r.startTime).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
