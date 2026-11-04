/* Photo Dictionary: flipbook engine.
   Leaves rotate about the spine with rAF-driven transforms (compositor-only),
   shading tied to the turn angle, corner drag, swipe, click, keys and index. */
(function () {
  "use strict";
  var PD = window.PD;
  var TOTAL = PD.TOTAL;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (id) { return document.getElementById(id); };
  var stage = $("stage"), viewport = $("viewport"), book = $("book");
  var prevBtn = $("prev"), nextBtn = $("next"), slider = $("slider"), pageLabel = $("pagelabel"), live = $("live");

  var S = {
    mode: null,      // "spread" | "single"
    leaves: [],      // { el, front, back, angle }
    n: 0,            // number of turned leaves
    pw: 0, ph: 0,
    anims: {},       // leaf index → animation
    drag: null,
    keep: null       // range kept visible while a multi-leaf jump lands
  };

  /* ---------- geometry ---------- */
  function maxN() { return S.mode === "spread" ? S.leaves.length : S.leaves.length - 1; }
  function currentPage() {
    if (S.mode === "single") return S.n;
    if (S.n === 0) return 0;
    if (S.n === S.leaves.length) return TOTAL - 1;
    return 2 * S.n - 1;
  }
  function nForPage(p, mode) {
    if (mode === "single") return p;
    return Math.ceil(p / 2);
  }

  function measure() {
    var r = stage.getBoundingClientRect();
    var availW = r.width, availH = r.height;
    var spread = availW >= 860 && availW / availH > 1.05;
    var pw, ph;
    if (spread) {
      ph = Math.min(availH - 24, (availW - 48) / 2 / 0.7);
      pw = Math.floor(ph * 0.7);
      ph = Math.floor(ph);
    } else {
      pw = Math.floor(Math.min(availW - 16, 620));
      ph = Math.floor(Math.min(availH - 12, pw / 0.5));
    }
    return { mode: spread ? "spread" : "single", pw: pw, ph: ph };
  }

  /* ---------- build ---------- */
  function build(keepPage) {
    var m = measure();
    S.mode = m.mode; S.pw = m.pw; S.ph = m.ph;
    document.documentElement.style.setProperty("--pw", m.pw + "px");
    document.documentElement.style.setProperty("--ph", m.ph + "px");
    document.body.setAttribute("data-mode", m.mode);

    var single = m.mode === "single";
    var pages = PD.buildPages(function (p) { return single ? "right" : (p % 2 ? "left" : "right"); });
    var html = "";
    var count = single ? TOTAL : TOTAL / 2;
    for (var i = 0; i < count; i++) {
      var front = single ? pages[i] : pages[2 * i];
      var back = single ? '<div class="page page--blank" aria-hidden="true"></div>' : pages[2 * i + 1];
      html += '<div class="leaf" data-leaf="' + i + '"><div class="face face--front">' + front + '<div class="shade"></div></div>' +
        '<div class="face face--back">' + back + '<div class="shade"></div></div></div>';
    }
    book.innerHTML = html + '<div class="peel peel--next" aria-hidden="true"></div><div class="peel peel--prev" aria-hidden="true"></div>';
    S.leaves = Array.prototype.map.call(book.querySelectorAll(".leaf"), function (el) {
      return { el: el, front: el.children[0], back: el.children[1], angle: 0 };
    });
    S.anims = {}; S.drag = null; S.keep = null;
    S.n = Math.max(0, Math.min(nForPage(keepPage || 0, S.mode), maxN()));
    S.leaves.forEach(function (lf, i) { setAngle(i, i < S.n ? -180 : 0); });
    slider.max = String(maxN());
    settle(true);
  }

  /* ---------- rendering a leaf ---------- */
  function setAngle(i, a) {
    var lf = S.leaves[i];
    lf.angle = a;
    lf.el.style.transform = "rotateY(" + a.toFixed(2) + "deg)";
    var s = Math.sin(-a * Math.PI / 180);
    lf.el.style.setProperty("--s", s.toFixed(3));
    lf.el.style.setProperty("--lift", (s * 18).toFixed(1) + "px");
  }

  function isMoving(i) { return !!S.anims[i] || (S.drag && S.drag.leaf === i); }

  function updateStack() {
    var L = S.leaves.length, n = S.n, spread = S.mode === "spread";
    S.leaves.forEach(function (lf, i) {
      var moving = isMoving(i);
      var z;
      if (moving) {
        var a = S.anims[i];
        var dir = a ? a.dir : (S.drag ? S.drag.dir : 1);
        z = 2000 + (dir > 0 ? i : L - i);
      } else z = lf.angle <= -90 ? i + 1 : L - i;
      lf.el.style.zIndex = z;

      var lo = spread ? n - 2 : n, hi = n + 1;
      var vis = moving || (i >= lo && i <= hi);
      if (!spread && i < n && !moving) vis = false;
      if (S.keep && i >= S.keep[0] && i <= S.keep[1]) vis = true;
      lf.el.style.visibility = vis ? "visible" : "hidden";

      // Only the faces a reader can see are reachable by keyboard and screen readers.
      var frontShown = !moving && lf.angle === 0 && i === n;
      var backShown = spread && !moving && lf.angle === -180 && i === n - 1;
      setFace(lf.front, frontShown);
      setFace(lf.back, backShown);
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
    book.classList.toggle("is-closed", S.mode === "spread" && (S.n === 0 || S.n === S.leaves.length));
    // page-edge thickness on each side of the spine
    var L = S.leaves.length;
    book.style.setProperty("--lt", Math.min(10, S.n * 0.8).toFixed(1) + "px");
    book.style.setProperty("--rt", Math.min(10, (L - S.n) * 0.8).toFixed(1) + "px");
  }

  function settle(silent) {
    updateStack();
    updateShift();
    var p = currentPage();
    prevBtn.disabled = S.n <= 0;
    nextBtn.disabled = S.n >= maxN();
    slider.value = String(S.n);
    var label;
    if (S.mode === "spread" && S.n > 0 && S.n < S.leaves.length) label = "Pages " + PD.folio(2 * S.n - 1) + "–" + PD.folio(2 * S.n);
    else label = /^\d+$|^[ivx]+$/.test(PD.folio(p)) ? "Page " + PD.folio(p) : PD.folio(p);
    pageLabel.textContent = label;
    slider.setAttribute("aria-valuetext", label + ": " + PD.describe(S.mode === "spread" && S.n > 0 && S.n < S.leaves.length ? 2 * S.n : p));
    if (!silent) {
      var d = PD.describe(p);
      var d2 = S.mode === "spread" && S.n > 0 && S.n < S.leaves.length ? PD.describe(2 * S.n) : d;
      live.textContent = label + ". " + (d2 && d2 !== d ? d + "; " + d2 : d) + ".";
    }
    book.classList.toggle("can-next", S.n < maxN());
    book.classList.toggle("can-prev", S.n > 0);
  }

  /* ---------- animation loop ---------- */
  var raf = 0;
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
      var a = S.anims[k], i = +k;
      var t = (now - a.t0) / a.dur;
      if (t < 0) { any = true; return; }
      if (t >= 1) { setAngle(i, a.to); delete S.anims[k]; landed = true; return; }
      setAngle(i, a.from + (a.to - a.from) * ease(t));
      any = true;
    });
    if (landed || any) updateStack();
    if (any) raf = requestAnimationFrame(tick);
    else { S.keep = null; settle(true); }
  }

  /* ---------- navigation ---------- */
  function goTo(target, announce) {
    target = Math.max(0, Math.min(maxN(), target));
    if (target === S.n) { settle(!announce); return; }
    var dir = target > S.n ? 1 : -1;
    var steps = Math.abs(target - S.n);
    var dur = steps > 1 ? Math.max(380, 700 - steps * 40) : 760;
    var gap = steps > 1 ? Math.min(110, 700 / steps) : 0;
    var old = S.n;
    if (steps > 1) S.keep = [Math.min(old, target) - 2, Math.max(old, target) + 1];
    S.n = target;
    for (var k = 0; k < steps; k++) {
      var i = dir > 0 ? old + k : old - 1 - k;
      animate(i, dir > 0 ? -180 : 0, k * gap, dur, dir);
    }
    updateStack();
    settle(false);
  }
  function next() { goTo(S.n + 1, true); }
  function prev() { goTo(S.n - 1, true); }
  function goToPage(p) { goTo(nForPage(p, S.mode), true); }

  function goToHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h && Object.prototype.hasOwnProperty.call(PD.TARGETS, h)) goToPage(PD.TARGETS[h]);
  }

  /* ---------- pointer: drag, swipe, click ---------- */
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
      if (Math.abs(dy) > Math.abs(dx)) { S.drag = null; return; } // vertical: let the page scroll
      var dir = S.mode === "spread" ? (d.x0 >= d.spine ? 1 : -1) : (dx < 0 ? 1 : -1);
      if ((dir > 0 && S.n >= maxN()) || (dir < 0 && S.n <= 0)) { S.drag = null; return; }
      d.dir = dir; d.leaf = dir > 0 ? S.n : S.n - 1; d.started = true;
      delete S.anims[d.leaf];
      try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      stage.classList.add("is-dragging");
      updateStack();
    }
    var now = performance.now();
    d.v = (e.clientX - d.x) / Math.max(1, now - d.t);
    d.x = e.clientX; d.t = now;
    var p;
    if (S.mode === "spread") {
      p = d.dir > 0 ? (d.x0 - e.clientX) / Math.max(40, d.x0 - (d.spine - S.pw)) : (e.clientX - d.x0) / Math.max(40, (d.spine + S.pw) - d.x0);
    } else {
      p = (d.dir > 0 ? d.x0 - e.clientX : e.clientX - d.x0) / (S.pw * 0.85);
    }
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
      if (commit) S.n += d.dir;
      animate(d.leaf, to, 0, Math.max(160, 620 * Math.abs(to - lf.angle) / 180), d.dir);
      updateStack();
      settle(!commit);
      return;
    }
    if (e.type === "pointercancel") return;
    // a tap: right side turns forward, left side turns back
    var r = d.rect;
    if (S.mode === "spread") {
      if (d.x0 >= d.spine) next(); else prev();
    } else {
      if (d.x0 > r.left + r.width * 0.62) next();
      else if (d.x0 < r.left + r.width * 0.38) prev();
    }
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  /* ---------- links inside pages ---------- */
  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-goto]");
    if (!g) return;
    var slug = g.getAttribute("data-goto");
    if (!Object.prototype.hasOwnProperty.call(PD.TARGETS, slug)) return;
    e.preventDefault();
    closeIndex();
    if (location.hash === "#" + slug) goToHash();
    else location.hash = slug;
  });
  window.addEventListener("hashchange", goToHash);

  /* ---------- controls ---------- */
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  slider.addEventListener("input", function () { goTo(+slider.value, true); });

  document.addEventListener("keydown", function (e) {
    if (!indexEl.hidden) { if (e.key === "Escape") closeIndex(); return; }
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" && e.target !== slider) return;
    if (e.target === slider) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
    else if (e.key === "Home") { e.preventDefault(); goTo(0, true); }
    else if (e.key === "End") { e.preventDefault(); goTo(maxN(), true); }
  });

  /* ---------- index panel ---------- */
  var indexEl = $("index"), indexBtn = $("index-btn"), lastFocus = null;
  (function fillIndex() {
    var html = PD.ENTRIES.map(function (e) {
      return '<li><a href="#' + e.slug + '" data-goto="' + e.slug + '"><span class="ix-l">' + e.letter + '</span><span class="ix-t">' +
        e.heads.map(function (h) { return h.hw; }).join(" · ") + '</span><span class="ix-n">p. ' + PD.folio(e.page) + "</span></a></li>";
    }).join("");
    $("index-list").innerHTML = html;
  })();
  function openIndex() {
    lastFocus = document.activeElement;
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
    var f = indexEl.querySelectorAll("a, button");
    var a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  });

  /* ---------- resize ---------- */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var m = measure();
      if (m.mode !== S.mode || m.pw !== S.pw || m.ph !== S.ph) build(currentPage());
    }, 120);
  });

  /* ---------- boot ---------- */
  var startPage = 0;
  var h = decodeURIComponent(location.hash.slice(1));
  if (h && Object.prototype.hasOwnProperty.call(PD.TARGETS, h)) startPage = PD.TARGETS[h];
  build(startPage);
  document.body.classList.add("is-ready");
})();
