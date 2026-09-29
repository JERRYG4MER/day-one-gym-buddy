import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AppState, CheckIn, ChatMessage, CompletedSession, Plan, Profile, Win } from "./types";
import { defaultProfile, generatePlan } from "./plan";

const KEY = "dayone.state.v1";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(18, 30, 0, 0);
  return d.toISOString();
}

function seedState(): AppState {
  const profile = { ...defaultProfile };
  return {
    profile,
    plan: generatePlan(profile),
    checkIns: [],
    completed: [
      {
        id: "sample-1",
        sessionId: "sample",
        title: "Full body foundations",
        date: daysAgo(9),
        minutes: 35,
        effort: 3,
        note: "First time using the leg press. Asked a staff member to check the seat — much easier after that.",
        exercises: [],
        sample: true,
      },
      {
        id: "sample-2",
        sessionId: "sample",
        title: "Move and breathe",
        date: daysAgo(6),
        minutes: 28,
        effort: 2,
        note: "Walk and mobility only. Felt good to just show up.",
        exercises: [],
        sample: true,
      },
      {
        id: "sample-3",
        sessionId: "sample",
        title: "Steady strength",
        date: daysAgo(4),
        minutes: 40,
        effort: 3,
        note: "Same weights as last time and it felt smoother.",
        exercises: [],
        sample: true,
      },
      {
        id: "sample-4",
        sessionId: "sample",
        title: "Full body foundations",
        date: daysAgo(2),
        minutes: 42,
        effort: 4,
        note: "Added one rep to the lat pulldown.",
        exercises: [],
        sample: true,
      },
    ],
    wins: [
      { id: "w1", date: daysAgo(6), text: "Walked into the free weights area for the first time.", sample: true },
      { id: "w2", date: daysAgo(2), text: "Three sessions in one week — a first for me.", sample: true },
    ],
    messages: [],
  };
}

interface StoreValue extends AppState {
  ready: boolean;
  saveProfile: (p: Partial<Profile>) => void;
  regeneratePlan: (p?: Profile) => void;
  setPlan: (plan: Plan) => void;
  addCheckIn: (c: CheckIn) => void;
  addCompleted: (c: CompletedSession) => void;
  removeCompleted: (id: string) => void;
  addWin: (text: string) => void;
  removeWin: (id: string) => void;
  addMessage: (m: ChatMessage) => void;
  clearMessages: () => void;
  resetAll: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function DayOneProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => seedState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...seedState(), ...(JSON.parse(raw) as AppState) });
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, ready]);

  const saveProfile = useCallback((p: Partial<Profile>) => {
    setState((s) => {
      const profile = { ...s.profile, ...p };
      return { ...s, profile, plan: generatePlan(profile) };
    });
  }, []);

  const regeneratePlan = useCallback((p?: Profile) => {
    setState((s) => ({ ...s, plan: generatePlan(p ?? s.profile) }));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      ready,
      saveProfile,
      regeneratePlan,
      setPlan: (plan) => setState((s) => ({ ...s, plan })),
      addCheckIn: (c) => setState((s) => ({ ...s, checkIns: [c, ...s.checkIns.filter((x) => x.date !== c.date)] })),
      addCompleted: (c) => setState((s) => ({ ...s, completed: [c, ...s.completed] })),
      removeCompleted: (id) => setState((s) => ({ ...s, completed: s.completed.filter((c) => c.id !== id) })),
      addWin: (text) =>
        setState((s) => ({ ...s, wins: [{ id: `w-${Date.now()}`, date: new Date().toISOString(), text }, ...s.wins] })),
      removeWin: (id) => setState((s) => ({ ...s, wins: s.wins.filter((w) => w.id !== id) })),
      addMessage: (m) => setState((s) => ({ ...s, messages: [...s.messages, m] })),
      clearMessages: () => setState((s) => ({ ...s, messages: [] })),
      resetAll: () => setState(seedState()),
    }),
    [state, ready, saveProfile, regeneratePlan],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useDayOne() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useDayOne must be used inside DayOneProvider");
  return ctx;
}

export function startOfWeek(d = new Date()) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function todayKey(d = new Date()) {
  return new Date(d).toISOString().slice(0, 10);
}
