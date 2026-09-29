import type { Plan, Profile } from "./types";
import { guides, primers } from "./learn";

/**
 * Local, rule-based coaching assistant.
 *
 * This module is intentionally the single place where answers are produced, so a
 * hosted model can be swapped in later by replacing `answerQuestion` with an
 * async call and keeping the same `CoachContext` shape.
 */
export interface CoachContext {
  profile: Profile;
  plan: Plan | null;
  sessionsThisWeek: number;
  minutesThisWeek: number;
  nextSessionTitle?: string;
  nextSessionDay?: string;
}

export const suggestedPrompts = [
  "What should I do today?",
  "I feel nervous about the gym floor",
  "How do I use the lat pulldown?",
  "How much weight should I start with?",
  "I'm sore — should I still train?",
  "How do I log a set?",
  "How many days a week is enough?",
  "What if a machine is taken?",
];

const SAFETY =
  "This is general fitness education, not medical advice. Stop if you get sharp pain, dizziness, chest pain or breathlessness beyond normal effort, and speak to a health professional about any health concern.";

function has(text: string, ...words: string[]) {
  return words.some((w) => text.includes(w));
}

function guideAnswer(q: string): string | null {
  const g = guides.find((guide) => q.includes(guide.id.replace("-", " ")) || q.includes(guide.name.toLowerCase()));
  if (!g) return null;
  return [
    `**${g.name}** — ${g.what}`,
    "",
    "**Setting it up**",
    ...g.setup.map((s) => `- ${s}`),
    "",
    "**Your first go**",
    ...g.firstUse.map((s, i) => `${i + 1}. ${s}`),
    "",
    `**Form cue:** ${g.cue}`,
    "",
    `**If you're unsure:** ${g.unsure}`,
  ].join("\n");
}

export function answerQuestion(question: string, ctx: CoachContext): string {
  const q = question.toLowerCase().trim();
  const name = ctx.profile.name ? ctx.profile.name.split(" ")[0] : null;
  const hello = name ? `${name}, ` : "";

  const fromGuide = guideAnswer(q);
  if (fromGuide) return fromGuide;

  if (has(q, "today", "what should i do", "right now")) {
    if (!ctx.nextSessionTitle) {
      return `Today is a recovery day in your plan, so nothing is required. A 10–20 minute walk or some easy stretching is a perfectly good version of "today". If you'd rather train, open **My plan** and pull one of the week's sessions forward.`;
    }
    return `Today's session is **${ctx.nextSessionTitle}**, about ${ctx.profile.minutesPerSession} minutes. Start with the warm-up on the session screen, then work through the exercise list — tick each one off as you go. Keep the weights light enough that the last rep of each set still feels controlled. Tap **Start session** on the Today page when you're ready.`;
  }

  if (has(q, "nervous", "anxious", "scared", "intimidat", "embarrass", "self-conscious", "everyone")) {
    return `That feeling is extremely common on the first few visits, and it fades faster than you'd expect.\n\nA few things that help:\n- Have a plan before you walk in, so you never have to stand around deciding. Yours is in **My plan**.\n- Start in a corner you're comfortable with — the treadmill or bike area is usually easy.\n- Pick two machines for your first visit rather than trying everything.\n- Staff genuinely expect to be asked how equipment works. It's part of the job.\n\nMost people around you are focused entirely on their own set.`;
  }

  if (has(q, "how much weight", "how heavy", "what weight", "starting weight")) {
    return `Start lighter than feels impressive. A good test: pick a weight where you could do about 12 reps, then only do 8–10. The last rep should feel controlled, not shaky.\n\nOn machines that often means the lightest one or two plates. With dumbbells, 2–5 kg is a real starting point.\n\nWhen a session felt smooth all the way through, add one rep or the smallest weight increment next time — not both.`;
  }

  if (has(q, "sore", "ache", "doms", "hurt")) {
    return `Mild soreness a day or two after a session is common when you're new, and usually settles within a couple of days. Gentle movement — a walk, easy cycling, stretching — often helps more than complete rest.\n\nIf it's sharp pain, pain in a joint, or something that doesn't ease, treat that differently: skip the session and speak to a health professional.\n\n${SAFETY}`;
  }

  if (has(q, "log", "record", "track", "write down", "sets and reps")) {
    return `During a session, each exercise has a row for your sets. Enter the reps you did and, if you used weight, the number — you can leave weight blank for bodyweight work. Tick the checkbox when the exercise is done.\n\nAt the end, the finish screen asks for how hard it felt (1–5) and an optional note. That's it. Everything saves on this device and shows up in **Progress**, where you can delete any entry you don't want.`;
  }

  if (has(q, "how many days", "days a week", "frequency", "often")) {
    return `Your plan is set to ${ctx.profile.daysPerWeek} ${ctx.profile.daysPerWeek === 1 ? "day" : "days"} a week at about ${ctx.profile.minutesPerSession} minutes. For someone starting out, two or three sessions a week is plenty to build the habit.\n\nAs general context, WHO guidance for adults is 150–300 minutes of moderate activity across a week plus strengthening on two or more days — that's a direction, not a target for week one. Some activity is better than none, and building gradually is the point.`;
  }

  if (has(q, "machine is taken", "busy", "someone is using", "occupied", "crowded")) {
    return `Two easy options. You can ask "how many sets have you got left?" — that's completely normal and people usually offer to share. Or use the substitution listed on the exercise card; every exercise in your plan has one, so the session still works.\n\nIf the gym is busy in general, the order of exercises doesn't matter much. Do what's free and come back to the rest.`;
  }

  if (has(q, "plan", "why this", "program", "routine")) {
    if (!ctx.plan) return "Once you've answered a few questions in your profile, I can walk you through your plan here.";
    return `Your week is built around ${ctx.profile.daysPerWeek} ${ctx.profile.daysPerWeek === 1 ? "session" : "sessions"} of roughly ${ctx.profile.minutesPerSession} minutes, with recovery days in between.\n\n${ctx.plan.rationale.map((r) => `- ${r}`).join("\n")}\n\nYou can change the days, time per visit or anything in your profile from **Settings**, and regenerate the plan in one tap.`;
  }

  if (has(q, "warm", "warm-up", "warm up")) {
    return `Five to eight easy minutes is enough: a walk on the treadmill or an easy spin on the bike, then some shoulder rolls and a few slow bodyweight sit-to-stands. You're raising your temperature and rehearsing the movements, not stretching hard. Your session screen lists the warm-up at the top.`;
  }

  if (has(q, "rest", "between sets", "how long")) {
    return `Sixty to ninety seconds between sets is a good default when you're starting. If you're still breathing hard, wait a bit longer — there's no prize for rushing. Recovery days between training days matter for the same reason.`;
  }

  if (has(q, "breath", "dizzy", "chest pain", "faint")) {
    return `Stop the exercise, sit down somewhere safe and let things settle. Sharp pain, dizziness, chest pain or breathlessness beyond ordinary effort are signs to end the session rather than push through.\n\nIf it happens more than once, or you have any health concern, please speak to a doctor or another health professional before your next visit. Gym staff can also help in the moment — tell someone.`;
  }

  if (has(q, "etiquette", "rules", "what do i do with", "wipe", "put back")) {
    const p = primers.find((x) => x.id === "etiquette")!;
    return `**${p.title}**\n\n${p.points.map((x) => `- ${x}`).join("\n")}`;
  }

  if (has(q, "bring", "wear", "clothes", "shoes", "kit")) {
    const p = primers.find((x) => x.id === "bring")!;
    return `**${p.title}**\n\n${p.points.map((x) => `- ${x}`).join("\n")}`;
  }

  if (has(q, "progress", "improving", "results", "how am i doing")) {
    return `So far this week you've logged ${ctx.sessionsThisWeek} ${ctx.sessionsThisWeek === 1 ? "session" : "sessions"} and about ${ctx.minutesThisWeek} active minutes. Early progress mostly looks like turning up, movements feeling less awkward, and the same weight feeling easier — not numbers on a scale.\n\nThe **Progress** page tracks sessions, minutes, your streak and your own notes. Adding a win after a session is a surprisingly good habit.`;
  }

  if (has(q, "form", "technique", "doing it right")) {
    return `The three things worth caring about early: move slowly enough to control the weight, keep the range of motion to what feels smooth, and breathe out on the effort.\n\nEach exercise in your session has a one-line form cue under it. If something feels wrong rather than just hard, lighten the weight or use the listed substitution — and it's always fine to ask a staff member to watch one set.`;
  }

  if (has(q, "food", "diet", "eat", "supplement", "protein", "lose weight", "fat")) {
    return `I keep to movement and habits here rather than diets or supplements. What I can say generally: regular meals and sleep support your training more than anything you'd buy.\n\nFor personalised nutrition or weight-related questions, a registered dietitian or your doctor is the right person to ask.`;
  }

  if (has(q, "hello", "hi", "hey", "thanks", "thank you")) {
    return `${hello}happy to help. I can talk through today's session, how a specific machine works, what weight to start with, logging, recovery, or what to do if the gym is busy. Pick one of the suggestions below or just type your question.`;
  }

  return `Good question — here's what I can tell you.\n\nRight now your plan has ${ctx.profile.daysPerWeek} ${ctx.profile.daysPerWeek === 1 ? "session" : "sessions"} a week at about ${ctx.profile.minutesPerSession} minutes${ctx.nextSessionTitle ? `, with **${ctx.nextSessionTitle}** next up on ${ctx.nextSessionDay}` : ""}. If your question is about a specific machine, try naming it — treadmill, bike, leg press, chest press, lat pulldown, cable machine or dumbbells — and I'll walk you through setup and a first use.\n\nI can also help with starting weights, rest times, soreness, logging your sets, gym etiquette and what to do when equipment is busy.\n\n${SAFETY}`;
}
