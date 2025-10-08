import { createFileRoute, Link } from "@tanstack/react-router";

import { InfoBlock } from "../components/InfoBlock";
import { InlineExternalLink } from "../components/Link";
import LatestRaceCalendarImage from "../components/LatestRaceCalendarImage";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        Welcome to{" "}
        <span className="text-blue-700 dark:text-blue-400">
          Virtual Asphalt
        </span>
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
        We are a rather small German simracing community that practices, races
        and talks about the latest technology together. We are happy to welcome
        every new driver, whether you are a complete beginner or a long-time sim
        enthusiast.
      </p>


      {/* Quick Links Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 my-3">
        <Link
          to="/get-started"
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/championships"
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          Current Championships
        </Link>
        <Link
          to="/racingGallery"
          className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition"
        >
          Image Gallery
        </Link>
      </div>

    
      <LatestRaceCalendarImage />

      <InfoBlock color="blue">
        <p className="text-base">
          <span className="font-semibold">
            We race in Assetto Corsa every Monday!
          </span>{" "}
          In addition to 3-4 championships a year, these are very different and
          sometimes unusual track/car combinations. You can find our current
          championships on the right side. The intermediate races are announced
          with mod links via our Discord, where we also discuss all kinds of
          other things about sim racing.
        </p>
      </InfoBlock>
      <div className="flex flex-col items-center gap-2">
        <p className="text-base text-gray-800 dark:text-gray-200 font-medium">
          Join our Discord server! This is the fastest way to get connected.
        </p>
        <InlineExternalLink href="https://discord.gg/BaZxrzvmGu">
          <img
            src="https://discordapp.com/api/guilds/783402138055344169/widget.png?style=banner2"
            alt="Discord Banner"
            className="rounded-md border border-blue-300 w-full max-w-xs"
          />
        </InlineExternalLink>
        <InlineExternalLink href="https://discord.gg/BaZxrzvmGu">
          Join Discord
        </InlineExternalLink>
      </div>
      <InfoBlock color="gray" className="text-center">
        <p>
          We have <span className="font-bold">3 servers online</span>. Find out
          which one you need to join in{" "}
          <InlineExternalLink href="https://acswui.virtual-asphalt.org/">
            ACSwui
          </InlineExternalLink>
          .
        </p>
      </InfoBlock>
    </>
  );
}
