const pp=require('puppeteer-core'), assert=require('node:assert');
(async()=>{
 const browser=await pp.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 try {
  const p=await browser.newPage(), errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.setContent('<button id="go">Enable test audio</button>');
  await p.addScriptTag({path:process.cwd()+'/'+(process.env.PALETTE_FILE||'js/continent-sound.js')});
  const result=await p.evaluate(async()=>{
   const m=window.ContinentSound||window.GemSound, places=m.CONTINENT_PLACES||m.GEM_PLACES;
   const realTimeout=window.setTimeout;
   // Accelerate only long voice-scheduler delays, not AudioContext time.
   window.setTimeout=(fn,ms,...a)=>realTimeout(fn,ms>=5000?50:ms,...a);
   const checks=[];
   for(const place of places){
    for(const voice of place.voices){
     const scape=m.createSoundscape([{...place,voices:[voice]}]);
     if(scape.state.ctx!==null)throw Error('Created audio before opt-in');
     scape.toggle(0);await scape.state.ctx.resume();
     await new Promise(r=>realTimeout(r,180));
     const state=scape.state.ctx.state;scape.toggle(0);
     if(scape.state.ctx!==null)throw Error('Mute did not close');
     checks.push({place:place.id,voice:voice.kind,state});
    }
   }
   window.setTimeout=realTimeout;return checks;
  });
  assert.deepEqual(errors,[]);assert(result.every(x=>x.state==='running'));console.log('PASS every bed and voice in real Chromium',JSON.stringify(result));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
