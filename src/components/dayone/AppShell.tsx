import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, CalendarDays, HeartHandshake, LineChart, Settings, Sun, LifeBuoy } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SafetyNote } from "./SafetyNote";

const nav = [
  { to: "/", label: "Today", icon: Sun },
  { to: "/plan", label: "My plan", icon: CalendarDays },
  { to: "/progress", label: "Progress", icon: LineChart },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/coach", label: "Coach", icon: HeartHandshake },
] as const;

function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="justify-start gap-2 text-muted-foreground">
          <LifeBuoy className="size-4" aria-hidden />
          Help &amp; safety
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>How Day One works</DialogTitle>
          <DialogDescription>A quick orientation, any time you need it.</DialogDescription>
        </DialogHeader>
        <ul className="ml-5 list-disc space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Today</strong> — your check-in and the session suggested for right now.</li>
          <li><strong className="text-foreground">My plan</strong> — your week, why it looks like this, and how to change it.</li>
          <li><strong className="text-foreground">Progress</strong> — sessions, minutes, streaks and your own wins.</li>
          <li><strong className="text-foreground">Learn</strong> — plain-English guides to machines and gym life.</li>
          <li><strong className="text-foreground">Coach</strong> — ask anything; answers use your plan and profile.</li>
        </ul>
        <p className="text-sm text-muted-foreground">Everything is saved on this device. No account, no sign-in.</p>
        <SafetyNote />
      </DialogContent>
    </Dialog>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 md:flex">
        <Link to="/" className="mb-8 block px-2">
          <span className="font-display text-2xl font-semibold text-foreground">Day One</span>
          <span className="mt-1 block text-xs text-muted-foreground">Your beginner gym companion</span>
        </Link>
        <nav className="flex flex-col gap-1" aria-label="Main">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60",
                )}
              >
                <item.icon className="size-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-2">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname.startsWith("/settings") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60",
            )}
          >
            <Settings className="size-4" aria-hidden />
            Settings &amp; profile
          </Link>
          <HelpDialog />
        </div>
      </aside>

      <div className="md:pl-64">
        <main className="mx-auto w-full max-w-5xl px-4 pt-6 pb-28 sm:px-6 md:pb-12">{children}</main>
      </div>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden"
      >
        <ul className="grid grid-cols-5">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="size-5" aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
