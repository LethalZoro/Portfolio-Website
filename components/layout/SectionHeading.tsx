import { FadeUp } from "@/components/motion/FadeUp";

/** Section header: mono index in the rail position + expanded display title. */
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
    <FadeUp className={`mb-12 flex items-baseline gap-4 sm:mb-16 ${className}`}>
      <span className="font-mono text-sm text-accent" aria-hidden>
        {index}
      </span>
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)]">{title}</h2>
      <span className="hidden h-px flex-1 self-center bg-line sm:block" aria-hidden />
    </FadeUp>
  );
}
