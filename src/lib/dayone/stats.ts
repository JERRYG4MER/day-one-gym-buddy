import type { CompletedSession } from "./types";
import { startOfWeek } from "./store";

export function weekSessions(completed: CompletedSession[]) {
  const start = startOfWeek();
  return completed.filter((c) => new Date(c.date) >= start);
}

export function weekMinutes(completed: CompletedSession[]) {
  return weekSessions(completed).reduce((sum, c) => sum + c.minutes, 0);
}

export function streakDays(completed: CompletedSession[]) {
  const days = new Set(completed.map((c) => new Date(c.date).toISOString().slice(0, 10)));
  let streak = 0;
  const cursor = new Date();
  // allow today to be unlogged without breaking the streak
  if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1);
  for (let i = 0; i < 60; i += 1) {
    const key = cursor.toISOString().slice(0, 10);
    if (days.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}

export function activeWeeks(completed: CompletedSession[]) {
  const weeks = new Set(
    completed.map((c) => {
      const d = new Date(c.date);
      const s = startOfWeek(d);
      return s.toISOString().slice(0, 10);
    }),
  );
  return weeks.size;
}

export function last6WeeksTrend(completed: CompletedSession[]) {
  const out: { week: string; minutes: number; sessions: number }[] = [];
  for (let i = 5; i >= 0; i -= 1) {
    const ref = new Date();
    ref.setDate(ref.getDate() - i * 7);
    const s = startOfWeek(ref);
    const e = new Date(s);
    e.setDate(e.getDate() + 7);
    const items = completed.filter((c) => {
      const d = new Date(c.date);
      return d >= s && d < e;
    });
    out.push({
      week: i === 0 ? "This week" : `${s.getDate()}/${s.getMonth() + 1}`,
      minutes: items.reduce((sum, c) => sum + c.minutes, 0),
      sessions: items.length,
    });
  }
  return out;
}

export function loggedDaySet(completed: CompletedSession[]) {
  return new Set(completed.map((c) => new Date(c.date).toISOString().slice(0, 10)));
}
