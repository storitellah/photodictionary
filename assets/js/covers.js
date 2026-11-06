/* The Dictionary of Photography: cover designs.
   Each option draws a full cover as SVG (700 × 1000) with a border of photography doodles
   woven into geometric, hand-made-looking pattern bands. */
window.PD_COVERS = (function () {
  "use strict";
  var W = 700, H = 1000; // H follows the page shape at render time

  /* ---- photo doodles on a 24-unit grid, stroke only ---- */
  var ICONS = {
    camera: '<rect x="2.5" y="7" width="19" height="13" rx="2.2"/><path d="M8 7l1.6-2.6h4.8L16 7"/><circle cx="12" cy="13.5" r="3.6"/><circle cx="12" cy="13.5" r="1.4"/><path d="M5 10h1.6"/>',
    lens: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="2"/><path d="M6.5 6.5l1.6 1.6"/>',
    aperture: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8.2L6 4.9M15.3 10.1v-6.9M15.3 13.9l6-3.4M12 15.8l6 3.4M8.7 13.9v6.9M8.7 10.1L2.7 13.5"/><path d="M12 8.2l3.3 1.9v3.8L12 15.8l-3.3-1.9v-3.8z"/>',
    film: '<rect x="2.5" y="4" width="19" height="16" rx="1"/><path d="M2.5 8h19M2.5 16h19M6 4v4M10 4v4M14 4v4M18 4v4M6 16v4M10 16v4M14 16v4M18 16v4"/>',
    roll: '<rect x="3" y="5" width="9" height="14" rx="2"/><path d="M5 3.5h5M12 8.5h8.5v7H12M14.5 8.5v7M17.5 8.5v7"/>',
    bulb: '<circle cx="12" cy="9" r="5"/><path d="M9.5 13.5v3h5v-3M10 19h4M12 1.5v1.5M5 4l1 1M19 4l-1 1M3.5 9h1.5M19 9h1.5"/>',
    tripod: '<rect x="8" y="2.5" width="8" height="5.5" rx="1"/><path d="M12 8v4M12 12l-6 9.5M12 12l6 9.5M12 12v9.5"/>',
    eye: '<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3.3"/><circle cx="12" cy="12" r="1"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>'
  };
  var ORDER = ["camera", "aperture", "film", "bulb", "lens", "tripod", "eye", "roll", "sun"];

  function icon(name, x, y, size, color, sw) {
    var k = size / 24;
    return '<g transform="translate(' + (x - size / 2).toFixed(1) + " " + (y - size / 2).toFixed(1) + ") scale(" + k.toFixed(3) + ')" fill="none" stroke="' + color + '" stroke-width="' + (sw || 1.5) + '" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + "</g>";
  }

  /* points evenly spaced around a rectangle's centre line, with corners */
  function perimeter(inset, step) {
    var x0 = inset, y0 = inset, x1 = W - inset, y1 = H - inset, pts = [];
    var nx = Math.max(2, Math.round((x1 - x0) / step)), ny = Math.max(2, Math.round((y1 - y0) / step));
    for (var i = 0; i < nx; i++) pts.push([x0 + (x1 - x0) * i / nx, y0, "h"]);
    for (i = 0; i < ny; i++) pts.push([x1, y0 + (y1 - y0) * i / ny, "v"]);
    for (i = 0; i < nx; i++) pts.push([x1 - (x1 - x0) * i / nx, y1, "h"]);
    for (i = 0; i < ny; i++) pts.push([x0, y1 - (y1 - y0) * i / ny, "v"]);
    return pts;
  }
  function isCorner(p, inset) {
    return (Math.abs(p[0] - inset) < 1 || Math.abs(p[0] - (W - inset)) < 1) && (Math.abs(p[1] - inset) < 1 || Math.abs(p[1] - (H - inset)) < 1);
  }

  /* a row of sawtooth triangles along each side of a rectangle */
  function sawtooth(inset, size, color, inward) {
    var d = "", s = size, x0 = inset, x1 = W - inset, y0 = inset, y1 = H - inset, dir = inward ? 1 : -1, n, i, w;
    n = Math.round((x1 - x0) / s); w = (x1 - x0) / n;
    for (i = 0; i < n; i++) {
      var a = x0 + i * w;
      d += "M" + a + " " + y0 + "L" + (a + w / 2) + " " + (y0 + dir * s * 0.8) + "L" + (a + w) + " " + y0 + "Z";
      d += "M" + a + " " + y1 + "L" + (a + w / 2) + " " + (y1 - dir * s * 0.8) + "L" + (a + w) + " " + y1 + "Z";
    }
    n = Math.round((y1 - y0) / s); w = (y1 - y0) / n;
    for (i = 0; i < n; i++) {
      var b = y0 + i * w;
      d += "M" + x0 + " " + b + "L" + (x0 + dir * s * 0.8) + " " + (b + w / 2) + "L" + x0 + " " + (b + w) + "Z";
      d += "M" + x1 + " " + b + "L" + (x1 - dir * s * 0.8) + " " + (b + w / 2) + "L" + x1 + " " + (b + w) + "Z";
    }
    return '<path d="' + d + '" fill="' + color + '"/>';
  }
  function frame(inset, color, sw) {
    return '<rect x="' + inset + '" y="' + inset + '" width="' + (W - 2 * inset) + '" height="' + (H - 2 * inset) + '" fill="none" stroke="' + color + '" stroke-width="' + (sw || 2) + '"/>';
  }
  /* seeded jitter for a hand-drawn feel */
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  /* ---- shared title block ---- */
  function titleBlock(o, t) {
    var cx = W / 2, y = o.titleY || 400;
    return '<g text-anchor="middle" fill="' + t.ink + '">' +
      '<text x="' + cx + '" y="' + (y - 78) + '" font-family="' + t.serif + '" font-style="italic" font-size="34">The</text>' +
      '<text x="' + cx + '" y="' + y + '" font-family="' + t.serif + '" font-weight="700" font-size="54" letter-spacing="-0.5">Dictionary</text>' +
      '<text x="' + cx + '" y="' + (y + 52) + '" font-family="' + t.serif + '" font-style="italic" font-size="32">of</text>' +
      '<text x="' + cx + '" y="' + (y + 124) + '" font-family="' + t.serif + '" font-weight="700" font-size="54" letter-spacing="-0.5">Photography</text>' +
      '<path d="M' + (cx - 80) + " " + (y + 166) + "h160" + '" stroke="' + t.accent + '" stroke-width="2"/>' +
      '<text x="' + cx + '" y="' + (y + 216) + '" font-family="' + t.sans + '" font-weight="600" font-size="22" letter-spacing="6">BRIAN OTIENO</text>' +
      "</g>";
  }
  function pubMark(t, y) {
    return '<text x="' + W / 2 + '" y="' + y + '" text-anchor="middle" fill="' + t.ink + '" opacity="0.8" font-family="' + t.sans + '" font-weight="600" font-size="15" letter-spacing="5">STORITELLAH</text>';
  }
  var T = { serif: "Libre Baskerville, Baskerville, Georgia, serif", sans: "IBM Plex Sans Condensed, Arial Narrow, sans-serif" };
  function th(o) { var r = {}; for (var k in T) r[k] = T[k]; for (k in o) r[k] = o[k]; return r; }

  /* ===================== A. Kitenge band ===================== */
  function kitenge() {
    var t = th({ bg: "#0c5263", band: "#083c49", ink: "#f2e7c9", accent: "#e3a63a" });
    var mid = 66, out = "";
    out += '<rect width="' + W + '" height="' + H + '" fill="' + t.bg + '"/>';
    out += '<path fill-rule="evenodd" fill="' + t.band + '" d="M24 24H676V976H24Z M108 108H592V892H108Z"/>';
    out += sawtooth(24, 22, t.accent, true) + sawtooth(108, 22, t.accent, false);
    out += frame(24, t.ink, 2) + frame(108, t.ink, 2) + frame(126, t.ink, 1);
    perimeter(mid, 76).forEach(function (p, i) {
      if (isCorner(p, mid)) {
        out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="22" fill="' + t.accent + '"/>' + icon("aperture", p[0], p[1], 30, t.band, 1.8);
        return;
      }
      out += '<path d="M' + p[0] + " " + (p[1] - 26) + "L" + (p[0] + 26) + " " + p[1] + "L" + p[0] + " " + (p[1] + 26) + "L" + (p[0] - 26) + " " + p[1] + 'Z" fill="none" stroke="' + t.ink + '" stroke-width="1.4"/>';
      out += icon(ORDER[i % ORDER.length], p[0], p[1], 24, t.ink, 1.6);
    });
    out += titleBlock({ titleY: 470 }, t) + pubMark(t, 846);
    out += icon("aperture", W / 2, 250, 64, t.ink, 1.3);
    return out;
  }

  /* ===================== B. Beadwork rows ===================== */
  function beadwork() {
    var t = th({ bg: "#1e1c1a", ink: "#f4efe4", accent: "#d9a23a" });
    var cols = ["#c8412f", "#f4efe4", "#d9a23a", "#2a8c8c", "#f4efe4"], out = "";
    out += '<rect width="' + W + '" height="' + H + '" fill="' + t.bg + '"/>';
    // bead rows: three concentric rows of dots
    [34, 50, 66].forEach(function (inset, row) {
      perimeter(inset, 14).forEach(function (p, i) {
        var c = cols[(Math.floor(i / 3) + row) % cols.length];
        out += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="5.2" fill="' + c + '"/>';
      });
    });
    // medallions with doodles
    perimeter(118, 118).forEach(function (p, i) {
      var c = i % 2 ? "#c8412f" : "#2a8c8c";
      out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="27" fill="' + c + '"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="31" fill="none" stroke="' + t.accent + '" stroke-width="2" stroke-dasharray="2 5" stroke-linecap="round"/>';
      out += icon(ORDER[(i + 2) % ORDER.length], p[0], p[1], 30, t.ink, 1.7);
    });
    out += frame(84, t.accent, 1.5) + frame(156, t.accent, 1.5);
    out += titleBlock({ titleY: 470 }, t) + pubMark(t, 822);
    out += icon("camera", W / 2, 258, 70, t.accent, 1.2);
    return out;
  }

  /* ===================== C. Mudcloth marks ===================== */
  function mudcloth(back) {
    var t = th({ bg: "#2a2019", ink: "#ece2cf", accent: "#ece2cf" });
    var r = rng(7), out = "", i;
    out += '<rect width="' + W + '" height="' + H + '" fill="' + t.bg + '"/>';
    function jline(x1, y1, x2, y2) {
      var mx = (x1 + x2) / 2 + (r() - 0.5) * 3, my = (y1 + y2) / 2 + (r() - 0.5) * 3;
      return "M" + x1.toFixed(1) + " " + y1.toFixed(1) + "Q" + mx.toFixed(1) + " " + my.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1);
    }
    var d = "";
    // hand-drawn double borders
    [30, 38, 140, 148].forEach(function (k) {
      d += jline(k, k, W - k, k) + jline(W - k, k, W - k, H - k) + jline(W - k, H - k, k, H - k) + jline(k, H - k, k, k);
    });
    // dashes and crosses between rows
    perimeter(52, 18).forEach(function (p) { d += p[2] === "h" ? jline(p[0] - 5, p[1], p[0] + 5, p[1]) : jline(p[0], p[1] - 5, p[0], p[1] + 5); });
    perimeter(126, 24).forEach(function (p) { d += jline(p[0] - 4, p[1] - 4, p[0] + 4, p[1] + 4) + jline(p[0] - 4, p[1] + 4, p[0] + 4, p[1] - 4); });
    out += '<path d="' + d + '" fill="none" stroke="' + t.ink + '" stroke-width="2.2" stroke-linecap="round"/>';
    // dots row
    perimeter(64, 12).forEach(function (p) { out += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2" fill="' + t.ink + '"/>'; });
    // doodles in the wide band
    perimeter(95, 92).forEach(function (p, k) { out += icon(ORDER[(k + 4) % ORDER.length], p[0] + (r() - 0.5) * 4, p[1] + (r() - 0.5) * 4, 34, t.ink, 1.7); });
    var ty = Math.round(H * 0.48);
    if (back) return out + pubMark(t, H - 180) + icon("aperture", W / 2, 215, 52, t.ink, 1.3);
    out += titleBlock({ titleY: ty }, t) + pubMark(t, H - 180);
    out += icon("eye", W / 2, ty - 210, 72, t.ink, 1.3);
    return out;
  }

  /* ===================== D. Ochre totem panels ===================== */
  function totem() {
    var t = th({ bg: "#8a3b1e", ink: "#f3e3c3", accent: "#1f1712" });
    var out = "", i, y;
    out += '<rect width="' + W + '" height="' + H + '" fill="' + t.bg + '"/>';
    // side totems
    [[28, 112], [W - 112, W - 28]].forEach(function (side) {
      var x0 = side[0], x1 = side[1], cx = (x0 + x1) / 2;
      out += '<rect x="' + x0 + '" y="28" width="' + (x1 - x0) + '" height="' + (H - 56) + '" fill="' + t.accent + '"/>';
      for (i = 0, y = 48; y < H - 100; i++, y += 106) {
        out += '<rect x="' + (x0 + 10) + '" y="' + y + '" width="' + (x1 - x0 - 20) + '" height="72" fill="none" stroke="' + t.ink + '" stroke-width="1.6"/>';
        out += icon(ORDER[(i + (x0 > 300 ? 3 : 0)) % ORDER.length], cx, y + 36, 40, t.ink, 1.6);
        out += '<path d="M' + (x0 + 12) + " " + (y + 82) + "l" + ((x1 - x0 - 24) / 4) + " 14l" + ((x1 - x0 - 24) / 4) + " -14l" + ((x1 - x0 - 24) / 4) + " 14l" + ((x1 - x0 - 24) / 4) + ' -14" fill="none" stroke="' + t.ink + '" stroke-width="1.6"/>';
      }
    });
    // top and bottom interlocking triangles
    [[28, 1], [H - 28, -1]].forEach(function (row) {
      var d = "", yy = row[0], dir = row[1];
      for (var x = 124; x < W - 124; x += 28) d += "M" + x + " " + yy + "l14 " + (dir * 26) + "l14 " + (-dir * 26) + "Z";
      out += '<path d="' + d + '" fill="' + t.ink + '"/>';
      out += '<path d="M124 ' + (yy + dir * 34) + "H" + (W - 124) + '" stroke="' + t.ink + '" stroke-width="2"/>';
    });
    out += titleBlock({ titleY: 480 }, t) + pubMark(t, 840);
    out += icon("lens", W / 2, 268, 70, t.ink, 1.3);
    return out;
  }

  var OPTIONS = [
    { id: "kitenge", name: "Kitenge band", note: "Deep teal cloth with an ochre sawtooth band; camera, lens, film and flash doodles set in diamond medallions, aperture marks at the corners.", draw: kitenge },
    { id: "beadwork", name: "Beadwork", note: "Charcoal ground framed by three rows of bead-like dots in red, white, ochre and teal, with doodles in round medallions.", draw: beadwork },
    { id: "mudcloth", name: "Mudcloth marks", note: "Dark earth ground with hand-drawn off-white dashes, crosses and dots, and loose line doodles that feel made by hand.", draw: mudcloth },
    { id: "totem", name: "Ochre totems", note: "Burnt-ochre cover with carved-style side panels stacking photo doodles between chevrons, and triangle friezes top and bottom.", draw: totem }
  ];

  function render(id, label, back, aspect) {
    var o = OPTIONS.filter(function (x) { return x.id === id; })[0] || OPTIONS[0];
    H = Math.round(W / (aspect && o.id === "mudcloth" ? aspect : 0.7));
    return '<svg class="cover-art" viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" ' +
      (back ? 'aria-hidden="true"' : 'role="img" aria-label="' + (label || "Cover: The Dictionary of Photography by Brian Otieno") + '"') +
      ' preserveAspectRatio="xMidYMid meet">' + o.draw(back) + "</svg>";
  }
  return { OPTIONS: OPTIONS, render: render, icon: icon, ICONS: ICONS };
})();
