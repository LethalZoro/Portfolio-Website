"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experiences, leadership } from "@/data/experience";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-5 py-[clamp(5rem,12vh,9rem)] sm:px-8"
    >
      <SectionHeading index="02" title="Experience" />

      <div ref={railRef} className="relative">
        {/* rail track + scroll-drawn fill */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line" aria-hidden />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
          aria-hidden
        />

        <ol className="space-y-14">
          {experiences.map((exp) => (
            <li key={exp.company} className="relative pl-10 sm:pl-14">
              <span
                className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg shadow-[0_0_14px_var(--glow)]"
                aria-hidden
              />
              <FadeUp>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {exp.logo && (
                    <Image
                      src={exp.logo}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-md border border-line bg-surface object-contain"
                    />
                  )}
                  <h3 className="font-display-sub text-xl sm:text-2xl">
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 hover:text-accent"
                    >
                      {exp.company}
                    </a>
                  </h3>
                  <span className="font-mono text-[0.75rem] text-muted">
                    {exp.period} · {exp.location} · {exp.mode}
                  </span>
                </div>

                {exp.roles ? (
                  <div className="mt-3 space-y-1.5">
                    {exp.roles.map((role) => (
                      <div key={role.title} className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-medium text-text">{role.title}</span>
                        <span className="font-mono text-[0.72rem] text-accent-2">
                          {role.period} · {role.type}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 font-medium text-text">{exp.role}</p>
                )}

                <ul className="mt-4 max-w-[68ch] space-y-2">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                      <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>

      <FadeUp className="mt-14 border-t border-line pt-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="font-mono text-[0.75rem] text-muted">Also:</span>
          {leadership.map((role) => (
            <span key={role.org} className="text-sm text-muted">
              <span className="text-text">{role.org}</span> · {role.role}{" "}
              <span className="font-mono text-[0.72rem]">({role.period})</span>
            </span>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
