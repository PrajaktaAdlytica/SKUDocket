SKUDocket — Harbor to Dossier
Selected direction: 1. User refinement: moving water.

LOCAL PREVIEWS
Integrated website: run npm run build and npm run dev from repository root, then open http://127.0.0.1:8770/
Standalone context preview: http://localhost:3089
Editable Studio: http://localhost:3088/HarborToDossier
Mobile composition: http://localhost:3088/HarborToDossierMobile

FORMAT
18 seconds, 60 fps. Desktop composition: 1920 x 1080.
Mobile composition: 1080 x 1440, with rearranged shots and a focused reviewer panel.
The harbor plate is a generated raster environment; interface text and brand assets are separate, sharply rendered layers.
This is an interactive video composition bundled into the static website, not an exported MP4.

WATER
A deterministic WebGL shader independently moves wavelets and existing sun-reflection highlights.
The water mask follows the shoreline; hull, sky, cranes and quay remain fixed when the camera is locked.
The camera movement is a separate virtual dolly with focus changes.
The locked-camera WaterMotionStudy allows water motion to be inspected separately.

STORY
0.00–4.25: dawn harbor and opening.
3.80–9.25: three source layers arrive one by one.
8.45–14.45: provisional rationales and human return-for-evidence reason.
13.85–18.00: draft packet, source trail and open questions.

CONTROLS
Pause/play, Replay, Skip to hero. Native page scrolling is retained.
Playback is silent, pauses offscreen and when hidden, and starts on a still opening frame for reduced-motion users.
Playback ends on the packet frame and automatically scrolls to the homepage hero. Explicit play/replay remains available for reduced-motion users.

RUN
npm install
npx remotion studio --no-open --port 3088
npm run preview:site

SOURCE
Scene files are in src/. Assets are in public/.
build-site.mjs places the player before the navigation and homepage hero in dist/index.html.
preview-site.mjs remains a standalone local preview tool.
The harbor renders without full-frame white overlays; portrait captions use local ink panels for legibility.
The earlier Sites deployment has not been changed. Manual Vercel connection remains to be done.

VALIDATION
ESLint and TypeScript pass.
Locked-camera water comparison: see qa/water-motion-check.json.
Browser preview verifies the four shots and playback controls.
All depicted product data remains synthetic; no actual filing, approval, or transmission.
