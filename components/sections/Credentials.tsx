import { certifications, education, publication } from "@/data/credentials";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";

export function Credentials() {
  return (
    <section
      id="credentials"
      className="mx-auto max-w-6xl px-5 py-[clamp(5rem,12vh,9rem)] sm:px-8"
    >
      <SectionHeading index="05" title="Credentials" />

      <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div className="space-y-10">
          {education.map((edu, i) => (
            <FadeUp key={edu.school} delay={i * 0.07}>
              <div>
                <h3 className="font-display-sub text-xl">{edu.school}</h3>
                <p className="mt-1 text-text">{edu.degree}</p>
                <p className="mt-0.5 font-mono text-[0.75rem] text-muted">{edu.period}</p>
                <ul className="mt-3 space-y-1.5">
                  {edu.detail.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[0.9rem] text-muted">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}

          <FadeUp delay={0.15}>
            <figure className="rounded-xl border border-line bg-surface p-6">
              <figcaption className="mb-2 font-mono text-[0.72rem] text-accent">
                PUBLICATION
              </figcaption>
              <blockquote className="text-[0.95rem] leading-relaxed">
                &ldquo;{publication.title}&rdquo;
              </blockquote>
              <p className="mt-3 text-sm italic text-muted">{publication.venue}</p>
              <p className="mt-1 font-mono text-[0.72rem] text-muted">{publication.authors}</p>
            </figure>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div>
            <h3 className="font-display-sub mb-5 text-lg">Certifications</h3>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <span className="text-[0.9rem]">{cert.title}</span>
                  <span className="shrink-0 font-mono text-[0.7rem] text-muted">
                    {cert.provider}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[0.72rem] text-muted">
              IELTS Band 8 · English (professional) · Urdu (native)
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
