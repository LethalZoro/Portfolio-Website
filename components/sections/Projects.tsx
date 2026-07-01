"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import type { Project, ProjectCategory } from "@/lib/types";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { Chip } from "@/components/ui/Chip";
import { CoverArt } from "@/components/ui/CoverArt";

const FILTERS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "web", label: "Full-Stack" },
  { key: "hardware", label: "Hardware" },
];

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H8M17 7v9" />
    </svg>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden border-b border-line"
    >
      {/* neural cover art washes in from the right on hover */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-0 transition-opacity duration-300 group-hover:opacity-25 [mask-image:linear-gradient(to_left,black,transparent)]"
        aria-hidden
      >
        <CoverArt slug={project.slug} title="" />
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="relative grid w-full grid-cols-[2.5rem_1fr_1.5rem] items-baseline gap-x-4 py-7 text-left sm:gap-x-6 md:grid-cols-[3.5rem_1fr_15rem_1.5rem]"
      >
        <span className="font-mono text-sm text-accent" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <h3 className="font-display-sub text-[clamp(1.4rem,3.2vw,2.2rem)] transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1.5 max-w-[58ch] text-[0.95rem] text-muted">
            {project.summary}
          </p>
        </div>

        <span className="hidden self-center text-right font-mono text-[0.72rem] leading-relaxed text-muted md:block">
          {project.tech.slice(0, 3).join(" · ")}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="justify-self-end self-center text-muted transition-colors duration-200 group-hover:text-accent"
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      <div
        className={`relative grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pl-14 pr-4 md:pl-20 md:pr-8">
            {project.bullets.length > 0 && (
              <ul className="max-w-[68ch] space-y-2">
                {project.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-muted">
                    <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            {(project.live || project.repo) && (
              <div className="mt-6 flex items-center gap-6">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 font-mono text-[0.8rem] text-accent transition-colors duration-200 hover:text-accent-2"
                  >
                    Live <ArrowIcon />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 font-mono text-[0.8rem] text-muted transition-colors duration-200 hover:text-accent"
                  >
                    Repo <ArrowIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const featured = projects.filter(
    (p) => p.featured && (filter === "all" || p.category === filter)
  );
  const more = projects.filter(
    (p) => !p.featured && (filter === "all" || p.category === filter)
  );

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-5 py-[clamp(5rem,12vh,9rem)] sm:px-8"
    >
      <SectionHeading index="03" title="Projects" />

      <FadeUp className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`rounded-full border px-4 py-1.5 font-mono text-[0.8rem] transition-colors duration-200 ${
              filter === f.key
                ? "border-accent bg-accent text-bg"
                : "border-line text-muted hover:border-accent/60 hover:text-text"
            }`}
          >
            {f.label}
          </button>
        ))}
      </FadeUp>

      <motion.div layout className="border-t border-line">
        <AnimatePresence mode="popLayout">
          {featured.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {more.length > 0 && (
        <FadeUp className="mt-16">
          <h3 className="mb-5 font-mono text-sm text-muted">More on GitHub</h3>
          <ul className="divide-y divide-line border-y border-line">
            <AnimatePresence mode="popLayout">
              {more.map((project) => (
                <motion.li
                  layout
                  key={project.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <a
                    href={project.repo ?? site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5 transition-colors duration-200 hover:bg-surface"
                  >
                    <span className="font-medium">{project.title}</span>
                    <span className="flex-1 text-sm text-muted">{project.summary}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-muted transition-colors duration-200 group-hover/link:text-accent">
                      {project.repo ? "Repo" : "GitHub"} <ArrowIcon />
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-5 inline-flex items-center gap-1.5 font-mono text-[0.8rem] text-accent transition-colors duration-200 hover:text-accent-2"
          >
            Full profile on GitHub <ArrowIcon />
          </a>
        </FadeUp>
      )}
    </section>
  );
}
