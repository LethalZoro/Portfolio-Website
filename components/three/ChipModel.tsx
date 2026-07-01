"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useWebGLSupport } from "./useWebGLSupport";

const ChipScene = dynamic(() => import("./ChipScene").then((m) => m.ChipScene), {
  ssr: false,
});

/**
 * Lazy mount wrapper: the chip scene only loads and renders once scrolled
 * near the viewport. Decorative; renders nothing without WebGL.
 */
export function ChipModel() {
  const ref = useRef<HTMLDivElement>(null);
  const supported = useWebGLSupport();
  const [near, setNear] = useState(false);
  const [isDark, setIsDark] = useState(true);

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
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (supported === false) return null;

  return (
    <div ref={ref} className="mb-8" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: near ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="h-72 sm:h-80"
      >
        {near && <ChipScene isDark={isDark} />}
      </motion.div>
      <p className="mt-1 text-center font-mono text-[0.7rem] text-muted">
        the hardware end of the stack
      </p>
    </div>
  );
}
