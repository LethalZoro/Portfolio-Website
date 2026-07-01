import { FadeUp } from "@/components/motion/FadeUp";

/** Section header: giant ghost numeral behind an expanded display title. */
export function SectionHeading({
  index,
  title,
  className = "",
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`relative mb-12 sm:mb-16 ${className}`}>
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -left-[0.06em] -top-[0.36em] select-none text-[clamp(4.5rem,11vw,8rem)] leading-none text-text opacity-[0.055]"
      >
        {index}
      </span>
      <FadeUp className="relative flex items-baseline gap-4">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)]">{title}</h2>
        <span className="hidden h-px flex-1 self-center bg-line sm:block" aria-hidden />
        <span className="hidden font-mono text-sm text-accent sm:block" aria-hidden>
          {index}
        </span>
      </FadeUp>
    </div>
  );
}
