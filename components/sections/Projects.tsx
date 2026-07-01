"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import type { Project, ProjectCategory } from "@/lib/types";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { Chip } from "@/components/ui/Chip";
import { CoverArt } from "@/components/ui/CoverArt";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

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

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-[0_8px_48px_var(--glow)] ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div className={`flex flex-col ${wide ? "md:flex-row" : ""}`}>
        <div
          className={`relative aspect-[8/5] overflow-hidden border-b border-line ${
            wide ? "md:aspect-auto md:w-1/2 md:border-b-0 md:border-r" : ""
          }`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              unoptimized={project.image.endsWith(".gif")}
            />
          ) : (
            <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.04]">
              <CoverArt slug={project.slug} title={project.title} />
            </div>
          )}
        </div>

        <div className={`flex flex-col p-6 sm:p-7 ${wide ? "md:w-1/2 md:justify-center" : ""}`}>
          <h3 className="font-display-sub text-xl sm:text-2xl">{project.title}</h3>
          <p className="mt-2 text-[0.95rem] text-muted">{project.summary}</p>

          {project.bullets.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {project.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-muted">
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

          <div className="mt-5 flex items-center gap-5">
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

      <FadeUp className="mb-10 flex flex-wrap gap-2">
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

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} wide={i < 2} />
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
