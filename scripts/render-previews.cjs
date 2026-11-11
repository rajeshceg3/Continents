// Offline WAV previews of the exact continent ambience synthesis.
const fs = require('fs');
const M = require('../js/continent-sound.js');
const SR = 44100, SECONDS = 45, MASTER = 0.9;
function resolveOut() {
  if (process.env.AUDIO_OUT) return process.env.AUDIO_OUT;
  try { fs.mkdirSync('/downloads/continents-audio', { recursive: true }); return '/downloads/continents-audio'; } catch { return 'verification/output/continents-audio'; }
}
const OUT = resolveOut();
fs.mkdirSync(OUT, { recursive: true });
const rng = M.DSP.makeRng(20261111);
const BEDS = { surf: M.DSP.renderSurfLoop, wind: M.DSP.renderWindLoop, rustle: M.DSP.renderRustleLoop };
const VOICES = { koel: M.DSP.renderKoel, gull: M.DSP.renderGull, bell: M.DSP.renderBell, dove: M.DSP.renderDove, kite: M.DSP.renderKite, nightjar: M.DSP.renderNightjar, cuckoo: M.DSP.renderCuckoo, coppersmith: M.DSP.renderCoppersmith, iceGroan: M.renderIceGroan };
function slug(id) { return id.toLowerCase().replace(/[^a-z]+/g, '-'); }
for (const place of M.CONTINENT_PLACES) {
  const left = new Float32Array(SR * SECONDS), right = new Float32Array(SR * SECONDS);
  for (const bed of place.beds) {
    const d = BEDS[bed.type](SR, bed.params, rng);
    for (let i = 0; i < left.length; i++) { left[i] += d.left[i % d.left.length] * bed.gain; right[i] += d.right[i % d.right.length] * bed.gain; }
  }
  if (place.voices.length) {
    const total = place.voices.reduce((s, v) => s + v.weight, 0);
    const [lo, hi] = place.voiceGap || [20, 45];
    let t = 1 + rng() * lo;
    while (t < SECONDS - 4) {
      let r = rng() * total, v = place.voices[place.voices.length - 1];
      for (const cand of place.voices) { r -= cand.weight; if (r <= 0) { v = cand; break; } }
      const data = VOICES[v.kind](SR, rng, v.params || {});
      const g = v.gain * (0.7 + rng() * 0.6), pan = rng() * 1.4 - 0.7;
      const gl = g * Math.min(1, 1 - pan * 0.5), gr = g * Math.min(1, 1 + pan * 0.5);
      const s0 = Math.floor(t * SR);
      for (let i = 0; i < data.length && s0 + i < left.length; i++) { left[s0 + i] += data[i] * gl; right[s0 + i] += data[i] * gr; }
      t += lo + rng() * (hi - lo);
    }
  }
  const n = left.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.max(-1, Math.min(1, left[i] * MASTER)) * 32767, 44 + i * 4);
    buf.writeInt16LE(Math.max(-1, Math.min(1, right[i] * MASTER)) * 32767, 44 + i * 4 + 2);
  }
  fs.writeFileSync(`${OUT}/continent-${slug(place.id)}.wav`, buf);
}
console.log('PASS rendered', M.CONTINENT_PLACES.length, 'continent previews to', OUT);
