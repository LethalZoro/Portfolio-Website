"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural silicon package v2, aiming for "product photo" realism with
 * zero downloaded assets:
 *   - substrate with gold pads at every pin root
 *   - die with a canvas-generated die-shot texture (functional blocks, buses,
 *     a laser marking) used as both map and emissive map
 *   - 48 gold gull-wing pins + a 10x10 gold BGA ball grid underneath
 *   - slow tumble that periodically shows the top AND the underside
 */

const PINS_PER_SIDE = 12;
const SUB = 1.55; // substrate half-size
const DIE = 0.72; // die half-size

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

function makeDieTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const g = canvas.getContext("2d")!;
  const rand = mulberry32(42);

  g.fillStyle = "#100c1d";
  g.fillRect(0, 0, 512, 512);

  // functional blocks
  for (let i = 0; i < 34; i++) {
    const w = 30 + rand() * 110;
    const h = 30 + rand() * 110;
    const x = 24 + rand() * (464 - w);
    const y = 24 + rand() * (464 - h);
    g.fillStyle =
      rand() > 0.55 ? "rgba(139,92,246,0.30)" : "rgba(103,232,249,0.16)";
    g.fillRect(x, y, w, h);
    g.strokeStyle = "rgba(167,139,250,0.55)";
    g.lineWidth = 1.5;
    g.strokeRect(x, y, w, h);
    // inner cell grid inside some blocks
    if (rand() > 0.5) {
      g.strokeStyle = "rgba(167,139,250,0.22)";
      g.lineWidth = 0.75;
      for (let cx = x + 8; cx < x + w - 4; cx += 8) {
        g.beginPath();
        g.moveTo(cx, y + 3);
        g.lineTo(cx, y + h - 3);
        g.stroke();
      }
    }
  }

  // bus lines
  g.lineWidth = 1;
  for (let i = 0; i < 26; i++) {
    const horizontal = rand() > 0.5;
    const at = 16 + rand() * 480;
    g.strokeStyle =
      rand() > 0.5 ? "rgba(167,139,250,0.35)" : "rgba(103,232,249,0.25)";
    g.beginPath();
    if (horizontal) {
      g.moveTo(16, at);
      g.lineTo(496, at);
    } else {
      g.moveTo(at, 16);
      g.lineTo(at, 496);
    }
    g.stroke();
  }

  // seal ring + laser marking
  g.strokeStyle = "rgba(103,232,249,0.85)";
  g.lineWidth = 3;
  g.strokeRect(8, 8, 496, 496);
  g.fillStyle = "rgba(236,234,242,0.9)";
  g.font = "700 40px monospace";
  g.textAlign = "center";
  g.fillText("MM-26", 256, 272);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const GOLD = { color: "#d4a24e", metalness: 0.95, roughness: 0.28 };

function Package({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dieTexture = useMemo(() => makeDieTexture(), []);

  const pinMatrices = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < PINS_PER_SIDE; i++) {
        const along = ((i + 0.5) / PINS_PER_SIDE - 0.5) * 2 * (SUB - 0.18);
        const out = SUB + 0.13;
        if (side === 0) dummy.position.set(along, -0.02, out);
        else if (side === 1) dummy.position.set(along, -0.02, -out);
        else if (side === 2) dummy.position.set(out, -0.02, along);
        else dummy.position.set(-out, -0.02, along);
        dummy.rotation.set(0, side < 2 ? 0 : Math.PI / 2, 0);
        dummy.updateMatrix();
        matrices.push(dummy.matrix.clone());
      }
    }
    return matrices;
  }, []);

  const padMatrices = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < PINS_PER_SIDE; i++) {
        const along = ((i + 0.5) / PINS_PER_SIDE - 0.5) * 2 * (SUB - 0.18);
        const at = SUB - 0.12;
        if (side === 0) dummy.position.set(along, 0.078, at);
        else if (side === 1) dummy.position.set(along, 0.078, -at);
        else if (side === 2) dummy.position.set(at, 0.078, along);
        else dummy.position.set(-at, 0.078, along);
        dummy.rotation.set(0, side < 2 ? 0 : Math.PI / 2, 0);
        dummy.updateMatrix();
        matrices.push(dummy.matrix.clone());
      }
    }
    return matrices;
  }, []);

  const ballMatrices = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];
    const n = 10;
    for (let ix = 0; ix < n; ix++) {
      for (let iz = 0; iz < n; iz++) {
        dummy.position.set(
          ((ix + 0.5) / n - 0.5) * 2 * (SUB - 0.3),
          -0.1,
          ((iz + 0.5) / n - 0.5) * 2 * (SUB - 0.3)
        );
        dummy.updateMatrix();
        matrices.push(dummy.matrix.clone());
      }
    }
    return matrices;
  }, []);

  const traceGeometry = useMemo(() => {
    const verts: number[] = [];
    const y = 0.082;
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < PINS_PER_SIDE; i++) {
        const along = ((i + 0.5) / PINS_PER_SIDE - 0.5) * 2 * (SUB - 0.18);
        const inner = Math.max(-DIE, Math.min(DIE, along));
        if (side === 0) verts.push(inner, y, DIE, along, y, SUB - 0.14);
        else if (side === 1) verts.push(inner, y, -DIE, along, y, -(SUB - 0.14));
        else if (side === 2) verts.push(DIE, y, inner, SUB - 0.14, y, along);
        else verts.push(-DIE, y, inner, -(SUB - 0.14), y, along);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += delta * 0.4;
    // slow precession: periodically reveals the top and the BGA underside
    group.current.rotation.x = 0.2 + Math.sin(t * 0.22) * 0.95;
    group.current.position.y = Math.sin(t * 0.7) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.45, 0.7, 0]}>
      {/* substrate */}
      <mesh>
        <boxGeometry args={[SUB * 2, 0.15, SUB * 2]} />
        <meshStandardMaterial color="#1c1730" roughness={0.5} metalness={0.25} />
      </mesh>

      {/* die with generated die-shot texture */}
      <mesh position={[0, 0.135, 0]}>
        <boxGeometry args={[DIE * 2, 0.12, DIE * 2]} />
        <meshStandardMaterial
          color="#2a2440"
          map={dieTexture}
          emissive="#ffffff"
          emissiveMap={dieTexture}
          emissiveIntensity={isDark ? 0.85 : 0.6}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* traces die -> pads */}
      <lineSegments geometry={traceGeometry}>
        <lineBasicMaterial color="#c9a86a" transparent opacity={0.65} />
      </lineSegments>

      {/* gold pads at pin roots */}
      <instancedMesh
        args={[undefined, undefined, PINS_PER_SIDE * 4]}
        ref={(mesh) => {
          if (!mesh) return;
          padMatrices.forEach((m, i) => mesh.setMatrixAt(i, m));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      >
        <boxGeometry args={[0.1, 0.015, 0.14]} />
        <meshStandardMaterial {...GOLD} />
      </instancedMesh>

      {/* gold gull-wing pins */}
      <instancedMesh
        args={[undefined, undefined, PINS_PER_SIDE * 4]}
        ref={(mesh) => {
          if (!mesh) return;
          pinMatrices.forEach((m, i) => mesh.setMatrixAt(i, m));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      >
        <boxGeometry args={[0.09, 0.05, 0.24]} />
        <meshStandardMaterial {...GOLD} />
      </instancedMesh>

      {/* gold BGA ball grid on the underside */}
      <instancedMesh
        args={[undefined, undefined, 100]}
        ref={(mesh) => {
          if (!mesh) return;
          ballMatrices.forEach((m, i) => mesh.setMatrixAt(i, m));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      >
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial {...GOLD} roughness={0.2} />
      </instancedMesh>
    </group>
  );
}

export function ChipScene({ isDark }: { isDark: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 5.6], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={isDark ? 0.55 : 0.9} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={isDark ? 2.2 : 3.0}
        color="#ffffff"
      />
      <pointLight position={[-4, 3, 2]} intensity={30} color="#a78bfa" />
      <pointLight position={[3, -4, -2]} intensity={22} color="#67e8f9" />
      <Package isDark={isDark} />
    </Canvas>
  );
}
