/* Quiet chrome: the map leads, controls visit when called and retire when left.
   Contract shared across worlds: greet ~2.6s, retire; wake on edge hover,
   hint tab, keyboard focus, or the pin (persisted). Escape retires. */
(function () {
  const PIN_KEY = 'continents-chrome-pin';
  const TOP_ZONE = 96;
  const BOTTOM_ZONE = 150;
  const RETIRE_MS = 2600;

  const toolbar = document.getElementById('guide-toolbar');
  const hint = document.getElementById('chrome-hint');
  const pinBtn = document.getElementById('pin-controls');
  const mapControls = document.querySelector('.map-controls');
  if (!toolbar || !hint || !pinBtn) return;

  let pinned = false;
  try { pinned = localStorage.getItem(PIN_KEY) === '1'; } catch (e) {}
  let focusWithin = false;
  let retireTimer = null;
  let started = false;

  function apply() {
    const on = pinned || wakeState;
    document.body.classList.toggle('chrome-on', on);
    hint.hidden = on || !started;
    pinBtn.setAttribute('aria-pressed', String(pinned));
  }

  let wakeState = true; // greeting on entry

  function retireSoon() {
    clearTimeout(retireTimer);
    retireTimer = setTimeout(() => {
      if (!focusWithin) { wakeState = false; apply(); }
    }, RETIRE_MS);
  }

  function wake() {
    if (!started) return;
    wakeState = true;
    apply();
    retireSoon();
  }

  function onPointerMove(e) {
    if (e.pointerType === 'touch') return;
    if (e.clientY < TOP_ZONE || e.clientY > window.innerHeight - BOTTOM_ZONE) wake();
  }

  function onKey(e) {
    if (e.key === 'Escape') { focusWithin = false; wakeState = false; apply(); }
  }

  function onFocusIn(e) {
    if (toolbar.contains(e.target) || (mapControls && mapControls.contains(e.target))) {
      focusWithin = true;
      clearTimeout(retireTimer);
      wakeState = true;
      apply();
    }
  }

  function onFocusOut(e) {
    if (toolbar.contains(e.relatedTarget) || (mapControls && mapControls.contains(e.relatedTarget))) return;
    focusWithin = false;
    retireSoon();
  }

  pinBtn.addEventListener('click', () => {
    pinned = !pinned;
    try { pinned ? localStorage.setItem(PIN_KEY, '1') : localStorage.removeItem(PIN_KEY); } catch (e) {}
    if (pinned) wakeState = true;
    apply();
    if (!pinned) retireSoon();
  });

  hint.addEventListener('click', wake);

  // Start the greeting once the app enters the map (toolbar unhidden).
  const observer = new MutationObserver(() => {
    if (!toolbar.hidden && !started) {
      started = true;
      wakeState = true;
      apply();
      retireSoon();
    }
  });
  observer.observe(toolbar, { attributes: true, attributeFilter: ['hidden'] });

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('keydown', onKey);
  document.addEventListener('focusin', onFocusIn);
  document.addEventListener('focusout', onFocusOut);

  apply();
})();
