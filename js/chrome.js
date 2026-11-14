// Deliberate Atlas disclosure. No timer, hover or saved Pin.
(()=>{
 const panel=document.getElementById('guide-toolbar'),toggle=document.getElementById('atlas-toggle');
 const close=(focus=true)=>{panel.hidden=true;panel.inert=true;toggle.setAttribute('aria-expanded','false');if(focus)toggle.focus()};
 const zoom=document.querySelector('.map-controls');document.getElementById('atlas-zoom').appendChild(zoom);
 toggle.addEventListener('click',()=>{if(!panel.hidden){close();return}document.dispatchEvent(new Event('close-guide'));panel.hidden=false;panel.inert=false;toggle.setAttribute('aria-expanded','true');document.getElementById('atlas-close').focus()});
 document.getElementById('atlas-close').addEventListener('click',()=>close());
 document.addEventListener('close-atlas',()=>close(false));
 document.addEventListener('keydown',e=>{
  if(e.defaultPrevented||document.querySelector('#passport-modal.active,#lightbox.active'))return;
  const story=document.querySelector('#sidebar.active,#bottom-sheet.active');const active=!panel.hidden?panel:story;if(!active)return;
  if(e.key==='Escape'){e.preventDefault();if(active===panel)close();else{document.dispatchEvent(new Event('close-guide'));toggle.focus()}return}
  if(e.key==='Tab'){const items=[...active.querySelectorAll('button:not(:disabled),a[href],textarea,[tabindex="0"]')].filter(x=>x.getClientRects().length);const first=items[0],last=items.at(-1);if(!first)return;if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
 });
})();
