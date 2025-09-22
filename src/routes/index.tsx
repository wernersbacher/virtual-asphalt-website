import { createFileRoute } from '@tanstack/react-router'
import { InfoBlock } from '../components/InfoBlock'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        Welcome to{' '}
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
      <InfoBlock color="blue">
        <p className="text-base">
          <span className="font-semibold">
            We race in Assetto Corsa every Monday!
          </span>{' '}
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
        <a
          href="https://discord.gg/BaZxrzvmGu"
          className="inline-block rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://discordapp.com/api/guilds/783402138055344169/widget.png?style=banner2"
            alt="Discord Banner"
            className="rounded-md border border-blue-300 w-full max-w-xs"
          />
        </a>
        <a
          href="https://discord.gg/BaZxrzvmGu"
          className="mt-2 px-6 py-2 bg-blue-700 text-white font-semibold rounded-full shadow hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Discord
        </a>
      </div>
      <InfoBlock color="gray" className="text-center">
        <p>
          We have <span className="font-bold">3 servers online</span>. Find out
          which one you need to join in{' '}
          <a
            href="https://acswui.virtual-asphalt.org/"
            className="text-blue-700 dark:text-blue-400 underline font-medium hover:text-blue-900 dark:hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            ACSwui
          </a>
          .
        </p>
      </InfoBlock>
    </>
  )
}
