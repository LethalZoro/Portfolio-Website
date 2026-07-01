"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useReducedMotion } from "motion/react";
import { NeuralField } from "./NeuralField";
import { HeroPoster } from "./HeroPoster";
import { useWebGLSupport } from "./useWebGLSupport";

export function HeroCanvas() {
  const supported = useWebGLSupport();
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() =>
      setIsDark(root.classList.contains("dark"))
    );
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || !window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!!entry?.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [supported]);

  if (supported === null) return null;
  if (supported === false) return <HeroPoster />;

  const animate = visible && !reduced;

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="absolute inset-0"
      aria-hidden
    >
      <Canvas
        frameloop={animate ? "always" : "demand"}
        dpr={isMobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [0, 0, 14], fov: 42 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        style={{ pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <NeuralField
          isDark={isDark}
          interactive={!isMobile && !reduced}
          count={isMobile ? 1100 : 2800}
        />
      </Canvas>
      {/* readability scrim over the field, strongest behind the headline */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_35%_50%,var(--bg)_0%,transparent_78%)] opacity-75"
        aria-hidden
      />
    </motion.div>
  );
}
