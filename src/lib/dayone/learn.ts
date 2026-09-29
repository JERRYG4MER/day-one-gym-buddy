export interface Guide {
  id: string;
  name: string;
  category: "Machine" | "Cardio" | "Free weights" | "Gym life";
  what: string;
  setup: string[];
  firstUse: string[];
  cue: string;
  mistakes: string[];
  unsure: string;
}

export const guides: Guide[] = [
  {
    id: "treadmill",
    name: "Treadmill",
    category: "Cardio",
    what: "A moving belt you walk or run on. It's the friendliest place to start a session and a good way to warm up.",
    setup: [
      "Step onto the side rails, not the belt, before you start it.",
      "Clip the safety key to your clothing if the machine has one.",
      "Start at a slow walking speed — around 4–5 km/h is plenty.",
      "Use incline instead of speed if you want it to feel harder.",
    ],
    firstUse: [
      "Stand on the rails and press Quick Start.",
      "Let the belt reach a slow speed, then step on carefully.",
      "Walk for 5 minutes at a pace where you could still hold a conversation.",
      "Slow the belt down before stepping off — don't jump off while it's moving.",
    ],
    cue: "Look ahead rather than down at your feet, and let your arms swing naturally.",
    mistakes: [
      "Holding the handrails tightly the whole time (a light touch is fine for balance).",
      "Starting at a speed that feels like a test rather than a warm-up.",
      "Stepping off while the belt is still moving.",
    ],
    unsure: "Ask a staff member to show you the Quick Start and stop buttons — it takes ten seconds and they're used to it.",
  },
  {
    id: "bike",
    name: "Stationary bike",
    category: "Cardio",
    what: "A seated cycling machine. Gentle on the knees and easy to control, which makes it a great beginner option.",
    setup: [
      "Set the seat so that with your foot at the bottom, your knee stays slightly bent.",
      "Adjust the handlebars so you're not stretching forwards.",
      "Start resistance at level 1–3.",
    ],
    firstUse: [
      "Sit down and check the seat height before pedalling.",
      "Pedal easily for 2 minutes to see how it feels.",
      "Add one resistance level if it feels too easy.",
      "Finish with 2 easy minutes to cool down.",
    ],
    cue: "Keep your pedalling smooth and round rather than stamping down.",
    mistakes: ["Seat too low, which crowds the knees.", "Gripping the bars hard and hunching.", "Jumping straight to high resistance."],
    unsure: "If the seat won't adjust, ask a staff member — the lever placement differs on every model.",
  },
  {
    id: "leg-press",
    name: "Leg press",
    category: "Machine",
    what: "A seated machine that lets you push a weighted platform away with your legs. It supports your back, so it's a common first leg exercise.",
    setup: [
      "Sit with your whole back against the pad.",
      "Place feet about hip-width apart, flat in the middle of the platform.",
      "Start with the lowest weight on the stack or a single plate.",
      "Find and unlock the safety handles before your first rep.",
    ],
    firstUse: [
      "Press the platform gently to take the weight.",
      "Release the safety catch.",
      "Lower slowly until your knees reach a comfortable bend — you don't need to go deep.",
      "Press back up without snapping your knees straight.",
      "Re-lock the safety catch before getting out.",
    ],
    cue: "Push through your whole foot, and keep your knees tracking in line with your toes.",
    mistakes: ["Lowering too far too soon.", "Lifting your hips off the seat.", "Loading too much weight on day one."],
    unsure: "Safety catches vary a lot between machines. Ask a staff member to show you how to lock and unlock this one.",
  },
  {
    id: "chest-press",
    name: "Chest press machine",
    category: "Machine",
    what: "A seated machine that pushes handles away from your chest. It's the machine version of a press-up or bench press.",
    setup: [
      "Adjust the seat so the handles sit roughly at mid-chest height.",
      "Sit with your back and shoulders resting on the pad.",
      "Select a light weight — you should be able to do 10 reps comfortably.",
    ],
    firstUse: [
      "Hold the handles and press forwards smoothly.",
      "Bring them back until you feel a light stretch, no further.",
      "Do 8–10 reps, then rest for a minute.",
      "Do one more set if it still feels good.",
    ],
    cue: "Keep your shoulders back against the pad as you press.",
    mistakes: ["Seat set too high or low so the press feels awkward.", "Locking the elbows hard.", "Rushing the return."],
    unsure: "If the seat height feels wrong but you can't tell why, ask a staff member to set it with you once.",
  },
  {
    id: "lat-pulldown",
    name: "Lat pulldown",
    category: "Machine",
    what: "A seated machine where you pull a bar down from above. It works the muscles across your back.",
    setup: [
      "Adjust the thigh pad so your legs are held snugly.",
      "Stand up to grab the bar, then sit down with it.",
      "Hands a little wider than your shoulders.",
    ],
    firstUse: [
      "Sit tall with a very slight lean back.",
      "Pull the bar down towards your collarbone.",
      "Let it rise back up slowly and under control.",
      "Do 8–10 reps, rest, repeat.",
    ],
    cue: "Lead with your elbows going down towards your ribs, not with your hands.",
    mistakes: ["Pulling the bar behind the neck.", "Leaning far back and using momentum.", "Letting the weight yank your arms up."],
    unsure: "Ask a staff member which attachment to use — most gyms have several bars on a rack nearby.",
  },
  {
    id: "cable-machine",
    name: "Cable machine",
    category: "Machine",
    what: "An adjustable pulley with a weight stack. One frame can do dozens of exercises by changing the handle and the pulley height.",
    setup: [
      "Set the pulley height for the exercise — chest height for rows and presses.",
      "Clip on the handle you need.",
      "Pick a light weight; cables feel different from machines.",
      "Stand far enough away that there's tension before you start.",
    ],
    firstUse: [
      "Take a small step back so the weight lifts slightly off the stack.",
      "Move smoothly through the exercise for 8–10 reps.",
      "Step in carefully to set the weight down — don't let it crash.",
    ],
    cue: "Control the return; that's where most of the benefit is.",
    mistakes: ["Letting the stack slam down.", "Standing too close so there's no tension.", "Using the whole body to swing the handle."],
    unsure: "Attachments and clips vary. Ask a staff member to show you how to swap one safely.",
  },
  {
    id: "dumbbells",
    name: "Dumbbells",
    category: "Free weights",
    what: "Hand-held weights on a rack, usually arranged lightest to heaviest. Flexible and simple once you know the etiquette.",
    setup: [
      "Start lighter than you think — 2–5 kg is a genuine starting point.",
      "Check the number on the end of the dumbbell before lifting.",
      "Lift them off the rack with your knees bent, not your back rounded.",
    ],
    firstUse: [
      "Pick a light pair and find a clear space or a bench.",
      "Do 8 slow reps of your exercise.",
      "Rest a minute, then do one more set.",
      "Put them back in the right slot on the rack.",
    ],
    cue: "Slow down the lowering phase — two seconds down is a good rhythm.",
    mistakes: ["Going too heavy on the first session.", "Dropping them on the floor.", "Leaving them out on the gym floor."],
    unsure: "If a rack looks confusing or the weights are in kilos and pounds mixed, ask a staff member.",
  },
];

export interface Primer {
  id: string;
  title: string;
  points: string[];
}

export const primers: Primer[] = [
  {
    id: "etiquette",
    title: "Gym etiquette, simply put",
    points: [
      "Wipe equipment down after you use it — most gyms have spray and paper towels on the wall.",
      "Put weights back where you found them.",
      "It's fine to ask 'are you using this?' — and fine to say 'two more sets' if someone asks you.",
      "You can share a machine between sets. It's normal and nobody minds.",
      "Nobody is watching you as closely as you think. Everyone is focused on their own set.",
    ],
  },
  {
    id: "bring",
    title: "What to bring",
    points: [
      "A water bottle and a small towel.",
      "Trainers with a flat, stable sole.",
      "Comfortable clothes you can move in — nothing special required.",
      "Your phone if you use it to track sessions, or just this app.",
      "Headphones if they help you feel at ease.",
    ],
  },
  {
    id: "recovery",
    title: "Rest and recovery",
    points: [
      "Rest days are part of the plan, not a gap in it.",
      "Some muscle soreness a day or two after is common when you're new and usually settles.",
      "Sleep and regular meals do more for progress than any extra session.",
      "Gentle walking on rest days often helps you feel better, not worse.",
      "Sharp pain is different from ordinary soreness — see the safety note and check with a professional.",
    ],
  },
  {
    id: "terms",
    title: "Gym words, translated",
    points: [
      "Rep — one repetition of an exercise.",
      "Set — a group of reps done together, e.g. 2 sets of 10.",
      "Rest — the pause between sets, usually 60–90 seconds when you're starting.",
      "Form — how you perform the movement.",
      "Warm-up — a few easy minutes to get moving before the main work.",
      "RPE / perceived effort — how hard it felt, on a simple 1–5 scale.",
    ],
  },
];
