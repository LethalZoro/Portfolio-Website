import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { FadeUp } from "@/components/motion/FadeUp";
import { Chip } from "@/components/ui/Chip";
import { CoverArt } from "@/components/ui/CoverArt";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Footer } from "@/components/layout/Footer";

const CATEGORY_LABEL = { ai: "AI / ML", web: "Full-Stack", hardware: "Hardware" } as const;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Muhammad Mustafa`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project?.caseStudy) notFound();
  const { caseStudy } = project;
  const others = projects.filter((p) => p.caseStudy && p.slug !== slug);

  return (
    <MotionProvider>
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/#projects"
            className="font-mono text-[0.8rem] text-muted transition-colors duration-200 hover:text-accent"
          >
            ← All projects
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8">
        <FadeUp>
          <div className="relative h-52 overflow-hidden rounded-2xl border border-line sm:h-72">
            <CoverArt slug={project.slug} title={`${project.title} artwork`} />
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <p className="mt-10 font-mono text-[0.75rem] text-accent">
            {CATEGORY_LABEL[project.category]} · case study
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.4rem,7vw,4.5rem)]">
            {project.title}
          </h1>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p className="mt-6 text-lg leading-relaxed text-muted">{caseStudy.intro}</p>
        </FadeUp>

        <div className="mt-14 space-y-12">
          {caseStudy.sections.map((section, i) => (
            <FadeUp key={section.heading}>
              <section className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm text-accent" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display-sub text-2xl">{section.heading}</h2>
                  <p className="mt-3 max-w-[68ch] leading-relaxed text-muted">
                    {section.body}
                  </p>
                </div>
              </section>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-14 border-t border-line pt-8">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-bg shadow-[0_0_28px_var(--glow)] transition-[transform,box-shadow] duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Open the live app ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-text transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                View the code ↗
              </a>
            )}
          </div>
        </FadeUp>

        {others.length > 0 && (
          <FadeUp className="mt-20">
            <h2 className="mb-4 font-mono text-sm text-muted">More case studies</h2>
            <ul className="divide-y divide-line border-y border-line">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4 transition-colors duration-200 hover:bg-surface"
                  >
                    <span className="font-display-sub text-lg">{p.title}</span>
                    <span className="flex-1 text-sm text-muted">{p.summary}</span>
                    <span className="font-mono text-[0.75rem] text-accent">Read →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>
        )}
      </main>

      <Footer />
    </MotionProvider>
  );
}
