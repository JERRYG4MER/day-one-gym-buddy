import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Timer, HeartHandshake } from "lucide-react";
import { useDayOne, todayKey } from "@/lib/dayone/store";
import { streakDays, weekMinutes, weekSessions } from "@/lib/dayone/stats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, Panel, Stat } from "@/components/dayone/ui";
import { SafetyNote } from "@/components/dayone/SafetyNote";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Day One" },
      {
        name: "description",
        content: "Your daily check-in and the gentle session suggested for today.",
      },
      { property: "og:title", content: "Today — Day One" },
      {
        property: "og:description",
        content: "Your daily check-in and the gentle session suggested for today.",
      },
    ],
  }),
  component: Today,
});

const moods = ["Nervous", "Okay", "Good", "Motivated", "Tired"];
const energyLabels = ["Running low", "A bit flat", "Steady", "Good", "Full of beans"];

function Today() {
  const { profile, plan, checkIns, completed, addCheckIn } = useDayOne();
  const today = checkIns.find((c) => c.date === todayKey());
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const name = profile.name ? `, ${profile.name.split(" ")[0]}` : "";
  const sessions = plan?.sessions.filter((s) => !s.restDay) ?? [];
  const doneIds = new Set(weekSessions(completed).map((c) => c.sessionId));
  let suggested = sessions.find((s) => !doneIds.has(s.id)) ?? sessions[0];
  const lowEnergy = today && today.energy <= 2;
  if (lowEnergy) suggested = [...sessions].sort((a, b) => a.minutes - b.minutes)[0] ?? suggested;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={new Date().toLocaleDateString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
        title={`${greet}${name}.`}
      >
        No pressure today. Tell us how you feel and we'll suggest something that fits.
      </PageHeader>

      {!profile.completedOnboarding && (
        <Panel className="border-sage bg-sage/30">
          <p className="font-medium text-foreground">Make Day One yours</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You're seeing a sample plan. Answer a few questions (about 2 minutes) and we'll shape it
            around you.
          </p>
          <Button asChild className="mt-3">
            <Link to="/settings">Personalise my plan</Link>
          </Button>
        </Panel>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <Panel className="lg:col-span-2">
          <h2 className="font-display text-xl font-semibold">Daily check-in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {today
              ? "Thanks — saved for today. You can change it."
              : "How's your energy right now?"}
          </p>
          <div className="mt-4 grid grid-cols-5 gap-2" role="group" aria-label="Energy">
            {energyLabels.map((l, i) => (
              <button
                key={l}
                type="button"
                aria-pressed={today?.energy === i + 1}
                title={l}
                onClick={() =>
                  addCheckIn({ date: todayKey(), energy: i + 1, mood: today?.mood ?? "Okay" })
                }
                className={cn(
                  "rounded-xl border py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                  today?.energy === i + 1
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted",
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {today && (
            <p className="mt-2 text-xs text-muted-foreground">{energyLabels[today.energy - 1]}</p>
          )}
          <p className="mt-4 text-sm font-medium">Mood</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Mood">
            {moods.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={today?.mood === m}
                onClick={() =>
                  addCheckIn({ date: todayKey(), energy: today?.energy ?? 3, mood: m })
                }
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  today?.mood === m
                    ? "border-clay bg-clay text-clay-foreground"
                    : "border-border hover:bg-muted",
                )}
              >
                {m}
              </button>
            ))}
          </div>
          {today?.mood === "Nervous" && (
            <p className="mt-3 rounded-xl bg-muted p-3 text-sm">
              Totally normal. Try the{" "}
              <Link to="/learn" className="underline">
                gym navigation guides
              </Link>{" "}
              or ask the{" "}
              <Link to="/coach" className="underline">
                coach
              </Link>
              .
            </p>
          )}
        </Panel>

        <Panel className="lg:col-span-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-display text-xl font-semibold">Suggested for today</h2>
            {suggested && (
              <Badge variant="secondary">
                {suggested.minutes} min · {suggested.intensity}
              </Badge>
            )}
          </div>
          {suggested ? (
            <>
              <p className="mt-3 text-lg font-medium">{suggested.title}</p>
              <p className="text-sm text-muted-foreground">{suggested.focus}</p>
              <p className="mt-3 text-sm">{suggested.summary}</p>
              {lowEnergy && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Energy's low, so we picked your shortest session. Even a walk counts.
                </p>
              )}
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {suggested.blocks.slice(0, 4).map((b) => (
                  <li key={b.id}>
                    • {b.name} — {b.prescription}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/session/$id" params={{ id: suggested.id }}>
                    Start session <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/plan">See my week</Link>
                </Button>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No plan yet.{" "}
              <Link to="/settings" className="underline">
                Build one
              </Link>
              .
            </p>
          )}
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat
          label="Minutes this week"
          value={
            <span className="inline-flex items-center gap-2">
              <Timer className="size-5 text-primary" />
              {weekMinutes(completed)}
            </span>
          }
        />
        <Stat
          label="Sessions this week"
          value={`${weekSessions(completed).length} / ${profile.daysPerWeek}`}
        />
        <Stat
          label="Day streak"
          value={
            <span className="inline-flex items-center gap-2">
              <Flame className="size-5 text-clay" />
              {streakDays(completed)}
            </span>
          }
          hint="Rest days are part of training"
        />
        <Link
          to="/coach"
          className="rounded-2xl border border-border bg-secondary p-4 transition-colors hover:bg-secondary/70"
        >
          <HeartHandshake className="size-5 text-primary" />
          <p className="mt-2 font-medium">Ask the coach</p>
          <p className="text-xs text-muted-foreground">Anything, no silly questions</p>
        </Link>
      </div>

      <SafetyNote compact />
    </div>
  );
}
