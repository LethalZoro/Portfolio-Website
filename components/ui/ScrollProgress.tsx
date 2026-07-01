"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin accent bar at the top of the viewport tracking read progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      aria-hidden
    />
  );
}
