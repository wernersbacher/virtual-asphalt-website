import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { rulesContent } from "../content/rulesContent";
import type { RuleSection } from "../content/rulesContent";

export const Route = createFileRoute("/rules")({
  component: RulesPage,
});

function TocList({
  sections,
  level = 0,
}: {
  sections: Array<RuleSection>;
  level?: number;
}) {
  // Styling for different levels
  const baseUl =
    level === 0
      ? "mb-6 rounded-lg border border-border bg-card p-4 shadow-sm"
      : "ml-4 pl-3 border-l-2 border-border";
  const liClass =
    level === 0
      ? "mb-1"
      : 'mb-1 relative before:content-["•"] before:absolute before:-left-3 before:text-muted-foreground';
  return (
    <ul className={baseUl + " space-y-1"}>
      {sections.map((section) => (
        <li key={section.id} className={liClass}>
          <a
            href={`#${section.id}`}
            className="text-primary font-medium hover:underline focus:underline focus:outline-none transition-colors duration-100 px-1 py-0.5 rounded focus:bg-accent hover:bg-accent"
          >
            {section.title}
          </a>
          {section.subsections && (
            <TocList sections={section.subsections} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

function SectionCard({ section }: { section: RuleSection }) {
  return (
    <Card className="mb-6" id={section.id}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-card-foreground">
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-card-foreground text-base">
        {section.content}
        {section.subsections &&
          section.subsections.map((sub) => (
            <div key={sub.id} id={sub.id} className="mt-4">
              <h3 className="text-xl font-bold mb-2 text-card-foreground">
                {sub.title}
              </h3>
              {sub.content}
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

function RulesPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg text-primary">
        League Rules & Regulations
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-card-foreground">
          Table of Contents
        </h2>
        <TocList sections={rulesContent} />
      </div>
      {rulesContent.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
