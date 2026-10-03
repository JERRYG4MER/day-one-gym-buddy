import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { guides, type Guide } from "@/lib/dayone/learn";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Pt = [number, number];
interface Pose {
  h: Pt;
  n: Pt;
  p: Pt;
  k1: Pt;
  f1: Pt;
  k2?: Pt;
  f2?: Pt;
  e: Pt;
  w: Pt;
}
type Seg = [number, number, number, number];
interface Motion {
  a: Pose;
  b: Pose;
  props: { a: Seg; b?: Seg; w?: number }[];
}

const walkA: Pose = {
  h: [100, 30],
  n: [100, 45],
  p: [100, 85],
  k1: [110, 104],
  f1: [116, 125],
  k2: [93, 104],
  f2: [84, 125],
  e: [92, 66],
  w: [98, 82],
};
const walkB: Pose = {
  ...walkA,
  k1: [93, 104],
  f1: [84, 125],
  k2: [110, 104],
  f2: [116, 125],
  e: [106, 66],
  w: [112, 80],
};

const motions: Record<string, Motion> = {
  walk: {
    a: walkA,
    b: walkB,
    props: [
      { a: [55, 128, 150, 128], w: 6 },
      { a: [150, 128, 150, 60] },
      { a: [140, 60, 158, 60], w: 5 },
    ],
  },
  cycle: {
    a: {
      h: [108, 32],
      n: [104, 46],
      p: [92, 80],
      k1: [120, 84],
      f1: [118, 108],
      k2: [106, 96],
      f2: [100, 122],
      e: [122, 56],
      w: [140, 60],
    },
    b: {
      h: [108, 32],
      n: [104, 46],
      p: [92, 80],
      k1: [106, 96],
      f1: [100, 122],
      k2: [120, 84],
      f2: [118, 108],
      e: [122, 56],
      w: [140, 60],
    },
    props: [
      { a: [84, 83, 100, 83], w: 5 },
      { a: [92, 85, 110, 115] },
      { a: [110, 115, 140, 60] },
      { a: [70, 132, 150, 132], w: 5 },
    ],
  },
  legpress: {
    a: {
      h: [55, 70],
      n: [64, 78],
      p: [88, 106],
      k1: [106, 80],
      f1: [126, 98],
      e: [80, 100],
      w: [90, 110],
    },
    b: {
      h: [55, 70],
      n: [64, 78],
      p: [88, 106],
      k1: [120, 92],
      f1: [148, 98],
      e: [80, 100],
      w: [90, 110],
    },
    props: [
      { a: [48, 62, 84, 112], w: 6 },
      { a: [130, 80, 130, 116], b: [152, 80, 152, 116], w: 6 },
      { a: [40, 130, 170, 130], w: 5 },
    ],
  },
  press: {
    a: {
      h: [80, 35],
      n: [80, 50],
      p: [80, 95],
      k1: [110, 95],
      f1: [110, 125],
      e: [70, 70],
      w: [96, 62],
    },
    b: {
      h: [80, 35],
      n: [80, 50],
      p: [80, 95],
      k1: [110, 95],
      f1: [110, 125],
      e: [102, 62],
      w: [128, 62],
    },
    props: [
      { a: [70, 34, 70, 100], w: 6 },
      { a: [70, 100, 110, 100], w: 6 },
      { a: [96, 54, 96, 70], b: [128, 54, 128, 70], w: 5 },
    ],
  },
  overhead: {
    a: {
      h: [90, 35],
      n: [90, 50],
      p: [90, 95],
      k1: [118, 95],
      f1: [118, 125],
      e: [104, 58],
      w: [100, 40],
    },
    b: {
      h: [90, 35],
      n: [90, 50],
      p: [90, 95],
      k1: [118, 95],
      f1: [118, 125],
      e: [100, 32],
      w: [96, 12],
    },
    props: [
      { a: [80, 30, 80, 100], w: 6 },
      { a: [80, 100, 118, 100], w: 6 },
      { a: [92, 40, 108, 40], b: [88, 12, 104, 12], w: 6 },
    ],
  },
  pull: {
    a: {
      h: [100, 50],
      n: [100, 62],
      p: [100, 100],
      k1: [125, 100],
      f1: [125, 130],
      e: [108, 36],
      w: [112, 18],
    },
    b: {
      h: [98, 50],
      n: [100, 62],
      p: [100, 100],
      k1: [125, 100],
      f1: [125, 130],
      e: [116, 82],
      w: [112, 60],
    },
    props: [
      { a: [86, 18, 140, 18], b: [86, 60, 140, 60], w: 5 },
      { a: [113, 18, 113, 4], b: [113, 60, 113, 4] },
      { a: [85, 102, 135, 102], w: 6 },
      { a: [118, 92, 132, 92], w: 5 },
    ],
  },
  row: {
    a: {
      h: [88, 46],
      n: [88, 60],
      p: [85, 105],
      k1: [115, 90],
      f1: [140, 110],
      e: [114, 72],
      w: [136, 74],
    },
    b: {
      h: [84, 46],
      n: [86, 60],
      p: [85, 105],
      k1: [115, 90],
      f1: [140, 110],
      e: [76, 78],
      w: [104, 74],
    },
    props: [
      { a: [136, 74, 170, 74], b: [104, 74, 170, 74] },
      { a: [170, 40, 170, 130], w: 6 },
      { a: [60, 108, 120, 108], w: 6 },
      { a: [145, 100, 145, 122], w: 5 },
    ],
  },
  squat: {
    a: {
      h: [100, 30],
      n: [100, 45],
      p: [100, 85],
      k1: [102, 105],
      f1: [100, 125],
      e: [110, 62],
      w: [106, 52],
    },
    b: {
      h: [110, 55],
      n: [107, 70],
      p: [86, 100],
      k1: [110, 104],
      f1: [100, 125],
      e: [116, 84],
      w: [110, 76],
    },
    props: [
      { a: [55, 128, 150, 128], w: 4 },
      { a: [62, 102, 82, 102], w: 6 },
    ],
  },
  floor: {
    a: {
      h: [50, 117],
      n: [62, 117],
      p: [100, 120],
      k1: [125, 100],
      f1: [135, 124],
      e: [80, 122],
      w: [96, 124],
    },
    b: {
      h: [51, 117],
      n: [64, 114],
      p: [104, 100],
      k1: [130, 94],
      f1: [135, 124],
      e: [80, 122],
      w: [96, 124],
    },
    props: [{ a: [30, 128, 170, 128], w: 4 }],
  },
  carry: {
    a: { ...walkA, e: [102, 66], w: [102, 88] },
    b: { ...walkB, e: [102, 66], w: [102, 88] },
    props: [
      { a: [55, 128, 150, 128], w: 4 },
      { a: [96, 90, 108, 90], w: 7 },
    ],
  },
  balance: {
    a: {
      h: [100, 30],
      n: [100, 45],
      p: [100, 85],
      k1: [100, 105],
      f1: [100, 125],
      k2: [104, 105],
      f2: [106, 125],
      e: [115, 60],
      w: [132, 66],
    },
    b: {
      h: [100, 30],
      n: [100, 45],
      p: [100, 85],
      k1: [100, 105],
      f1: [100, 125],
      k2: [116, 92],
      f2: [110, 110],
      e: [115, 60],
      w: [132, 66],
    },
    props: [
      { a: [55, 128, 150, 128], w: 4 },
      { a: [132, 66, 132, 128], w: 4 },
      { a: [124, 66, 150, 66], w: 4 },
    ],
  },
};

interface ExerciseInfo {
  motion: keyof typeof motions;
  guideId?: string;
  label: string;
}

const exerciseMap: Record<string, ExerciseInfo> = {
  "treadmill-walk": { motion: "walk", guideId: "treadmill", label: "Treadmill" },
  "bike-easy": { motion: "cycle", guideId: "bike", label: "Stationary bike" },
  "leg-press": { motion: "legpress", guideId: "leg-press", label: "Leg press machine" },
  "sit-to-stand": { motion: "squat", label: "Bench" },
  "chest-press": { motion: "press", guideId: "chest-press", label: "Chest press machine" },
  "incline-pushup": { motion: "press", label: "Bench" },
  "lat-pulldown": { motion: "pull", guideId: "lat-pulldown", label: "Lat pulldown machine" },
  "seated-row": { motion: "row", guideId: "cable-machine", label: "Cable row station" },
  "db-goblet": { motion: "squat", guideId: "dumbbells", label: "Dumbbell" },
  "db-press": { motion: "overhead", guideId: "dumbbells", label: "Dumbbells + bench" },
  "glute-bridge": { motion: "floor", label: "Mat" },
  "dead-bug": { motion: "floor", label: "Mat" },
  "farmer-carry": { motion: "carry", guideId: "dumbbells", label: "Dumbbell" },
  "cable-press": { motion: "press", guideId: "cable-machine", label: "Cable machine" },
  "supported-balance": { motion: "balance", label: "Rail or wall" },
  "mobility-flow": { motion: "floor", label: "Mat" },
};

export function getExerciseInfo(id: string): ExerciseInfo & { guide?: Guide } {
  const info = exerciseMap[id] ?? { motion: "squat", label: "Open space" };
  const guide = info.guideId ? guides.find((g) => g.id === info.guideId) : undefined;
  return guide ? { ...info, guide } : info;
}

const bones: [keyof Pose, keyof Pose][] = [
  ["n", "p"],
  ["p", "k1"],
  ["k1", "f1"],
  ["p", "k2"],
  ["k2", "f2"],
  ["n", "e"],
  ["e", "w"],
];

const anim = {
  dur: "2.6s",
  repeatCount: "indefinite",
  calcMode: "spline",
  keyTimes: "0;0.5;1",
  keySplines: "0.45 0 0.55 1;0.45 0 0.55 1",
} as const;

function vals(a: number, b: number) {
  return `${a};${b};${a}`;
}

function AnimLine({
  a,
  b,
  width,
  className,
}: {
  a: Seg;
  b: Seg;
  width: number;
  className?: string;
}) {
  const keys = ["x1", "y1", "x2", "y2"] as const;
  return (
    <line
      x1={a[0]}
      y1={a[1]}
      x2={a[2]}
      y2={a[3]}
      strokeWidth={width}
      strokeLinecap="round"
      className={className}
    >
      {keys.map((k, i) =>
        a[i] !== b[i] ? (
          <animate key={k} attributeName={k} values={vals(a[i]!, b[i]!)} {...anim} />
        ) : null,
      )}
    </line>
  );
}

export function MotionFigure({ motion, className }: { motion: string; className?: string }) {
  const m = motions[motion] ?? motions.squat!;
  const ref = useRef<SVGSVGElement>(null);
  const [playing, setPlaying] = useState(true);
  const get = (pose: Pose, k: keyof Pose): Pt =>
    pose[k] ?? (k === "k2" ? pose.k1 : k === "f2" ? pose.f1 : pose.n);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ref.current?.pauseAnimations();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pauseAnimations();
    else ref.current.unpauseAnimations();
    setPlaying(!playing);
  };

  return (
    <div className={cn("relative rounded-xl bg-secondary/60", className)}>
      <svg
        ref={ref}
        viewBox="20 0 170 140"
        className="h-full w-full"
        role="img"
        aria-label="Animated demonstration"
      >
        <g className="stroke-muted-foreground/60">
          {m.props.map((pr, i) => (
            <AnimLine key={i} a={pr.a} b={pr.b ?? pr.a} width={pr.w ?? 3} />
          ))}
        </g>
        <g className="stroke-primary">
          {bones.map(([s, t]) => {
            const a1 = get(m.a, s),
              a2 = get(m.a, t),
              b1 = get(m.b, s),
              b2 = get(m.b, t);
            return (
              <AnimLine
                key={`${s}${t}`}
                a={[a1[0], a1[1], a2[0], a2[1]]}
                b={[b1[0], b1[1], b2[0], b2[1]]}
                width={5}
              />
            );
          })}
          <circle cx={m.a.h[0]} cy={m.a.h[1]} r={8} className="fill-primary">
            {m.a.h[0] !== m.b.h[0] && (
              <animate attributeName="cx" values={vals(m.a.h[0], m.b.h[0])} {...anim} />
            )}
            {m.a.h[1] !== m.b.h[1] && (
              <animate attributeName="cy" values={vals(m.a.h[1], m.b.h[1])} {...anim} />
            )}
          </circle>
        </g>
      </svg>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        onClick={toggle}
        className="absolute bottom-2 right-2 size-8 rounded-full"
        aria-label={playing ? "Pause animation" : "Play animation"}
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
    </div>
  );
}

export function StepPlayer({ steps }: { steps: string[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || steps.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % steps.length), 4000);
    return () => clearInterval(t);
  }, [auto, steps.length]);
  if (!steps.length) return null;
  return (
    <div className="space-y-2">
      <div className="flex gap-1" aria-hidden>
        {steps.map((_, k) => (
          <span
            key={k}
            className={cn("h-1 flex-1 rounded-full", k <= i ? "bg-primary" : "bg-border")}
          />
        ))}
      </div>
      <p className="min-h-[3rem] text-sm" aria-live="polite">
        <span className="font-semibold">
          Step {i + 1} of {steps.length}:
        </span>{" "}
        {steps[i]}
      </p>
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="size-8"
          aria-label="Previous step"
          onClick={() => {
            setAuto(false);
            setI((x) => (x - 1 + steps.length) % steps.length);
          }}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="size-8"
          aria-label="Next step"
          onClick={() => {
            setAuto(false);
            setI((x) => (x + 1) % steps.length);
          }}
        >
          <ChevronRight className="size-4" />
        </Button>
        <button
          type="button"
          className="ml-1 text-xs text-muted-foreground underline"
          onClick={() => setAuto((a) => !a)}
        >
          {auto ? "Pause steps" : "Auto-play steps"}
        </button>
      </div>
    </div>
  );
}

export function ExerciseDemo({
  id,
  name,
  cue,
  prescription,
}: {
  id: string;
  name: string;
  cue: string;
  prescription: string;
}) {
  const info = getExerciseInfo(id);
  const steps = info.guide
    ? info.guide.firstUse
    : [
        `Find your spot: ${info.label.toLowerCase()}.`,
        `Do ${prescription} at an easy, controlled pace.`,
        cue,
        "Rest, breathe, then repeat for the next set.",
      ];
  return (
    <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
      <MotionFigure motion={info.motion} className="aspect-[17/14] w-full" />
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          How to do it · {name}
        </p>
        <StepPlayer steps={steps} />
      </div>
    </div>
  );
}
