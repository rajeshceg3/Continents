# Repair verification in progress

Pre-deployment verification.

- Seven continents, nine guide steps, two themes: 126 states per width.
- Chromium 390 and 1440 complete functional runs passed after camera/scroll/tooltip cleanup.
- Tests mock map tiles and photos, and sample weather, to avoid automated tile browsing. These prove layout and function, not real tile/photo availability.
- Actual bounded initial map views loaded key-free OpenStreetMap with visible attribution. Full live hosting remains to be checked.
- Audio: actual 14-second output captured, opt-in, disposal and replay checked. Listening sign-off remains open.
- Measured 688 visible UI text samples across 42 screens at 390px/1440px using glyph-mask/backdrop pixels. Minimum ratio 4.75:1. The low-contrast fact labels, gradient headings, dark landmark cards and toast were repaired. Map tile labels are third-party rendered raster content, not covered by UI text measurements.
- Gallery photos remain generic illustrations, explicitly not verified views of the adjacent places.
- Cloudflare Pages GitHub-backed hosting is the required route while Vercel is capped. No spend.

Background sources linked in each guide include Britannica continent pages and British Antarctic Survey. OpenStreetMap attribution and copyright link remain visible. Map projection clips Antarctica at the poles, and landmark coordinates are approximate.

A 320px safety-width matrix also passed all 126 states. Contrast capture can be run with `WIDTH=390 node verification/contrast-capture.cjs` and `WIDTH=1440 node verification/contrast-capture.cjs`, followed by `python verification/contrast-measure.py` (Pillow/numpy required). The external map-label raster is excluded from the UI text claim.

## Explicit Atlas controls, November 14, 2026

- Atlas is one explicit disclosure, not timer/hover/Pin. Seven visible continent buttons replace the select.
- Bounded story/Atlas surfaces and 44px controls work at 320px; map camera, continent content, sound and world effects are unchanged.
- Normal and reduced-motion functional runs: 320, 390, 1280 and 1440px, each covering 126 states, both themes, quizzes, stamps, journal persistence, zoom/reset and silent start. CI runs both motion settings at 390/1440.
- Additional real-network touch/keyboard checks cover a 320x668 viewport, all nine Europe steps and reading ends, Atlas focus wrap, Escape/return focus, passport, resize between phone and desktop, and visible attribution.
- Narrow passport layout and modal pointer/focus boundaries are included. Inactive modals cannot intercept clicks while fading out.
- Physical iPhone/Safari and live OS-preference changes are not verified. The existing app samples the OS motion preference on load; no motion-policy adoption is included here.
