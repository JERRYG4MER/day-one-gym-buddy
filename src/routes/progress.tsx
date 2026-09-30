import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useDayOne } from "@/lib/dayone/store";
import { activeWeeks, last6WeeksTrend, loggedDaySet, streakDays, weekMinutes } from "@/lib/dayone/stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader, Panel, Stat, fmtDate } from "@/components/dayone/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Day One" },
      { name: "description", content: "Sessions, minutes, habit streaks and your personal wins." },
      { property: "og:title", content: "Progress — Day One" },
      { property: "og:description", content: "Sessions, minutes, habit streaks and your personal wins." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { completed, wins, addWin, removeWin, removeCompleted } = useDayOne();
  const [win, setWin] = useState("");
  const trend = last6WeeksTrend(completed);
  const max = Math.max(30, ...trend.map((t) => t.minutes));
  const days = loggedDaySet(completed);
  const grid = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return d;
  });
  const total = completed.reduce((s, c) => s + c.minutes, 0);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="No pressure, just proof" title="Progress">Every session counts, even the short ones.</PageHeader>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Sessions logged" value={completed.length} />
        <Stat label="Total minutes" value={total} />
        <Stat label="This week" value={`${weekMinutes(completed)} min`} />
        <Stat label="Current streak" value={`${streakDays(completed)} days`} hint={`${activeWeeks(completed)} active weeks`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-xl font-semibold">Minutes per week</h2>
          <div className="mt-4 flex h-40 items-end gap-3">
            {trend.map((t) => (
              <div key={t.week} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">{t.minutes}</span>
                <div className="w-full rounded-t-lg bg-primary" style={{ height: `${Math.max(4, (t.minutes / max) * 120)}px` }} />
                <span className="text-[11px] text-muted-foreground">{t.week}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <h2 className="font-display text-xl font-semibold">Last 4 weeks</h2>
          <p className="text-sm text-muted-foreground">Filled days are days you moved.</p>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {grid.map((d) => {
              const on = days.has(d.toISOString().slice(0, 10));
              return <div key={d.toISOString()} title={d.toDateString()} aria-label={`${d.toDateString()}${on ? ", active" : ""}`}
                className={cn("flex aspect-square items-center justify-center rounded-lg text-xs", on ? "bg-sage text-sage-foreground font-semibold" : "bg-muted text-muted-foreground")}>{d.getDate()}</div>;
            })}
          </div>
        </Panel>
      </div>

      <Panel>
        <h2 className="font-display text-xl font-semibold">Personal wins</h2>
        <p className="text-sm text-muted-foreground">Small moments worth remembering.</p>
        <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (win.trim()) { addWin(win.trim()); setWin(""); } }}>
          <Input aria-label="New win" value={win} onChange={(e) => setWin(e.target.value)} placeholder="e.g. Asked staff for help and it was fine" />
          <Button type="submit">Add</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {wins.length === 0 && <li className="text-sm text-muted-foreground">No wins yet — showing up is a good first one.</li>}
          {wins.map((w) => (
            <li key={w.id} className="flex items-start justify-between gap-2 rounded-xl bg-secondary/60 p-3 text-sm">
              <span>{w.text} <span className="text-xs text-muted-foreground">· {fmtDate(w.date)}{w.sample ? " · sample" : ""}</span></span>
              <Button size="icon" variant="ghost" className="size-8" aria-label="Remove win" onClick={() => removeWin(w.id)}><Trash2 className="size-4" /></Button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <h2 className="font-display text-xl font-semibold">Session history</h2>
        {completed.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nothing logged yet. <Link to="/plan" className="underline">Pick a session</Link>.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border">
            {completed.map((c) => (
              <li key={c.id} className="flex items-start justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{c.title} {c.sample && <Badge variant="outline" className="ml-1">sample</Badge>}</p>
                  <p className="text-xs text-muted-foreground">{fmtDate(c.date)} · {c.minutes} min · effort {c.effort}/5{c.exercises.length ? ` · ${c.exercises.filter((e) => e.done).length}/${c.exercises.length} exercises` : ""}</p>
                  {c.note && <p className="mt-1 text-sm">"{c.note}"</p>}
                </div>
                <Button size="icon" variant="ghost" className="size-8" aria-label="Delete session" onClick={() => removeCompleted(c.id)}><Trash2 className="size-4" /></Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
