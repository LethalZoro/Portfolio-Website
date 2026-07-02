"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";
import { contactSchema } from "@/lib/contact-schema";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { Magnetic } from "@/components/motion/Magnetic";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const inputClasses =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-[0.95rem] text-text placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none disabled:opacity-50";

function validateField(field: keyof Errors, value: string): string | undefined {
  const shape = contactSchema.shape[field];
  const result = shape.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.target.name as keyof Errors;
    if (!["name", "email", "subject", "message"].includes(field)) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, e.target.value) }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-5 pb-[clamp(3rem,6vh,5rem)] pt-[clamp(6rem,14vh,10rem)] sm:px-8"
    >
      <SectionHeading index="06" title="Contact" />

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <FadeUp>
            <h3 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
              Let&rsquo;s build
              <br />
              something<span className="text-accent">.</span>
            </h3>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="mt-6 max-w-[42ch] text-muted">
              Have an AI product to ship, a model to tame, or just want to talk
              shop? My inbox is open.
            </p>
          </FadeUp>
          <FadeUp delay={0.14}>
            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={copyEmail}
                className="group flex items-center gap-3 font-mono text-[0.9rem] text-text transition-colors duration-200 hover:text-accent"
              >
                {site.email}
                <span className="font-mono text-[0.7rem] text-muted transition-colors duration-200 group-hover:text-accent-2">
                  {copied ? "copied ✓" : "click to copy"}
                </span>
              </button>
              {site.phone && (
                <p className="font-mono text-[0.9rem] text-muted">{site.phone}</p>
              )}
              <div className="flex gap-5 pt-2">
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
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-72 flex-col items-start justify-center rounded-2xl border border-accent/40 bg-surface p-8"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-bg">
                  ✓
                </span>
                <h4 className="font-display-sub text-xl">Message sent.</h4>
                <p className="mt-2 text-muted">
                  Thanks for reaching out. I&rsquo;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-mono text-[0.8rem] text-accent hover:text-accent-2"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={onSubmit}
                noValidate
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block font-mono text-[0.72rem] text-muted">
                      NAME
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      onBlur={onBlur}
                      disabled={status === "submitting"}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={inputClasses}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p id="err-name" className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block font-mono text-[0.72rem] text-muted">
                      EMAIL
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onBlur={onBlur}
                      disabled={status === "submitting"}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={inputClasses}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="err-email" className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="mb-1.5 block font-mono text-[0.72rem] text-muted">
                    SUBJECT <span className="opacity-60">(optional)</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    onBlur={onBlur}
                    disabled={status === "submitting"}
                    className={inputClasses}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block font-mono text-[0.72rem] text-muted">
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    onBlur={onBlur}
                    disabled={status === "submitting"}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    className={`${inputClasses} resize-y`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p id="err-message" className="mt-1 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Honeypot: hidden from humans, tempting to bots */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-400"
                    role="alert"
                  >
                    Something went wrong sending your message. Try again, or email me directly.
                  </motion.p>
                )}

                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3 font-medium text-bg shadow-[0_0_28px_var(--glow)] transition-[transform,box-shadow,opacity] duration-200 hover:scale-[1.03] hover:shadow-[0_0_44px_var(--glow)] active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/40 border-t-bg" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>Send message</>
                    )}
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  );
}
