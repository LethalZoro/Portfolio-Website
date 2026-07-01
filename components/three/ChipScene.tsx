"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural silicon package: substrate, glowing die, gull-wing pins, and
 * traces, all generated in code (no downloaded model). Floats and leans
 * toward the pointer.
 */

const PINS_PER_SIDE = 12;
const SUB = 1.55; // substrate half-size
const DIE = 0.72; // die half-size

function Package({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);

  const pinMatrices = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < PINS_PER_SIDE; i++) {
        const along = ((i + 0.5) / PINS_PER_SIDE - 0.5) * 2 * (SUB - 0.18);
        const out = SUB + 0.14;
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

  const traceGeometry = useMemo(() => {
    const verts: number[] = [];
    const y = 0.075;
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < PINS_PER_SIDE; i++) {
        if (i % 2 === 0) continue; // sparse traces read cleaner
        const along = ((i + 0.5) / PINS_PER_SIDE - 0.5) * 2 * (SUB - 0.18);
        const inner = Math.max(-DIE, Math.min(DIE, along));
        if (side === 0) verts.push(inner, y, DIE, along, y, SUB - 0.05);
        else if (side === 1) verts.push(inner, y, -DIE, along, y, -(SUB - 0.05));
        else if (side === 2) verts.push(DIE, y, inner, SUB - 0.05, y, along);
        else verts.push(-DIE, y, inner, -(SUB - 0.05), y, along);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  const dieEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(DIE * 2, 0.12, DIE * 2)),
    []
  );

  const violet = isDark ? "#a78bfa" : "#6d28d9";
  const cyan = isDark ? "#67e8f9" : "#0e7490";

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += delta * 0.3;
    group.current.position.y = Math.sin(t * 0.8) * 0.07;
    // lean toward the pointer
    const targetX = 0.45 + state.pointer.y * -0.18;
    const targetZ = state.pointer.x * 0.12;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 4, 1);
    group.current.rotation.z += (targetZ - group.current.rotation.z) * Math.min(delta * 4, 1);
  });

  return (
    <group ref={group} rotation={[0.45, 0.7, 0]}>
      {/* substrate */}
      <mesh>
        <boxGeometry args={[SUB * 2, 0.14, SUB * 2]} />
        <meshStandardMaterial
          color={isDark ? "#241f38" : "#3b3358"}
          roughness={0.55}
          metalness={0.35}
        />
      </mesh>

      {/* die */}
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[DIE * 2, 0.12, DIE * 2]} />
        <meshStandardMaterial
          color="#0d0b16"
          roughness={0.25}
          metalness={0.6}
          emissive={violet}
          emissiveIntensity={isDark ? 0.5 : 0.35}
        />
      </mesh>
      <lineSegments position={[0, 0.13, 0]} geometry={dieEdges}>
        <lineBasicMaterial color={cyan} transparent opacity={0.9} />
      </lineSegments>

      {/* traces */}
      <lineSegments geometry={traceGeometry}>
        <lineBasicMaterial color={violet} transparent opacity={0.75} />
      </lineSegments>

      {/* pins */}
      <instancedMesh args={[undefined, undefined, PINS_PER_SIDE * 4]} ref={(mesh) => {
        if (!mesh) return;
        pinMatrices.forEach((m, i) => mesh.setMatrixAt(i, m));
        mesh.instanceMatrix.needsUpdate = true;
      }}>
        <boxGeometry args={[0.09, 0.06, 0.26]} />
        <meshStandardMaterial
          color={isDark ? "#8f8aa8" : "#6f6a88"}
          roughness={0.3}
          metalness={0.9}
        />
      </instancedMesh>
    </group>
  );
}

export function ChipScene({ isDark }: { isDark: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.1, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 5, 3]} intensity={40} color={isDark ? "#c4b5fd" : "#ffffff"} />
      <pointLight position={[-4, 2, -3]} intensity={25} color={isDark ? "#67e8f9" : "#0e7490"} />
      <Package isDark={isDark} />
    </Canvas>
  );
}
