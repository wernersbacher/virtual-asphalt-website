import { createFileRoute } from '@tanstack/react-router'
import { VimeoConsent } from '../../components/VimeoConsent'

export const Route = createFileRoute('/howto/create-skin')({
  component: HowToCreateSkin,
})

function HowToCreateSkin() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        <span className="text-blue-700 dark:text-blue-400">HowTo:</span> ACSwui
        Skins Upload
      </h1>
      <div className="flex flex-col items-center my-8">
        <VimeoConsent
          src="https://player.vimeo.com/video/807255331?fl=pl&fe=vl"
          title="How to upload skins in ACSwui"
        />
        <p className="mt-4 text-base text-gray-700 dark:text-gray-200 text-center">
          Watch this video for a step-by-step guide on how to upload your custom
          skin in ACSwui. It's only in German, but you'll probably understand
          the UI flow!
        </p>
      </div>
    </>
  )
}
