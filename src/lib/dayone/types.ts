export type Goal = "strength" | "fitter" | "routine" | "energy" | "confidence" | "unsure";

export type Experience = "brand-new" | "returning" | "some" | "prefer-not-to-say";

export type Equipment = "full-gym" | "machines-only" | "free-weights" | "home-minimal" | "not-sure";

export type Activity = "machines" | "dumbbells" | "bodyweight" | "walking" | "cycling" | "stretching" | "classes";

export type Consideration = "knees" | "back" | "shoulders" | "wrists" | "balance" | "breathing" | "none" | "prefer-not-to-say";

export interface Profile {
  name: string;
  goals: Goal[];
  daysPerWeek: number;
  minutesPerSession: number;
  experience: Experience;
  equipment: Equipment;
  activities: Activity[];
  considerations: Consideration[];
  completedOnboarding: boolean;
}

export interface ExerciseBlock {
  id: string;
  name: string;
  prescription: string;
  rest: string;
  cue: string;
  substitution: string;
  tags: string[];
}

export interface PlanSession {
  id: string;
  day: string;
  title: string;
  focus: string;
  minutes: number;
  intensity: "easy" | "steady" | "build";
  summary: string;
  warmup: string[];
  blocks: ExerciseBlock[];
  coolDown: string[];
  restDay?: boolean;
}

export interface Plan {
  id: string;
  createdAt: string;
  weekLabel: string;
  rationale: string[];
  sessions: PlanSession[];
}

export interface SetLog {
  id: string;
  reps: string;
  weight: string;
}

export interface ExerciseLog {
  exerciseId: string;
  name: string;
  done: boolean;
  sets: SetLog[];
}

export interface CompletedSession {
  id: string;
  sessionId: string;
  title: string;
  date: string;
  minutes: number;
  effort: number;
  note: string;
  exercises: ExerciseLog[];
  sample?: boolean;
}

export interface CheckIn {
  date: string;
  energy: number;
  mood: string;
}

export interface Win {
  id: string;
  date: string;
  text: string;
  sample?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  at: string;
}

export interface AppState {
  profile: Profile;
  plan: Plan | null;
  checkIns: CheckIn[];
  completed: CompletedSession[];
  wins: Win[];
  messages: ChatMessage[];
}
