/* Photo Dictionary: SVG plates. Each function returns an inline SVG string.
   Scene tones are a printed duotone; overlays use --ov (guides) and --hot (focal point). */
window.PD_FIGS = (function () {
  "use strict";
  var ink = "#22343a", mid = "#7f9aa1", pale = "#c9d7da", sky = "#e6eef0";
  var OV = "var(--ov)", HOT = "var(--hot)";

  function svg(vb, label, body) {
    return '<svg class="plate" viewBox="' + vb + '" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + body + "</svg>";
  }
  function t(x, y, s, anchor, cls) {
    return '<text x="' + x + '" y="' + y + '" class="lbl' + (cls ? " " + cls : "") + '"' + (anchor ? ' text-anchor="' + anchor + '"' : "") + ">" + s + "</text>";
  }
  function arrowDefs(id) {
    return '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="' + "#00738c" + '"/></marker></defs>';
  }

  /* D — depth of field + layering, with a plan view of the sharp zone */
  function depth() {
    return svg("0 0 300 262", "A meadow scene: blurred grass in the foreground, a sharp standing figure in the midground, soft mountains in the background. Below, a plan view shows the sharp zone extending about one third in front of the focus point and two thirds behind it.",
      '<defs><filter id="bA" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.8"/></filter>' +
      '<filter id="bC" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter>' +
      '<clipPath id="cD"><rect width="300" height="172"/></clipPath>' +
      '<marker id="mD" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#00738c"/></marker></defs>' +
      '<g clip-path="url(#cD)">' +
      '<rect width="300" height="172" fill="' + sky + '"/>' +
      '<path d="M-10 92 L40 52 L72 74 L118 30 L160 70 L196 48 L236 78 L270 56 L310 80 V120 H-10Z" fill="' + pale + '" filter="url(#bA)"/>' +
      '<path d="M-10 118 Q60 96 140 110 T310 104 V180 H-10Z" fill="' + mid + '"/>' +
      '<path d="M-10 132 Q80 122 160 128 T310 126 V180 H-10Z" fill="#a7bcc1"/>' +
      /* sharp midground figure */
      '<g fill="' + ink + '"><circle cx="168" cy="96" r="5.2"/><path d="M162 103 h12 l2 20 h-4 l-1 14 h-3 l-1-14 h-1 l-1 14 h-3 l-1-14 h-4z"/></g>' +
      /* blurred foreground grass */
      '<g fill="#3e5258" filter="url(#bC)"><path d="M-10 180 L6 118 L16 180Z"/><path d="M8 180 L30 102 L40 180Z"/><path d="M34 180 L50 128 L60 180Z"/><path d="M52 180 L82 112 L86 180Z"/><path d="M238 180 L262 120 L268 180Z"/><path d="M262 180 L284 108 L292 180Z"/><path d="M-10 160 H310 V180 H-10Z"/></g>' +
      "</g>" +
      /* layer brackets */
      '<g stroke="' + OV + '" stroke-width="1.2" fill="none"><path d="M292 8 h4 v84 h-4"/><path d="M292 96 h4 v40 h-4"/><path d="M292 140 h4 v30 h-4"/></g>' +
      '<g class="tag-bg"><rect x="250" y="42" width="38" height="13" rx="2"/><rect x="250" y="109" width="38" height="13" rx="2"/><rect x="250" y="148" width="38" height="13" rx="2"/></g>' +
      t(269, 52, "BG", "middle", "on") + t(269, 119, "MG", "middle", "on") + t(269, 158, "FG", "middle", "on") +
      '<path d="M190 82 L176 92" stroke="' + HOT + '" stroke-width="1.4" marker-end="url(#mD)"/>' +
      t(192, 80, "plane of focus", "start", "hot") +
      /* plan view */
      '<g transform="translate(0 186)">' +
      '<rect x="0" y="0" width="300" height="76" fill="#f3f6f6"/>' +
      '<rect x="128" y="14" width="96" height="40" fill="' + OV + '" opacity="0.16"/>' +
      '<path d="M30 34 H292" stroke="' + mid + '" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<g fill="' + ink + '"><rect x="10" y="26" width="18" height="16" rx="2"/><path d="M28 29 l8-3 v16 l-8-3z"/></g>' +
      '<path d="M160 10 V58" stroke="' + HOT + '" stroke-width="2"/>' +
      '<path d="M128 14 V54 M224 14 V54" stroke="' + OV + '" stroke-width="1.2"/>' +
      t(160, 70, "focus", "middle", "hot") + t(128, 70, "near", "middle") + t(224, 70, "far", "middle") +
      t(144, 9, "≈⅓", "middle") + t(192, 9, "≈⅔", "middle") +
      t(19, 58, "camera", "middle") +
      t(262, 30, "sharp", "middle") + t(262, 40, "zone", "middle") +
      "</g>");
  }

  /* F — frame within a frame */
  function framing() {
    return svg("0 0 300 200", "A dark stone archway fills the picture; through the arched opening a small figure stands in a pale landscape. Dashed guides mark the outer picture frame and the inner arch frame.",
      '<defs><marker id="mF" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#00738c"/></marker></defs>' +
      '<rect width="300" height="200" fill="' + sky + '"/>' +
      '<path d="M0 120 L60 96 L110 112 L170 88 L230 108 L300 98 V200 H0Z" fill="' + pale + '"/>' +
      '<path d="M0 150 Q150 136 300 148 V200 H0Z" fill="#b2c3c6"/>' +
      '<g fill="' + ink + '"><circle cx="152" cy="128" r="4"/><path d="M147.5 133 h9 l1.5 15 h-3 l-.8 11 h-2.4 l-.6-11 h-.4 l-.6 11 h-2.4 l-.8-11 h-3z"/></g>' +
      '<path fill-rule="evenodd" fill="#33454a" d="M0 0H300V200H0Z M96 200 V96 A54 54 0 0 1 204 96 V200Z"/>' +
      '<g stroke="#4c6066" stroke-width="1"><path d="M0 40 H86 M214 40 H300 M0 80 H90 M210 80 H300 M0 120 H96 M204 120 H300 M0 160 H96 M204 160 H300"/><path d="M40 0 V40 M60 40 V80 M30 80 V120 M66 120 V160 M36 160 V200 M260 0 V40 M240 40 V80 M270 80 V120 M234 120 V160 M264 160 V200"/></g>' +
      '<path d="M5 5 H295 V195 H5Z" fill="none" stroke="' + OV + '" stroke-width="1.4" stroke-dasharray="5 4"/>' +
      '<path d="M100 196 V96 A50 50 0 0 1 200 96 V196" fill="none" stroke="' + HOT + '" stroke-width="1.6" stroke-dasharray="5 4"/>' +
      '<g stroke="#00738c" stroke-width="1.3" fill="none"><path d="M60 140 L92 134" marker-end="url(#mF)"/><path d="M240 140 L208 134" marker-end="url(#mF)"/></g>' +
      '<g class="tag-bg"><rect x="12" y="12" width="74" height="13" rx="2"/><rect x="214" y="12" width="74" height="13" rx="2"/></g>' +
      t(49, 22, "picture frame", "middle", "on") + t(251, 22, "inner frame", "middle", "on") +
      '<circle cx="152" cy="140" r="15" fill="none" stroke="' + HOT + '" stroke-width="1.4"/>');
  }

  /* G — golden ratio, golden rectangles and Fibonacci spiral */
  function golden() {
    var sq = [[0, 0, 185.41], [185.41, 0, 114.59], [229.18, 114.59, 70.82], [185.41, 141.64, 43.77], [185.41, 114.59, 27.05], [212.46, 114.59, 16.72]];
    var squares = sq.map(function (s) { return '<rect x="' + s[0] + '" y="' + s[1] + '" width="' + s[2] + '" height="' + s[2] + '"/>'; }).join("");
    var spiral = "M0 185.41 A185.41 185.41 0 0 1 185.41 0 A114.59 114.59 0 0 1 300 114.59 A70.82 70.82 0 0 1 229.18 185.41 A43.77 43.77 0 0 1 185.41 141.64 A27.05 27.05 0 0 1 212.46 114.59 A16.72 16.72 0 0 1 229.18 131.31";
    return svg("0 0 300 196", "A coastal scene in a golden rectangle, subdivided into squares whose quarter-circle arcs form a Fibonacci spiral that ends on a small lighthouse.",
      '<rect width="300" height="185.41" fill="' + sky + '"/>' +
      '<rect y="110" width="300" height="75.41" fill="#9fb6bc"/>' +
      '<path d="M300 92 Q250 96 236 112 Q226 124 214 132 L300 132Z" fill="' + mid + '"/>' +
      '<path d="M0 150 Q70 128 150 160 T300 172 V185.41 H0Z" fill="#c4d3d6"/>' +
      '<g fill="' + ink + '"><path d="M219 132 l2.5-16 h3 l2.5 16z"/><rect x="219.5" y="111" width="6" height="5"/></g>' +
      '<g fill="none" stroke="' + OV + '" stroke-width="0.9" opacity="0.75">' + squares + "</g>" +
      '<g stroke="' + OV + '" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.6"><path d="M114.59 0V185.41 M185.41 0V185.41 M0 70.82H300 M0 114.59H300"/></g>' +
      '<path d="' + spiral + '" fill="none" stroke="' + HOT + '" stroke-width="2.2" stroke-linecap="round"/>' +
      '<rect x="0.5" y="0.5" width="299" height="184.41" fill="none" stroke="' + ink + '" stroke-width="1"/>' +
      '<g class="tag-bg"><rect x="8" y="8" width="58" height="13" rx="2"/></g>' + t(37, 18, "1 : 1.618", "middle", "on") +
      t(116, 194, "0.382", "start") + t(187, 194, "0.618", "start"));
  }

  /* J — juxtaposition: a giant sprinter on a billboard above a slow, small walker */
  function juxta() {
    return svg("0 0 300 200", "A billboard shows a giant sprinter in full stride; on the pavement below an elderly person with a walking stick walks slowly in the same direction.",
      '<defs><marker id="mJ" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#00738c"/></marker></defs>' +
      '<rect width="300" height="200" fill="#dfe6e7"/>' +
      '<rect y="164" width="300" height="36" fill="' + pale + '"/>' +
      '<path d="M0 164 H300" stroke="' + mid + '"/>' +
      '<rect x="34" y="16" width="232" height="118" fill="#f4f1ea" stroke="' + mid + '" stroke-width="2"/>' +
      '<path d="M90 134 V164 M210 134 V164" stroke="' + mid + '" stroke-width="4"/>' +
      '<text x="250" y="52" text-anchor="end" class="bill">FASTER</text>' +
      '<g stroke="' + ink + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path d="M104 56 L118 88"/><path d="M106 62 L88 76 L78 66"/><path d="M108 62 L126 70 L136 58"/>' +
      '<path d="M118 88 L142 100 L156 92"/><path d="M118 88 L104 112 L88 116"/></g>' +
      '<circle cx="100" cy="42" r="9.5" fill="' + ink + '"/>' +
      '<g stroke="' + ink + '" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path d="M204 136 Q201 142 200 150"/><path d="M200 150 L205 163 M200 150 L196 163"/><path d="M203 140 L210 148"/><path d="M210 148 L212 164" stroke-width="1.6"/></g>' +
      '<circle cx="205.5" cy="131" r="3.6" fill="' + ink + '"/>' +
      '<path d="M160 104 Q186 112 196 128" fill="none" stroke="#00738c" stroke-width="1.3" stroke-dasharray="4 3" marker-start="url(#mJ)" marker-end="url(#mJ)"/>' +
      '<circle cx="117" cy="82" r="50" fill="none" stroke="' + OV + '" stroke-width="1.3"/>' +
      '<circle cx="204" cy="147" r="20" fill="none" stroke="' + HOT + '" stroke-width="1.5"/>' +
      '<g class="tag-bg"><rect x="40" y="140" width="40" height="13" rx="2"/><rect x="230" y="140" width="40" height="13" rx="2"/></g>' +
      t(60, 150, "A: huge", "middle", "on") + t(250, 150, "B: small", "middle", "on") +
      t(178, 98, "contrast", "middle"));
  }

  /* L — leading lines converging on a vanishing point */
  function leading() {
    var posts = "";
    for (var i = 0; i < 9; i++) {
      var k = Math.pow(0.74, i);
      var x = 196 - 176 * k, h = 52 * k, w = Math.max(1.2, 5 * k), base = 80 + 112 * k;
      posts += '<rect x="' + (x - w / 2).toFixed(1) + '" y="' + (base - h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '"/>';
    }
    return svg("0 0 300 200", "A straight road and a fence converge towards a lone tree on the horizon, at a vanishing point near the right-hand third of the frame.",
      '<defs><marker id="mL" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#00738c"/></marker></defs>' +
      '<rect width="300" height="80" fill="' + sky + '"/>' +
      '<rect y="80" width="300" height="120" fill="#b6c7ca"/>' +
      '<path d="M0 80 H300" stroke="' + mid + '"/>' +
      '<path d="M120 200 L198 80 L202 80 L290 200Z" fill="' + mid + '"/>' +
      '<path d="M205 200 L200 80" stroke="#eef3f3" stroke-width="2.4" stroke-dasharray="10 9"/>' +
      '<g fill="' + ink + '">' + posts + "</g>" +
      '<path d="M20 112 L196 81" stroke="' + ink + '" stroke-width="1"/>' +
      '<g fill="' + ink + '"><rect x="199" y="64" width="2" height="16"/><circle cx="200" cy="60" r="8"/></g>' +
      '<g stroke="' + OV + '" stroke-width="1.3" fill="none" stroke-dasharray="5 4"><path d="M120 200 L194 86" marker-end="url(#mL)"/><path d="M290 200 L206 86" marker-end="url(#mL)"/></g>' +
      '<circle cx="200" cy="72" r="16" fill="none" stroke="' + HOT + '" stroke-width="1.6"/>' +
      '<g class="tag-bg"><rect x="220" y="36" width="72" height="13" rx="2"/></g>' + t(256, 46, "vanishing point", "middle", "on") +
      t(92, 176, "converging", "middle") + t(92, 186, "lines", "middle"));
  }

  /* N — negative space: a small boat in a field of fog */
  function negative() {
    return svg("0 0 300 200", "A tiny sailing boat sits low on the right of a misty, almost empty sea and sky, facing left into open space.",
      '<defs><linearGradient id="gN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef3f4"/><stop offset="0.62" stop-color="#e1e9eb"/><stop offset="1" stop-color="#cbd8db"/></linearGradient>' +
      '<marker id="mN" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#00738c"/></marker></defs>' +
      '<rect width="300" height="200" fill="url(#gN)"/>' +
      '<path d="M0 132 H300" stroke="#d2dcde" stroke-width="1"/>' +
      '<g fill="' + ink + '"><path d="M214 131 h22 l-4 5 h-15z"/><path d="M226 129 V104 L212 129Z"/><path d="M227 129 V108 L236 129Z" opacity="0.7"/></g>' +
      '<g fill="' + ink + '" opacity="0.18"><path d="M217 137 h15 l-3 3 h-10z"/><path d="M226 140 V152 L216 140Z"/></g>' +
      '<rect x="206" y="98" width="38" height="44" fill="none" stroke="' + HOT + '" stroke-width="1.4" stroke-dasharray="3 3"/>' +
      '<path d="M200 120 L120 120" stroke="#00738c" stroke-width="1.3" marker-end="url(#mN)"/>' +
      t(160, 114, "lead room", "middle") +
      '<text x="70" y="64" class="lbl big" text-anchor="middle">negative space</text>' +
      '<g class="tag-bg"><rect x="200" y="148" width="50" height="13" rx="2"/></g>' + t(225, 158, "positive", "middle", "on"));
  }

  /* R — rule of thirds */
  function thirds() {
    var pts = [[100, 66.67], [200, 66.67], [100, 133.33], [200, 133.33]];
    var dots = pts.map(function (p, i) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5.5" fill="' + (i === 1 ? HOT : "none") + '" stroke="' + (i === 1 ? HOT : OV) + '" stroke-width="1.5"' + (i === 1 ? ' fill-opacity="0.35"' : "") + "/>";
    }).join("");
    return svg("0 0 300 200", "A landscape with the horizon on the lower third line and a lone tree whose crown sits on the upper-right intersection of a three-by-three grid.",
      '<rect width="300" height="133.33" fill="' + sky + '"/>' +
      '<circle cx="62" cy="40" r="11" fill="#f1f4f3" stroke="' + pale + '"/>' +
      '<path d="M0 133.33 Q80 126 150 131 T300 129 V200 H0Z" fill="' + mid + '"/>' +
      '<path d="M0 160 Q120 148 300 166 V200 H0Z" fill="#6f8a91"/>' +
      '<g fill="' + ink + '"><path d="M198 131 L199 84 h2 l1 47z"/><circle cx="200" cy="66" r="22"/><circle cx="186" cy="76" r="12"/><circle cx="214" cy="78" r="13"/></g>' +
      '<g stroke="' + OV + '" stroke-width="1" opacity="0.9"><path d="M100 0V200 M200 0V200 M0 66.67H300 M0 133.33H300"/></g>' + dots +
      '<g class="tag-bg"><rect x="8" y="138" width="86" height="13" rx="2"/><rect x="214" y="44" width="66" height="13" rx="2"/></g>' +
      t(51, 148, "horizon on lower third", "middle", "on") + t(247, 54, "power point", "middle", "on"));
  }

  /* S — symmetry (mirror axis) and pattern (one element breaks it) */
  function symmetry() {
    var cols = "";
    [50, 62, 74, 86, 98].forEach(function (x) { cols += '<rect x="' + (x - 2.5) + '" y="62" width="5" height="40"/>'; });
    var umb = "";
    for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++) {
      var x = 172 + c * 26, y = 40 + r * 30, odd = (r === 3 && c === 1);
      umb += '<path d="M' + (x - 10) + " " + y + " A10 10 0 0 1 " + (x + 10) + " " + y + 'Z" fill="' + (odd ? HOT : ink) + '"/><path d="M' + x + " " + y + " v8" + '" stroke="' + (odd ? HOT : ink) + '" stroke-width="1.2"/>';
    }
    return svg("0 0 300 200", "Left: a temple facade mirrored in still water about a vertical axis. Right: a grid of identical dark umbrellas from above, with a single red umbrella breaking the pattern.",
      '<rect width="146" height="200" fill="' + sky + '"/>' +
      '<rect y="110" width="146" height="90" fill="#b9cacd"/>' +
      '<g fill="' + ink + '"><path d="M36 60 L74 38 L112 60Z"/><rect x="38" y="60" width="72" height="4"/>' + cols + '<rect x="34" y="102" width="80" height="8"/></g>' +
      '<g fill="' + ink + '" opacity="0.32" transform="translate(0 220) scale(1 -1)"><path d="M36 60 L74 38 L112 60Z"/><rect x="38" y="60" width="72" height="4"/>' + cols + '<rect x="34" y="102" width="80" height="8"/></g>' +
      '<path d="M74 6 V194" stroke="' + OV + '" stroke-width="1.3" stroke-dasharray="5 4"/>' +
      '<g class="tag-bg"><rect x="80" y="10" width="30" height="13" rx="2"/></g>' + t(95, 20, "axis", "middle", "on") +
      '<rect x="154" width="146" height="200" fill="#d6dfe1"/>' + umb +
      '<circle cx="198" cy="129" r="17" fill="none" stroke="' + HOT + '" stroke-width="1.4"/>' +
      '<g class="tag-bg"><rect x="232" y="176" width="62" height="13" rx="2"/></g>' + t(263, 186, "pattern break", "middle", "on") +
      '<path d="M150 0 V200" stroke="#fdfdfb" stroke-width="8"/>');
  }


  /* E — consent as a process */
  function consent() {
    var steps = [["Explain", "uses and risks"], ["Ask", "free choice"], ["Record", "form or voice"], ["Review", "each new use"], ["Respect", "withdrawal"]];
    var out = "", x0 = 10, w = 52, gap = 7;
    steps.forEach(function (st, i) {
      var x = x0 + i * (w + gap);
      out += '<rect x="' + x + '" y="62" width="' + w + '" height="46" rx="6" fill="' + (i === 0 ? "#00738c" : "#ffffff") + '" stroke="#00738c" stroke-width="1.4"/>';
      out += '<text x="' + (x + w / 2) + '" y="82" text-anchor="middle" class="lbl step' + (i === 0 ? " on" : "") + '">' + st[0] + "</text>";
      out += '<text x="' + (x + w / 2) + '" y="96" text-anchor="middle" class="lbl tiny' + (i === 0 ? " on" : "") + '">' + st[1] + "</text>";
      if (i < steps.length - 1) out += '<path d="M' + (x + w + 1) + " 85 h" + (gap - 2) + '" stroke="#00738c" stroke-width="1.4" marker-end="url(#mE)"/>';
    });
    return svg("0 0 300 170", "A five-step consent pathway: explain, ask, record, review before each new use, and respect withdrawal, with an arrow looping from the last step back to the first.",
      '<defs><marker id="mE" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#00738c"/></marker></defs>' +
      '<rect width="300" height="170" fill="#f3f7f8"/>' +
      '<text x="150" y="34" text-anchor="middle" class="lbl head">INFORMED CONSENT IS A PROCESS</text>' +
      out +
      '<path d="M272 112 V136 H36 V114" fill="none" stroke="var(--hot)" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#mE)"/>' +
      '<text x="154" y="152" text-anchor="middle" class="lbl hot">new use or new risk: go back and ask again</text>');
  }

  /* Cover emblem: an aperture iris */
  function emblem() {
    return '<svg class="emblem" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<path d="M24 15.5L11.58 8.33M31.36 19.75L31.36 5.4M31.36 28.25L43.79 21.08M24 32.5L36.42 39.67M16.64 28.25L16.64 42.6M16.64 19.75L4.21 26.92" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>' +
      '<path d="M24 15.5L31.36 19.75L31.36 28.25L24 32.5L16.64 28.25L16.64 19.75Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  }

  return { depth: depth, framing: framing, golden: golden, juxta: juxta, leading: leading, negative: negative, thirds: thirds, symmetry: symmetry, emblem: emblem, consent: consent };
})();
