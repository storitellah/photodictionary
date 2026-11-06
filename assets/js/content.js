/* The Dictionary of Photography by Storitellah
   Content: the A–Z glossary renderer and paginator, study pages, front and back matter.
   Markup inside study strings: *bold collocation*. */
window.PD = (function () {
  "use strict";
  var F = window.PD_FIGS;

  var ENTRIES = [
    {
      slug: "depth-of-field", letter: "D", fig: "depth",
      heads: [
        {
          hw: "depth of field", ipa: "ˌdepθ əv ˈfiːld", pos: "noun", gr: "U", abbr: "DoF", key: true,
          domains: ["PHOTOGRAPHY"],
          senses: [
            { sign: "SHARP ZONE", def: "the distance between the nearest and the farthest parts of a scene that appear acceptably sharp in a photograph.", ex: ["A *shallow depth of field* separates the face from a busy background.", "Stop down to f/11 for a *deep depth of field* in landscapes."] },
            { sign: "CONTROLS", def: "it becomes shallower with a wider aperture (a smaller f-number), a longer focal length or a closer subject, and deeper with the opposite. Only one plane is in exact focus; sharpness falls away gradually on either side of it.", ex: ["Stepping closer *reduced the depth of field* more than opening the aperture did."] }
          ]
        },
        {
          hw: "layering", ipa: "ˈleɪ.ər.ɪŋ", pos: "noun", gr: "U",
          domains: ["VISUAL ARTS"],
          senses: [
            { sign: "DEPTH", def: "arranging elements at different distances, in the *foreground*, *midground* and *background*, so that a flat picture suggests three-dimensional space.", ex: ["A figure in the foreground gives the street scene *a sense of depth*."] },
            { sign: "SEPARATION", def: "the use of overlap, decreasing size, contrast in focus and atmospheric haze to keep each plane distinct.", ex: ["Morning mist *separated the layers* of hills."] }
          ]
        }
      ],
      partners: { word: "depth of field", items: ["shallow/narrow/deep/extensive *depth of field*", "increase/reduce/control *depth of field*", "*depth-of-field* preview"] },
      practice: "Group f/64, founded in 1932 by photographers including Ansel Adams, Imogen Cunningham and Edward Weston, was named after a very small aperture, chosen so that every plane from foreground to horizon would be sharp. Alex Webb's colour street photographs work the other way round: several overlapping layers of figures, shadow and colour each carry part of the picture. In portraiture, a short telephoto lens at f/1.8 keeps the eyes sharp and lets the background dissolve.",
      note: ["RULE OF THUMB", "At ordinary distances roughly one third of the depth of field lies in front of the point of focus and two thirds behind it. At close range the split approaches half and half."],
      caption: "Fig. D1 Three layers, one plane of focus. Below: plan view of the sharp zone.",
      see: ["framing", "leading-lines"], also: ["aperture", "bokeh", "hyperfocal distance"]
    },
    {
      slug: "framing", letter: "F", fig: "framing",
      heads: [
        {
          hw: "framing", ipa: "ˈfreɪ.mɪŋ", pos: "noun", gr: "U", key: true,
          domains: ["PHOTOGRAPHY", "VISUAL ARTS"],
          senses: [
            { sign: "CHOOSING EDGES", def: "the act of deciding where the edges of a picture fall, and so what it includes and leaves out.", ex: ["*Tighter framing* removed the parked cars."] },
            { sign: "INNER BORDER", def: "the use of something in the scene, such as a doorway, window, arch, branch or shadow, to make a second border around the subject.", ex: ["She used the window as a *natural frame* for the portrait."] }
          ]
        },
        {
          hw: "frame within a frame", ipa: "ˌfreɪm wɪˌðɪn ə ˈfreɪm", pos: "noun", gr: "C",
          domains: ["COMPOSITION"],
          senses: [
            { def: "a composition in which an inner border repeats the edges of the picture, pulling attention inwards and adding depth. The inner frame need not be complete, sharp or rectangular.", ex: ["The stone archway creates *a frame within a frame*.", "An out-of-focus branch can *frame the subject* as well as a doorway."] }
          ]
        }
      ],
      partners: { word: "frame", items: ["natural/inner/secondary *frame*", "*frame* a subject in/with/through sth", "tight/loose *framing*"] },
      practice: "Saul Leiter often photographed New York through rain-streaked windows, doorways and narrow gaps between objects, so that partial frames surround his subjects and blur the edges of the scene. Vivian Maier made many self-portraits in which mirrors and shop windows frame her own reflection. Both show that an inner frame can be a reflection, a shadow or a blur as easily as a door.",
      note: ["TIP", "Keep the inner frame darker, simpler or softer than the subject; otherwise the frame competes for attention instead of directing it."],
      caption: "Fig. F1 The archway forms an inner frame inside the picture frame.",
      see: ["depth-of-field", "negative-space", "leading-lines"], also: ["cropping", "vignetting"]
    },
    {
      slug: "golden-ratio", letter: "G", fig: "golden",
      heads: [
        {
          hw: "golden ratio", ipa: "ˌɡəʊl.dən ˈreɪ.ʃi.əʊ", pos: "noun", gr: "singular", also: "golden mean, golden section; symbol φ",
          domains: ["MATHEMATICS", "VISUAL ARTS"],
          senses: [
            { sign: "PROPORTION", def: "a ratio of about 1 : 1.618 in which a line is divided so that the whole is to the longer part as the longer part is to the shorter.", ex: ["The print was trimmed to *the golden ratio*."] },
            { sign: "PHI GRID", def: "a grid that divides the frame at about 38.2% and 61.8% of its width and height, so its intersections sit closer to the centre than those of the rule of thirds.", ex: ["Try *the phi grid* overlay when cropping."] }
          ]
        },
        {
          hw: "Fibonacci spiral", ipa: "ˌfɪb.əˈnɑː.tʃi ˌspaɪə.rəl", pos: "noun", gr: "C", also: "golden spiral",
          domains: ["COMPOSITION"],
          senses: [
            { def: "a curve made of quarter circles drawn through squares whose sides follow the Fibonacci sequence (1, 1, 2, 3, 5, 8 …). It approximates a logarithmic spiral that widens by a factor of φ every quarter turn, and is used to lead the eye to a point of interest.", ex: ["The curve of the bay *follows the spiral* to the lighthouse."] }
          ]
        }
      ],
      partners: { word: "golden ratio", items: ["compose/crop *to the golden ratio*", "a *golden spiral* overlay", "*the phi grid*"] },
      practice: "Henri Cartier-Bresson studied painting under André Lhote, who taught composition built on geometry and the golden section, and Cartier-Bresson later described geometry as central to his way of seeing. His 1932 photograph of a cyclist passing below a spiral staircase in Hyères, France, is often analysed with a golden spiral overlay.",
      note: ["USAGE", "Treat the golden ratio as a guide, not a law. Studies have not shown a consistent preference for golden proportions, and many overlays are fitted to famous pictures after the fact."],
      caption: "Fig. G1 Golden rectangles, the phi grid (dotted) and a Fibonacci spiral.",
      see: ["rule-of-thirds", "leading-lines", "symmetry"], also: ["aspect ratio", "cropping"]
    },
    {
      slug: "juxtaposition", letter: "J", fig: "juxta",
      heads: [
        {
          hw: "juxtaposition", ipa: "ˌdʒʌk.stə.pəˈzɪʃ.ən", pos: "noun", gr: "C or U", key: true,
          domains: ["COMPOSITION", "VISUAL ARTS"],
          senses: [
            { sign: "CONTRAST", def: "the placing of two or more elements side by side in one frame so that the comparison between them creates meaning, tension, irony or humour.", ex: ["*The juxtaposition of* a tiny dog and enormous boots made everyone laugh."] },
            { sign: "KINDS", def: "the contrast may be of scale, age, speed, colour or mood; old and new; nature and the built world; or a real person and a picture of one, such as an advertisement, mural or statue.", ex: ["Street photographers look for *juxtapositions between* posters and passers-by."] }
          ]
        },
        {
          hw: "juxtapose", ipa: "ˌdʒʌk.stəˈpəʊz", pos: "verb", gr: "T",
          domains: [],
          senses: [
            { def: "to put things together, especially to show how different they are.", ex: ["The series *juxtaposes* a ruined chapel *with* a new glass tower."] }
          ]
        }
      ],
      partners: { word: "juxtaposition", items: ["a striking/ironic/visual/unexpected *juxtaposition*", "*the juxtaposition of* A *and/with* B"] },
      practice: "Elliott Erwitt built much of his reputation on witty juxtapositions, often of dogs and their owners. In Robert Doisneau's Un regard oblique (1948), a couple stands at a gallery window: the woman studies one painting while the man's eyes slide towards a painting of a nude, which the viewer can see and she cannot. The meaning lives entirely in the gap between the two glances.",
      note: ["TIP", "Juxtaposition usually depends on timing. Find the first element, compose around it, and wait for the second to enter the frame."],
      caption: "Fig. J1 Two elements, one idea: scale and speed set against each other.",
      see: ["negative-space", "framing", "rule-of-thirds"], also: ["decisive moment", "street photography"]
    },
    {
      slug: "leading-lines", letter: "L", fig: "leading",
      heads: [
        {
          hw: "leading lines", ipa: "ˌliː.dɪŋ ˈlaɪnz", pos: "noun", gr: "plural", key: true,
          domains: ["PHOTOGRAPHY", "COMPOSITION"],
          senses: [
            { sign: "ACTUAL LINES", def: "lines in a scene, such as roads, rivers, rails, fences, shorelines or the edges of buildings, that carry the viewer's eye through the picture, usually towards the main subject.", ex: ["The pier's railings act as *leading lines* to the lighthouse."] },
            { sign: "IMPLIED LINES", def: "lines suggested rather than drawn, for example by a person's gaze, a pointing hand or a row of objects.", ex: ["Her gaze forms an *implied line* to the letter."] },
            { sign: "FORMS", def: "converging lines suggest depth; diagonals suggest movement; S-curves suggest a slow, winding journey.", ex: ["The river makes a gentle *S-curve* through the valley."] }
          ]
        }
      ],
      partners: { word: "leading lines", items: ["strong/converging/diagonal/implied *leading lines*", "use/follow *leading lines* (to sth)"] },
      practice: "Michael Kenna's long-exposure photographs of piers and jetties use their parallel rails and posts to draw the eye out into a misty horizon. A wide-angle lens held low and close to a line exaggerates convergence and makes it stronger; a telephoto lens flattens the same line into a pattern.",
      note: ["TIP", "A leading line should lead to something. A line that runs out of the frame takes the viewer's attention with it."],
      caption: "Fig. L1 Road edges and a fence converge on the vanishing point.",
      see: ["rule-of-thirds", "depth-of-field", "golden-ratio"], also: ["vanishing point", "perspective"]
    },
    {
      slug: "negative-space", letter: "N", fig: "negative",
      heads: [
        {
          hw: "negative space", ipa: "ˌneɡ.ə.tɪv ˈspeɪs", pos: "noun", gr: "U", also: "white space", key: true,
          domains: ["COMPOSITION", "VISUAL ARTS"],
          senses: [
            { sign: "EMPTY AREA", def: "the area of a picture around and between the main subjects, such as sky, water, a plain wall or fog. Opposite: *positive space*.", ex: ["A lone tree stands in *a sea of negative space*."] },
            { sign: "SHAPE", def: "the shapes this area makes, which can be composed as carefully as the subject itself.", ex: ["The space between the two dancers forms a heart."] },
            { sign: "DESIGN", def: "(usually white space) unused space in a layout, often left for a headline or text.", ex: ["*Leave negative space* on the left for the magazine title."] }
          ]
        }
      ],
      partners: { word: "negative space", items: ["generous/ample *negative space*", "use/leave *negative space*", "a balance of *positive and negative space*"] },
      practice: "Michael Kenna's photographs of Hokkaido often show a single tree or a short fence in a wide field of snow; the white field is not empty, it is what gives the small subject its weight. Negative space need not be white or plain: a dark night sky or an evenly rippled sea works in the same way.",
      note: ["TIP", "Give a subject that faces or moves in one direction more space in front of it than behind it. This is called lead room or looking room."],
      caption: "Fig. N1 A small subject given weight by the space around it.",
      see: ["symmetry", "rule-of-thirds", "framing"], also: ["minimalism", "lead room"]
    },
    {
      slug: "rule-of-thirds", letter: "R", fig: "thirds",
      heads: [
        {
          hw: "rule of thirds", ipa: "ðə ˌruːl əv ˈθɜːdz", pos: "noun", gr: "singular", key: true,
          domains: ["PHOTOGRAPHY", "COMPOSITION"],
          senses: [
            { sign: "GRID", def: "a guideline that divides the frame into nine equal parts with two horizontal and two vertical lines, and places the main subject on one of the lines or at one of their four intersections.", ex: ["*Following the rule of thirds*, she put the lighthouse on the right-hand line."] },
            { sign: "HORIZON", def: "placing the horizon on the upper or lower line rather than through the middle, to give more weight to the land or to the sky.", ex: ["With a dramatic sky, put *the horizon on the lower third*."] },
            { sign: "PORTRAITS", def: "placing the eyes near the upper line of the frame.", ex: ["The nearer eye sits on *the top third line*."] }
          ]
        }
      ],
      partners: { word: "rule of thirds", items: ["follow/apply/break *the rule of thirds*", "a *rule-of-thirds* grid/overlay", "*intersections*, also called *power points*"] },
      practice: "Most cameras and phones can show a thirds grid in the viewfinder. Landscape photographers commonly set the horizon on one line and a strong feature, such as a tree or rock, near an intersection. Cropping a centred photograph so that the subject falls on a third is one of the most frequent edits photographers make.",
      note: ["ORIGIN", "The term was coined by the engraver John Thomas Smith in Remarks on Rural Scenery (1797), describing a rule for balancing light and dark in landscape painting. It is a starting point, not a law: centred compositions are often stronger when the subject is symmetrical."],
      caption: "Fig. R1 Horizon on the lower third; the subject on an intersection.",
      see: ["golden-ratio", "symmetry", "negative-space"], also: ["aspect ratio", "cropping"]
    },
    {
      slug: "symmetry", letter: "S", fig: "symmetry",
      heads: [
        {
          hw: "symmetry", ipa: "ˈsɪm.ə.tri", pos: "noun", gr: "U", key: true,
          domains: ["COMPOSITION", "VISUAL ARTS"],
          senses: [
            { sign: "MIRROR", def: "a composition in which one half of the frame mirrors the other across a central axis (reflective or bilateral symmetry).", ex: ["The still lake created *perfect symmetry*."] },
            { sign: "RADIAL", def: "an arrangement of elements around a central point, as in a dome or a spiral staircase seen from below.", ex: ["Shoot straight up for *radial symmetry*."] }
          ],
          runon: "symmetrical adjective"
        },
        {
          hw: "pattern", ipa: "ˈpæt.ən", pos: "noun", gr: "C",
          domains: ["COMPOSITION"],
          senses: [
            { sign: "REPETITION", def: "an arrangement in which shapes, lines, colours or objects repeat at regular intervals.", ex: ["Rows of windows form *a repeating pattern*."] },
            { sign: "BREAK", def: "a single element that interrupts the repetition and so becomes the focal point.", ex: ["One red umbrella *breaks the pattern*."] }
          ]
        }
      ],
      partners: { word: "symmetry", items: ["perfect/near/radial *symmetry*", "a repeating/regular *pattern*", "*break the pattern*"] },
      practice: "Hiroshi Sugimoto's Seascapes series places the horizon exactly across the middle of every frame, turning sea and sky into two equal fields. Andreas Gursky's large photographs, such as 99 Cent (1999), fill the frame with repetition until the pattern itself becomes the subject.",
      note: ["TIP", "Symmetry rewards precision. Use a grid, level the camera and correct lens distortion: near-symmetry tends to look like a mistake."],
      caption: "Fig. S1 Left: mirror symmetry about an axis. Right: a pattern and its break.",
      see: ["rule-of-thirds", "negative-space", "golden-ratio"], also: ["minimalism", "vanishing point"]
    }
  ];

  /* ===================================================================
     Shared helpers
     =================================================================== */
  var CATS = {
    exposure: "EXPOSURE", light: "LIGHTING", optics: "OPTICS", composition: "COMPOSITION",
    colour: "COLOUR", digital: "DIGITAL", gear: "EQUIPMENT", film: "FILM", genre: "GENRE",
    business: "BUSINESS", history: "HISTORY", social: "SOCIAL MEDIA", ethics: "ETHICS"
  };
  var CAT_NAMES = {
    exposure: "exposure", light: "light and lighting", optics: "lenses and optics", composition: "composition",
    colour: "colour", digital: "digital imaging and editing", gear: "cameras and equipment", film: "film and the darkroom",
    genre: "genres and styles", business: "business and rights", history: "history and vintage processes",
    social: "social media and mobile", ethics: "ethics, consent and NGO practice"
  };
  var PROPER = ["Adobe RGB", "Bayer filter", "Rembrandt lighting", "Zone System", "Dutch angle", "T-stop", "X-sync",
    "Group f/64", "Kodachrome", "Dóchas Code", "Content Credentials", "AI-generated image", "Fibonacci spiral"];

  function fold(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function slugify(s) { return fold(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function display(t) {
    if (PROPER.indexOf(t) > -1) return t;
    var first = t.split(/[\s-]/)[0];
    if (first.length > 1 && first === first.toUpperCase() && /[A-Z]/.test(first)) return t;
    if (/^s[A-Z]/.test(t)) return t;
    return t.charAt(0).toLowerCase() + t.slice(1);
  }
  function rich(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\*([^*]+)\*/g, "<b>$1</b>");
  }
  function go(target, label, cls) {
    return '<a href="#' + target + '" class="' + (cls || "xref") + '" data-goto="' + target + '">' + label + "</a>";
  }
  function keyMark() {
    return '<svg class="key" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 3.2 L12 10.4 H4Z" fill="currentColor"/></svg>';
  }

  /* ===================================================================
     Terms
     =================================================================== */
  var TERMS = ((window.LUMENARY && window.LUMENARY.terms) || []).slice();
  TERMS.sort(function (a, b) { return fold(a.t).toLowerCase().localeCompare(fold(b.t).toLowerCase(), "en"); });
  var termBySlug = {}, termByName = {};
  TERMS.forEach(function (x) {
    x.slug = slugify(x.t);
    x.letter = fold(x.t).charAt(0).toUpperCase();
    x.hw = display(x.t);
    termBySlug[x.slug] = x;
    termByName[x.t.toLowerCase()] = x;
  });

  /* Study pages: 8 composition plates + an ethics spread */
  var STUDY = ENTRIES;
  STUDY.forEach(function (e, i) { e.num = i * 2 + 1; e.target = "plate-" + e.slug; });
  var studyBySlug = {};
  STUDY.forEach(function (e) { studyBySlug[e.slug] = e; });
  var ETHICS_NUM = STUDY.length * 2 + 1;  // S17–S18

  /* ===================================================================
     Glossary blocks
     =================================================================== */
  function glossBlocks() {
    var blocks = [], lastLetter = "";
    TERMS.forEach(function (x) {
      if (x.letter !== lastLetter) {
        lastLetter = x.letter;
        blocks.push({ kind: "letter", letter: x.letter, hw: x.hw, slug: x.slug,
          html: '<div class="gb gb-letter" id="letter-' + x.letter.toLowerCase() + '-mark"><span class="bl">' + x.letter + x.letter.toLowerCase() + "</span></div>" });
      }
      var meta = "";
      if (x.ipa) meta += ' <span class="ipa">/' + esc(x.ipa) + "/</span>";
      meta += ' <span class="pos">' + esc(x.pos) + "</span>";
      if (x.gr) meta += ' <span class="gram">' + esc(x.gr) + "</span>";
      if (x.abbr) meta += ' <span class="also">(abbreviation <b>' + esc(x.abbr) + "</b>)</span>";
      if (x.v) meta += ' <span class="also">(' + esc(x.v).replace(/^(US|also|plural)\s+(.+)$/, "$1 <b>$2</b>").replace(/; (US|also) (.+)$/, "; $1 <b>$2</b>") + ")</span>";
      meta += ' <span class="dom">' + CATS[x.c] + "</span>";

      var a = '<div class="gb gb-a" data-entry="' + x.slug + '">' +
        '<p class="ge"><dfn class="hw">' + esc(x.hw) + "</dfn>" + meta + "</p>" +
        '<p class="gs"><b class="sn">1</b> <span class="sign">IN SHORT</span> ' + esc(x.s) + ' <span class="ex">' + esc(x.se) + "</span></p></div>";

      var see = (x.r || []).map(function (r) {
        var y = termByName[r.toLowerCase()];
        return y ? go(y.slug, esc(y.hw)) : esc(r);
      });
      var study = studyBySlug[x.slug];
      var b = '<div class="gb gb-b" data-entry="' + x.slug + '">' +
        '<p class="gs"><b class="sn">2</b> <span class="sign">TECHNICAL</span> ' + esc(x.a) + ' <span class="ex">' + esc(x.ae) + "</span></p>" +
        (see.length || study ? '<p class="gsee"><span class="arr" aria-hidden="true">➞</span>' + see.join(", ") +
          (study ? (see.length ? "; " : "") + go(study.target, "illustrated on study page S" + study.num, "xref xref--study") : "") + "</p>" : "") +
        "</div>";

      blocks.push({ kind: "a", letter: x.letter, hw: x.hw, slug: x.slug, html: a });
      blocks.push({ kind: "b", letter: x.letter, hw: x.hw, slug: x.slug, html: b });
    });
    return blocks;
  }

  /* ===================================================================
     Page furniture
     =================================================================== */
  var KEY_L = "æ cat|ɑː arm|e bed|ə ago|ɜː her|ɪ sit|iː see|ɒ hot|ɔː saw|ʊ put";
  var KEY_R = "uː too|ʌ cup|eɪ day|aɪ my|əʊ go|aʊ how|ɪə near|eə hair|ʊə poor|θ thin|ð this";
  function keyStrip(side) {
    return '<footer class="pkey" aria-label="Pronunciation key">' + (side === "left" ? KEY_L : KEY_R).split("|").map(function (k) {
      var p = k.split(" ");
      return "<span><i>" + p[0] + "</i> " + p[1] + "</span>";
    }).join("") + "</footer>";
  }
  function runhead(side, folio, guide) {
    return '<header class="rh rh--' + side + '"><span class="rh-folio">' + folio + '</span><span class="rh-guide">' + guide + "</span></header>";
  }
  function thumb(letter) {
    var i = Math.max(0, letter.charCodeAt(0) - 65);
    return '<div class="thumb" style="--ti:' + i + '" aria-hidden="true"><span>' + letter + "</span></div>";
  }

  /* ===================================================================
     Glossary pages
     =================================================================== */
  function glossShell(side, folio, guide, letter, colsHTML) {
    return '<article class="page page--gloss page--' + side + '">' +
      runhead(side, folio, guide) +
      '<div class="gcols">' + colsHTML + "</div>" +
      keyStrip(side) + (letter ? thumb(letter) : "") + "</article>";
  }

  /* Measure blocks inside a real page shell, then fill columns greedily. */
  function paginate(host, mode, blocks) {
    var ncols = mode === "spread" ? 2 : 1;
    var m = document.createElement("div");
    m.className = "measure";
    var cols = "";
    for (var c = 0; c < ncols; c++) cols += '<div class="gcol"></div>';
    m.innerHTML = '<div class="face">' + glossShell("right", "1", "guide", "A", cols) + "</div>";
    host.appendChild(m);
    var col = m.querySelector(".gcol");
    var colH = col.getBoundingClientRect().height - 8;
    var probe = document.createElement("div");
    probe.className = "gcol gcol--probe";
    probe.style.width = col.getBoundingClientRect().width + "px";
    probe.innerHTML = blocks.map(function (b) { return b.html; }).join("");
    m.querySelector(".gcols").appendChild(probe);
    var hs = Array.prototype.map.call(probe.children, function (el) { return el.getBoundingClientRect().height; });
    host.removeChild(m);

    var pages = [], page = null, ci = 0, used = 0;
    function newPage() { page = { cols: [], blocks: [] }; for (var k = 0; k < ncols; k++) page.cols.push([]); pages.push(page); ci = 0; used = 0; }
    function nextCol() { ci++; used = 0; if (ci >= ncols) newPage(); }
    newPage();
    for (var i = 0; i < blocks.length; i++) {
      var h = hs[i];
      // keep a letter heading with the entry that follows it, and the first half of an entry with at least a line of the next
      // keep each entry whole (both senses together); a letter heading stays with its first entry
      var need = h, k = blocks[i].kind;
      if (k === "a" && i + 1 < blocks.length) need = h + hs[i + 1];
      if (k === "letter" && i + 2 < blocks.length) need = h + hs[i + 1] + hs[i + 2];
      if (need > colH) need = h; // an entry taller than a column may break between its senses
      if (used > 0 && used + need > colH) nextCol();
      page.cols[ci].push(i);
      page.blocks.push(i);
      used += h;
    }
    return pages.filter(function (p) { return p.blocks.length; }).map(function (p) {
      var first = blocks[p.blocks[0]], last = blocks[p.blocks[p.blocks.length - 1]];
      return {
        kind: "gloss",
        first: first.hw, last: last.hw, letter: first.letter, lastLetter: last.letter,
        slugs: p.blocks.map(function (i) { return blocks[i].slug; }),
        letters: p.blocks.filter(function (i) { return blocks[i].kind === "letter"; }).map(function (i) { return blocks[i].letter; }),
        html: function (side, folio, single) {
          var guide = single ? first.hw + " – " + last.hw : (side === "left" ? first.hw : last.hw);
          var colsHTML = p.cols.map(function (list) { return '<div class="gcol">' + list.map(function (i) { return blocks[i].html; }).join("") + "</div>"; }).join("");
          return glossShell(side, folio, esc(guide), first.letter, colsHTML);
        }
      };
    });
  }

  /* ===================================================================
     Study pages (illustrated composition plates)
     =================================================================== */
  function headHTML(h) {
    var dom = h.domains.map(function (d) { return '<span class="dom">' + d + "</span>"; }).join(" ");
    var senses = h.senses.map(function (s, i) {
      var n = h.senses.length > 1 ? '<b class="sn">' + (i + 1) + "</b> " : "";
      var sign = s.sign ? '<span class="sign">' + s.sign + "</span> " : "";
      var ex = (s.ex || []).map(function (x) { return '<span class="ex">' + rich(x) + "</span>"; }).join(' <span class="exsep">○</span> ');
      return '<p class="sense">' + n + sign + rich(s.def) + " " + ex + "</p>";
    }).join("");
    return '<div class="head">' +
      '<p class="hwline">' + (h.key ? keyMark() : "") + '<dfn class="hw">' + h.hw + "</dfn> " +
      '<span class="ipa">/' + h.ipa + "/</span> " +
      '<span class="pos">' + h.pos + "</span> " +
      '<span class="gram">[' + h.gr + "]</span>" +
      (h.abbr ? ' <span class="also">(abbreviation <b>' + h.abbr + "</b>)</span>" : "") +
      (h.also ? ' <span class="also">(also <b>' + h.also + "</b>)</span>" : "") +
      (dom ? " " + dom : "") + "</p>" + senses +
      (h.runon ? '<p class="runon">●<b>' + h.runon.split(" ")[0] + "</b> <i>" + h.runon.split(" ").slice(1).join(" ") + "</i></p>" : "") +
      "</div>";
  }

  function studyLeft(e, side, folio) {
    return '<article class="page page--' + side + ' page--study" aria-labelledby="hw-' + e.slug + '">' +
      runhead(side, folio, "Study pages · " + e.heads[0].hw) +
      '<div class="body">' +
      '<p class="study-tag">Study page S' + e.num + " · Composition</p>" +
      '<div class="bigletter" aria-hidden="true">' + e.letter + e.letter.toLowerCase() + "</div>" +
      '<h2 class="visually-hidden" id="hw-' + e.slug + '">' + e.heads.map(function (h) { return h.hw; }).join(" and ") + "</h2>" +
      '<div class="cols">' + e.heads.map(headHTML).join("") +
      '<aside class="partners"><p class="partners-h"><span class="pz" aria-hidden="true"></span>WORD PARTNERS FOR <b>' + e.partners.word + "</b></p>" +
      "<p>" + e.partners.items.map(rich).join(" <b>•</b> ").replace(/(\w)\/(\w)/g, "$1/<wbr>$2") + "</p></aside>" +
      "</div></div>" + keyStrip(side) + "</article>";
  }

  function studyRight(e, side, folio) {
    var see = e.see.map(function (s) { return '<li><span class="arr" aria-hidden="true">➞</span>' + go("plate-" + s, studyBySlug[s].heads[0].hw) + "</li>"; }).join("");
    var gl = termBySlug[e.slug];
    return '<article class="page page--' + side + ' page--plate" aria-label="' + e.heads[0].hw + ', illustrated">' +
      runhead(side, folio, e.heads[e.heads.length - 1].hw) +
      '<div class="body">' +
      '<figure class="fig">' + F[e.fig]() + "<figcaption>" + e.caption + "</figcaption></figure>" +
      '<section class="practice"><h3 class="box-h">In practice</h3><p>' + rich(e.practice) + "</p></section>" +
      '<div class="lower">' +
      '<aside class="note"><h3 class="box-h">' + e.note[0] + "</h3><p>" + e.note[1] + "</p></aside>" +
      '<nav class="see" aria-label="See also"><h3 class="box-h">See also</h3><ul>' + see +
      (gl ? '<li><span class="arr" aria-hidden="true">➞</span>' + go(gl.slug, "A–Z entry", "xref xref--study") + "</li>" : "") +
      "</ul>" + '<p class="also-rel">Related: <i>' + e.also.join(", ") + "</i></p></nav>" +
      "</div></div>" + keyStrip(side) + "</article>";
  }

  /* Ethics study spread */
  function ethicsLeft(side, folio) {
    var P = [
      ["informed-consent", "Informed consent", "Explain who will see the image, where, for how long and with what risks, in a language the person understands. Consent is a process, not a signature."],
      ["dignity", "Dignity", "Show people as they would wish to be seen. Ask: would I accept this image of myself or my family?"],
      ["do-no-harm", "Do no harm", "Weigh risks of stigma, retaliation and re-traumatisation, including through captions, locations and metadata."],
      ["agency", "Agency and voice", "Show people as active, use their own words, and share decisions about how their story is told."],
      ["child-safeguarding", "Children", "Guardian consent plus the child's own assent; protect identities wherever publication could put a child at risk."],
      ["image-manipulation", "Accuracy and context", "No staging passed off as real, no misleading edits, and disclosure of composites or AI-generated content."],
      ["right-to-withdraw", "Control over data", "Store images securely, keep consent records with them, and honour requests to withdraw."]
    ];
    return '<article class="page page--' + side + ' page--study page--ethics">' +
      runhead(side, folio, "Study pages · ethics") +
      '<div class="body">' +
      '<p class="study-tag">Study page S' + ETHICS_NUM + " · Ethics</p>" +
      '<h2 class="sec-h">Photographing people with care</h2>' +
      '<p class="lede">Photography for NGOs, charities and community projects carries particular responsibilities: the people in the pictures often have less power than the organisation telling their story. These principles summarise widely used sector guidance.</p>' +
      '<ol class="principles">' + P.map(function (p) {
        return "<li><b>" + go(p[0], p[1]) + ".</b> " + p[2] + "</li>";
      }).join("") + "</ol></div>" + keyStrip(side) + "</article>";
  }
  function ethicsRight(side, folio) {
    return '<article class="page page--' + side + ' page--plate page--ethics" aria-label="Consent pathway">' +
      runhead(side, folio, "informed consent") +
      '<div class="body">' +
      '<figure class="fig">' + F.consent() + '<figcaption>Fig. E1 Consent as a continuing process, not a single signature.</figcaption></figure>' +
      '<section class="practice"><h3 class="box-h">Before you shoot</h3><ul class="checklist">' +
      "<li>Do I have consent from each identifiable person, and assent from children?</li>" +
      "<li>Have I explained every intended use, including social media and fundraising?</li>" +
      "<li>Could this image, caption or geotag expose anyone to harm?</li>" +
      "<li>Does the frame show agency and context, not only need?</li>" +
      "<li>Would the people in the picture recognise themselves in the story?</li></ul></section>" +
      '<div class="lower"><aside class="note"><h3 class="box-h">Sources</h3><p>Dóchas Code of Conduct on Images and Messages (2007) and Guide to Ethical Communications (2023); Bond, <i>Putting the people in the pictures first</i> (2019, updated 2024); UNICEF ethical reporting guidelines; Wang and Burris, photovoice (1997).</p></aside>' +
      '<nav class="see" aria-label="See also"><h3 class="box-h">See also</h3><ul>' +
      ["community-led-storytelling", "participatory-photography", "photovoice", "poverty-porn", "safeguarding"].map(function (s) {
        return '<li><span class="arr" aria-hidden="true">➞</span>' + go(s, termBySlug[s].hw) + "</li>";
      }).join("") + "</ul></nav></div></div>" + keyStrip(side) + "</article>";
  }

  /* ===================================================================
     Front and back matter
     =================================================================== */
  var COVER_ID = "mudcloth";
  function pageAspect() {
    var cs = getComputedStyle(document.documentElement);
    var w = parseFloat(cs.getPropertyValue("--pw")), h = parseFloat(cs.getPropertyValue("--ph"));
    return w && h ? w / h : 0.7;
  }
  function cover() {
    return '<article class="page cover cover--art" aria-label="Front cover: The Dictionary of Photography by Brian Otieno">' +
      window.PD_COVERS.render(COVER_ID, "", false, pageAspect()) + "</article>";
  }
  function backCover(side) {
    return '<article class="page cover cover--art cover--back page--' + side + '" aria-label="Back cover">' +
      window.PD_COVERS.render(COVER_ID, "", true, pageAspect()) +
      '<div class="back-overlay"><p class="back-blurb">From the daguerreotype to the deepfake, from aperture to informed consent: <b>The Dictionary of Photography</b> defines ' + TERMS.length + ' terms twice over, in plain English and in technical depth, with illustrated study pages on composition and on photographing people with care.</p>' +
      '<p class="back-author">Brian Otieno</p>' +
      '<p class="back-links"><a href="https://storitellah.com" rel="noopener">storitellah.com</a><br>info@storitellah.com</p></div></article>';
  }
  function titlePage(side, folio) {
    return '<article class="page page--' + side + ' page--front" aria-label="Title page">' +
      runhead(side, folio, "") +
      '<div class="body title-body">' +
      '<p class="eyebrow">Storitellah</p>' +
      '<h2 class="title-h">The Dictionary of Photography</h2>' +
      '<p class="title-sub">The essential lexicon of visual language, technique and practice</p>' +
      '<p class="title-author">Brian Otieno</p>' +
      '<hr class="rule">' +
      '<div class="intro">' +
      "<p>This dictionary explains " + TERMS.length + " words used by photographers, from the chemistry of the first daguerreotypes to the vocabulary of social media and the ethics of photographing people. Every entry gives two senses: a short explanation <b>in short</b>, for anyone who has just picked up a camera, and a <b>technical</b> sense with the precise meaning, the numbers and the history.</p>" +
      "<p>Eighteen illustrated study pages in the middle of the book show eight core composition techniques at work, and set out the principles of consent and dignity used by NGOs and community storytellers.</p>" +
      "</div>" +
      '<p class="imprint">Written by Brian Otieno · Published by <a href="https://storitellah.com" rel="noopener">Storitellah</a> · British English</p>' +
      "</div></article>";
  }
  function contentsPage(side, folio, ctx) {
    var letters = ctx.letters.map(function (l) {
      return '<li><a href="#letter-' + l.letter.toLowerCase() + '" data-goto="letter-' + l.letter.toLowerCase() + '"><span class="toc-l">' + l.letter + '</span><span class="toc-dots"></span><span class="toc-n">' + l.folio + "</span></a></li>";
    }).join("");
    var study = STUDY.map(function (e) {
      return '<li><a href="#' + e.target + '" data-goto="' + e.target + '"><span class="toc-t">' + e.heads[0].hw + '</span><span class="toc-dots"></span><span class="toc-n">S' + e.num + "</span></a></li>";
    }).join("") + '<li><a href="#plate-ethics" data-goto="plate-ethics"><span class="toc-t">consent and dignity</span><span class="toc-dots"></span><span class="toc-n">S' + ETHICS_NUM + "</span></a></li>";
    var fm = [["how-to-use", "How to use", ctx.folios["how-to-use"]], ["labels", "Labels and codes", ctx.folios.labels], ["quick-reference", "Quick reference", ctx.folios["quick-reference"]], ["colophon", "About and contact", ctx.folios.colophon]].map(function (f) {
      return '<li><a href="#' + f[0] + '" data-goto="' + f[0] + '"><span class="toc-t">' + f[1] + '</span><span class="toc-dots"></span><span class="toc-n">' + f[2] + "</span></a></li>";
    }).join("");
    return '<article class="page page--' + side + ' page--front" aria-label="Contents">' +
      runhead(side, folio, "Contents") +
      '<div class="body"><h2 class="sec-h">Contents</h2>' +
      '<h3 class="sec-h2">The dictionary, A–Z</h3><ol class="toc toc--letters">' + letters + "</ol>" +
      '<h3 class="sec-h2">Study pages</h3><ol class="toc toc--two">' + study + "</ol>" +
      '<h3 class="sec-h2">Front and back matter</h3><ol class="toc toc--two">' + fm + "</ol></div></article>";
  }
  function howToPage(side, folio) {
    return '<article class="page page--' + side + ' page--front" aria-label="How to use this dictionary">' +
      runhead(side, folio, "How to use") +
      '<div class="body"><h2 class="sec-h">How to use this dictionary</h2>' +
      '<div class="sample gcol--sample">' +
      '<p class="ge"><span class="callout">1</span><dfn class="hw">bokeh</dfn> <span class="callout">2</span><span class="ipa">/ˈbəʊ.keɪ/</span> <span class="callout">3</span><span class="pos">noun</span> <span class="gram">[U]</span> <span class="callout">4</span><span class="dom">OPTICS</span></p>' +
      '<p class="gs"><span class="callout">5</span><b class="sn">1</b> <span class="sign">IN SHORT</span> the soft, pleasant blur in the parts of a photo that are not in focus <span class="callout">6</span><span class="ex">I love the creamy bokeh this lens gives.</span></p>' +
      '<p class="gs"><b class="sn">2</b> <span class="sign">TECHNICAL</span> the aesthetic quality of out-of-focus rendering …</p>' +
      '<p class="gsee"><span class="callout">7</span><span class="arr">➞</span> <span class="xref-sample">depth of field</span>, <span class="xref-sample">aperture</span></p>' +
      "</div>" +
      '<ol class="legend">' +
      "<li><b>Headword</b>, in alphabetical order. Guide words at the top of each page show the first and last headwords on the spread.</li>" +
      "<li><b>Pronunciation</b> in the International Phonetic Alphabet, British English. A key runs along the foot of every page.</li>" +
      "<li><b>Part of speech</b> and <b>grammar code</b>, such as [C] countable or [U] uncountable.</li>" +
      "<li><b>Subject label</b> showing the field: EXPOSURE, HISTORY, ETHICS and so on.</li>" +
      "<li><b>Two senses</b>: <span class=\"sign\">IN SHORT</span> in everyday words, then <span class=\"sign\">TECHNICAL</span> with the precise meaning.</li>" +
      "<li><b>Examples</b> in italics show the word in use.</li>" +
      "<li><b>Cross-references</b>. Select one to turn straight to that entry or study page.</li>" +
      "</ol><p class=\"small\">Use the search box or the Index to find a word quickly. The coloured tabs at the page edge mark each letter of the alphabet.</p></div></article>";
  }
  function labelsPage(side, folio) {
    var codes = [["[C]", "countable noun: <i>a lens, two lenses</i>"], ["[U]", "uncountable noun: <i>depth of field</i>"], ["[C or U]", "can be either"], ["[plural]", "plural noun: <i>leading lines</i>"], ["[T]", "transitive verb: takes an object"]];
    var labels = Object.keys(CATS).map(function (k) { return '<li><span class="dom">' + CATS[k] + "</span> " + CAT_NAMES[k] + "</li>"; }).join("");
    function rows(list) {
      return list.map(function (r) { return '<tr><th scope="row"><span class="gram">' + r[0] + "</span></th><td>" + r[1] + "</td></tr>"; }).join("");
    }
    return '<article class="page page--' + side + ' page--front" aria-label="Labels and pronunciation">' +
      runhead(side, folio, "Labels and codes") +
      '<div class="body"><h2 class="sec-h">Labels, codes and pronunciation</h2>' +
      '<table class="codes"><caption>Grammar codes</caption>' + rows(codes) + "</table>" +
      '<h3 class="sec-h2">Subject labels</h3><ul class="labels">' + labels + "</ul>" +
      '<h3 class="sec-h2">Pronunciation</h3><p class="small">Main stress follows <span class="ipa">ˈ</span>, secondary stress follows <span class="ipa">ˌ</span>; dots separate syllables.</p>' +
      '<div class="ipa-grid">' + (KEY_L + "|" + KEY_R).split("|").map(function (k) { var p = k.split(" "); return '<span><i class="ipa">' + p[0] + "</i> " + p[1] + "</span>"; }).join("") + "</div>" +
      "</div></article>";
  }
  function quickRefPage(side, folio) {
    var rows = [
      ["rule-of-thirds", "Balances a subject off-centre", "Landscapes, portraits"],
      ["leading-lines", "Moves the eye to the subject", "Roads, rivers, buildings"],
      ["negative-space", "Isolates and gives weight", "Minimal scenes, layouts"],
      ["golden-ratio", "Organic, flowing balance", "Curves, careful crops"],
      ["framing", "Focuses attention, adds depth", "Doorways, windows"],
      ["symmetry", "Order, calm, formality", "Architecture, reflections"],
      ["depth-of-field", "Separates or unites planes", "Portraits, street"],
      ["juxtaposition", "Meaning through contrast", "Street, documentary"]
    ];
    return '<article class="page page--' + side + ' page--front" aria-label="Quick reference">' +
      runhead(side, folio, "Quick reference") +
      '<div class="body"><h2 class="sec-h">Choosing a technique</h2>' +
      '<p class="small">Techniques combine. A strong frame often uses several at once: leading lines that end on a third, a subject framed by a doorway, and negative space beyond it.</p>' +
      '<div class="tablewrap"><table class="qref"><thead><tr><th scope="col">Technique</th><th scope="col">What it does</th><th scope="col">Try it with</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><th scope="row">' + go("plate-" + r[0], studyBySlug[r[0]].heads[0].hw) + "</th><td>" + r[1] + "</td><td>" + r[2] + "</td></tr>"; }).join("") +
      "</tbody></table></div>" +
      '<h3 class="sec-h2">Before photographing people</h3><p class="small">' + go("informed-consent", "Informed consent") + ", " + go("dignity", "dignity") + " and " + go("do-no-harm", "do no harm") + " come first. See study page " + go("plate-ethics", "S" + ETHICS_NUM) + ".</p>" +
      "</div></article>";
  }
  function colophonPage(side, folio) {
    return '<article class="page page--' + side + ' page--front" aria-label="About and contact">' +
      runhead(side, folio, "Colophon") +
      '<div class="body colophon">' + F.emblem() +
      '<h2 class="sec-h">About this book</h2>' +
      "<p><b>The Dictionary of Photography</b>, written by Brian Otieno and published by Storitellah, is a reference to the language of photography: technique, equipment, history, the vocabulary of social media, and the ethics of photographing people.</p>" +
      "<p>Definitions follow established photographic usage. Historical dates and the descriptions of sector codes have been checked against published sources; examples of practice refer to published work by the photographers named.</p>" +
      '<h3 class="sec-h2">Contact</h3>' +
      '<p class="contact">Suggestions, corrections and licensing:<br><a href="mailto:info@storitellah.com">info@storitellah.com</a></p>' +
      '<p class="contact"><a href="https://storitellah.com" rel="noopener">storitellah.com</a></p>' +
      '<p class="small">Set in Libre Baskerville and Source Serif 4, with IPA in Gentium. Cover border of photography doodles in mudcloth-style marks; plates drawn for this edition.</p>' +
      "</div></article>";
  }
  function notesPage(side, folio) {
    return '<article class="page page--' + side + ' page--notes" aria-label="Notes">' +
      runhead(side, folio, "Notes") + '<div class="body"><h2 class="sec-h">Notes</h2><div class="ruled" aria-hidden="true"></div></div></article>';
  }

  /* ===================================================================
     Assemble the book for a layout mode
     =================================================================== */
  function roman(n) { return ["", "i", "ii", "iii", "iv", "v", "vi"][n] || String(n); }

  function assemble(host, mode) {
    var spread = mode === "spread";
    var blocks = glossBlocks();
    var split = 0;
    for (var i = 0; i < blocks.length; i++) { if (blocks[i].kind === "letter" && blocks[i].letter > "M") { split = i; break; } }
    var g1 = paginate(host, mode, blocks.slice(0, split));
    var g2 = paginate(host, mode, blocks.slice(split));

    var P = []; // { id, render(side, folio), folio, label, targets }
    P.push({ id: "cover", label: "Front cover", render: function () { return cover(); } });
    var fm = [["title", "Title page", titlePage], ["contents", "Contents", null], ["how-to-use", "How to use", howToPage], ["labels", "Labels and codes", labelsPage]];
    fm.forEach(function (f, k) { P.push({ id: f[0], label: f[1], folio: roman(k + 1), fn: f[2] }); });

    var n = 0;
    function addGloss(list) {
      list.forEach(function (g) { n++; P.push({ id: "g" + n, kind: "gloss", g: g, folio: String(n), label: g.first + " – " + g.last }); });
    }
    function pad() { if (spread && P.length % 2 === 0) { n++; P.push({ id: "notes" + n, folio: String(n), label: "Notes", fn: notesPage }); } }
    addGloss(g1);
    pad(); // study pages begin on a left-hand page
    STUDY.forEach(function (e) {
      P.push({ id: e.target, folio: "S" + e.num, label: "Study: " + e.heads[0].hw, study: e, part: 0 });
      P.push({ id: e.target + "-2", folio: "S" + (e.num + 1), label: "Study: " + e.heads[0].hw, study: e, part: 1 });
    });
    P.push({ id: "plate-ethics", folio: "S" + ETHICS_NUM, label: "Study: consent and dignity", fn: ethicsLeft });
    P.push({ id: "plate-ethics-2", folio: "S" + (ETHICS_NUM + 1), label: "Study: consent and dignity", fn: ethicsRight });
    addGloss(g2);
    pad(); // quick reference on a left-hand page
    n++; P.push({ id: "quick-reference", folio: String(n), label: "Quick reference", fn: quickRefPage });
    n++; P.push({ id: "colophon", folio: String(n), label: "About and contact", fn: colophonPage });
    P.push({ id: "back-cover", label: "Back cover", back: true });

    // targets: id → page index
    var T = {}, folios = {}, letterPages = [];
    P.forEach(function (p, idx) {
      T[p.id] = idx; folios[p.id] = p.folio;
      if (p.kind === "gloss") {
        p.g.slugs.forEach(function (s) { if (!(s in T)) T[s] = idx; });
        p.g.letters.forEach(function (L) { T["letter-" + L.toLowerCase()] = idx; letterPages.push({ letter: L, folio: p.folio }); });
      }
    });
    T.index = T.contents;
    var ctx = { letters: letterPages, folios: folios };

    var pages = P.map(function (p, idx) {
      var side = spread ? (idx % 2 ? "left" : "right") : "right";
      var html;
      if (p.id === "cover") html = cover();
      else if (p.back) html = backCover(side);
      else if (p.id === "contents") html = contentsPage(side, p.folio, ctx);
      else if (p.kind === "gloss") html = p.g.html(side, p.folio, !spread);
      else if (p.study) html = p.part === 0 ? studyLeft(p.study, side, p.folio) : studyRight(p.study, side, p.folio);
      else html = p.fn(side, p.folio);
      return { id: p.id, html: html, folio: p.folio || "", label: p.label };
    });
    return { pages: pages, targets: T };
  }

  /* ===================================================================
     Search index
     =================================================================== */
  function search(q, limit) {
    q = fold(q.trim()).toLowerCase();
    if (!q) return [];
    var esc2 = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var wordStart = new RegExp("(^|[\\s-])" + esc2);
    var res = [];
    TERMS.forEach(function (x) {
      var t = fold(x.t).toLowerCase(), s = 0;
      if (t === q) s = 100;
      else if (t.indexOf(q) === 0) s = 80;
      else if (x.abbr && x.abbr.toLowerCase() === q) s = 78;
      else if (wordStart.test(t)) s = 60;
      else if (t.indexOf(q) > -1) s = 50;
      else if (x.v && fold(x.v).toLowerCase().indexOf(q) > -1) s = 45;
      else if (fold(x.s + " " + x.a).toLowerCase().indexOf(q) > -1) s = 20;
      if (s) res.push({ s: s, slug: x.slug, hw: x.hw, cat: CATS[x.c], def: x.s, kind: "term" });
    });
    STUDY.forEach(function (e) {
      var names = e.heads.map(function (h) { return h.hw; }).join(" · ");
      if (fold(names).toLowerCase().indexOf(q) > -1) res.push({ s: 55, slug: e.target, hw: names, cat: "STUDY PAGE S" + e.num, def: e.caption.replace(/^Fig\. \w+ /, ""), kind: "study" });
    });
    if ("consent dignity ethics".indexOf(q) > -1) res.push({ s: 54, slug: "plate-ethics", hw: "consent and dignity", cat: "STUDY PAGE S" + ETHICS_NUM, def: "Principles for photographing people with care.", kind: "study" });
    res.sort(function (a, b) { return b.s - a.s || a.hw.localeCompare(b.hw); });
    return res.slice(0, limit || 12);
  }

  return { assemble: assemble, search: search, TERMS: TERMS, STUDY: STUDY, termBySlug: termBySlug, display: display, CATS: CATS };
})();
