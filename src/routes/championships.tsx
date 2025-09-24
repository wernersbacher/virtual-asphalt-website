import { createFileRoute } from "@tanstack/react-router";

import { InlineExternalLink } from "../components/Link";
import RaceCalendarGallery from "../components/RaceCalenderGallery";

export const Route = createFileRoute("/championships")({
  component: Championships,
});

export default function Championships() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        Championships
      </h1>
      <p className="text-lg leading-relaxed">
        Here you can find the current race calendar with all planned events and
        their details. Fun races are not listed here, but you can find them (and
        the championship races) listed in{" "}
        <InlineExternalLink href="https://acswui.virtual-asphalt.org/">
          ACSwui
        </InlineExternalLink>
        .
      </p>
      <RaceCalendarGallery />
    </>
  );
}
