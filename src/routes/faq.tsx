import { createFileRoute } from '@tanstack/react-router';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

function FAQ() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        FAQ
      </h1>
      <div className="w-[80%] mx-auto p-2">
        <Accordion
          type="single"
          collapsible
          className="rounded-lg shadow bg-card p-2"
        >
          <AccordionItem value="q1">
            <AccordionTrigger className="text-lg font-semibold">
              Where can I see the next races?
            </AccordionTrigger>
            <AccordionContent>
              You can find all upcoming races on the Races page and in our
              Discord.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger className="text-lg font-semibold">
              What software do I need?
            </AccordionTrigger>
            <AccordionContent>
              You need Assetto Corsa, Content Manager, CSP, and Real Penalty.
              Additional mods may be required for some events.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5">
            <AccordionTrigger className="text-lg font-semibold">
              Where can I get help if I have issues?
            </AccordionTrigger>
            <AccordionContent>
              Join our Discord server and ask in the help channels or contact a
              race director directly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q6">
            <AccordionTrigger className="text-lg font-semibold">
              Can I suggest new cars or tracks?
            </AccordionTrigger>
            <AccordionContent>
              Yes! We welcome suggestions from all community members. Share your
              ideas in the Discord smalltalk channel.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export const Route = createFileRoute('/faq')({
  component: FAQ,
});
