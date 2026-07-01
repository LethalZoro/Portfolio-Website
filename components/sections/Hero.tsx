"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { site } from "@/data/site";
import { Magnetic } from "@/components/motion/Magnetic";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** CSS-animated word reveal: paints and animates before hydration (LCP-safe). */
function CssReveal({ text, delay }: { text: string; delay: number }) {
  return (
    <span aria-hidden>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
          aria-hidden
        >
          <span
            className="anim-rise inline-block"
            style={{ animationDelay: `${delay + i * 0.055}s` }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/** Decode effect: text churns through glyphs and resolves left to right. */
function useScramble(target: string) {
  const [display, setDisplay] = useState(target);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(target);
      return;
    }
    let frame = 0;
    const total = 16;
    const id = setInterval(() => {
      frame++;
      const progress = frame / total;
      if (frame >= total) {
        setDisplay(target);
        clearInterval(id);
        return;
      }
      setDisplay(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i / target.length < progress - 0.12) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
    }, 32);
    return () => clearInterval(id);
  }, [target, reduced]);

  return display;
}

function RoleCycler({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [roles.length]);
  const display = useScramble(roles[index] ?? "");
  return <span className="text-accent whitespace-nowrap">{display}</span>;
}

export function Hero() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  // depth on scroll-out: content drifts down and fades while the field stays
  const contentY = useTransform(scrollY, [0, 700], [0, 130]);
  const contentOpacity = useTransform(scrollY, [0, 550], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="cosmic-noise relative flex min-h-svh flex-col justify-center"
    >
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        <p
          className="anim-fade-up mb-5 font-mono text-[0.8rem] text-muted"
          style={{ animationDelay: "0.1s" }}
        >
          {site.statusLine}
        </p>

        <h1
          aria-label="Muhammad Mustafa"
          className="font-display text-[clamp(2.75rem,9vw,6.5rem)] text-text"
        >
          <CssReveal text="Muhammad" delay={0.15} />
          <br />
          <CssReveal text="Mustafa" delay={0.3} />
        </h1>

        <p
          className="anim-fade-up font-display-sub mt-6 text-[clamp(1.25rem,2.6vw,1.9rem)] text-muted"
          style={{ animationDelay: "0.55s" }}
        >
          AI Engineer building <RoleCycler roles={site.roles} />
        </p>

        <p
          className="anim-fade-up mt-6 max-w-[46ch] text-muted"
          style={{ animationDelay: "0.68s" }}
        >
          {site.shortBio}
        </p>

        <div
          className="anim-fade-up mt-9 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.8s" }}
        >
          <Magnetic>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-bg shadow-[0_0_28px_var(--glow)] transition-[transform,box-shadow] duration-200 hover:scale-[1.03] hover:shadow-[0_0_44px_var(--glow)] active:scale-[0.98]"
            >
              View work
              <span aria-hidden>↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-text transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </Magnetic>

          <span className="mx-2 hidden h-5 w-px bg-line sm:block" aria-hidden />

          <div className="flex items-center gap-5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.8rem] text-muted transition-colors duration-200 hover:text-accent-2"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolledPast ? 0 : 1 }}
        transition={{ duration: 0.3, delay: scrolledPast ? 0 : 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block text-muted"
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  );
}
