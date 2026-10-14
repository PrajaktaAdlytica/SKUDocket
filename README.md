# SKUDocket

Research-stage website and synthetic evidence desk for recurring US import SKUs. The site has 32 static routes, a browser-local ten-SKU demo, five proposed modules, and an 18-second Harbor to Dossier introduction. All depicted records, people, amounts, and outcomes are fictional. Nothing is filed, transmitted, screened against a live list, or written to an external system.

## Repository map

- `src/`, `build.py`: authored site content, styling, behavior, and route generator.
- `dist/`: ready-to-serve static site. The build refreshes this directory.
- `intro/`: Remotion source, moving-water harbor plate, responsive video compositions, player, and build integration.
- `brand-kit/`: full identity kit, logos, favicons, typography, tokens, illustrations, source notes, licenses, and usage guidance.
- `design/intro-directions/`: the three original intro concepts; Harbor to Dossier was selected.
- `docs/` and `screenshots/`: site planning and QA evidence.

## Build and preview

Requirements: Node.js, npm, and Python 3.

```bash
npm run build
npm run dev
```

Open `http://127.0.0.1:8770/`. `npm run build` installs the intro dependencies from `intro/package-lock.json` on a clean checkout, generates all site routes, bundles the Remotion player, copies local assets into `dist/`, and checks the route graph. The intro appears before navigation on the homepage, with play, replay, and skip controls. At the end it scrolls to the hero. Reduced-motion visitors receive a still frame and explicit controls.

To edit the intro in Remotion Studio, run `cd intro && npm ci && npm run dev`.

## Manual Vercel connection

1. In Vercel, choose **Add New → Project**, connect GitHub if prompted, and import `PrajaktaAdlytica/SKUDocket`.
2. Set **Root Directory** to repository root and **Framework Preset** to **Other**.
3. The tracked `vercel.json` supplies **Build Command** `npm run build` and **Output Directory** `dist`. Confirm these values in the import screen, then deploy.
4. Once the production URL is known, set a project environment variable `SITE_URL` to its full `https://...` origin (no trailing slash) for the **Production** environment, then redeploy. This gives every route its own correct canonical and Open Graph URL. Update it again if you attach a custom domain.
5. For a custom domain, open **Project Settings → Domains**, add the domain, then put the exact DNS records shown by Vercel into the domain registrar or DNS provider. Check the domain card until Vercel confirms it is configured.

`vercel.json` also requests trailing slashes so generated `/route/index.html` pages resolve consistently. The site intentionally retains `noindex,nofollow` and a disallowing `robots.txt` while it is a research-stage concept. Inquiry forms only create a local preview and downloadable copy; they do not collect leads. A real launch needs an authorized operator, privacy and consent implementation, a live form destination, and a review of product claims before changing those limits.

## QA

The site build checks all routes, headings, metadata, alt text, assets, and internal destinations. Browser QA covers desktop, tablet, and mobile widths; the intro playback and hero handoff; mobile navigation; synthetic queue and HX-42 dossier; sign-in and preview access; and an unsent inquiry preview. See `docs/final-qa-2026-10-14.json` for the release results.
