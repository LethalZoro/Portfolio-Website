export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.75rem] text-muted transition-colors duration-200 hover:border-accent/60 hover:text-text">
      {children}
    </span>
  );
}
