# Muhammad Mustafa — Portfolio

Personal portfolio: dark-first "cosmic AI lab" design with an interactive WebGL neural particle field, full light mode, and orchestrated motion.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · motion (framer-motion 12) · react-three-fiber + drei · Resend · Vercel Analytics + Speed Insights.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
```

Create `.env.local` with your Resend key (see `.env.example`):

```
RESEND_API_KEY=re_...
```

The same variable must be set in the Vercel project settings for the contact form to work in production. The form sends from `onboarding@mustafa.software` (the domain must stay verified in Resend) to the Gmail inbox.

## Editing content (no code changes needed)

All site content lives in `data/`. Components render whatever is there.

| File | Controls |
|---|---|
| `data/projects.ts` | **Projects.** Array order = display order. `featured: true` = big showcase card, `false` = compact "More on GitHub" row. Add/remove/reorder entries here only. |
| `data/experience.ts` | Jobs (top = most recent) + leadership strip |
| `data/skills.ts` | Skill groups + the marquee tool strip |
| `data/credentials.ts` | Education, publication, certifications |
| `data/site.ts` | Name, bio, roles, socials, email, hero status line, stats |

To add a project: copy an existing object in `data/projects.ts`, fill in the fields, drop a screenshot in `public/`, and set `image: "/your-file.png"`. Projects without an image automatically get generated neural-graph cover art. Push to `main` and Vercel redeploys.

## Notes for working on this repo

- The repo lives on Google Drive. `.npmrc` uses `node-linker=hoisted` + `package-import-method=copy` because pnpm's default symlink/hardlink layout breaks on Drive's virtual filesystem. **Pause Drive sync during heavy dev/builds** to avoid file-lock flakiness; long-term, prefer a local clone with GitHub as the sync mechanism.
- Theme: class-based dark mode with a pre-hydration script in `app/layout.tsx` (no flash of wrong theme). Tokens are OKLCH CSS variables in `app/globals.css`, mapped to Tailwind via `@theme inline`.
- The WebGL hero (`components/three/`) falls back to a static SVG poster without WebGL, freezes under `prefers-reduced-motion`, drops particle count on mobile, and pauses off-screen.
