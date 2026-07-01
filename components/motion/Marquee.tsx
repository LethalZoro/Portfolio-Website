/** CSS-driven marquee. Content is duplicated once; the track translates -50%. */
export function Marquee({
  items,
  duration = 40,
}: {
  items: string[];
  duration?: number;
}) {
  const row = [...items, ...items];
  return (
    <div
      className="marquee-group relative overflow-hidden py-5 border-y border-line select-none"
      aria-hidden
    >
      <div
        className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm text-muted"
          >
            {item}
            <span className="text-accent-2/60 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
