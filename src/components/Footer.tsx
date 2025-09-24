import { InlineExternalLink } from "./Link";
import { ModeToggle } from "./ui/mode-toggle";

// Replace with your Discord invite/banner image and link
const DISCORD_INVITE_URL = "https://discord.gg/your-invite-link";
const DISCORD_BANNER = "/logo192.png"; // Placeholder, replace with actual banner if available

export default function Footer() {
  return (
    <footer
      className="w-full my-3 max-w-5xl rounded-b-xl shadow flex flex-row flex-wrap items-center justify-between p-4 gap-4 bg-gradient-to-r min-w-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--va-gradient-1, #0f0c29), var(--va-gradient-2, #302b63), var(--va-gradient-3, #24243e))",
      }}
    >
      <InlineExternalLink
        href={DISCORD_INVITE_URL}
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <img src={DISCORD_BANNER} alt="Join us on Discord" className="h-10" />
        <span className="text-gray-900 dark:text-white font-semibold text-lg">
          Join us on Discord
        </span>
      </InlineExternalLink>
      <div className="flex items-center">
        <ModeToggle />
      </div>
    </footer>
  );
}
