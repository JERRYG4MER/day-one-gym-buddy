import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  activityOptions,
  considerationOptions,
  equipmentOptions,
  experienceOptions,
  goalOptions,
} from "@/lib/dayone/plan";
import type { Profile } from "@/lib/dayone/types";
import { cn } from "@/lib/utils";

function Chips({
  options,
  value,
  onChange,
  multi = true,
  label,
}: {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (v: string[]) => void;
  multi?: boolean;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => {
              if (!multi) return onChange([o.value]);
              onChange(active ? value.filter((v) => v !== o.value) : [...value, o.value]);
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-accent",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ProfileForm({
  initial,
  onSave,
  onSkip,
  saveLabel = "Save and build my plan",
}: {
  initial: Profile;
  onSave: (p: Profile) => void;
  onSkip?: () => void;
  saveLabel?: string;
}) {
  const [draft, setDraft] = useState<Profile>(initial);
  const set = (p: Partial<Profile>) => setDraft((d) => ({ ...d, ...p }));

  return (
    <form
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...draft, completedOnboarding: true });
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="name">What should we call you? (optional)</Label>
        <Input
          id="name"
          value={draft.name}
          placeholder="Your first name"
          onChange={(e) => set({ name: e.target.value })}
          className="max-w-xs"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">What would you like to work toward?</legend>
        <p className="text-sm text-muted-foreground">Pick any that fit, or skip this.</p>
        <Chips label="Goals" options={goalOptions} value={draft.goals} onChange={(v) => set({ goals: v as Profile["goals"] })} />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="days">Days per week: {draft.daysPerWeek}</Label>
          <Slider
            id="days"
            min={1}
            max={5}
            step={1}
            value={[draft.daysPerWeek]}
            onValueChange={([v]) => { if (v !== undefined) set({ daysPerWeek: v }); }}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="mins">Time per visit: {draft.minutesPerSession} min</Label>
          <Slider
            id="mins"
            min={15}
            max={75}
            step={5}
            value={[draft.minutesPerSession]}
            onValueChange={([v]) => { if (v !== undefined) set({ minutesPerSession: v }); }}
          />
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">How much experience do you have?</legend>
        <Chips
          label="Experience"
          multi={false}
          options={experienceOptions}
          value={[draft.experience]}
          onChange={(v) => set({ experience: v[0] as Profile["experience"] })}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">What do you have access to?</legend>
        <Chips
          label="Equipment"
          multi={false}
          options={equipmentOptions}
          value={[draft.equipment]}
          onChange={(v) => set({ equipment: v[0] as Profile["equipment"] })}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">Anything you already enjoy?</legend>
        <Chips
          label="Preferred activities"
          options={activityOptions}
          value={draft.activities}
          onChange={(v) => set({ activities: v as Profile["activities"] })}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">Movement considerations</legend>
        <p className="text-sm text-muted-foreground">
          Entirely optional. If you share something here, we'll suggest gentler options — we never diagnose or assume anything.
        </p>
        <Chips
          label="Movement considerations"
          options={considerationOptions}
          value={draft.considerations}
          onChange={(v) => set({ considerations: v as Profile["considerations"] })}
        />
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          {saveLabel}
        </Button>
        {onSkip && (
          <Button type="button" variant="ghost" onClick={onSkip}>
            Skip for now
          </Button>
        )}
        <Badge variant="secondary" className="ml-auto">Saved on this device only</Badge>
      </div>
    </form>
  );
}
