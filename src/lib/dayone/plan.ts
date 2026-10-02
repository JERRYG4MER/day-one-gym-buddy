import type { ExerciseBlock, Plan, PlanSession, Profile } from "./types";

export const defaultProfile: Profile = {
  name: "",
  goals: ["routine"],
  daysPerWeek: 3,
  minutesPerSession: 40,
  experience: "brand-new",
  equipment: "full-gym",
  activities: ["machines", "walking"],
  considerations: [],
  completedOnboarding: false,
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Pool = ExerciseBlock & { avoid?: string[]; needs?: string[] };

const POOL: Pool[] = [
  {
    id: "treadmill-walk",
    name: "Treadmill incline walk",
    prescription: "8 min at a pace where you can still talk",
    rest: "Move straight on when you feel ready",
    cue: "Stand tall, let your arms swing, look ahead rather than down.",
    substitution: "Walk outdoors, or use the stationary bike at an easy resistance.",
    tags: ["cardio", "warm-up friendly"],
  },
  {
    id: "bike-easy",
    name: "Stationary bike, easy spin",
    prescription: "10 min at a comfortable, chatty effort",
    rest: "Sip water whenever you need it",
    cue: "Set the seat so your knee stays slightly bent at the bottom.",
    substitution: "Treadmill walk or a cross-trainer at low resistance.",
    tags: ["cardio", "joint friendly"],
    needs: ["cycling"],
  },
  {
    id: "leg-press",
    name: "Leg press",
    prescription: "2 sets of 10 reps, light weight",
    rest: "60–90 sec between sets",
    cue: "Lower only as far as feels smooth and keep your back on the pad.",
    substitution: "Supported sit-to-stand from a bench.",
    tags: ["legs", "machine"],
    avoid: ["knees"],
  },
  {
    id: "sit-to-stand",
    name: "Sit-to-stand from a bench",
    prescription: "2 sets of 8 slow reps",
    rest: "60 sec between sets",
    cue: "Push through your whole foot and stand tall without rushing.",
    substitution: "Leg press on a light setting if the bench feels low.",
    tags: ["legs", "bodyweight", "gentle"],
  },
  {
    id: "chest-press",
    name: "Chest press machine",
    prescription: "2 sets of 10 reps, light weight",
    rest: "60–90 sec between sets",
    cue: "Keep your shoulders resting back against the pad as you press.",
    substitution: "Incline press-up with hands on a bench.",
    tags: ["push", "machine"],
    avoid: ["shoulders"],
  },
  {
    id: "incline-pushup",
    name: "Incline press-up (hands on bench)",
    prescription: "2 sets of 6–8 reps",
    rest: "60 sec between sets",
    cue: "The higher the bench, the easier it is — start high.",
    substitution: "Chest press machine on the lightest plate.",
    tags: ["push", "bodyweight", "gentle"],
    avoid: ["wrists"],
  },
  {
    id: "lat-pulldown",
    name: "Lat pulldown",
    prescription: "2 sets of 10 reps, light weight",
    rest: "60–90 sec between sets",
    cue: "Lead with your elbows down towards your ribs, not your hands.",
    substitution: "Seated row machine at a light setting.",
    tags: ["pull", "machine"],
  },
  {
    id: "seated-row",
    name: "Seated cable row",
    prescription: "2 sets of 10 reps, light weight",
    rest: "60–90 sec between sets",
    cue: "Sit tall and squeeze your shoulder blades gently together.",
    substitution: "Lat pulldown, or a resistance band row.",
    tags: ["pull", "machine"],
  },
  {
    id: "db-goblet",
    name: "Goblet squat (light dumbbell)",
    prescription: "2 sets of 8 reps",
    rest: "60–90 sec between sets",
    cue: "Hold the dumbbell close to your chest and sit down between your hips.",
    substitution: "Bodyweight sit-to-stand if the weight feels awkward.",
    tags: ["legs", "dumbbells"],
    needs: ["dumbbells"],
    avoid: ["knees", "back"],
  },
  {
    id: "db-press",
    name: "Dumbbell shoulder press, seated",
    prescription: "2 sets of 8 reps, light dumbbells",
    rest: "60–90 sec between sets",
    cue: "Press just to where your arms feel comfortable, no need to lock out hard.",
    substitution: "Chest press machine.",
    tags: ["push", "dumbbells"],
    needs: ["dumbbells"],
    avoid: ["shoulders"],
  },
  {
    id: "glute-bridge",
    name: "Glute bridge",
    prescription: "2 sets of 10 reps",
    rest: "45–60 sec between sets",
    cue: "Lift until your hips are level with your ribs, then lower slowly.",
    substitution: "Standing hip hinge with hands on hips.",
    tags: ["hips", "bodyweight", "gentle"],
  },
  {
    id: "dead-bug",
    name: "Dead bug (core)",
    prescription: "2 sets of 6 per side, slow",
    rest: "45 sec between sets",
    cue: "Breathe out as you reach; keep your lower back gently in contact with the mat.",
    substitution: "Seated march on a bench.",
    tags: ["core", "bodyweight", "gentle"],
  },
  {
    id: "farmer-carry",
    name: "Suitcase carry",
    prescription: "2 walks of 20 steps per side, light weight",
    rest: "60 sec between walks",
    cue: "Stand tall and try not to lean — think 'carrying shopping well'.",
    substitution: "Two lighter dumbbells, one in each hand.",
    tags: ["core", "dumbbells"],
    needs: ["dumbbells"],
  },
  {
    id: "cable-press",
    name: "Cable chest press",
    prescription: "2 sets of 10 reps, light weight",
    rest: "60–90 sec between sets",
    cue: "Move smoothly out and back — no need to fling the handles.",
    substitution: "Chest press machine.",
    tags: ["push", "cable"],
    avoid: ["shoulders"],
  },
  {
    id: "supported-balance",
    name: "Supported single-leg stand",
    prescription: "3 x 20 sec per side, holding a rail",
    rest: "Rest as needed",
    cue: "Keep a hand on the rail the whole time — that's the point, not a fail.",
    substitution: "Heel-to-toe stand holding a rail.",
    tags: ["balance", "gentle"],
  },
  {
    id: "mobility-flow",
    name: "Easy mobility flow",
    prescription: "6 min of gentle shoulder rolls, hip circles and calf raises",
    rest: "Move continuously and easily",
    cue: "Small, smooth ranges — you're waking things up, not stretching hard.",
    substitution: "A relaxed walk around the gym floor.",
    tags: ["mobility", "gentle"],
  },
];

const WARMUPS = [
  "5 min easy walk on the treadmill or bike",
  "10 shoulder rolls each direction",
  "10 slow bodyweight sit-to-stands",
];

const COOLDOWN = [
  "3 min easy walk to let your breathing settle",
  "Gentle calf and chest stretch, 20 sec each",
  "Note one thing that felt good today",
];

const GOAL_LABEL: Record<string, string> = {
  strength: "build strength",
  fitter: "feel fitter",
  routine: "create a routine",
  energy: "improve energy",
  confidence: "feel confident in the gym",
  unsure: "explore what you enjoy",
};

function pick(profile: Profile, tag: string, used: Set<string>): Pool | undefined {
  const avoidSet = new Set(profile.considerations);
  const gentleFirst = profile.experience === "brand-new" || profile.considerations.length > 0;
  const candidates = POOL.filter((e) => {
    if (used.has(e.id) || !e.tags.includes(tag)) return false;
    if (e.avoid?.some((a) => avoidSet.has(a as never))) return false;
    if (e.needs?.some((n) => !profile.activities.includes(n as never))) return false;
    if (profile.equipment === "machines-only" && e.tags.includes("dumbbells")) return false;
    if (
      profile.equipment === "home-minimal" &&
      (e.tags.includes("machine") || e.tags.includes("cable"))
    )
      return false;
    return true;
  });
  candidates.sort((a, b) => {
    const score = (x: Pool) => (x.tags.includes("gentle") ? (gentleFirst ? -1 : 1) : 0);
    return score(a) - score(b);
  });
  return candidates[0];
}

function buildSession(
  profile: Profile,
  day: string,
  index: number,
  totalDays: number,
): PlanSession {
  const used = new Set<string>();
  const blocks: ExerciseBlock[] = [];
  const minutes = profile.minutesPerSession;
  const slots =
    minutes <= 20
      ? ["cardio", "legs", "pull"]
      : minutes <= 35
        ? ["cardio", "legs", "push", "pull"]
        : ["cardio", "legs", "push", "pull", "core"];

  const patterns: string[][] = [
    slots,
    minutes <= 20 ? ["cardio", "push", "core"] : ["cardio", "pull", "legs", "core", "hips"],
    minutes <= 20 ? ["cardio", "hips", "mobility"] : ["cardio", "legs", "push", "hips", "balance"],
    ["cardio", "mobility", "core", "hips"],
  ];
  const wanted = patterns[index % patterns.length] ?? slots;

  for (const tag of wanted) {
    const found = pick(profile, tag, used);
    if (found) {
      used.add(found.id);
      const { avoid: _a, needs: _n, ...block } = found;
      blocks.push(block);
    }
  }
  if (blocks.length < 3) {
    for (const extra of POOL) {
      if (blocks.length >= 3) break;
      if (!used.has(extra.id) && extra.tags.includes("gentle")) {
        used.add(extra.id);
        const { avoid: _a, needs: _n, ...block } = extra;
        blocks.push(block);
      }
    }
  }

  const focusNames = [
    "Full body foundations",
    "Steady strength",
    "Move and breathe",
    "Gentle reset",
  ];
  const intensity: PlanSession["intensity"] =
    index === 0
      ? "easy"
      : index % 3 === 2
        ? "easy"
        : totalDays > 3 && index === 1
          ? "build"
          : "steady";

  return {
    id: `s-${index}-${day.toLowerCase()}`,
    day,
    title: focusNames[index % focusNames.length] ?? "Full body foundations",
    focus: blocks
      .map((b) => b.tags[0])
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .slice(0, 3)
      .join(" · "),
    minutes,
    intensity,
    summary:
      intensity === "easy"
        ? "A comfortable session. If you finish feeling like you could do more, that's exactly right for week one."
        : intensity === "build"
          ? "Slightly more work than your easy day. Add a rep or a small amount of weight only if last week felt smooth."
          : "Your steady session — familiar movements, repeated well.",
    warmup: WARMUPS,
    blocks,
    coolDown: COOLDOWN,
  };
}

export function generatePlan(profile: Profile): Plan {
  const days = Math.min(Math.max(profile.daysPerWeek, 1), 5);
  const spread: Record<number, string[]> = {
    1: ["Wednesday"],
    2: ["Tuesday", "Friday"],
    3: ["Monday", "Wednesday", "Friday"],
    4: ["Monday", "Tuesday", "Thursday", "Saturday"],
    5: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
  };
  const trainingDays = spread[days] ?? [];
  const sessions: PlanSession[] = [];
  let index = 0;
  for (const day of DAYS) {
    if (trainingDays.includes(day)) {
      sessions.push(buildSession(profile, day, index, days));
      index += 1;
    } else {
      sessions.push({
        id: `rest-${day.toLowerCase()}`,
        day,
        title: "Recovery day",
        focus: "rest · light movement",
        minutes: 0,
        intensity: "easy",
        summary:
          "Rest is part of the plan. A short walk or some stretching counts if you feel like moving.",
        warmup: [],
        blocks: [],
        coolDown: [],
        restDay: true,
      });
    }
  }

  const goalText = profile.goals.map((g) => GOAL_LABEL[g] ?? g).join(" and ");
  const rationale = [
    `You told us you want to ${goalText || "build a routine"}, so every session repeats a small set of movements you can get comfortable with.`,
    `${days} ${days === 1 ? "day" : "days"} a week at about ${profile.minutesPerSession} minutes fits the schedule you chose, with recovery days built in between.`,
    profile.equipment === "machines-only"
      ? "We've stayed on machines, which are the easiest way to learn a movement path safely."
      : profile.equipment === "home-minimal"
        ? "We've kept things bodyweight-first so the plan works with minimal equipment."
        : "There's a mix of machines and simple free-weight work, with machine substitutions listed for everything.",
    profile.considerations.length &&
    !profile.considerations.includes("prefer-not-to-say") &&
    !profile.considerations.includes("none")
      ? "You mentioned some movement considerations, so we've swapped in gentler options and every exercise has an alternative."
      : "Every exercise has a listed alternative, so you can swap anything that doesn't feel right on the day.",
    "Loads and reps start deliberately light. Add a little only when a session felt smooth and repeatable.",
  ];

  return {
    id: `plan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    weekLabel: "Week 1 · Getting comfortable",
    rationale,
    sessions,
  };
}

export const goalOptions: { value: string; label: string }[] = [
  { value: "strength", label: "Build strength" },
  { value: "fitter", label: "Feel fitter" },
  { value: "routine", label: "Create a routine" },
  { value: "energy", label: "Improve energy" },
  { value: "confidence", label: "Feel confident in the gym" },
  { value: "unsure", label: "Not sure yet" },
];

export const activityOptions = [
  { value: "machines", label: "Machines" },
  { value: "dumbbells", label: "Dumbbells" },
  { value: "bodyweight", label: "Bodyweight" },
  { value: "walking", label: "Walking / treadmill" },
  { value: "cycling", label: "Cycling" },
  { value: "stretching", label: "Stretching & mobility" },
  { value: "classes", label: "Classes" },
];

export const considerationOptions = [
  { value: "knees", label: "Knees" },
  { value: "back", label: "Lower back" },
  { value: "shoulders", label: "Shoulders" },
  { value: "wrists", label: "Wrists" },
  { value: "balance", label: "Balance" },
  { value: "breathing", label: "Breathing / stamina" },
  { value: "none", label: "None" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const equipmentOptions = [
  { value: "full-gym", label: "Full gym" },
  { value: "machines-only", label: "Mostly machines" },
  { value: "free-weights", label: "Free weights area" },
  { value: "home-minimal", label: "Home, minimal kit" },
  { value: "not-sure", label: "Not sure yet" },
];

export const experienceOptions = [
  { value: "brand-new", label: "Brand new to this" },
  { value: "returning", label: "Coming back after a break" },
  { value: "some", label: "Some experience" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];
