import { createFileRoute } from "@tanstack/react-router";

import { InfoBlock } from "../components/InfoBlock";
import { InlineExternalLink } from "../components/Link";

export const Route = createFileRoute("/evo")({
  component: Evo,
});

export default function Evo() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-center drop-shadow-lg">
          Assetto Corsa Evo - Proof of Racing Championship
        </h1>

        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          We are equally excited as you are about the upcoming Assetto Corsa Evo
          game. Therefore, we are organizing a testing championship. Read this
          page and join our Discord to get started!
        </p>
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

      <div className="flex justify-center">
        <img
          src="/img/raceCalender/017-acEvo.png"
          alt="Assetto Corsa Evo Championship Calendar"
          className="rounded-md border border-gray-300 max-w-full h-auto shadow-lg"
        />
      </div>

      <InfoBlock color="green" title="Racing schedule">
        The server will be online 24/7. You can join the server anytime to
        practice. As the server manager is quite simple for now, a race session
        will also start after the practice. For the race day, the server will
        manually restarted, so at 18:00 CET the practice begins and the quali is
        at around 20:00 CET. After 7 min quali and 20 min race we restart the
        sessions and do another quali/race session. Both results will be
        combined for the championship points.
      </InfoBlock>

      <div className="text-center">
        <InlineExternalLink href="https://docs.google.com/spreadsheets/d/1B48ugcX6FzBp2t-fee6W154KjW16XduHujoEHNOgZSo/edit?usp=sharing">
          Current championship standings
        </InlineExternalLink>
      </div>
    </>
  );
}
