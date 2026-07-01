"use client";

import { Canvas } from "@react-three/fiber";
import { MorphField } from "./MorphField";

export function FieldCanvas({
  isDark,
  reduced,
  isMobile,
  count,
}: {
  isDark: boolean;
  reduced: boolean;
  isMobile: boolean;
  count: number;
}) {
  return (
    <Canvas
      frameloop={reduced ? "demand" : "always"}
      dpr={isMobile ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 14], fov: 42 }}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <MorphField
        isDark={isDark}
        interactive={!isMobile && !reduced}
        count={count}
      />
    </Canvas>
  );
}
