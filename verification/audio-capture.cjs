// Captures the app's real post-gain ambience for three continents and
// verifies silent start, opt-in, mute, and replay.
const fs = require('fs'), assert = require('assert'), { spawn } = require('child_process');
const pp = require('puppeteer-core');
(async () => {
  let b, s;
  try {
    if (!process.env.URL) { s = spawn('python3', ['-m', 'http.server', '8831'], { cwd: 'dist', stdio: 'ignore' }); await new Promise(r => setTimeout(r, 350)); }
    b = await pp.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
    const p = await b.newPage();
    await p.setViewport({ width: 390, height: 844 });
    await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await p.evaluateOnNewDocument(() => {
      const c = AudioNode.prototype.connect;
      AudioNode.prototype.connect = function (d, ...a) {
        const r = c.call(this, d, ...a);
        if (d instanceof AudioDestinationNode) {
          if (!this.context.__tee) this.context.__tee = this.context.createMediaStreamDestination();
          window.__tee = this.context.__tee;
          c.call(this, this.context.__tee);
        }
        return r;
      };
    });
    await p.goto(process.env.URL || 'http://localhost:8831', { waitUntil: 'domcontentloaded' });
    await p.click('#begin-button');
    await p.waitForFunction(() => document.querySelector('#continent-picker').options.length >= 8);
    assert.equal(await p.evaluate(() => AudioEngine.ctx), null, 'silent start');
    await p.click('#mute-btn');
    await p.waitForFunction(() => AudioEngine.ctx && AudioEngine.ctx.state === 'running');
    const evidence = [];
    for (const name of ['World map', 'Asia', 'Antarctica']) {
      if (name !== 'World map') await p.select('#continent-picker', name);
      await new Promise(r => setTimeout(r, 2600));
      const bytes = await p.evaluate(async () => {
        const chunks = [], r = new MediaRecorder(window.__tee.stream);
        r.ondataavailable = e => chunks.push(e.data);
        const done = new Promise(ok => (r.onstop = ok));
        r.start(); await new Promise(ok => setTimeout(ok, 4000)); r.stop(); await done;
        return [...new Uint8Array(await new Blob(chunks, { type: r.mimeType }).arrayBuffer())];
      });
      const dir = (() => { if (process.env.AUDIO_OUT) return process.env.AUDIO_OUT; try { fs.mkdirSync('/downloads/continents-audio', { recursive: true }); return '/downloads/continents-audio'; } catch { return 'verification/output/continents-audio'; } })();
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(dir + '/continent-app-' + name.toLowerCase().replace(/[^a-z]+/g, '-') + '.webm', Buffer.from(bytes));
      evidence.push({ place: name, bytes: bytes.length });
    }
    await p.click('#mute-btn');
    await p.waitForFunction(() => AudioEngine.ctx === null);
    await p.click('#mute-btn');
    await p.waitForFunction(() => AudioEngine.ctx && AudioEngine.ctx.state === 'running');
    await p.click('#mute-btn');
    await p.waitForFunction(() => AudioEngine.ctx === null);
    fs.mkdirSync('verification/output', { recursive: true });
    fs.writeFileSync('verification/output/audio.json', JSON.stringify({ silentStart: true, offAndReplay: true, captures: evidence, capture: 'actual post-gain Web Audio output; synthesized continent ambience', humanListening: false, sound: 'synthesized wind, water, birds, bells and polar ice; no voice, no melody, not a field recording' }, null, 2));
    console.log('PASS continent ambience captured for world/asia/antarctica, off and replay, silent start');
  } finally { await b?.close(); s?.kill(); }
})().catch(e => { console.error(e); process.exit(1); });
