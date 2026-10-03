import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { guides, primers } from "@/lib/dayone/learn";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader, Panel } from "@/components/dayone/ui";
import { cn } from "@/lib/utils";
import { MotionFigure, StepPlayer } from "@/components/dayone/ExerciseDemo";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Day One" },
      {
        name: "description",
        content: "Plain-English guides to gym machines, free weights and gym etiquette.",
      },
      { property: "og:title", content: "Learn — Day One" },
      {
        property: "og:description",
        content: "Plain-English guides to gym machines, free weights and gym etiquette.",
      },
    ],
  }),
  component: LearnPage,
});

const cats = ["All", "Machine", "Cardio", "Free weights", "Gym life"] as const;

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-1 ml-5 list-disc space-y-1 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function LearnPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const list = guides.filter(
    (g) =>
      (cat === "All" || g.category === cat) &&
      (g.name + g.what).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Plain English, no jargon" title="Learn the gym">
        Know what a machine does before you sit on it. Open any equipment to watch a short animated
        how-to.
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        {primers.map((p) => (
          <Panel key={p.id} className="bg-secondary/50">
            <h2 className="font-display text-lg font-semibold">{p.title}</h2>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm">
              {p.points.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            aria-label="Search guides"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search e.g. leg press"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No guides match. Try another word, or ask the coach.
        </p>
      ) : (
        <Accordion type="multiple" className="space-y-3">
          {list.map((g) => (
            <AccordionItem
              key={g.id}
              value={g.id}
              className="rounded-2xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-left">
                <span>
                  <span className="block text-base font-semibold">{g.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{g.category}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <p className="text-sm">{g.what}</p>
                <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
                  <MotionFigure motion={g.motion} className="aspect-[17/14] w-full" />
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Watch how to use it
                    </p>
                    <StepPlayer steps={g.firstUse} />
                  </div>
                </div>
                <List title="Set it up" items={g.setup} />
                <p className="text-sm">
                  <strong>Key cue:</strong> {g.cue}
                </p>
                <List title="Common mistakes" items={g.mistakes} />
                <p className="rounded-xl bg-muted p-3 text-sm">
                  <strong>Unsure?</strong> {g.unsure}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
