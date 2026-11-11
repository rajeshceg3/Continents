# World of Wonder

A seven-continent Leaflet map guide, with nine guide steps per continent, selected landmark pins, quizzes, a local passport and browser-local journals.

## Run

`npm ci && npm run build`, then serve `dist` with any static server. `npm test` runs a Chromium smoke/matrix check at 390px. Set `WIDTH=1440` for desktop. Browser executable defaults to `/usr/bin/google-chrome`.

## Hosting

Static output: `dist`, build command: `npm run build`. Intended free GitHub-connected Cloudflare Pages deployment. Inherited site: https://rajeshceg3.github.io/Continents/ . No new GitHub Pages deployment is required.

## Data and limitations

- Uses the seven-continent model. Australia is the continent here; Oceania is broader.
- Background links to Britannica and British Antarctic Survey are shown in each guide.
- OpenStreetMap tiles use the public key-free service with visible attribution and copyright link. This service is best effort, without guaranteed availability. No bulk download or offline prefetch.
- Landmark points are approximate. Web Mercator clips the poles, so Antarctica is not shown in full. The geography descriptions and coordinates remain available.
- Sample weather is one coordinate, never a continent-wide average. Open-Meteo failures are labelled unavailable.
- Inherited Unsplash landscape photos are generic illustrations, not verified pictures of adjacent landmarks. They remain labelled that way.
- Passport/journal data stays in this browser. Clearing site data erases it.
- Sound starts off. Sound, motion and light/dark controls are separate. Synthesized greeting is a separate explicit play action.

See `verification/README.md` for executed tests and remaining listening qualification.
