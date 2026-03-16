import { createFileRoute } from "@tanstack/react-router";

import Competitions from "../components/Competitions";
import { InfoBlock } from "../components/InfoBlock";
import { InlineExternalLink } from "../components/Link";

export const Route = createFileRoute("/evo")({
  component: Evo,
});

export default function Evo() {
  return (
    <>
      <div className="mb-2">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-center drop-shadow-lg">
          Assetto Corsa Evo - Fun Races are on
        </h1>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          We are equally excited as you are about the upcoming Assetto Corsa Evo
          game. Once in a month we organize a fun race. We use Pitvox competitions for registration and results.
          Just sign up and join our Discord!
        </p>
      </div>

      <div className="mt-0">
        <h2 className="text-2xl font-bold text-center mb-4">Upcoming competitions - check on <InlineExternalLink className="text-blue-600 hover:text-blue-800" href="https://pitvox.com/p/virtual-asphalt?tab=competitions">Pitvox</InlineExternalLink></h2>
        <Competitions />
        <h3 className="text-center mt-1">Also check out our <InlineExternalLink href="https://pitvox.com/p/virtual-asphalt">Pitvox ACE Leaderboard</InlineExternalLink></h3>
      </div>

      <div className="flex flex-col items-center gap-2">
        <InlineExternalLink href="https://discord.gg/BaZxrzvmGu">
          <img
            src="https://discordapp.com/api/guilds/783402138055344169/widget.png?style=banner2"
            alt="Discord Banner"
            className="rounded-md border border-blue-300 w-full max-w-xs"
          />
        </InlineExternalLink>
      </div>

      <div className="">
        <InfoBlock color="red" title="SERVER DETAILS">
          Open the server list and search for{" "}
          <span className="font-semibold">virtual-asphalt.org</span>. Use the
          password <span className="font-semibold">vARacing</span> to join the
          server.
        </InfoBlock>

        <div className="mt-8 space-y-3">
          <h2 className="text-2xl font-bold text-center text-red-600">
            SERVER NAME: virtual-asphalt.org
          </h2>

          <h2 className="text-2xl font-bold text-center text-red-600">
            SERVER PASSWORD: vARacing
          </h2>
        </div>
      </div>

    </>
  );
}
