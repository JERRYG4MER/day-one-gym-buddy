import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Plus, Minus, PartyPopper } from "lucide-react";
import { useDayOne } from "@/lib/dayone/store";
import type { ExerciseLog } from "@/lib/dayone/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Panel } from "@/components/dayone/ui";
import { SafetyNote } from "@/components/dayone/SafetyNote";
import { cn } from "@/lib/utils";
import { ExerciseDemo, MotionFigure, getExerciseInfo } from "@/components/dayone/ExerciseDemo";
import type { JSX } from "react";

export const Route = createFileRoute("/session/$id")({
  head: () => ({
    meta: [
      { title: "Workout session — Day One" },
      { name: "description", content: "Follow your session step by step and log how it went." },
      { property: "og:title", content: "Workout session — Day One" },
      {
        property: "og:description",
        content: "Follow your session step by step and log how it went.",
      },
    ],
  }),
  component: SessionPage,
});

const effortLabels = ["Very easy", "Comfortable", "Moderate", "Challenging", "Very hard"];

function defaultSets(prescription: string) {
  const m = prescription.match(/(\d+)\s*[x×]\s*(\d+)/);
  const count = m ? Math.min(Number(m[1]), 5) : 2;
  const reps = m?.[2] ?? "10";
  return Array.from({ length: count }, (_, i) => ({ id: `s${i}`, reps, weight: "" }));
}

function SessionPage() {
  const { id } = Route.useParams();
  const { plan, ready, addCompleted } = useDayOne();
  const navigate = useNavigate();
  const session = plan?.sessions.find((s) => s.id === id);
  const [start] = useState(() => Date.now());
  const [warm, setWarm] = useState<boolean[]>([]);
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [effort, setEffort] = useState(3);
  const [note, setNote] = useState("");
  const [finished, setFinished] = useState<{ minutes: number } | null>(null);

  useEffect(() => {
    if (!session) return;
    setWarm(session.warmup.map(() => false));
    setLogs(
      session.blocks.map((b) => ({
        exerciseId: b.id,
        name: b.name,
        done: false,
        sets: defaultSets(b.prescription),
      })),
    );
  }, [session?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const pct = useMemo(() => {
    const total = warm.length + logs.length;
    return total
      ? Math.round(
          ((warm.filter(Boolean).length + logs.filter((l) => l.done).length) / total) * 100,
        )
      : 0;
  }, [warm, logs]);

  if (!ready) return <p className="text-muted-foreground">Loading your session…</p>;
  if (!session || session.restDay)
    return (
      <Panel>
        <p className="font-medium">We couldn't find that session.</p>
        <p className="text-sm text-muted-foreground">Your plan may have been regenerated.</p>
        <Button asChild className="mt-3">
          <Link to="/plan">Back to my plan</Link>
        </Button>
      </Panel>
    );

  const upd = (i: number, f: (l: ExerciseLog) => ExerciseLog) =>
    setLogs((ls) => ls.map((l, j) => (j === i ? f(l) : l)));

  if (finished)
    return (
      <div className="mx-auto max-w-xl space-y-5 py-8 text-center">
        <PartyPopper className="mx-auto size-12 text-clay" />
        <h1 className="font-display text-3xl font-semibold">You showed up. That's the win.</h1>
        <p className="text-muted-foreground">
          {session.title} is logged — {finished.minutes} minutes,{" "}
          {logs.filter((l) => l.done).length} of {logs.length} exercises, effort "
          {effortLabels[effort - 1]}".
        </p>
        <p className="text-sm text-muted-foreground">
          Drink some water, and give that body a rest day before the next hard one.
        </p>
        <div className="flex justify-center gap-2">
          <Button onClick={() => navigate({ to: "/progress" })}>See my progress</Button>
          <Button variant="outline" onClick={() => navigate({ to: "/" })}>
            Back to Today
          </Button>
        </div>
      </div>
    );

  const finish = () => {
    const elapsed = Math.round((Date.now() - start) / 60000);
    const minutes = elapsed >= 5 ? elapsed : session.minutes;
    addCompleted({
      id: `c-${Date.now()}`,
      sessionId: session.id,
      title: session.title,
      date: new Date().toISOString(),
      minutes,
      effort,
      note: note.trim(),
      exercises: logs,
    });
    setFinished({ minutes });
    window.scrollTo({ top: 0 });
  };

  const blockMin = Math.max(
    3,
    Math.round((session.minutes - 10) / Math.max(1, session.blocks.length)),
  );
  const flow = [
    { label: "Warm-up", min: 5 },
    ...session.blocks.map((b) => ({ label: b.name, min: blockMin })),
    { label: "Cool-down", min: 5 },
  ];
  const machines = Array.from(
    new Map(
      session.blocks
        .map((b) => getExerciseInfo(b.id).guide)
        .filter((g): g is NonNullable<typeof g> => !!g)
        .map((g) => [g.id, g]),
    ).values(),
  );

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={`${session.day} · about ${session.minutes} min`} title={session.title}>
        {session.summary}
      </PageHeader>
      <div className="sticky top-0 z-10 -mx-4 bg-background/95 px-4 py-2 backdrop-blur sm:mx-0 sm:px-0">
        <div className="flex items-center gap-3 text-sm">
          <Progress value={pct} className="h-2" aria-label="Session progress" />
          <span className="w-10 text-right text-muted-foreground">{pct}%</span>
        </div>
      </div>

      <Panel>
        <h2 className="font-display text-xl font-semibold">Today's flow</h2>
        <p className="text-sm text-muted-foreground">
          Roughly how your {session.minutes} minutes will go. No need to be exact.
        </p>
        <ol className="mt-4 space-y-2">
          {
            flow.reduce<{ items: JSX.Element[]; t: number }>(
              (acc, f, i) => {
                acc.items.push(
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-16 shrink-0 tabular-nums text-muted-foreground">
                      {acc.t}–{acc.t + f.min} min
                    </span>
                    <span
                      className="h-2 rounded-full bg-sage"
                      style={{ width: `${f.min * 6}px` }}
                    />
                    <span className="font-medium">{f.label}</span>
                  </li>,
                );
                acc.t += f.min;
                return acc;
              },
              { items: [], t: 0 },
            ).items
          }
        </ol>
      </Panel>

      {machines.length > 0 && (
        <Panel>
          <h2 className="font-display text-xl font-semibold">Equipment you'll use today</h2>
          <p className="text-sm text-muted-foreground">
            Tap each one for a quick briefing before you start.
          </p>
          <div className="mt-3 space-y-2">
            {machines.map((g) => (
              <details key={g.id} className="group rounded-xl border border-border p-3">
                <summary className="cursor-pointer list-none font-medium">
                  {g.name} <span className="text-xs text-muted-foreground">· {g.category}</span>
                </summary>
                <div className="mt-3 grid gap-4 text-sm sm:grid-cols-[200px_1fr]">
                  <MotionFigure
                    motion={
                      getExerciseInfo(
                        session.blocks.find((b) => getExerciseInfo(b.id).guide?.id === g.id)?.id ??
                          "",
                      ).motion
                    }
                    className="aspect-[17/14] w-full"
                  />
                  <div className="space-y-2">
                    <p>{g.what}</p>
                    <p className="font-semibold">Set it up</p>
                    <ul className="list-disc space-y-1 pl-5">
                      {g.setup.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <p className="font-semibold">Avoid</p>
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      {g.mistakes.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground">
                      <strong>Unsure?</strong> {g.unsure}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Panel>
      )}

      <Panel>
        <h2 className="font-display text-xl font-semibold">1. Warm-up</h2>
        <ul className="mt-3 space-y-2">
          {session.warmup.map((w, i) => (
            <li key={w} className="flex items-start gap-3">
              <Checkbox
                id={`w${i}`}
                checked={warm[i] ?? false}
                onCheckedChange={(v) => setWarm((ws) => ws.map((x, j) => (j === i ? !!v : x)))}
                className="mt-0.5"
              />
              <Label
                htmlFor={`w${i}`}
                className={cn(
                  "font-normal leading-snug",
                  warm[i] && "text-muted-foreground line-through",
                )}
              >
                {w}
              </Label>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">2. Exercises</h2>
        {session.blocks.map((b, i) => {
          const log = logs[i];
          if (!log) return null;
          return (
            <Panel key={b.id} className={log.done ? "border-sage bg-sage/20" : ""}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{b.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {b.prescription} · rest {b.rest}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={log.done ? "default" : "outline"}
                  aria-pressed={log.done}
                  onClick={() => upd(i, (l) => ({ ...l, done: !l.done }))}
                >
                  <Check className="size-4" /> {log.done ? "Done" : "Mark done"}
                </Button>
              </div>
              <div className="mt-3">
                <ExerciseDemo id={b.id} name={b.name} cue={b.cue} prescription={b.prescription} />
              </div>
              <p className="mt-3 text-sm">
                <strong>Cue:</strong> {b.cue}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Swap if needed:</strong> {b.substitution}
              </p>
              <div className="mt-3 space-y-2">
                {log.sets.map((s, k) => (
                  <div key={s.id} className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="w-12 text-muted-foreground">Set {k + 1}</span>
                    <Input
                      aria-label={`Set ${k + 1} reps`}
                      value={s.reps}
                      className="h-9 w-20"
                      inputMode="numeric"
                      onChange={(e) =>
                        upd(i, (l) => ({
                          ...l,
                          sets: l.sets.map((x) =>
                            x.id === s.id ? { ...x, reps: e.target.value } : x,
                          ),
                        }))
                      }
                    />
                    <span className="text-muted-foreground">reps</span>
                    <Input
                      aria-label={`Set ${k + 1} weight (optional)`}
                      value={s.weight}
                      placeholder="optional"
                      className="h-9 w-24"
                      inputMode="decimal"
                      onChange={(e) =>
                        upd(i, (l) => ({
                          ...l,
                          sets: l.sets.map((x) =>
                            x.id === s.id ? { ...x, weight: e.target.value } : x,
                          ),
                        }))
                      }
                    />
                    <span className="text-muted-foreground">kg</span>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      upd(i, (l) => ({
                        ...l,
                        sets: [
                          ...l.sets,
                          {
                            id: `s${Date.now()}`,
                            reps: l.sets.at(-1)?.reps ?? "10",
                            weight: l.sets.at(-1)?.weight ?? "",
                          },
                        ],
                      }))
                    }
                  >
                    <Plus className="size-4" /> Add set
                  </Button>
                  {log.sets.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => upd(i, (l) => ({ ...l, sets: l.sets.slice(0, -1) }))}
                    >
                      <Minus className="size-4" /> Remove set
                    </Button>
                  )}
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel>
        <h2 className="font-display text-xl font-semibold">3. Cool-down</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {session.coolDown.map((c) => (
            <li key={c}>• {c}</li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <h2 className="font-display text-xl font-semibold">How did it feel?</h2>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Effort">
          {effortLabels.map((l, i) => (
            <button
              key={l}
              type="button"
              aria-pressed={effort === i + 1}
              onClick={() => setEffort(i + 1)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm",
                effort === i + 1
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <Label htmlFor="note" className="mt-4 block">
          A note for future you (optional)
        </Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Seat height 4 on the leg press felt right."
          className="mt-2"
        />
        <Button size="lg" className="mt-4 w-full sm:w-auto" onClick={finish}>
          Finish and save session
        </Button>
      </Panel>
      <SafetyNote compact />
    </div>
  );
}
