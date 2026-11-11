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
