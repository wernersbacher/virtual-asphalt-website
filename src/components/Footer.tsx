import { ModeToggle } from './ui/mode-toggle'

// Replace with your Discord invite/banner image and link
const DISCORD_INVITE_URL = 'https://discord.gg/your-invite-link'
const DISCORD_BANNER = '/logo192.png' // Placeholder, replace with actual banner if available

export default function Footer() {
  return (
    <footer
      className="w-full my-3 max-w-5xl rounded-b-xl shadow flex flex-col md:flex-row items-center justify-between p-4 gap-4 bg-gradient-to-r"
      style={{
        backgroundImage:
          'linear-gradient(to right, var(--va-gradient-1, #0f0c29), var(--va-gradient-2, #302b63), var(--va-gradient-3, #24243e))',
      }}
    >
      <a
        href={DISCORD_INVITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <img
          src={DISCORD_BANNER}
          alt="Join us on Discord"
          className="h-10 w-10 rounded-md shadow"
        />
        <span className="text-gray-900 dark:text-white font-semibold text-lg">
          Join us on Discord
        </span>
      </a>
      <div className="flex items-center">
        <ModeToggle />
      </div>
    </footer>
  )
}
