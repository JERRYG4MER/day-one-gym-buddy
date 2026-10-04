# Day One Gym

Build a polished, responsive beginner gym companion called **Day One**. It should feel like a welcoming, human customer-support and coaching app for someone walking into a gym for the first time. The core promise: help me know what to do today, understand the gym, and notice my progress without pressure.

PRODUCT EXPERIENCE
- Create a complete app experience, not a marketing landing page. Start with a welcoming dashboard and let the user explore the main areas right away.
- Use a calm, premium, editorial wellness aesthetic: warm ivory backgrounds, deep evergreen text, soft sage panels, a small coral/clay accent, generous whitespace, rounded cards, clear typography, and subtle motion. Make it friendly and motivating rather than macho or clinical. Avoid body transformation stock imagery, extreme fitness visuals, and shame-based copy. Use tasteful abstract movement illustrations or simple line icons.
- Responsive desktop sidebar and mobile bottom navigation: Today, My plan, Progress, Learn, Coach.
- The dashboard should show a warm greeting, a small daily check-in (energy/mood), today's suggested beginner workout with duration and clear “Start session” action, the next planned session, weekly activity progress, a small habit/streak encouragement, and a prominent “Ask Coach” entry point. Make it instantly scannable, inviting, and easy to use every day.

FUNCTIONS
- Build an onboarding/profile flow that can be revisited in settings. Ask only useful optional questions: what the person wants to work toward (e.g. build strength, feel fitter, create a routine, improve energy), days per week, time per visit, experience, equipment/gym access, preferred activities, and any movement considerations they choose to share. Include “skip” and “prefer not to say” choices. Do not infer fitness needs from appearance or weight.
- Generate a simple adaptable beginner plan from those choices. Show a weekly calendar and session cards, workout alternatives, and a “why this fits you” explanation. Recommendations should reflect stated goals, schedule, preferences, equipment, and movement considerations. Include editable days/time and an easy regenerate action.
- Make workout sessions genuinely usable: warm-up, exercise list, sets/reps or duration, rest guidance, simple form cues, substitutions, completion checkboxes, and a finish screen. Allow users to log sets, reps, optional weight, perceived effort, and a note. Include safe beginner-friendly sample plans with gradual progression and recovery days.
- Progress page: log history, sessions completed this week, activity minutes, habit calendar/streak, simple progress trend chart, and personal wins/notes. Favor consistency and functional milestones over weight loss or body measurements. Seed an appealing but clearly editable sample history; preserve the user’s edits and logs in local storage so the demo works without configuring credentials or a backend.
- Learn section: approachable equipment and gym-navigation guides for common items (treadmill, stationary bike, leg press, chest press, lat pulldown, cable machine, dumbbells). Each guide should explain what it is, how to adjust/setup it, a safe first-use walkthrough, a simple form cue, common beginner mistakes, and what to do if unsure. Add gym etiquette, what to bring, rest/recovery, and basic exercise terms. Use “ask a staff member to show you” when setup is uncertain.
- Coach section: build an interactive AI-style customer-support chat with suggested questions and useful contextual replies about the user's plan, exercise form cues, gym navigation, logging, recovery, and beginner FAQs. Use Lovable's available AI capability if it is available without asking for user credentials or exposing a secret; otherwise provide a useful clearly demo-ready contextual assistant and keep the assistant logic modular so a real model can be connected later. The app must work without API keys, with a polished empty state, suggested prompts, chat history, typing state, and clear helpful answers (not just canned “I can help” messages). Assistant should use profile/plan context where possible.
- Add small support affordances throughout: beginner-friendly tooltips, clear empty states, undo/edit where reasonable, and a persistent help link.

SAFETY AND CONTENT
- This is general fitness education and habit support, not medical care or injury diagnosis. Include an unobtrusive but visible safety note in the app: start at a comfortable level, stop for sharp pain/dizziness/chest pain/shortness of breath beyond normal exertion, and seek professional advice for health concerns or significant movement limitations.
- Keep workout suggestions conservative and progressive. Do not recommend pushing through pain, extreme diets, supplements, spot reduction, or body-shape judgments. Let users skip movement considerations; never make medical claims.
- Treat weekly activity benchmarks as optional general context: WHO guidance for adults is 150–300 minutes of moderate activity across a week and strengthening on 2 or more days, while making clear that some activity is better than none and a beginner can build gradually. Do not present this as an individual prescription.

IMPLEMENTATION
- Use the default Lovable stack and polished accessible components. Make navigation, onboarding, workout logging, completion, assistant prompts, and progress interactions work. Include realistic demo content so the first screen feels finished.
- Persist profile choices, check-ins, completed sessions, logs, and assistant conversation locally. Use sensible responsive layouts, accessible contrast, keyboard-friendly controls, and loading/empty states. Do not add payment, deployment, or external service requirements.
- Make the project titled **Day One — Your beginner gym companion** and provide a concise build summary when finished.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://day-one-gym-buddy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9dad6ebb-9eaf-4392-a92e-e801f96e48fa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
