import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
        <p className="font-mono text-[0.72rem] text-muted">
          © {new Date().getFullYear()} {site.name} · built with Next.js, Three.js
          &amp; too much coffee
        </p>
        <a
          href="#top"
          className="font-mono text-[0.72rem] text-muted transition-colors duration-200 hover:text-accent"
        >
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
