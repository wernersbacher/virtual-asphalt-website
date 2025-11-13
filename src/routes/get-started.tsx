import { createFileRoute } from "@tanstack/react-router";

import { InfoBlock } from "../components/InfoBlock";
import { InlineExternalLink } from "../components/Link";

export const Route = createFileRoute("/get-started")({
  component: GetStarted,
});

export default function GetStarted() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        Get Started — Virtual Asphalt
      </h1>

      <p className="text-lg leading-relaxed">
        Welcome! This page walks you through the minimal steps to join our races
        and championships. Rookies are very welcome.
      </p>

      <InfoBlock color="blue" title="How to get started">
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>
            Install{" "}
            <InlineExternalLink href="https://www.patreon.com/posts/92150073?collection=157721">
              Real Penalty
            </InlineExternalLink>{" "}
            and enable it under{" "}
            <span className="font-semibold">Python Apps</span>.
          </li>
          <li>
            Install a car radar app. We recommend either the built-in Real
            Penalty Helicorsa or car radar. This helps you see cars around you.
          </li>
          <li>
            Install required content for the race or championship (cars and
            track). Download links for the specific event are available in{" "}
            <InlineExternalLink href="https://acswui.virtual-asphalt.org/">
              ACSwui
            </InlineExternalLink>
            .
          </li>
          <li>
            Drive one valid lap on one of our race servers (Search for
            virtual-asphalt or click the join links in{" "}
            <InlineExternalLink href="https://acswui.virtual-asphalt.org/">
              ACSwui
            </InlineExternalLink>
            ). Password:
            <span className="font-semibold">vARacing</span>
          </li>
          <li>
            Log in to our race management system{" "}
            <InlineExternalLink href="https://acswui.virtual-asphalt.org/">
              ACSwui
            </InlineExternalLink>
            , then register for the championship or a race and pick any
            available skin.
          </li>
        </ol>
      </InfoBlock>

      <InfoBlock color="green" title="On race day">
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>
            Join the server early. Practice starts at{" "}
            <span className="font-semibold">18:30 CET</span>. Note: the server
            may be offline before practice starts. ALso you need to register
            before the server opens for practice.
          </li>
          <li>
            Enable your apps:{" "}
            <span className="font-semibold">Real Penalty</span>, your car radar
            (or Helicorsa), and enable the virtual rearmirror (default key{" "}
            <span className="font-semibold">F11</span>).
          </li>
          <li>
            Join Discord voice if you can, it makes things easier and more fun.
            (Join here:{" "}
            <InlineExternalLink href="https://discord.gg/BaZxrzvmGu">
              Discord
            </InlineExternalLink>
            )
          </li>
          <li>
            Drive clean: don&#39;t crash into others, use your mirrors and be
            fair. Respect race etiquette. If you need help, ask in Discord.
          </li>
        </ol>
      </InfoBlock>
    </>
  );
}
