# My Degree — Vercel edition

A static React + Vite app. No account, API, server, database, environment variables, Supabase, Neon, Cloudflare or ChatGPT dependency.

## Deploy to Vercel

1. Extract this folder, then put its contents in your own Git repository.
2. Import that repository into Vercel. Select this folder as the project root if needed.
3. Framework: **Vite**. Build command: **npm run build**. Output directory: **dist**. These are also in vercel.json.
4. Deploy. No environment variables are needed. Use the same production URL each time you track progress.

Official deployment guide: https://vercel.com/docs/frameworks/frontend/vite

Alternatively, after installing dependencies, run `npx vercel` from this directory and follow the Vercel prompts.

## Run locally

Node.js 22.13+ (Node 24 recommended).

```sh
npm ci
npm run dev
npm test
npm run build
```

The included `dist` is the verified production build. The source is also included so Vercel can rebuild it.

## How saving works

- Your existing 129-credit record is preloaded on first use.
- Every successful checkbox change and PE update is written to localStorage immediately.
- Refreshing, closing the tab, or restarting the browser preserves progress in ordinary browsing mode.
- Each browser profile, device and website origin has its own data. A new Vercel preview URL or a different domain is a different storage area. Use your stable production URL.
- Clearing site data, using private/incognito mode, or browser storage eviction can remove progress. Keep exports as backups.
- Export progress downloads a JSON file. Import backup validates that file and asks you to restore it before replacing local progress. It accepts exports from the previous hosted tracker too.
- To move devices or domains: export on the old one, transfer the JSON file, then import on the new one. There is no automatic cross-device synchronization.
- The app does not send progress to a server. Its initial course data and display name are bundled in the website source and are visible to anyone who can access your deployment. Fonts may load from Google Fonts.

## Credit assumptions

Targets: HS 14, BS 27, ES 28, PC 51, PE 16, OE 12, EEC 16, MC 4. Initial earned: 14, 27, 28, 45, 6, 3, 3, 3 respectively. Data Science and Cyber Law are PE as confirmed by you; TSAF and DIPT are PC; Yoga and Modern Trends are OE. The PE catalogue remains hidden.

The original curriculum has an unexplained MC 1-credit gap, EEC Paper Publication allocation ambiguity, and no explicit C++/C# choice rule despite ES credits already being met. These remain explained in the tracker. Source notes are included in the app; course data retains aliases and provenance.

Sources: R2024-Curriculum-AIML (1).pdf; Curriculum-List-of-Open-Electives.pdf; sem1.pdf, sem2.pdf, sem3.pdf, sem4.pdf; your six additional completions and category confirmations.
