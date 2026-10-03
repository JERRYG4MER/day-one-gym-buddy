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
  motion: string;
}

export const guides: Guide[] = [
  {
    id: "treadmill",
    motion: "walk",
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
    unsure:
      "Ask a staff member to show you the Quick Start and stop buttons — it takes ten seconds and they're used to it.",
  },
  {
    id: "bike",
    motion: "cycle",
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
    mistakes: [
      "Seat too low, which crowds the knees.",
      "Gripping the bars hard and hunching.",
      "Jumping straight to high resistance.",
    ],
    unsure:
      "If the seat won't adjust, ask a staff member — the lever placement differs on every model.",
  },
  {
    id: "leg-press",
    motion: "legpress",
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
    mistakes: [
      "Lowering too far too soon.",
      "Lifting your hips off the seat.",
      "Loading too much weight on day one.",
    ],
    unsure:
      "Safety catches vary a lot between machines. Ask a staff member to show you how to lock and unlock this one.",
  },
  {
    id: "chest-press",
    motion: "press",
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
    mistakes: [
      "Seat set too high or low so the press feels awkward.",
      "Locking the elbows hard.",
      "Rushing the return.",
    ],
    unsure:
      "If the seat height feels wrong but you can't tell why, ask a staff member to set it with you once.",
  },
  {
    id: "lat-pulldown",
    motion: "pull",
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
    mistakes: [
      "Pulling the bar behind the neck.",
      "Leaning far back and using momentum.",
      "Letting the weight yank your arms up.",
    ],
    unsure:
      "Ask a staff member which attachment to use — most gyms have several bars on a rack nearby.",
  },
  {
    id: "cable-machine",
    motion: "row",
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
    mistakes: [
      "Letting the stack slam down.",
      "Standing too close so there's no tension.",
      "Using the whole body to swing the handle.",
    ],
    unsure: "Attachments and clips vary. Ask a staff member to show you how to swap one safely.",
  },
  {
    id: "dumbbells",
    motion: "overhead",
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
    mistakes: [
      "Going too heavy on the first session.",
      "Dropping them on the floor.",
      "Leaving them out on the gym floor.",
    ],
    unsure:
      "If a rack looks confusing or the weights are in kilos and pounds mixed, ask a staff member.",
  },
  {
    id: "rower",
    motion: "row",
    name: "Rowing machine",
    category: "Cardio",
    what: "A sliding seat and a handle on a chain. It works legs, back and arms together and is easy on the joints.",
    setup: [
      "Strap your feet in so the strap crosses the widest part of your shoe.",
      "Set the damper (the lever on the fan) to 3–5 — higher isn't better.",
      "Sit tall and hold the handle with relaxed hands.",
    ],
    firstUse: [
      "Push with your legs first.",
      "Then lean back slightly.",
      "Then pull the handle to your lower ribs.",
      "Return in reverse: arms, lean forward, bend knees.",
      "Row easily for 3–5 minutes.",
    ],
    cue: "Legs, body, arms — then arms, body, legs on the way back.",
    mistakes: [
      "Pulling with the arms before the legs push.",
      "Damper set to 10.",
      "Hunching the back.",
    ],
    unsure: "Ask a staff member to watch three strokes — they can spot the order quickly.",
  },
  {
    id: "elliptical",
    motion: "walk",
    name: "Elliptical / cross-trainer",
    category: "Cardio",
    what: "Pedals that move in a smooth oval while handles swing. Feels like walking without impact.",
    setup: [
      "Hold the fixed handles to step on.",
      "Start pedalling to wake the screen.",
      "Choose a low resistance, 2–4.",
    ],
    firstUse: [
      "Pedal slowly forwards holding the fixed handles.",
      "Move your hands to the moving handles when steady.",
      "Keep a pace you could talk at for 5–10 minutes.",
      "Slow down gradually before stepping off.",
    ],
    cue: "Keep your heels down and stand tall.",
    mistakes: [
      "Leaning heavily on the handles.",
      "Going so fast you bounce.",
      "Stepping off before the pedals stop.",
    ],
    unsure: "Every brand's console is different — ask staff where Quick Start is.",
  },
  {
    id: "shoulder-press",
    motion: "overhead",
    name: "Shoulder press machine",
    category: "Machine",
    what: "A seated machine that pushes handles overhead. A guided way to strengthen shoulders and arms.",
    setup: [
      "Set the seat so handles start at about shoulder height.",
      "Back flat on the pad, feet flat on the floor.",
      "Pick the lightest or second-lightest weight.",
    ],
    firstUse: [
      "Grip the handles and press up smoothly.",
      "Stop just before your elbows lock.",
      "Lower slowly back to shoulder height.",
      "Do 8–10 reps, rest a minute, repeat.",
    ],
    cue: "Keep your ribs down and back on the pad — don't arch.",
    mistakes: [
      "Arching the lower back.",
      "Seat too low so the start feels cramped.",
      "Dropping the weight quickly.",
    ],
    unsure: "If it pinches your shoulders, stop and ask staff for an alternative.",
  },
  {
    id: "seated-row",
    motion: "row",
    name: "Seated row machine",
    category: "Machine",
    what: "You sit facing a pad and pull handles towards you. Works the middle of your back and improves posture.",
    setup: [
      "Adjust the chest pad so you can just reach the handles with straight arms.",
      "Sit tall with feet on the foot rests.",
      "Choose a light weight.",
    ],
    firstUse: [
      "Pull the handles back towards your stomach.",
      "Squeeze your shoulder blades together for a second.",
      "Let the arms extend slowly.",
      "Do 10 reps, rest, repeat.",
    ],
    cue: "Think 'elbows back', not 'hands back'.",
    mistakes: [
      "Shrugging shoulders up to the ears.",
      "Leaning back to yank the weight.",
      "Letting the stack crash.",
    ],
    unsure: "Ask staff which handle position suits you — many machines have two.",
  },
  {
    id: "leg-extension",
    motion: "legpress",
    name: "Leg extension / leg curl",
    category: "Machine",
    what: "Seated machines that straighten (extension) or bend (curl) your knee against a padded roller. They isolate the front or back of the thigh.",
    setup: [
      "Line your knee up with the machine's pivot point (often marked with a dot).",
      "Set the roller pad just above your ankles.",
      "Start very light.",
    ],
    firstUse: [
      "Hold the side handles.",
      "Straighten (or bend) your legs smoothly.",
      "Pause briefly, then return slowly.",
      "10–12 reps, rest, repeat.",
    ],
    cue: "Slow and controlled — no kicking.",
    mistakes: [
      "Knee not lined up with the pivot.",
      "Swinging the weight up.",
      "Going heavy on day one.",
    ],
    unsure: "Lining up the pivot is fiddly. Staff can set it for you once and you'll remember.",
  },
  {
    id: "smith-machine",
    motion: "squat",
    name: "Smith machine",
    category: "Machine",
    what: "A barbell fixed on rails that only moves up and down, with safety hooks. A steadier way to try squats.",
    setup: [
      "Set the safety stops just below your lowest squat point.",
      "Bar at upper-chest height to start.",
      "Use the empty bar first — it may already weigh 5–15 kg.",
    ],
    firstUse: [
      "Step under so the bar rests on your upper back, not your neck.",
      "Twist the bar to unhook it.",
      "Squat down to a comfortable depth, then stand.",
      "Twist the bar back onto a hook to finish.",
    ],
    cue: "Push the floor away and keep your chest up.",
    mistakes: [
      "Forgetting to set the safety stops.",
      "Feet directly under the bar so knees crowd forward.",
      "Loading plates before trying the empty bar.",
    ],
    unsure: "Ask a staff member to show you how the hooks lock — it's the key safety step.",
  },
  {
    id: "kettlebell",
    motion: "carry",
    name: "Kettlebells",
    category: "Free weights",
    what: "A ball-shaped weight with a handle. Great for carries and squats once you know the basics.",
    setup: [
      "Start light: 4–8 kg.",
      "Pick it up with a flat back, bending at the hips and knees.",
      "Clear space around you.",
    ],
    firstUse: [
      "Hold one by your side, standing tall.",
      "Walk slowly for 20–30 steps.",
      "Swap hands and walk back.",
      "Set it down gently — don't drop it.",
    ],
    cue: "Stand tall like the weight isn't pulling you sideways.",
    mistakes: [
      "Rounding the back to lift it.",
      "Trying swings before learning the hinge.",
      "Dropping it on the floor.",
    ],
    unsure: "Swings need coaching — ask staff before trying them.",
  },
  {
    id: "mat-area",
    motion: "floor",
    name: "Mat and stretching area",
    category: "Gym life",
    what: "An open space with mats for core work, stretching and floor exercises. Usually the calmest corner of the gym.",
    setup: [
      "Grab a mat from the rack and wipe it.",
      "Find a spot with room to stretch out.",
      "Keep a water bottle nearby.",
    ],
    firstUse: [
      "Lie on your back with knees bent.",
      "Lift your hips gently into a glute bridge, 10 times.",
      "Rest, then try a few slow stretches.",
      "Wipe and roll up the mat when finished.",
    ],
    cue: "Breathe out on the effort, slowly.",
    mistakes: ["Holding your breath.", "Bouncing in stretches.", "Leaving the mat on the floor."],
    unsure: "If the area's busy, it's fine to ask someone to shift over a little.",
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
