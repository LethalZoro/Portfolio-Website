import { CoverArt } from "@/components/ui/CoverArt";

/** Zero-JS static fallback when WebGL is unavailable: same graph motif as SVG. */
export function HeroPoster() {
  return (
    <div className="absolute inset-0 opacity-40" aria-hidden>
      <CoverArt slug="hero-signal-field" title="" />
    </div>
  );
}
