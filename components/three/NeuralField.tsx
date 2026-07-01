"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "Signal Field": particles seeded into neural-net layer clusters, faint
 * inter-layer connections, and periodic activation pulses travelling the
 * edges. All motion lives in the shaders; the drift is a pure function of
 * (time, seed) so line endpoints track their nodes exactly.
 */

const DRIFT_GLSL = /* glsl */ `
  vec3 drift(vec3 p, float seed, float time) {
    p.x += sin(time * 0.25 + seed * 6.2831) * 0.20;
    p.y += cos(time * 0.20 + seed * 12.566) * 0.24;
    p.z += sin(time * 0.18 + seed * 3.1415) * 0.16;
    return p;
  }
  vec3 repel(vec3 p, vec3 pointer, out float glow) {
    vec3 d = p - pointer;
    float dist = length(d);
    float force = smoothstep(2.4, 0.0, dist);
    glow = force;
    return p + normalize(d + vec3(0.0001)) * force * 0.7;
  }
`;

const POINTS_VERT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uPointer;
  uniform float uPixelRatio;
  attribute float aMix;
  attribute float aSeed;
  attribute float aSize;
  varying float vMix;
  varying float vGlow;
  ${DRIFT_GLSL}
  void main() {
    vec3 p = drift(position, aSeed, uTime);
    float glow;
    p = repel(p, uPointer, glow);
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
  uniform vec3 uPointer;
  attribute float aSeed;
  attribute float aLineSeed;
  varying float vPulse;
  ${DRIFT_GLSL}
  void main() {
    vec3 p = drift(position, aSeed, uTime);
    float glow;
    p = repel(p, uPointer, glow);
    float t = fract(uTime * 0.06 + aLineSeed);
    vPulse = smoothstep(0.10, 0.0, abs(t - 0.5)) + glow * 0.35;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const LINES_FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uLineOpacity;
  varying float vPulse;
  void main() {
    vec3 color = mix(uColorA, uColorB, vPulse);
    float alpha = uLineOpacity + vPulse * uLineOpacity * 3.5;
    gl_FragColor = vec4(color, alpha);
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

interface FieldGeometry {
  positions: Float32Array;
  mixes: Float32Array;
  seeds: Float32Array;
  sizes: Float32Array;
  linePositions: Float32Array;
  lineSeeds: Float32Array;
  lineSegSeeds: Float32Array;
}

function buildField(count: number): FieldGeometry {
  const rand = mulberry32(1337);
  const layers = 5;
  const spanX = 16;
  const spanY = 8;

  const positions = new Float32Array(count * 3);
  const mixes = new Float32Array(count);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const layerNodes: number[][] = Array.from({ length: layers }, () => []);

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(rand() * layers);
    const cx = -spanX / 2 + (layer * spanX) / (layers - 1);
    const x = cx + (rand() - 0.5) * 2.6;
    const y = (rand() - 0.5) * spanY * (0.55 + rand() * 0.45);
    const z = (rand() - 0.5) * 5;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    mixes[i] = rand() > 0.72 ? 1 : rand() * 0.3;
    seeds[i] = rand();
    sizes[i] = 1.6 + rand() * 3.2;
    layerNodes[layer]!.push(i);
  }

  // Connect each node to its 2 nearest neighbours in the next layer.
  const lineVerts: number[] = [];
  const lineVertSeeds: number[] = [];
  const lineSegSeedArr: number[] = [];
  for (let l = 0; l < layers - 1; l++) {
    const from = layerNodes[l]!;
    const to = layerNodes[l + 1]!;
    for (const a of from) {
      if (rand() > 0.5) continue; // sparse graph
      const ax = positions[a * 3]!;
      const ay = positions[a * 3 + 1]!;
      const az = positions[a * 3 + 2]!;
      const nearest = to
        .map((b) => {
          const dx = positions[b * 3]! - ax;
          const dy = positions[b * 3 + 1]! - ay;
          const dz = positions[b * 3 + 2]! - az;
          return { b, d: dx * dx + dy * dy + dz * dz };
        })
        .sort((p, q) => p.d - q.d)
        .slice(0, 2);
      for (const { b } of nearest) {
        const segSeed = rand();
        lineVerts.push(
          ax, ay, az,
          positions[b * 3]!, positions[b * 3 + 1]!, positions[b * 3 + 2]!
        );
        lineVertSeeds.push(seeds[a]!, seeds[b]!);
        lineSegSeedArr.push(segSeed, segSeed);
      }
    }
  }

  return {
    positions,
    mixes,
    seeds,
    sizes,
    linePositions: new Float32Array(lineVerts),
    lineSeeds: new Float32Array(lineVertSeeds),
    lineSegSeeds: new Float32Array(lineSegSeedArr),
  };
}

const DARK = {
  colorA: new THREE.Color("#a78bfa"), // violet
  colorB: new THREE.Color("#67e8f9"), // cyan
  opacity: 0.9,
  lineOpacity: 0.08,
};

const LIGHT = {
  colorA: new THREE.Color("#6d28d9"),
  colorB: new THREE.Color("#0e7490"),
  opacity: 0.34,
  lineOpacity: 0.04,
};

export function NeuralField({
  isDark,
  interactive,
  count,
}: {
  isDark: boolean;
  interactive: boolean;
  count: number;
}) {
  const { viewport, gl } = useThree();
  const field = useMemo(() => buildField(count), [count]);
  const pointerTarget = useRef(new THREE.Vector3(999, 999, 0));
  const pointerSmooth = useRef(new THREE.Vector3(999, 999, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3(999, 999, 0) },
      uPixelRatio: { value: gl.getPixelRatio() },
      uColorA: { value: DARK.colorA.clone() },
      uColorB: { value: DARK.colorB.clone() },
      uOpacity: { value: DARK.opacity },
      uLineOpacity: { value: DARK.lineOpacity },
    }),
    [gl]
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;

    if (interactive) {
      const px = (state.pointer.x * state.viewport.width) / 2;
      const py = (state.pointer.y * state.viewport.height) / 2;
      pointerTarget.current.set(px, py, 0);
    } else {
      pointerTarget.current.set(999, 999, 0);
    }
    pointerSmooth.current.lerp(pointerTarget.current, Math.min(delta * 5, 1));
    uniforms.uPointer.value.copy(pointerSmooth.current);

    const theme = isDark ? DARK : LIGHT;
    uniforms.uColorA.value.lerp(theme.colorA, Math.min(delta * 6, 1));
    uniforms.uColorB.value.lerp(theme.colorB, Math.min(delta * 6, 1));
    uniforms.uOpacity.value += (theme.opacity - uniforms.uOpacity.value) * Math.min(delta * 6, 1);
    uniforms.uLineOpacity.value +=
      (theme.lineOpacity - uniforms.uLineOpacity.value) * Math.min(delta * 6, 1);
  });

  const scale = Math.min(viewport.width / 17, 1.15);

  return (
    <group scale={scale}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
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
