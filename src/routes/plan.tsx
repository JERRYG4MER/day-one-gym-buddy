import { createFileRoute, Link } from "@tanstack/react-router";
import { RefreshCw, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useDayOne } from "@/lib/dayone/store";
import { weekSessions } from "@/lib/dayone/stats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dayone/ui";
import { ProfileForm } from "@/components/dayone/ProfileForm";
import { SafetyNote } from "@/components/dayone/SafetyNote";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "My plan — Day One" },
      {
        name: "description",
        content: "Your week of beginner-friendly sessions and why it fits you.",
      },
      { property: "og:title", content: "My plan — Day One" },
      {
        property: "og:description",
        content: "Your week of beginner-friendly sessions and why it fits you.",
      },
    ],
  }),
  component: PlanPage,
});

function PlanPage() {
  const { plan, profile, completed, saveProfile, regeneratePlan } = useDayOne();
  const [open, setOpen] = useState(false);
  const done = new Set(weekSessions(completed).map((c) => c.sessionId));

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={plan?.weekLabel} title="My plan">
        A simple week built around {profile.daysPerWeek} days and about {profile.minutesPerSession}{" "}
        minutes a session.
      </PageHeader>
      <div className="flex flex-wrap gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil className="size-4" /> Edit my details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Your details</DialogTitle>
            </DialogHeader>
            <ProfileForm
              initial={profile}
              saveLabel="Save and rebuild plan"
              onSave={(p) => {
                saveProfile(p);
                setOpen(false);
                toast.success("Plan updated to fit your details");
              }}
            />
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          onClick={() => {
            regeneratePlan();
            toast.success("Fresh plan generated");
          }}
        >
          <RefreshCw className="size-4" /> Regenerate plan
        </Button>
      </div>

      {plan && (
        <Panel className="bg-secondary/60">
          <h2 className="font-display text-xl font-semibold">Why this fits you</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {plan.rationale.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {plan?.sessions.map((s) => (
          <Panel key={s.id} className={s.restDay ? "bg-muted/50" : ""}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.day}
              </p>
              {done.has(s.id) ? (
                <Badge className="bg-sage text-sage-foreground">Done this week</Badge>
              ) : (
                !s.restDay && (
                  <Badge variant="outline">
                    {s.minutes} min · {s.intensity}
                  </Badge>
                )
              )}
            </div>
            <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.focus}</p>
            <p className="mt-2 text-sm">{s.summary}</p>
            {!s.restDay && (
              <>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {s.blocks.map((b) => (
                    <li key={b.id}>
                      • {b.name} — {b.prescription}
                    </li>
                  ))}
                </ul>
                <Button asChild size="sm" className="mt-4">
                  <Link to="/session/$id" params={{ id: s.id }}>
                    Start this session
                  </Link>
                </Button>
              </>
            )}
          </Panel>
        ))}
      </div>
      <SafetyNote compact />
    </div>
  );
}
