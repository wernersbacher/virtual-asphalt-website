import { createFileRoute } from '@tanstack/react-router';

import { VimeoConsent } from '../../components/VimeoConsent';

export const Route = createFileRoute('/howto/create-team')({
  component: HowToCreateSkin,
});

function HowToCreateSkin() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        <span className="text-blue-700 dark:text-blue-400">HowTo:</span> ACSwui
        Team Creation
      </h1>
      <div className="flex flex-col items-center my-8">
        <VimeoConsent
          src="https://vimeo.com/807293041?fl=pl&fe=vl"
          title="How to create a team in ACSwui"
        />
        <p className="mt-4 text-base text-gray-700 dark:text-gray-200 text-center">
          Watch this video for a step-by-step guide on how to create your custom
          team in ACSwui. It&apos;s only in German, but you&apos;ll probably
          understand the UI flow!
        </p>
      </div>
    </>
  );
}
