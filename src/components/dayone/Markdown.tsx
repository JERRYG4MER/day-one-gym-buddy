function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/** Minimal markdown rendering for coach replies: bold, bullets, numbered steps. */
export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];
  let ordered = false;

  const flush = (key: string) => {
    if (!list.length) return;
    const items = list.map((l, i) => (
      <li key={i} className="leading-relaxed">
        {inline(l)}
      </li>
    ));
    nodes.push(
      ordered ? (
        <ol key={key} className="ml-5 list-decimal space-y-1">
          {items}
        </ol>
      ) : (
        <ul key={key} className="ml-5 list-disc space-y-1">
          {items}
        </ul>
      ),
    );
    list = [];
  };

  lines.forEach((line, i) => {
    const bullet = line.match(/^-\s+(.*)$/);
    const num = line.match(/^\d+\.\s+(.*)$/);
    if (bullet) {
      if (ordered) flush(`l${i}`);
      ordered = false;
      list.push(bullet[1] ?? "");
    } else if (num) {
      if (!ordered) flush(`l${i}`);
      ordered = true;
      list.push(num[1] ?? "");
    } else {
      flush(`l${i}`);
      if (line.trim()) {
        nodes.push(
          <p key={i} className="leading-relaxed">
            {inline(line)}
          </p>,
        );
      }
    }
  });
  flush("last");

  return <div className="space-y-2 text-sm">{nodes}</div>;
}
