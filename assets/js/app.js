/* Lumenary — rendering, search, filters and permalinks. No dependencies. */
(function () {
  "use strict";

  var CATEGORIES = {
    exposure: "Exposure",
    light: "Light & lighting",
    optics: "Lenses & optics",
    composition: "Composition",
    colour: "Colour",
    digital: "Digital & editing",
    gear: "Cameras & gear",
    film: "Film & darkroom",
    genre: "Genres & styles",
    business: "Business & rights"
  };
  // Headwords that keep their capital letter (proper nouns, acronyms handled separately).
  var PROPER = ["Adobe RGB", "Bayer filter", "Rembrandt lighting", "Zone System", "Dutch angle", "T-stop", "X-sync"];

  var terms = (window.LUMENARY && window.LUMENARY.terms) || [];
  terms.sort(function (a, b) { return fold(a.t).localeCompare(fold(b.t), "en"); });

  var bySlug = {};
  var byName = {};
  terms.forEach(function (x) {
    x.slug = slugify(x.t);
    x.letter = fold(x.t).charAt(0).toUpperCase();
    bySlug[x.slug] = x;
    byName[x.t.toLowerCase()] = x;
  });

  var state = { q: "", cat: "all", sense: readPref("lumenary-sense", "both") };

  var $ = function (id) { return document.getElementById(id); };
  var listEl = $("list"), statusEl = $("status"), qEl = $("q"), azEl = $("az");

  /* ---------- helpers ---------- */
  function fold(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function slugify(s) { return fold(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function display(t) {
    if (PROPER.indexOf(t) > -1) return t;
    var first = t.split(/[\s-]/)[0];
    if (first.length > 1 && first === first.toUpperCase() && /[A-Z]/.test(first)) return t; // RAW, ISO, sRGB…
    if (/^s[A-Z]/.test(t)) return t;
    return t.charAt(0).toLowerCase() + t.slice(1);
  }
  function readPref(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function writePref(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  function highlight(text, q) {
    var safe = esc(text);
    if (!q) return safe;
    var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
    return safe.replace(re, "<mark>$1</mark>");
  }

  /* ---------- search ---------- */
  function score(x, q) {
    var t = fold(x.t).toLowerCase();
    var qq = fold(q).toLowerCase();
    if (t === qq) return 100;
    if (t.indexOf(qq) === 0) return 80;
    if (new RegExp("\\b" + qq.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(t)) return 60;
    if (t.indexOf(qq) > -1) return 50;
    if (x.abbr && x.abbr.toLowerCase().indexOf(qq) > -1) return 70;
    if (x.v && x.v.toLowerCase().indexOf(qq) > -1) return 45;
    var body = fold([x.s, x.a, x.se, x.ae].join(" ")).toLowerCase();
    if (body.indexOf(qq) > -1) return 20;
    return 0;
  }

  function filtered() {
    var q = state.q.trim();
    var rows = terms.filter(function (x) { return state.cat === "all" || x.c === state.cat; });
    if (!q) return { rows: rows, ranked: false };
    rows = rows.map(function (x) { return { x: x, s: score(x, q) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s || fold(a.x.t).localeCompare(fold(b.x.t)); })
      .map(function (r) { return r.x; });
    return { rows: rows, ranked: true };
  }

  /* ---------- rendering ---------- */
  function entryHTML(x, q) {
    var meta = [];
    if (x.ipa) meta.push('<span class="pron"><span class="region">UK</span><span class="ipa">/' + esc(x.ipa) + '/</span></span>');
    if (x.abbr) meta.push('<span class="abbr">abbreviation <em>' + esc(x.abbr) + "</em></span>");
    if (x.v) meta.push('<span class="variant">' + esc(x.v).replace(/^(US|also)\s+(.+)$/, "$1 <em>$2</em>") + "</span>");

    var see = (x.r || []).map(function (r) {
      var y = byName[r.toLowerCase()];
      return y ? '<a href="#' + y.slug + '">' + esc(display(y.t)) + "</a>" : esc(r);
    }).join("");

    return '<article class="entry" id="' + x.slug + '" aria-labelledby="h-' + x.slug + '">' +
      '<div class="entry-head">' +
        '<h3 class="hw" id="h-' + x.slug + '"><a href="#' + x.slug + '">' + highlight(display(x.t), q) + "</a></h3>" +
        '<span class="pos">' + esc(x.pos) + "</span>" +
        (x.gr ? '<span class="gr">' + esc(x.gr) + "</span>" : "") +
        '<button type="button" class="cat-link" data-cat="' + x.c + '" title="Show all ' + esc(CATEGORIES[x.c]) + ' terms">' + esc(CATEGORIES[x.c]) + "</button>" +
      "</div>" +
      (meta.length ? '<div class="meta">' + meta.join("") + "</div>" : "") +
      '<div class="sense sense-plain"><span class="tag tag-plain">Plain English</span><div class="sense-body">' +
        '<p class="def">' + highlight(x.s, q) + "</p>" +
        '<p class="eg">' + highlight(x.se, q) + "</p></div></div>" +
      '<div class="sense sense-tech"><span class="tag tag-tech">Technical</span><div class="sense-body">' +
        '<p class="def">' + highlight(x.a, q) + "</p>" +
        '<p class="eg">' + highlight(x.ae, q) + "</p></div></div>" +
      '<div class="entry-foot">' +
        (see ? '<p class="see"><b>See also</b>' + see + "</p>" : "<span></span>") +
        '<button type="button" class="copy-link" data-slug="' + x.slug + '">Copy link</button>' +
      "</div>" +
    "</article>";
  }

  function render() {
    var res = filtered();
    var rows = res.rows;
    var q = state.q.trim();
    var html = "";

    if (!rows.length) {
      var subject = encodeURIComponent("Lumenary: please add “" + q + "”");
      html = '<div class="empty"><h2>No entry for “' + esc(q) + '” yet</h2>' +
        "<p>Check the spelling, try a shorter word, or choose another topic.</p>" +
        '<p>Think it belongs here? Suggest it to <a href="mailto:info@storitellah.com?subject=' + subject + '">info@storitellah.com</a>.</p></div>';
    } else if (res.ranked) {
      html = '<div class="group"><div class="group-entries">' + rows.map(function (x) { return entryHTML(x, q); }).join("") + "</div></div>";
    } else {
      var groups = {};
      rows.forEach(function (x) { (groups[x.letter] = groups[x.letter] || []).push(x); });
      Object.keys(groups).sort().forEach(function (L) {
        html += '<section class="group" id="letter-' + L.toLowerCase() + '" aria-labelledby="L-' + L + '">' +
          '<div class="letter"><h2 id="L-' + L + '">' + L + "</h2></div>" +
          '<div class="group-entries">' + groups[L].map(function (x) { return entryHTML(x, ""); }).join("") + "</div></section>";
      });
    }
    listEl.innerHTML = html;

    var catName = state.cat === "all" ? "" : " in <strong>" + esc(CATEGORIES[state.cat]) + "</strong>";
    statusEl.innerHTML = q
      ? "<strong>" + rows.length + "</strong> " + (rows.length === 1 ? "result" : "results") + " for “" + esc(q) + "”" + catName
      : "<strong>" + rows.length + "</strong> terms" + catName + ", A to Z";

    renderAZ(rows, !!q);
  }

  function renderAZ(rows, searching) {
    var have = {};
    rows.forEach(function (x) { have[x.letter] = true; });
    var html = "";
    for (var i = 65; i <= 90; i++) {
      var L = String.fromCharCode(i);
      html += (have[L] && !searching)
        ? '<a href="#letter-' + L.toLowerCase() + '" data-letter="' + L + '">' + L + "</a>"
        : '<span aria-hidden="true">' + L + "</span>";
    }
    azEl.innerHTML = html;
  }

  function renderChips() {
    var counts = {};
    terms.forEach(function (x) { counts[x.c] = (counts[x.c] || 0) + 1; });
    var html = chip("all", "All topics", terms.length);
    Object.keys(CATEGORIES).forEach(function (k) { html += chip(k, CATEGORIES[k], counts[k] || 0); });
    $("chips").innerHTML = html;
    function chip(k, label, n) {
      return '<button type="button" class="chip" data-cat="' + k + '" aria-pressed="' + (state.cat === k) + '">' + esc(label) + "<span>" + n + "</span></button>";
    }
  }

  function renderWotd() {
    var day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
    var x = terms[(day * 37) % terms.length];
    $("wotd").innerHTML = '<a class="wotd-term" href="#' + x.slug + '">' + esc(display(x.t)) + "</a>" +
      '<span class="wotd-pos">' + esc(x.pos) + "</span>" +
      '<p class="wotd-def">' + esc(x.s) + "</p>";
  }

  function setSense(s) {
    state.sense = s;
    document.body.setAttribute("data-sense", s);
    Array.prototype.forEach.call(document.querySelectorAll(".sense-switch button"), function (b) {
      b.setAttribute("aria-checked", String(b.getAttribute("data-sense") === s));
    });
    writePref("lumenary-sense", s);
  }

  function setCat(c) {
    state.cat = c;
    Array.prototype.forEach.call(document.querySelectorAll(".chip"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-cat") === c));
    });
    render();
  }

  /* ---------- permalinks ---------- */
  function goToHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    var target = document.getElementById(h);
    if (!target && bySlug[h]) {
      // entry hidden by a search or filter: clear them, then retry
      state.q = ""; qEl.value = "";
      setCat("all");
      target = document.getElementById(h);
    }
    if (!target) return;
    target.scrollIntoView({ block: "start" });
    Array.prototype.forEach.call(document.querySelectorAll(".entry.is-target"), function (e) { e.classList.remove("is-target"); });
    if (target.classList.contains("entry")) target.classList.add("is-target");
  }

  function pageLink(slug) {
    return location.href.split("#")[0] + "#" + slug;
  }

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2200);
  }

  function copy(text, okMsg) {
    var done = function () { toast(okMsg); };
    var fallback = function () {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      toast(ok ? okMsg : "Copy blocked here. Select the text and copy it: " + text);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
  }

  /* ---------- events ---------- */
  var debounce;
  qEl.addEventListener("input", function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () { state.q = qEl.value; render(); }, 90);
  });
  $("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    state.q = qEl.value; render();
    var first = listEl.querySelector(".entry");
    if (first) first.scrollIntoView({ block: "start" });
  });

  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (e.key === "/" && tag !== "input" && tag !== "textarea") { e.preventDefault(); qEl.focus(); qEl.select(); }
    if (e.key === "Escape" && e.target === qEl && qEl.value) { qEl.value = ""; state.q = ""; render(); }
  });

  document.addEventListener("click", function (e) {
    var el = e.target.closest("button, a");
    if (!el) return;
    if (el.matches(".chip, .cat-link")) {
      setCat(el.getAttribute("data-cat"));
      if (el.matches(".cat-link")) $("entries").scrollIntoView({ block: "start" });
    } else if (el.matches(".sense-switch button")) {
      setSense(el.getAttribute("data-sense"));
    } else if (el.matches(".copy-link")) {
      var slug = el.getAttribute("data-slug");
      copy(pageLink(slug), "Link to “" + display(bySlug[slug].t) + "” copied");
    } else if (el.matches(".copy-email")) {
      copy(el.getAttribute("data-copy"), "Email address copied");
    } else if (el.id === "random") {
      var x = terms[Math.floor(Math.random() * terms.length)];
      if (location.hash === "#" + x.slug) goToHash(); else location.hash = x.slug;
    } else if (el.id === "to-top") {
      e.preventDefault();
      window.scrollTo(0, 0);
    } else if (el.matches('a[href^="#"]') && el.getAttribute("href") === location.hash) {
      goToHash(); // same hash clicked again: hashchange will not fire
    }
  });

  window.addEventListener("hashchange", goToHash);

  /* ---------- boot ---------- */
  qEl.placeholder = "Search " + terms.length + " photography terms";
  setSense(["both", "plain", "tech"].indexOf(state.sense) > -1 ? state.sense : "both");
  renderChips();
  renderWotd();
  render();
  if (location.hash) setTimeout(goToHash, 0);
})();
