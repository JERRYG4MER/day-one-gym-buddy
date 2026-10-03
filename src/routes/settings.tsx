import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useDayOne } from "@/lib/dayone/store";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PageHeader, Panel } from "@/components/dayone/ui";
import { ProfileForm } from "@/components/dayone/ProfileForm";
import { SafetyNote } from "@/components/dayone/SafetyNote";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & profile — Day One" },
      {
        name: "description",
        content: "Update your goals and schedule. Your data stays on this device.",
      },
      { property: "og:title", content: "Settings & profile — Day One" },
      {
        property: "og:description",
        content: "Update your goals and schedule. Your data stays on this device.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { profile, ready, saveProfile, resetAll } = useDayOne();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings & profile"
        title={profile.completedOnboarding ? "Your details" : "Let's get to know you"}
      >
        Answer what you're comfortable with. Everything is optional and you can change it any time.
      </PageHeader>
      <Panel>
        {ready ? (
          <ProfileForm
            key={String(profile.completedOnboarding)}
            initial={profile}
            onSave={(p) => {
              saveProfile(p);
              toast.success("Saved — your plan has been rebuilt");
              navigate({ to: "/plan" });
            }}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Loading your details…</p>
        )}
      </Panel>
      <Panel className="bg-secondary/50">
        <h2 className="font-display text-xl font-semibold">Your data stays with you</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Day One has no account and no sign-in. Your profile, check-ins, sessions, wins and coach
          chat are saved only in this browser on this device. Clearing browser data or switching
          devices starts fresh.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="mt-4">
              Reset everything
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Day One?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes your profile, logs, wins and chat from this device and restores the
                sample data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep my data</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  resetAll();
                  toast("Day One has been reset");
                }}
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Panel>
      <Panel>
        <h2 className="font-display text-xl font-semibold">Put Day One on your phone</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Install it once and it opens like a regular app, even with weak gym signal.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>iPhone (Safari):</strong> tap Share, then "Add to Home Screen".
          </li>
          <li>
            <strong>Android (Chrome):</strong> tap the ⋮ menu, then "Install app" or "Add to Home
            screen".
          </li>
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">Works from the published app link.</p>
      </Panel>
      <SafetyNote />
    </div>
  );
}
