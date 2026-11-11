# Verify Continents
Continents - key-free map with readable continent guides.
## Launch
`npm install`, `npm run build` (scripts/build.cjs produces dist/), serve dist/.
## Doctor
`python3 .cursor/skills/verify-continents/verify.py` - a few minutes (drives every guide step in real Chromium).
## Drive
Builds dist/, then runs the repo's own verification/check.cjs: 126 guide steps across 7 continents and 2 themes asserting panel visibility, inert state, attribution, 14px font floor, no overflow, quiz/stamps, journal persistence, Reset and silent start. External tiles/photos/weather are mocked by the check itself.
## Evidence
`.cursor/skills/verify-continents/evidence.json` plus verification/output/proof-*.json.
## Cleanup
The check kills its static server.
## Known boundaries
Default width 390 via VERIFY_WIDTH; other widths via env.
