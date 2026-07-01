"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "Signal Field" v3: one particle system, three shapes, full interaction layer.
 *
 * Shapes (driven by page scroll):
 *   0.00-0.18  neural network      0.18-0.34  morph -> brain
 *   0.52-0.68  morph -> silicon die
 *
 * Interaction (all in local field space, so it stays glued to the pointer even
 * when the field shifts and scales after the hero):
 *   - wake trail: an 8-point history of the pointer with fading strength;
 *     moving the mouse carves a glowing wake with momentum, holding it still
 *     leaves only a small quiet dent
 *   - click shockwave: an expanding damped ring displaces and lights particles
 *   - scroll velocity: fast scrolling stretches the field with per-particle lag
 */

const TRAIL_LEN = 8;

const SIM_GLSL = /* glsl */ `
  uniform vec4 uTrail[${TRAIL_LEN}];
  uniform vec4 uWave;
  uniform float uScrollVel;
  uniform float uIntro;

  // boot sequence: every particle starts flung into deep space (position
  // derived from its seed) and flies home with per-particle stagger
  vec3 bootIn(vec3 target, float seed) {
    vec3 scatter = vec3(
      sin(seed * 91.17) * 14.0,
      cos(seed * 57.33) * 9.0,
      sin(seed * 23.7) * 12.0 - 4.0
    );
    float m = smoothstep(seed * 0.4, 1.0, uIntro);
    return mix(scatter, target, m);
  }

  vec3 drift(vec3 p, float seed, float time, float amp) {
    p.x += sin(time * 0.25 + seed * 6.2831) * 0.20 * amp;
    p.y += cos(time * 0.20 + seed * 12.566) * 0.24 * amp;
    p.z += sin(time * 0.18 + seed * 3.1415) * 0.16 * amp;
    return p;
  }

  vec3 morphed(vec3 net, vec3 brain, vec3 chip, float m, float seed) {
    float m1 = smoothstep(seed * 0.3, 1.0, clamp(m, 0.0, 1.0));
    float m2 = smoothstep(seed * 0.3, 1.0, clamp(m - 1.0, 0.0, 1.0));
    return mix(mix(net, brain, m1), chip, m2);
  }

  vec3 interactField(vec3 p, float seed, out float glow) {
    glow = 0.0;
    for (int i = 0; i < ${TRAIL_LEN}; i++) {
      vec3 d = p - uTrail[i].xyz;
      float dist = length(d);
      float force = smoothstep(1.9, 0.0, dist) * uTrail[i].w;
      p += normalize(d + vec3(0.0001)) * force * 0.55;
      glow += force;
    }
    if (uWave.w >= 0.0) {
      vec3 dw = p - uWave.xyz;
      float dist = length(dw);
      float ring = uWave.w * 7.0;
      float band = exp(-pow((dist - ring) * 1.6, 2.0));
      float amp = exp(-uWave.w * 2.0) * 1.4;
      p += normalize(dw + vec3(0.0001)) * band * amp;
      glow += band * amp * 0.8;
    }
    p.y += uScrollVel * (0.4 + seed * 0.6);
    glow = min(glow, 1.2);
    return p;
  }
`;

const POINTS_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uMorph;
  attribute float aMix;
  attribute float aSeed;
  attribute float aSize;
  attribute vec3 aPosBrain;
  attribute vec3 aPosChip;
  varying float vMix;
  varying float vGlow;
  ${SIM_GLSL}
  void main() {
    vec3 target = morphed(position, aPosBrain, aPosChip, uMorph, aSeed);
    target = bootIn(target, aSeed);
    float amp = mix(1.0, 0.4, clamp(uMorph - 1.0, 0.0, 1.0));
    vec3 p = drift(target, aSeed, uTime, amp);
    float glow;
    p = interactField(p, aSeed, glow);
    vGlow = glow;
    vMix = aMix;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (16.0 / -mv.z);
  }
`;

const POINTS_FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vMix;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.12, d) * uOpacity;
    vec3 color = mix(uColorA, uColorB, vMix);
    color += vGlow * 0.6;
    gl_FragColor = vec4(color, alpha * (0.55 + vGlow * 0.45));
  }
`;

const LINES_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  attribute float aSeed;
  attribute float aLineSeed;
  attribute vec3 aPosBrain;
  attribute vec3 aPosChip;
  varying float vPulse;
  ${SIM_GLSL}
  void main() {
    vec3 target = morphed(position, aPosBrain, aPosChip, uMorph, aSeed);
    target = bootIn(target, aSeed);
    float amp = mix(1.0, 0.4, clamp(uMorph - 1.0, 0.0, 1.0));
    vec3 p = drift(target, aSeed, uTime, amp);
    float glow;
    p = interactField(p, aSeed, glow);
    float t = fract(uTime * 0.06 + aLineSeed);
    vPulse = smoothstep(0.10, 0.0, abs(t - 0.5)) + glow * 0.35;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const LINES_FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uLineOpacity;
  uniform float uIntro;
  varying float vPulse;
  void main() {
    vec3 color = mix(uColorA, uColorB, vPulse);
    float alpha = uLineOpacity + vPulse * uLineOpacity * 3.5;
    // connections only light up once the nodes have landed
    gl_FragColor = vec4(color, alpha * pow(uIntro, 3.0));
  }
`;

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

type Rand = () => number;

/** Wrinkled two-hemisphere ellipsoid point cloud. */
function brainSample(rand: Rand): [number, number, number] {
  const theta = rand() * Math.PI * 2;
  const phi = Math.acos(2 * rand() - 1);
  let r = 0.86 + 0.14 * rand();
  r +=
    0.055 * Math.sin(6 * theta) * Math.sin(5 * phi) +
    0.04 * Math.sin(11 * theta + 2.0) * Math.sin(9 * phi);
  let x = r * Math.sin(phi) * Math.cos(theta) * 1.35;
  let y = r * Math.cos(phi) * 0.95;
  const z = r * Math.sin(phi) * Math.sin(theta) * 1.05;
  if (Math.abs(x) < 0.09) x += (x >= 0 ? 1 : -1) * 0.09;
  if (y < -0.62) y = -0.62 - (y + 0.62) * 0.25;
  const s = 3.4;
  return [x * s, y * s + 0.3, z * s];
}

/** Silicon die: perimeter pads, quantized functional blocks, manhattan traces. */
function chipSample(rand: Rand): [number, number, number] {
  const S = 3.2;
  const q = (v: number) => Math.round(v / 0.16) * 0.16;
  const t = rand();
  let x = 0;
  let y = 0;
  if (t < 0.2) {
    const edge = Math.floor(rand() * 4);
    const along = (Math.floor(rand() * 40) / 39 - 0.5) * 2 * S;
    const row = S + 0.2 + (rand() < 0.5 ? 0 : 0.16);
    if (edge === 0) {
      x = along;
      y = row;
    } else if (edge === 1) {
      x = along;
      y = -row;
    } else if (edge === 2) {
      x = row;
      y = along;
    } else {
      x = -row;
      y = along;
    }
  } else if (t < 0.68) {
    const blocks: [number, number, number, number][] = [
      [-1.9, 1.6, 1.7, 1.9],
      [1.6, 1.7, 2.2, 1.5],
      [-1.7, -1.5, 2.0, 1.8],
      [1.7, -1.6, 1.8, 2.0],
      [0.0, 0.05, 1.5, 1.5],
    ];
    const b = blocks[Math.floor(rand() * blocks.length)]!;
    x = q(b[0] + (rand() - 0.5) * b[2]);
    y = q(b[1] + (rand() - 0.5) * b[3]);
  } else {
    const traces: [number, number, number, number][] = [
      [-1.9, 0.55, -1.9, -0.5],
      [-0.9, 1.6, 0.4, 1.6],
      [1.6, 0.85, 1.6, -0.55],
      [-0.75, 0.0, 0.75, 0.0],
      [0.0, -0.75, 0.0, -1.9],
      [-0.9, -1.5, 0.75, -1.5],
      [0.9, 1.0, 0.9, 0.05],
      [-1.0, 0.65, -0.05, 0.65],
    ];
    const tr = traces[Math.floor(rand() * traces.length)]!;
    const f = rand();
    x = tr[0] + (tr[2] - tr[0]) * f;
    y = tr[1] + (tr[3] - tr[1]) * f;
  }
  return [x, y * 0.9, (rand() - 0.5) * 0.14];
}

interface FieldGeometry {
  positions: Float32Array;
  brain: Float32Array;
  chip: Float32Array;
  mixes: Float32Array;
  seeds: Float32Array;
  sizes: Float32Array;
  linePositions: Float32Array;
  lineBrain: Float32Array;
  lineChip: Float32Array;
  lineSeeds: Float32Array;
  lineSegSeeds: Float32Array;
}

function buildField(count: number): FieldGeometry {
  const rand = mulberry32(1337);
  const layers = 5;
  const spanX = 16;
  const spanY = 8;

  const positions = new Float32Array(count * 3);
  const brain = new Float32Array(count * 3);
  const chip = new Float32Array(count * 3);
  const mixes = new Float32Array(count);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const layerNodes: number[][] = Array.from({ length: layers }, () => []);

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(rand() * layers);
    const cx = -spanX / 2 + (layer * spanX) / (layers - 1);
    positions[i * 3] = cx + (rand() - 0.5) * 2.6;
    positions[i * 3 + 1] = (rand() - 0.5) * spanY * (0.55 + rand() * 0.45);
    positions[i * 3 + 2] = (rand() - 0.5) * 5;

    const b = brainSample(rand);
    brain[i * 3] = b[0];
    brain[i * 3 + 1] = b[1];
    brain[i * 3 + 2] = b[2];

    const c = chipSample(rand);
    chip[i * 3] = c[0];
    chip[i * 3 + 1] = c[1];
    chip[i * 3 + 2] = c[2];

    mixes[i] = rand() > 0.72 ? 1 : rand() * 0.3;
    seeds[i] = rand();
    sizes[i] = 1.2 + rand() * 2.4;
    layerNodes[layer]!.push(i);
  }

  const copy3 = (src: Float32Array, i: number) =>
    [src[i * 3]!, src[i * 3 + 1]!, src[i * 3 + 2]!] as const;

  const lineVerts: number[] = [];
  const lineBrainVerts: number[] = [];
  const lineChipVerts: number[] = [];
  const lineVertSeeds: number[] = [];
  const lineSegSeedArr: number[] = [];

  for (let l = 0; l < layers - 1; l++) {
    const from = layerNodes[l]!;
    const to = layerNodes[l + 1]!;
    for (const a of from) {
      // keep the graph sparse: high particle counts drown in line overdraw
      if (rand() > 0.09) continue;
      const [ax, ay, az] = copy3(positions, a);
      const nearest = to
        .map((b) => {
          const dx = positions[b * 3]! - ax;
          const dy = positions[b * 3 + 1]! - ay;
          const dz = positions[b * 3 + 2]! - az;
          return { b, d: dx * dx + dy * dy + dz * dz };
        })
        .sort((p, q2) => p.d - q2.d)
        .slice(0, 2);
      for (const { b } of nearest) {
        const segSeed = rand();
        lineVerts.push(ax, ay, az, ...copy3(positions, b));
        lineBrainVerts.push(...copy3(brain, a), ...copy3(brain, b));
        lineChipVerts.push(...copy3(chip, a), ...copy3(chip, b));
        lineVertSeeds.push(seeds[a]!, seeds[b]!);
        lineSegSeedArr.push(segSeed, segSeed);
      }
    }
  }

  return {
    positions,
    brain,
    chip,
    mixes,
    seeds,
    sizes,
    linePositions: new Float32Array(lineVerts),
    lineBrain: new Float32Array(lineBrainVerts),
    lineChip: new Float32Array(lineChipVerts),
    lineSeeds: new Float32Array(lineVertSeeds),
    lineSegSeeds: new Float32Array(lineSegSeedArr),
  };
}

const DARK = {
  colorA: new THREE.Color("#a78bfa"),
  colorB: new THREE.Color("#67e8f9"),
  opacity: 0.9,
  lineOpacity: 0.08,
};

const LIGHT = {
  colorA: new THREE.Color("#6d28d9"),
  colorB: new THREE.Color("#0e7490"),
  opacity: 0.34,
  lineOpacity: 0.04,
};

function scrollFraction(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

function morphTarget(p: number): number {
  if (p < 0.18) return 0;
  if (p < 0.34) return (p - 0.18) / 0.16;
  if (p < 0.52) return 1;
  if (p < 0.68) return 1 + (p - 0.52) / 0.16;
  return 2;
}

function fadeTarget(p: number): number {
  if (p < 0.03) return 1;
  if (p < 0.14) return 1 - ((p - 0.03) / 0.11) * 0.78;
  return 0.22;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function MorphField({
  isDark,
  interactive,
  count,
  boot,
}: {
  isDark: boolean;
  interactive: boolean;
  count: number;
  /** false = skip the fly-in assembly (reduced motion) */
  boot: boolean;
}) {
  const { viewport, gl } = useThree();
  const field = useMemo(() => buildField(count), [count]);
  const groupRef = useRef<THREE.Group>(null);
  const camTarget = useRef(new THREE.Vector3(0, 0, 14));
  const morphCur = useRef(0);
  const fadeCur = useRef(1);
  const lastTrailPos = useRef(new THREE.Vector3(999, 999, 0));
  const waveStart = useRef(-1);
  const pendingWaveNdc = useRef<{ x: number; y: number } | null>(null);
  const lastScrollY = useRef(0);
  const scrollVel = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uIntro: { value: 0 },
      uScrollVel: { value: 0 },
      uPixelRatio: { value: gl.getPixelRatio() },
      uTrail: {
        value: Array.from(
          { length: TRAIL_LEN },
          () => new THREE.Vector4(999, 999, 0, 0)
        ),
      },
      uWave: { value: new THREE.Vector4(0, 0, 0, -1) },
      uColorA: { value: DARK.colorA.clone() },
      uColorB: { value: DARK.colorB.clone() },
      uOpacity: { value: DARK.opacity },
      uLineOpacity: { value: DARK.lineOpacity },
    }),
    [gl]
  );

  useEffect(() => {
    if (!interactive) return;
    const onDown = (e: PointerEvent) => {
      pendingWaveNdc.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [interactive]);

  useFrame((state, delta) => {
    const k = Math.min(delta * 3, 1);
    const k6 = Math.min(delta * 6, 1);
    uniforms.uTime.value += delta;

    // boot assembly: ~2s fly-in after mount (instant under reduced motion)
    uniforms.uIntro.value = boot
      ? easeOutCubic(Math.min(1, Math.max(0, (uniforms.uTime.value - 0.15) / 2.0)))
      : 1;

    const p = scrollFraction();

    morphCur.current += (morphTarget(p) - morphCur.current) * k;
    fadeCur.current += (fadeTarget(p) - fadeCur.current) * k;
    uniforms.uMorph.value = morphCur.current;

    // camera arc
    camTarget.current.set(
      Math.sin(p * Math.PI * 1.5) * 0.8,
      -0.35 * p,
      14 - 1.0 * Math.sin(p * Math.PI)
    );
    state.camera.position.lerp(camTarget.current, k);
    state.camera.lookAt(0, 0, 0);

    // shape retreats to the right margin once morphing begins
    const group = groupRef.current;
    let groupX = 0;
    let groupS = 1;
    if (group) {
      const wide = state.viewport.width > 13;
      const m = Math.min(morphCur.current, 1);
      const baseScale = Math.min(state.viewport.width / 17, 1.15);
      const targetX = wide ? m * 4.6 : 0;
      const targetScale = baseScale * (1 - 0.25 * m);
      group.position.x += (targetX - group.position.x) * k;
      const s = group.scale.x + (targetScale - group.scale.x) * k;
      group.scale.setScalar(s);
      groupX = group.position.x;
      groupS = s;
    }

    // pointer -> LOCAL field space (stays correct when the group moves/scales)
    const toLocal = (ndcX: number, ndcY: number, out: THREE.Vector3) => {
      const wx = (ndcX * state.viewport.width) / 2;
      const wy = (ndcY * state.viewport.height) / 2;
      out.set((wx - groupX) / groupS, wy / groupS, 0);
      return out;
    };

    // wake trail: head follows the pointer; a new tail point is recorded when
    // the pointer has moved far enough, then every point's strength decays
    const trail = uniforms.uTrail.value;
    const decay = Math.exp(-delta * 2.2);
    for (let i = 0; i < TRAIL_LEN; i++) trail[i]!.w *= decay;

    if (interactive) {
      const head = trail[0]!;
      const local = toLocal(state.pointer.x, state.pointer.y, new THREE.Vector3());
      head.set(local.x, local.y, 0, 0.85);
      if (local.distanceTo(lastTrailPos.current) > 0.45) {
        for (let i = TRAIL_LEN - 1; i > 1; i--) trail[i]!.copy(trail[i - 1]!);
        trail[1]!.set(local.x, local.y, 0, 0.7);
        lastTrailPos.current.copy(local);
      }
    } else {
      trail[0]!.w = 0;
    }

    // click shockwave
    if (pendingWaveNdc.current) {
      const { x, y } = pendingWaveNdc.current;
      pendingWaveNdc.current = null;
      const local = toLocal(x, y, new THREE.Vector3());
      uniforms.uWave.value.set(local.x, local.y, 0, 0);
      waveStart.current = uniforms.uTime.value;
    }
    uniforms.uWave.value.w =
      waveStart.current >= 0 ? uniforms.uTime.value - waveStart.current : -1;

    // scroll velocity -> field stretch
    const sy = window.scrollY;
    const rawVel = delta > 0 ? (sy - lastScrollY.current) / delta : 0;
    lastScrollY.current = sy;
    scrollVel.current +=
      (THREE.MathUtils.clamp(rawVel * 0.0004, -0.5, 0.5) - scrollVel.current) *
      Math.min(delta * 8, 1);
    uniforms.uScrollVel.value = scrollVel.current;

    // theme + intensity
    const theme = isDark ? DARK : LIGHT;
    uniforms.uColorA.value.lerp(theme.colorA, k6);
    uniforms.uColorB.value.lerp(theme.colorB, k6);
    uniforms.uOpacity.value +=
      (theme.opacity * fadeCur.current - uniforms.uOpacity.value) * k6;
    uniforms.uLineOpacity.value +=
      (theme.lineOpacity * fadeCur.current - uniforms.uLineOpacity.value) * k6;
  });

  const scale = Math.min(viewport.width / 17, 1.15);

  return (
    <group ref={groupRef} scale={scale}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
          <bufferAttribute attach="attributes-aPosBrain" args={[field.brain, 3]} />
          <bufferAttribute attach="attributes-aPosChip" args={[field.chip, 3]} />
          <bufferAttribute attach="attributes-aMix" args={[field.mixes, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[field.seeds, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[field.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={POINTS_VERT}
          fragmentShader={POINTS_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.linePositions, 3]} />
          <bufferAttribute attach="attributes-aPosBrain" args={[field.lineBrain, 3]} />
          <bufferAttribute attach="attributes-aPosChip" args={[field.lineChip, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[field.lineSeeds, 1]} />
          <bufferAttribute attach="attributes-aLineSeed" args={[field.lineSegSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={LINES_VERT}
          fragmentShader={LINES_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
