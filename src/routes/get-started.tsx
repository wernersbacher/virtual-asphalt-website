import { createFileRoute } from '@tanstack/react-router'
import { InfoBlock } from '../components/InfoBlock'

export const Route = createFileRoute('/get-started')({
  component: GetStarted,
})

export default function GetStarted() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        Get Started
      </h1>
      <p className="text-lg leading-relaxed">
        To join the ride, you need the Content Manager, CSP and Real Penalty.
        Then you can practice on our servers. To practice, no registration is
        needed. For the championship races, a registration is needed or highly
        recommended. You can find all upcoming races in{' '}
        <a
          href="https://acswui.virtual-asphalt.org/"
          className="text-blue-700 underline font-medium hover:text-blue-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          ACSwui
        </a>
        . Participation is completely free of charge. You can find our community
        on Discord:
      </p>
      <div className="flex flex-col items-center gap-2">
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

      <InfoBlock color="blue" title="Needed Apps & Training">
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>
            Buy and install <span className="font-semibold">Assetto Corsa</span>
            .
          </li>
          <li>
            Install <span className="font-semibold">Content Manager</span>.
          </li>
          <li>
            Go to <span className="font-semibold">Settings &rarr; CSP</span> and
            install <span className="font-semibold">Custom Shader Patch</span>.
          </li>
          <li>
            Install <span className="font-semibold">Real Penalty</span> and
            activate it under Python Apps.
          </li>
          <li>
            Depending on the race series, additional mods may be required. These
            can be installed via Content Manager or manually if necessary. All
            required mods can also be found in{' '}
            <a
              href="https://acswui.virtual-asphalt.org/"
              className="text-blue-700 dark:text-blue-400 underline font-medium hover:text-blue-900 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              ACSwui
            </a>
            .
          </li>
        </ol>
      </InfoBlock>

      <InfoBlock color="gray" title="Participation in Championships">
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>
            Join our Discord for help and answers:{' '}
            <a
              href="https://discord.gg/BaZxrzvmGu"
              className="text-blue-700 dark:text-blue-400 underline font-medium hover:text-blue-900 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://discord.gg/BaZxrzvmGu
            </a>
          </li>
          <li>
            Join the race times on the right server and race with us – you can
            find the server links in{' '}
            <a
              href="https://acswui.virtual-asphalt.org/"
              className="text-blue-700 dark:text-blue-400 underline font-medium hover:text-blue-900 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              ACSwui
            </a>
            .
          </li>
          <li>
            If you want your own skin and to manage your team, log into the{' '}
            <a
              href="https://acswui.virtual-asphalt.org/"
              className="text-blue-700 dark:text-blue-400 underline font-medium hover:text-blue-900 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              ACSwui
            </a>{' '}
            race management system with your Steam account. The process is not
            so easy, so please join our Discord 🙂
            <br />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              *Login to ACSwui is only possible if you have already driven a
              valid lap on one of our servers.
            </span>
          </li>
        </ol>
      </InfoBlock>

      <InfoBlock color="yellow" title="Upload Custom Skins">
        <p>Coming soon!</p>
      </InfoBlock>
    </>
  )
}
