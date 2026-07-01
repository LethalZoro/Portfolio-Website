"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { CountUp } from "@/components/motion/CountUp";

export function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  // pointer-follow 3D tilt, fine-pointer only
  const rotateX = useSpring(0, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 18 });

  function onTilt(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 8);
  }

  function onTiltEnd() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-[clamp(5rem,12vh,9rem)] sm:px-8">
      <SectionHeading index="01" title="About" />

      <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        <div ref={imgRef} className="relative mx-auto w-full max-w-sm md:mx-0">
          <motion.div
            style={{ y, rotateX, rotateY, transformPerspective: 900 }}
            onPointerMove={onTilt}
            onPointerLeave={onTiltEnd}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-2xl bg-glow blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-line">
              <Image
                src="/Me-pic.png"
                alt="Muhammad Mustafa"
                width={480}
                height={560}
                className="w-full object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-color" aria-hidden />
            </div>
          </motion.div>
        </div>

        <div>
          <FadeUp>
            <p className="max-w-[68ch] leading-relaxed text-text">{site.bio}</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="mt-5 max-w-[68ch] text-muted">{site.personalityLine} 🎮</p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {site.stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={0.1 + i * 0.07}>
                <div>
                  <div className="font-display text-[clamp(1.9rem,4vw,3rem)] text-accent">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 font-mono text-[0.75rem] leading-snug text-muted">
                    {stat.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
