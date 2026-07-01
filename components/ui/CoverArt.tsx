/**
 * Deterministic generated cover: a neural-graph constellation seeded by the
 * project slug, so projects without screenshots still get designed art.
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSlug(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function CoverArt({ slug, title }: { slug: string; title: string }) {
  const rand = mulberry32(hashSlug(slug));
  const W = 800;
  const H = 500;
  const layers = 4;
  const nodes: { x: number; y: number; r: number; c: string }[] = [];
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];

  let prev: { x: number; y: number }[] = [];
  for (let l = 0; l < layers; l++) {
    const count = 3 + Math.floor(rand() * 4);
    const layerX = 120 + (l * (W - 240)) / (layers - 1);
    const current: { x: number; y: number }[] = [];
    for (let n = 0; n < count; n++) {
      const x = layerX + (rand() - 0.5) * 70;
      const y = 70 + ((n + 0.5) * (H - 140)) / count + (rand() - 0.5) * 40;
      current.push({ x, y });
      nodes.push({
        x,
        y,
        r: 2.5 + rand() * 4,
        c: rand() > 0.7 ? "var(--accent-2)" : "var(--accent)",
      });
    }
    for (const p of prev) {
      for (const c of current) {
        if (rand() > 0.45) {
          edges.push({ x1: p.x, y1: p.y, x2: c.x, y2: c.y });
        }
      }
    }
    prev = current;
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full bg-surface"
      role="img"
      aria-label={`${title} cover art`}
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="var(--accent)"
          strokeOpacity={0.14}
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.c} fillOpacity={0.85} />
      ))}
    </svg>
  );
}
