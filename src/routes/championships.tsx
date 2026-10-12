import { createFileRoute } from "@tanstack/react-router";

import { ChampionshipStandings } from "../components/ChampionshipStandings";
import RaceCalendarGallery from "../components/RaceCalenderGallery";
import { ferrariGt3Challenge } from "../content/championships";

export const Route = createFileRoute("/championships")({
  component: Championships,
});

function Championships() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        Championships
      </h1>
      <p className="text-lg leading-relaxed">
        Here you can find the current race calendar with all planned events and
        their details. Fun races are not listed here, but you can find them (and
        the championship races) announced in our Discord.
      </p>
      <section id="standings" className="scroll-mt-4">
        <ChampionshipStandings config={ferrariGt3Challenge} />
      </section>
      <RaceCalendarGallery />
    </>
  );
}
