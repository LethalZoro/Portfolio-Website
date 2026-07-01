"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { HeroPoster } from "./HeroPoster";
import { useWebGLSupport } from "./useWebGLSupport";

const FieldCanvas = dynamic(
  () => import("./FieldCanvas").then((m) => m.FieldCanvas),
  { ssr: false }
);

/**
 * Persistent WebGL layer behind the whole page. The particle field morphs
 * (network -> brain -> silicon die) and the camera drifts as the page scrolls;
 * see MorphField for the mapping.
 */
export function FieldBackground() {
  const supported = useWebGLSupport();
  const reduced = useReducedMotion();
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
    setIsMobile(
      window.innerWidth < 768 || !window.matchMedia("(pointer: fine)").matches
    );
  }, []);

  if (supported === null) return null;

  if (supported === false) {
    return (
      <div className="fixed inset-0 z-0" aria-hidden>
        <HeroPoster />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="fixed inset-0 z-0"
      aria-hidden
    >
      <FieldCanvas
        isDark={isDark}
        reduced={!!reduced}
        isMobile={isMobile}
        count={isMobile ? 4500 : 15000}
      />
      {/* readability scrim, strongest behind the hero headline */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_35%_50%,var(--bg)_0%,transparent_78%)] opacity-70"
        aria-hidden
      />
    </motion.div>
  );
}
