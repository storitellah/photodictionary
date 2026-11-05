/* The Dictionary of Photography by Storitellah: flipbook engine and reader UI.
   Leaves rotate about the spine with rAF-driven transforms; pages are paginated
   from live measurements so no entry is ever cut off. */
(function () {
  "use strict";
  var PD = window.PD;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  var stage = $("stage"), book = $("book");
  var prevBtn = $("prev"), nextBtn = $("next"), slider = $("slider"), pageLabel = $("pagelabel"), live = $("live");

  function readPref(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function writePref(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }

  /* =============================== theme =============================== */
  var root = document.documentElement;
  function systemTheme() { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
  function applyTheme(t, save) {
    root.setAttribute("data-mode", t);
    Array.prototype.forEach.call(document.querySelectorAll(".theme-switch button"), function (b) {
      b.setAttribute("aria-checked", String(b.getAttribute("data-theme-choice") === t));
    });
    if (save) writePref("pd-theme", t);
  }
  applyTheme(readPref("pd-theme", systemTheme()), false);
  document.querySelector(".theme-switch").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-theme-choice]");
    if (b) applyTheme(b.getAttribute("data-theme-choice"), true);
  });

  /* =============================== sound =============================== */
  var soundOn = readPref("pd-sound", "on") === "on";
  var soundBtn = $("sound");
  var actx = null, noiseBuf = null;
  function renderSound() {
    soundBtn.setAttribute("aria-pressed", String(soundOn));
    soundBtn.setAttribute("aria-label", soundOn ? "Page-turn sound on" : "Page-turn sound off");
    soundBtn.querySelector(".snd-on").style.display = soundOn ? "" : "none";
    soundBtn.querySelector(".snd-off").style.display = soundOn ? "none" : "";
  }
  renderSound();
  soundBtn.addEventListener("click", function () {
    soundOn = !soundOn; writePref("pd-sound", soundOn ? "on" : "off"); renderSound();
    if (soundOn) rustle(0.6);
  });
  function audio() {
    if (actx) return actx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      actx = new AC();
      noiseBuf = actx.createBuffer(1, Math.floor(actx.sampleRate * 0.6), actx.sampleRate);
      var d = noiseBuf.getChannelData(0), last = 0;
      for (var i = 0; i < d.length; i++) { var w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = w * 0.6 + last * 3; }
    } catch (e) { actx = null; }
    return actx;
  }
  /* A paper rustle: filtered noise with a falling band, then a soft landing tap. */
  function rustle(strength, delay) {
    if (!soundOn) return;
    var ac = audio();
    if (!ac) return;
    if (ac.state === "suspended") ac.resume();
    var t = ac.currentTime + (delay || 0), s = strength || 1, dur = 0.34 * Math.max(0.5, s);
    var src = ac.createBufferSource(); src.buffer = noiseBuf;
    var bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(3200, t); bp.frequency.exponentialRampToValueAtTime(700, t + dur);
    var hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 250;
    var g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.32 * s, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.12 * s, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp); bp.connect(hp); hp.connect(g); g.connect(ac.destination);
    src.start(t); src.stop(t + dur + 0.02);
    var o = ac.createOscillator(), og = ac.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(110, t + dur * 0.85); o.frequency.exponentialRampToValueAtTime(60, t + dur + 0.12);
    og.gain.setValueAtTime(0.0001, t + dur * 0.85); og.gain.exponentialRampToValueAtTime(0.09 * s, t + dur * 0.9); og.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.14);
    o.connect(og); og.connect(ac.destination); o.start(t + dur * 0.85); o.stop(t + dur + 0.16);
  }

  /* =============================== state =============================== */
  var S = { mode: null, leaves: [], n: 0, pw: 0, ph: 0, anims: {}, drag: null, keep: null, pages: [], targets: {} };
  function maxN() { return S.mode === "spread" ? S.leaves.length : S.leaves.length - 1; }
  function total() { return S.pages.length; }
  function currentPage() {
    if (S.mode === "single") return S.n;
    if (S.n === 0) return 0;
    if (S.n === S.leaves.length) return total() - 1;
    return 2 * S.n - 1;
  }
  function nForPage(p) { return S.mode === "single" ? p : Math.ceil(p / 2); }

  function measure() {
    var r = stage.getBoundingClientRect();
    var W = r.width, H = r.height;
    var spread = W >= 900 && W / H > 1.1;
    var pw, ph;
    if (spread) {
      ph = Math.min(H - 28, (W - 56) / 2 / 0.7);
      pw = Math.floor(ph * 0.7); ph = Math.floor(ph);
    } else {
      pw = Math.floor(Math.min(W - 20, 600));
      ph = Math.floor(Math.min(H - 16, pw / 0.56));
    }
    return { mode: spread ? "spread" : "single", pw: pw, ph: ph };
  }

  /* =============================== build =============================== */
  function anchorId() {
    var p = S.pages[currentPage()];
    if (!p) return "cover";
    if (/^g\d+$/.test(p.id)) {
      var face = book.querySelector('.face:not([aria-hidden]) [data-entry]');
      return face ? face.getAttribute("data-entry") : p.id;
    }
    return p.id;
  }

  function build(anchor) {
    var m = measure();
    S.mode = m.mode; S.pw = m.pw; S.ph = m.ph;
    root.style.setProperty("--pw", m.pw + "px");
    root.style.setProperty("--ph", m.ph + "px");
    document.body.setAttribute("data-layout", m.mode);
    var single = m.mode === "single";

    book.innerHTML = "";
    var A = PD.assemble(book, m.mode);
    S.pages = A.pages; S.targets = A.targets;

    var html = "", count = single ? total() : total() / 2;
    for (var i = 0; i < count; i++) {
      var front = single ? S.pages[i].html : S.pages[2 * i].html;
      var back = single ? '<div class="page page--blank" aria-hidden="true"></div>' : S.pages[2 * i + 1].html;
      html += '<div class="leaf" data-leaf="' + i + '"><div class="face face--front">' + front + '<div class="shade"></div></div>' +
        '<div class="face face--back">' + back + '<div class="shade"></div></div></div>';
    }
    book.innerHTML = html + '<div class="peel peel--next" aria-hidden="true"></div><div class="peel peel--prev" aria-hidden="true"></div>';
    S.leaves = Array.prototype.map.call(book.querySelectorAll(".leaf"), function (el) {
      return { el: el, front: el.children[0], back: el.children[1], angle: 0 };
    });
    S.anims = {}; S.drag = null; S.keep = null;
    var p = anchor && anchor in S.targets ? S.targets[anchor] : 0;
    S.n = Math.max(0, Math.min(nForPage(p), maxN()));
    S.leaves.forEach(function (lf, i) { setAngle(i, i < S.n ? -180 : 0); });
    slider.max = String(maxN());
    settle(true);
  }

  /* =============================== leaves =============================== */
  function setAngle(i, a) {
    var lf = S.leaves[i];
    lf.angle = a;
    lf.el.style.transform = "rotateY(" + a.toFixed(2) + "deg)";
    lf.el.style.setProperty("--s", Math.sin(-a * Math.PI / 180).toFixed(3));
  }
  function isMoving(i) { return !!S.anims[i] || (S.drag && S.drag.leaf === i); }
  function updateStack() {
    var L = S.leaves.length, n = S.n, spread = S.mode === "spread";
    S.leaves.forEach(function (lf, i) {
      var moving = isMoving(i), z;
      if (moving) {
        var a = S.anims[i], dir = a ? a.dir : (S.drag ? S.drag.dir : 1);
        z = 2000 + (dir > 0 ? i : L - i);
      } else z = lf.angle <= -90 ? i + 1 : L - i;
      lf.el.style.zIndex = z;
      var vis = moving || (i >= (spread ? n - 2 : n) && i <= n + 1);
      if (!spread && i < n && !moving) vis = false;
      if (S.keep && i >= S.keep[0] && i <= S.keep[1]) vis = true;
      lf.el.style.visibility = vis ? "visible" : "hidden";
      setFace(lf.front, !moving && lf.angle === 0 && i === n);
      setFace(lf.back, spread && !moving && lf.angle === -180 && i === n - 1);
    });
  }
  function setFace(face, shown) {
    if (shown) { face.removeAttribute("aria-hidden"); face.inert = false; }
    else { face.setAttribute("aria-hidden", "true"); face.inert = true; }
  }
  function updateShift() {
    var x = 0;
    if (S.mode === "spread") {
      if (S.n === 0) x = -S.pw / 2;
      else if (S.n === S.leaves.length) x = S.pw / 2;
    }
    book.style.transform = "translate3d(" + x + "px,0,0)";
    var L = S.leaves.length;
    book.style.setProperty("--lt", Math.min(12, S.n * 0.35).toFixed(1) + "px");
    book.style.setProperty("--rt", Math.min(12, (L - S.n) * 0.35).toFixed(1) + "px");
  }
  function labelFor() {
    var p = currentPage();
    if (S.mode === "spread" && S.n > 0 && S.n < S.leaves.length) {
      var a = S.pages[2 * S.n - 1], b = S.pages[2 * S.n];
      return { short: "Pages " + a.folio + "–" + b.folio, long: a.label + "; " + b.label };
    }
    var pg = S.pages[p];
    return { short: pg.folio ? "Page " + pg.folio : pg.label, long: pg.label };
  }
  function settle(silent) {
    updateStack(); updateShift();
    prevBtn.disabled = S.n <= 0;
    nextBtn.disabled = S.n >= maxN();
    slider.value = String(S.n);
    var l = labelFor();
    pageLabel.textContent = l.short;
    slider.setAttribute("aria-valuetext", l.short + ": " + l.long);
    if (!silent) live.textContent = l.short + ". " + l.long + ".";
    book.classList.toggle("can-next", S.n < maxN());
    book.classList.toggle("can-prev", S.n > 0);
  }

  /* =============================== animation =============================== */
  var raf = 0, onLanded = [];
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function animate(i, to, delay, dur, dir) {
    var lf = S.leaves[i];
    if (reduceMotion || dur <= 0) { delete S.anims[i]; setAngle(i, to); return; }
    S.anims[i] = { from: lf.angle, to: to, t0: performance.now() + (delay || 0), dur: dur, dir: dir };
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick(now) {
    raf = 0;
    var any = false, landed = false;
    Object.keys(S.anims).forEach(function (k) {
      var a = S.anims[k], i = +k, t = (now - a.t0) / a.dur;
      if (t < 0) { any = true; return; }
      if (t >= 1) { setAngle(i, a.to); delete S.anims[k]; landed = true; return; }
      setAngle(i, a.from + (a.to - a.from) * ease(t));
      any = true;
    });
    if (landed || any) updateStack();
    if (any) raf = requestAnimationFrame(tick);
    else { S.keep = null; settle(true); var f = onLanded; onLanded = []; f.forEach(function (fn) { fn(); }); }
  }
  function whenLanded(fn) { if (!raf && !Object.keys(S.anims).length) fn(); else onLanded.push(fn); }

  /* =============================== navigation =============================== */
  function goTo(target, announce) {
    target = Math.max(0, Math.min(maxN(), target));
    if (target === S.n) { settle(!announce); return; }
    var dir = target > S.n ? 1 : -1, steps = Math.abs(target - S.n), old = S.n;
    // long jumps: settle all but the last few leaves instantly, then riffle
    var animated = Math.min(steps, 5);
    for (var j = 0; j < steps - animated; j++) {
      var ii = dir > 0 ? old + j : old - 1 - j;
      delete S.anims[ii]; setAngle(ii, dir > 0 ? -180 : 0);
    }
    var startAt = dir > 0 ? old + (steps - animated) : old - (steps - animated);
    var dur = animated > 1 ? 520 : 760, gap = animated > 1 ? 95 : 0;
    if (steps > 1) S.keep = [Math.min(startAt, target) - 2, Math.max(startAt, target) + 1];
    S.n = target;
    for (var k = 0; k < animated; k++) {
      var i = dir > 0 ? startAt + k : startAt - 1 - k;
      animate(i, dir > 0 ? -180 : 0, k * gap, dur, dir);
      rustle(animated > 1 ? 0.55 : 1, k * gap / 1000);
    }
    updateStack(); settle(false);
  }
  function next() { goTo(S.n + 1, true); }
  function prev() { goTo(S.n - 1, true); }
  function goToTarget(id, flash) {
    if (!(id in S.targets)) return false;
    goTo(nForPage(S.targets[id]), true);
    if (flash) whenLanded(function () {
      Array.prototype.forEach.call(book.querySelectorAll('.face:not([aria-hidden]) [data-entry="' + id + '"]'), function (el) {
        el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
      });
    });
    return true;
  }
  function goToHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h) goToTarget(h, true);
  }

  /* =============================== pointer =============================== */
  stage.addEventListener("pointerdown", function (e) {
    if (e.button !== 0 || !e.isPrimary) return;
    if (e.target.closest("a, button, input, [data-goto]")) return;
    var r = book.getBoundingClientRect();
    if (e.clientX < r.left - 20 || e.clientX > r.right + 20 || e.clientY < r.top || e.clientY > r.bottom) return;
    S.drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, x: e.clientX, t: performance.now(), v: 0, started: false, dir: 0, leaf: -1, p: 0,
      spine: S.mode === "spread" ? r.left + S.pw : r.left, rect: r };
  });
  stage.addEventListener("pointermove", function (e) {
    var d = S.drag;
    if (!d || e.pointerId !== d.id) return;
    var dx = e.clientX - d.x0, dy = e.clientY - d.y0;
    if (!d.started) {
      if (Math.hypot(dx, dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) { S.drag = null; return; }
      var dir = S.mode === "spread" ? (d.x0 >= d.spine ? 1 : -1) : (dx < 0 ? 1 : -1);
      if ((dir > 0 && S.n >= maxN()) || (dir < 0 && S.n <= 0)) { S.drag = null; return; }
      d.dir = dir; d.leaf = dir > 0 ? S.n : S.n - 1; d.started = true;
      delete S.anims[d.leaf];
      try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      stage.classList.add("is-dragging");
      updateStack();
    }
    var now = performance.now();
    d.v = (e.clientX - d.x) / Math.max(1, now - d.t); d.x = e.clientX; d.t = now;
    var p = S.mode === "spread"
      ? (d.dir > 0 ? (d.x0 - e.clientX) / Math.max(40, d.x0 - (d.spine - S.pw)) : (e.clientX - d.x0) / Math.max(40, (d.spine + S.pw) - d.x0))
      : (d.dir > 0 ? d.x0 - e.clientX : e.clientX - d.x0) / (S.pw * 0.85);
    d.p = Math.max(0, Math.min(1, p));
    setAngle(d.leaf, d.dir > 0 ? -180 * d.p : -180 + 180 * d.p);
    e.preventDefault();
  });
  function endDrag(e) {
    var d = S.drag;
    if (!d || e.pointerId !== d.id) return;
    S.drag = null;
    stage.classList.remove("is-dragging");
    if (d.started) {
      var flick = d.dir > 0 ? d.v < -0.45 : d.v > 0.45;
      var commit = d.p > 0.4 || (flick && d.p > 0.04);
      var lf = S.leaves[d.leaf];
      var to = commit ? (d.dir > 0 ? -180 : 0) : (d.dir > 0 ? 0 : -180);
      if (commit) { S.n += d.dir; rustle(0.8); }
      animate(d.leaf, to, 0, Math.max(160, 620 * Math.abs(to - lf.angle) / 180), d.dir);
      updateStack(); settle(!commit);
      return;
    }
    if (e.type === "pointercancel") return;
    var r = d.rect;
    if (S.mode === "spread") { if (d.x0 >= d.spine) next(); else prev(); }
    else if (d.x0 > r.left + r.width * 0.65) next();
    else if (d.x0 < r.left + r.width * 0.35) prev();
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  /* links inside pages and panels */
  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-goto]");
    if (!g) return;
    var id = g.getAttribute("data-goto");
    if (!(id in S.targets)) return;
    e.preventDefault();
    closeIndex(); closeResults();
    if (location.hash === "#" + id) goToTarget(id, true);
    else location.hash = id;
  });
  window.addEventListener("hashchange", goToHash);

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  slider.addEventListener("input", function () { goTo(+slider.value, true); });

  document.addEventListener("keydown", function (e) {
    if (!indexEl.hidden) { if (e.key === "Escape") closeIndex(); return; }
    var tag = (e.target.tagName || "").toLowerCase();
    if (e.key === "/" && tag !== "input") { e.preventDefault(); qEl.focus(); return; }
    if (tag === "input" || tag === "textarea") return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
    else if (e.key === "Home") { e.preventDefault(); goTo(0, true); }
    else if (e.key === "End") { e.preventDefault(); goTo(maxN(), true); }
  });

  /* =============================== search =============================== */
  var qEl = $("q"), resEl = $("results"), active = -1, results = [];
  function renderResults() {
    var q = qEl.value.trim();
    results = PD.search(q, 10);
    active = results.length ? 0 : -1;
    if (!q) { closeResults(); return; }
    resEl.hidden = false;
    qEl.setAttribute("aria-expanded", "true");
    if (!results.length) {
      resEl.innerHTML = '<li class="res-empty">No entry for “' + escapeHTML(q) + '”. Suggest it to <a href="mailto:info@storitellah.com?subject=' + encodeURIComponent("Dictionary of Photography: please add " + q) + '">info@storitellah.com</a></li>';
      return;
    }
    resEl.innerHTML = results.map(function (r, i) {
      return '<li role="option" id="res-' + i + '" aria-selected="' + (i === active) + '" data-goto="' + r.slug + '">' +
        '<span class="res-hw">' + escapeHTML(r.hw) + '</span><span class="res-cat">' + r.cat + '</span><span class="res-def">' + escapeHTML(r.def) + "</span></li>";
    }).join("");
    qEl.setAttribute("aria-activedescendant", "res-0");
  }
  function escapeHTML(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function setActive(i) {
    if (!results.length) return;
    active = (i + results.length) % results.length;
    Array.prototype.forEach.call(resEl.children, function (li, k) { li.setAttribute("aria-selected", String(k === active)); });
    qEl.setAttribute("aria-activedescendant", "res-" + active);
    var el = resEl.children[active]; if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }
  function closeResults() { resEl.hidden = true; qEl.setAttribute("aria-expanded", "false"); qEl.removeAttribute("aria-activedescendant"); }
  qEl.addEventListener("input", renderResults);
  qEl.addEventListener("focus", function () { if (qEl.value.trim()) renderResults(); });
  qEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
    else if (e.key === "Escape") { closeResults(); qEl.blur(); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (active > -1 && results[active]) { var id = results[active].slug; closeResults(); qEl.blur(); if (location.hash === "#" + id) goToTarget(id, true); else location.hash = id; }
    }
  });
  $("search-form").addEventListener("submit", function (e) { e.preventDefault(); });
  document.addEventListener("pointerdown", function (e) { if (!e.target.closest(".search")) closeResults(); });

  /* =============================== index =============================== */
  var indexEl = $("index"), indexBtn = $("index-btn"), lastFocus = null;
  function fillIndex() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(function (L) {
      var id = "letter-" + L.toLowerCase();
      return id in S.targets ? '<a class="ix-letter" href="#' + id + '" data-goto="' + id + '">' + L + "</a>" : '<span class="ix-letter is-empty" aria-hidden="true">' + L + "</span>";
    }).join("");
    $("index-letters").innerHTML = letters;
    $("index-study").innerHTML = PD.STUDY.map(function (e) {
      return '<li><a href="#' + e.target + '" data-goto="' + e.target + '"><span class="ix-t">' + e.heads.map(function (h) { return h.hw; }).join(" · ") + '</span><span class="ix-n">S' + e.num + "</span></a></li>";
    }).join("") + '<li><a href="#plate-ethics" data-goto="plate-ethics"><span class="ix-t">consent and dignity</span><span class="ix-n">S17</span></a></li>';
  }
  function openIndex() {
    lastFocus = document.activeElement;
    fillIndex();
    indexEl.hidden = false;
    indexBtn.setAttribute("aria-expanded", "true");
    var first = indexEl.querySelector("a");
    if (first) first.focus();
  }
  function closeIndex() {
    if (indexEl.hidden) return;
    indexEl.hidden = true;
    indexBtn.setAttribute("aria-expanded", "false");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  indexBtn.addEventListener("click", function () { if (indexEl.hidden) openIndex(); else closeIndex(); });
  $("index-close").addEventListener("click", closeIndex);
  indexEl.addEventListener("click", function (e) { if (e.target === indexEl) closeIndex(); });
  indexEl.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var f = indexEl.querySelectorAll("a, button"), a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  });

  /* =============================== boot =============================== */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var m = measure();
      if (m.mode !== S.mode || Math.abs(m.pw - S.pw) > 1 || Math.abs(m.ph - S.ph) > 1) build(anchorId());
    }, 150);
  });
  $("total").textContent = PD.TERMS.length;
  var FACES = ['700 16px "Libre Baskerville"', 'italic 400 16px "Libre Baskerville"', '400 16px "Libre Baskerville"',
    '400 16px "Source Serif 4"', 'italic 400 16px "Source Serif 4"', '600 16px "Source Serif 4"', '700 16px "Source Serif 4"',
    '400 16px "Gentium Book Plus"', '500 16px "IBM Plex Sans Condensed"', '600 16px "IBM Plex Sans Condensed"', '700 16px "IBM Plex Sans Condensed"'];
  var fontsReady = document.fonts && document.fonts.load
    ? Promise.all(FACES.map(function (f) { return document.fonts.load(f, "Aaʃəˈ").catch(function () {}); }))
    : Promise.resolve();
  // if a face arrives late, paginate again so measurements match what is drawn
  if (document.fonts && document.fonts.addEventListener) {
    document.fonts.addEventListener("loadingdone", function () { if (S.leaves.length) build(anchorId()); });
  }
  var timeout = new Promise(function (res) { setTimeout(res, 2500); });
  Promise.race([fontsReady, timeout]).then(function () {
    var h = decodeURIComponent(location.hash.slice(1));
    build(h || "cover");
    document.body.classList.add("is-ready");
    if (h) whenLanded(function () { goToTarget(h, true); });
  });
})();
