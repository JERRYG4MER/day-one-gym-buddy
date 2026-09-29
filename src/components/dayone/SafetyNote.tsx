import { ShieldCheck } from "lucide-react";

export function SafetyNote({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="flex items-start gap-2 rounded-xl bg-muted/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        <span>
          General fitness education, not medical care. Start at a comfortable level and stop for sharp pain, dizziness, chest pain or unusual
          breathlessness.
        </span>
      </p>
    );
  }
  return (
    <section
      aria-label="Safety note"
      className="rounded-2xl border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground"
    >
      <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
        <ShieldCheck className="size-4" aria-hidden />
        A note on staying safe
      </h2>
      <p className="text-balance-pretty">
        Day One offers general fitness education and habit support — it isn't medical care and can't diagnose injuries. Start at a level that feels
        comfortable and build gradually. Stop and rest if you get sharp pain, dizziness, chest pain or shortness of breath beyond normal exertion, and
        please speak to a health professional about any health concern or significant movement limitation.
      </p>
    </section>
  );
}
