"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Trailing cursor ring: follows the pointer with spring lag and expands over
 * interactive elements. Fine-pointer devices only; native cursor stays.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 34 });
  const sy = useSpring(y, { stiffness: 420, damping: 34 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setActive(
        !!target?.closest?.("a, button, input, textarea, [role='button']")
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      aria-hidden
    >
      <motion.div
        animate={{ scale: active ? 1.9 : 1, opacity: active ? 0.9 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="-ml-[14px] -mt-[14px] h-7 w-7 rounded-full border border-accent"
      />
    </motion.div>
  );
}
