# DESIGN.md

## Color (OKLCH, CSS vars in `app/globals.css`, flipped by `.dark` on `<html>`)

Strategy: Committed. Violet carries real surface area (hero field, timeline nodes, CTAs, section markers); cyan is the secondary signal (glows, hovers, particle accents). Neutrals are violet-tinted; never #000/#fff.

| Token | Light | Dark |
|---|---|---|
| `bg` | `oklch(0.975 0.008 290)` | `oklch(0.145 0.022 290)` |
| `surface` | `oklch(0.945 0.012 290)` | `oklch(0.19 0.026 290)` |
| `text` | `oklch(0.22 0.03 290)` | `oklch(0.93 0.01 290)` |
| `muted` | `oklch(0.46 0.03 290)` | `oklch(0.68 0.02 290)` |
| `line` | `oklch(0.88 0.015 290)` | `oklch(0.28 0.03 290)` |
| `accent` | `oklch(0.50 0.21 295)` | `oklch(0.72 0.19 295)` |
| `accent-2` | `oklch(0.55 0.12 210)` | `oklch(0.82 0.13 210)` |

Accent text on bg must pass 4.5:1 in both themes.

## Typography

- **Archivo Variable** (`--font-sans`): display at `font-variation-settings: "wdth" 125`, weight 750–800, tracking -0.02em (class `.font-display`). Body at width 100, weight 400–500.
- **JetBrains Mono** (`--font-mono`): micro-labels only — dates, tech chips, section indices, status lines. Never body copy.
- Fluid scale: display `clamp(2.75rem, 8vw, 6.5rem)`, h2 `clamp(2rem, 4.5vw, 3.4rem)`, h3 1.5rem, body 1.0625rem, label 0.8125rem. Body max 68ch. Dark mode line-height +0.05.

## Layout

12-col `max-w-6xl`, left-aligned asymmetric. Section padding `clamp(5rem, 12vh, 9rem)`, varied for rhythm. Thin left rail on xl+ with section index + scroll progress. Glass (backdrop-blur) in exactly two places: scrolled nav, featured project card media overlays.

## Motion

`<MotionConfig reducedMotion="user">` wraps the page. Durations ≤400ms, transform+opacity only, `--ease-out-expo: cubic-bezier(0.16,1,0.3,1)` / `--ease-out-quart: cubic-bezier(0.25,1,0.5,1)`. No bounce/elastic. Primitives in `components/motion/`: FadeUp, Stagger, TextReveal, Magnetic, CountUp, Marquee.

## Bans

Gradient text · side-stripe borders · glassmorphism-by-default · identical icon-card grids · bounce easing · repeated uppercase kicker labels · em dashes in copy · skill % bars.
