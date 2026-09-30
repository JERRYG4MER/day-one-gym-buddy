import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Dumbbell } from "lucide-react";
import { useDayOne } from "@/lib/dayone/store";
import { answerQuestion, suggestedPrompts } from "@/lib/dayone/coach";
import { weekMinutes, weekSessions } from "@/lib/dayone/stats";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PageHeader, Panel } from "@/components/dayone/ui";
import { Markdown } from "@/components/dayone/Markdown";
import { SafetyNote } from "@/components/dayone/SafetyNote";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Coach — Day One" },
      { name: "description", content: "Ask beginner gym questions and get friendly answers based on your plan." },
      { property: "og:title", content: "Coach — Day One" },
      { property: "og:description", content: "Ask beginner gym questions and get friendly answers based on your plan." },
    ],
  }),
  component: CoachPage,
});

function CoachPage() {
  const { profile, plan, completed, messages, addMessage, clearMessages } = useDayOne();
  const [text, setText] = useState("");
  const [thinking, setThinking] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages.length, thinking]);

  const ask = (q: string) => {
    const question = q.trim();
    if (!question || thinking) return;
    addMessage({ id: `m-${Date.now()}`, role: "user", content: question, at: new Date().toISOString() });
    setText("");
    setThinking(true);
    const done = new Set(weekSessions(completed).map((c) => c.sessionId));
    const next = plan?.sessions.find((s) => !s.restDay && !done.has(s.id));
    setTimeout(() => {
      const reply = answerQuestion(question, {
        profile, plan, sessionsThisWeek: weekSessions(completed).length, minutesThisWeek: weekMinutes(completed),
        nextSessionTitle: next?.title, nextSessionDay: next?.day,
      });
      addMessage({ id: `m-${Date.now()}-a`, role: "assistant", content: reply, at: new Date().toISOString() });
      setThinking(false);
    }, 450);
  };

  return (
    <div className="space-y-5">
      <PageHeader eyebrow="Always here, never judgey" title="Coach">
        Ask anything about the gym. <Badge variant="outline" className="ml-1 align-middle">Local guide · not a live AI model</Badge>
      </PageHeader>
      <p className="text-xs text-muted-foreground">Answers come from Day One's built-in beginner guidance, tailored to your profile and plan. Nothing leaves this device.</p>

      <Panel className="min-h-[320px]">
        {messages.length === 0 && (
          <div className="py-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-sage text-sage-foreground"><Dumbbell className="size-6" /></div>
            <p className="mt-3 font-medium">Hi{profile.name ? ` ${profile.name.split(" ")[0]}` : ""}, what's on your mind?</p>
            <p className="text-sm text-muted-foreground">Try one of these to start.</p>
          </div>
        )}
        <div className="space-y-4" aria-live="polite">
          {messages.map((m) => m.role === "user" ? (
            <div key={m.id} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.content}</div>
          ) : (
            <div key={m.id} className="flex max-w-[92%] gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage text-sage-foreground"><Dumbbell className="size-4" /></div>
              <Markdown text={m.content} />
            </div>
          ))}
          {thinking && <p className="text-sm text-muted-foreground">Coach is thinking…</p>}
          <div ref={end} />
        </div>
      </Panel>

      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.map((p) => (
          <button key={p} type="button" onClick={() => ask(p)} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:bg-muted">{p}</button>
        ))}
      </div>

      <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
        <Textarea aria-label="Ask the coach" value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="Type a question…"
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(text); } }} />
        <Button type="submit" size="icon" className="size-11 shrink-0" disabled={!text.trim() || thinking} aria-label="Send"><Send className="size-4" /></Button>
      </form>
      {messages.length > 0 && <Button variant="ghost" size="sm" onClick={clearMessages}>Clear conversation</Button>}
      <SafetyNote compact />
    </div>
  );
}
