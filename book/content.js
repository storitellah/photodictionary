/* Photo Dictionary: entries and page templates.
   Markup conventions inside strings: *bold collocation* and _italic_. */
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

  var bySlug = {};
  ENTRIES.forEach(function (e, i) { e.index = i; e.page = 5 + i * 2; bySlug[e.slug] = e; });

  var TOTAL = 24;
  function folio(p) {
    if (p === 0) return "Cover";
    if (p === TOTAL - 1) return "Back cover";
    if (p <= 4) return ["", "i", "ii", "iii", "iv"][p];
    return String(p - 4);
  }

  /* ---------- small renderers ---------- */
  function rich(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/\*([^*]+)\*/g, "<b>$1</b>").replace(/_([^_]+)_/g, "<i>$1</i>");
  }
  function go(slug, label) { return '<a href="#' + slug + '" class="xref" data-goto="' + slug + '">' + label + "</a>"; }
  function keyMark() { return '<svg class="key" viewBox="0 0 16 16" aria-label="core term" role="img"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 3.2 L12 10.4 H4Z" fill="currentColor"/></svg>'; }

  var KEY_L = "æ cat|ɑː arm|e bed|ə ago|ɜː her|ɪ sit|iː see|ɒ hot|ɔː saw|ʊ put";
  var KEY_R = "uː too|ʌ cup|eɪ day|aɪ my|əʊ go|aʊ how|ɪə near|eə hair|ʊə poor|θ thin|ð this";
  function keyStrip(side) {
    return '<footer class="pkey" aria-label="Pronunciation key">' + (side === "left" ? KEY_L : KEY_R).split("|").map(function (k) {
      var p = k.split(" ");
      return "<span><i>" + p[0] + "</i> " + p[1] + "</span>";
    }).join("") + "</footer>";
  }
  function runhead(left, num, right) {
    return '<header class="rh"><span>' + left + '</span><span class="rh-num">' + num + '</span><span class="rh-r">' + right + "</span></header>";
  }
  function thumb(letter, idx) {
    return '<div class="thumb" style="--ti:' + idx + '" aria-hidden="true">' + letter + "</div>";
  }

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

  /* ---------- page templates ---------- */
  function entryLeft(e, side) {
    var p = e.page;
    return '<article class="page page--' + side + ' page--entry" data-page="' + p + '" aria-labelledby="hw-' + e.slug + '">' +
      runhead(e.letter + ", " + e.letter.toLowerCase(), folio(p), keyMark() + " Core terms") +
      '<div class="body">' +
      '<div class="bigletter" aria-hidden="true">' + e.letter + e.letter.toLowerCase() + "</div>" +
      '<h2 class="visually-hidden" id="hw-' + e.slug + '">' + e.heads.map(function (h) { return h.hw; }).join(" and ") + "</h2>" +
      '<div class="cols">' + e.heads.map(headHTML).join("") +
      '<aside class="partners"><p class="partners-h"><span class="pz" aria-hidden="true"></span>WORD PARTNERS FOR <b>' + e.partners.word + "</b></p>" +
      "<p>" + e.partners.items.map(rich).join(" <b>•</b> ").replace(/(\w)\/(\w)/g, "$1/<wbr>$2") + "</p></aside>" +
      "</div></div>" + keyStrip(side) + thumb(e.letter, e.index) + "</article>";
  }

  function entryRight(e, side) {
    var p = e.page + 1;
    var see = e.see.map(function (s) { return '<li><span class="arr" aria-hidden="true">➞</span>' + go(s, bySlug[s].heads[0].hw) + "</li>"; }).join("");
    return '<article class="page page--' + side + ' page--plate" data-page="' + p + '" aria-label="' + e.heads[0].hw + ', illustrated">' +
      runhead(e.heads[e.heads.length - 1].hw, folio(p), "Photo Dictionary") +
      '<div class="body">' +
      '<figure class="fig">' + F[e.fig]() + "<figcaption>" + e.caption + "</figcaption></figure>" +
      '<section class="practice"><h3 class="box-h">In practice</h3><p>' + rich(e.practice) + "</p></section>" +
      '<div class="lower">' +
      '<aside class="note"><h3 class="box-h">' + e.note[0] + "</h3><p>" + e.note[1] + "</p></aside>" +
      '<nav class="see" aria-label="See also"><h3 class="box-h">See also</h3><ul>' + see + "</ul>" +
      '<p class="also-rel">Related: <i>' + e.also.join(", ") + "</i></p></nav>" +
      "</div></div>" + keyStrip(side) + thumb(e.letter, e.index) + "</article>";
  }

  function cover() {
    return '<article class="page cover" data-page="0" aria-label="Front cover">' +
      '<div class="cover-in">' +
      '<p class="cover-pub">Storitellah · Illustrated Edition</p>' +
      F.emblem() +
      '<h1 class="cover-title">Photo<br>Dictionary</h1>' +
      '<p class="cover-by">by Storitellah</p>' +
      '<p class="cover-tag">The essential lexicon of visual language and composition</p>' +
      '<p class="cover-foot">Eight techniques · Plates · Cross-references</p>' +
      '<p class="cover-hint" aria-hidden="true">Drag the corner or press → to open</p>' +
      "</div></article>";
  }

  function backCover(side) {
    return '<article class="page cover cover--back page--' + side + '" data-page="23" aria-label="Back cover">' +
      '<div class="cover-in">' + F.emblem() +
      '<p class="back-blurb">Every photograph is a sentence. <b>Photo Dictionary</b> teaches its grammar: the composition techniques photographers use to guide the eye, build depth and give a picture meaning, each defined with dictionary precision and drawn as a plate.</p>' +
      '<p class="cover-by"><a href="https://storitellah.com" rel="noopener">storitellah.com</a></p>' +
      '<p class="cover-foot">info@storitellah.com</p></div></article>';
  }

  function titlePage(side) {
    return '<article class="page page--' + side + ' page--front" data-page="1" aria-label="Title page">' +
      runhead("", folio(1), "") +
      '<div class="body title-body">' +
      '<p class="eyebrow">Storitellah presents</p>' +
      '<h2 class="title-h">Photo Dictionary</h2>' +
      '<p class="title-sub">The essential lexicon of visual language and composition</p>' +
      '<hr class="rule">' +
      '<div class="intro">' +
      "<p>Photographers speak a visual language long before they can name its parts. This dictionary names them. Each core technique is entered as a dictionary headword, with its pronunciation, its grammar, numbered senses and examples of use, and is then drawn as a plate showing the principle at work.</p>" +
      "<p>Read it from cover to cover, or open the index and go straight to the term you need. Cross-references marked <span class=\"arr\">➞</span> join techniques that work well together.</p>" +
      "</div>" +
      '<p class="imprint">First illustrated edition · Published by <a href="https://storitellah.com" rel="noopener">Storitellah</a></p>' +
      "</div></article>";
  }

  function contentsPage(side) {
    var rows = ENTRIES.map(function (e) {
      return '<li><a href="#' + e.slug + '" data-goto="' + e.slug + '"><span class="toc-l">' + e.letter + "</span>" +
        '<span class="toc-t">' + e.heads.map(function (h) { return h.hw; }).join(" · ") + '</span><span class="toc-dots"></span><span class="toc-n">' + folio(e.page) + "</span></a></li>";
    }).join("");
    var front = [["how-to-use", "How to use this dictionary", 3], ["labels", "Labels, codes and pronunciation", 4], ["quick-reference", "Quick reference: choosing a technique", 21], ["colophon", "About Storitellah · contact", 22]];
    var fm = front.map(function (f) {
      return '<li><a href="#' + f[0] + '" data-goto="' + f[0] + '"><span class="toc-l"></span><span class="toc-t">' + f[1] + '</span><span class="toc-dots"></span><span class="toc-n">' + folio(f[2]) + "</span></a></li>";
    }).join("");
    return '<article class="page page--' + side + ' page--front" data-page="2" aria-label="Contents">' +
      runhead("Contents", folio(2), "Index") +
      '<div class="body"><h2 class="sec-h">Index of entries</h2>' +
      '<ol class="toc">' + rows + "</ol>" +
      '<h3 class="sec-h2">Front and back matter</h3><ol class="toc toc--fm">' + fm + "</ol></div></article>";
  }

  function howToPage(side) {
    return '<article class="page page--' + side + ' page--front" data-page="3" aria-label="How to use this dictionary" id="how-to-use-page">' +
      runhead("How to use", folio(3), "Photo Dictionary") +
      '<div class="body"><h2 class="sec-h">How to use this dictionary</h2>' +
      '<div class="sample">' +
      '<p class="hwline"><span class="callout">1</span>' + keyMark() + '<dfn class="hw">leading lines</dfn> <span class="callout">2</span><span class="ipa">/ˌliː.dɪŋ ˈlaɪnz/</span> <span class="callout">3</span><span class="pos">noun</span> <span class="gram">[plural]</span> <span class="callout">4</span><span class="dom">COMPOSITION</span></p>' +
      '<p class="sense"><span class="callout">5</span><b class="sn">1</b> <span class="sign">ACTUAL LINES</span> lines in a scene that carry the eye towards the subject <span class="callout">6</span><span class="ex">The railings act as <b>leading lines</b> to the lighthouse.</span></p>' +
      '<p class="sense"><span class="callout">7</span><span class="arr">➞</span> <span class="xref-sample">rule of thirds</span></p>' +
      "</div>" +
      '<ol class="legend">' +
      "<li><b>Headword</b> in bold. The mark " + keyMark() + " shows a core term every photographer should know.</li>" +
      "<li><b>Pronunciation</b> in the International Phonetic Alphabet, British English. A key runs along the foot of every entry page.</li>" +
      "<li><b>Part of speech</b> and <b>grammar code</b>, such as [C] countable or [U] uncountable.</li>" +
      "<li><b>Domain label</b> showing the field the term belongs to.</li>" +
      "<li><b>Numbered senses</b> with a <span class=\"sign\">SIGNPOST</span> to help you find the meaning you need quickly.</li>" +
      "<li><b>Example</b> in italics; common word partners are in bold.</li>" +
      "<li><b>Cross-reference</b> to a related technique. Select it to turn straight to that page.</li>" +
      "</ol></div></article>";
  }

  function labelsPage(side) {
    var codes = [["[C]", "countable noun: <i>a frame, two frames</i>"], ["[U]", "uncountable noun: <i>depth of field</i>"], ["[plural]", "used only in the plural: <i>leading lines</i>"], ["[singular]", "used with <i>the</i> or <i>a</i>, not in the plural"], ["[T]", "transitive verb: takes an object"]];
    var doms = [["PHOTOGRAPHY", "the camera, lens and exposure"], ["COMPOSITION", "arranging elements in the frame"], ["VISUAL ARTS", "shared with painting and design"], ["MATHEMATICS", "ratios and geometry"]];
    var marks = [["➞", "see also: turn to a related entry"], ["○", "separates example sentences"], ["●", "a related word formed from the headword"]];
    function rows(list, cls) {
      return list.map(function (r) { return "<tr><th scope=\"row\"><span class=\"" + cls + "\">" + r[0] + "</span></th><td>" + r[1] + "</td></tr>"; }).join("");
    }
    return '<article class="page page--' + side + ' page--front" data-page="4" aria-label="Labels, codes and pronunciation" id="labels-page">' +
      runhead("Labels and codes", folio(4), "Photo Dictionary") +
      '<div class="body"><h2 class="sec-h">Labels, codes and pronunciation</h2>' +
      '<table class="codes"><caption>Grammar codes</caption>' + rows(codes, "gram") + "</table>" +
      '<table class="codes"><caption>Domain labels</caption>' + rows(doms, "dom") + "</table>" +
      '<table class="codes"><caption>Symbols</caption>' + rows(marks, "sym") + "</table>" +
      '<h3 class="sec-h2">Pronunciation</h3><p class="small">Stress falls on the syllable after <span class="ipa">ˈ</span>; secondary stress follows <span class="ipa">ˌ</span>. Dots separate syllables.</p>' +
      '<div class="ipa-grid">' + (KEY_L + "|" + KEY_R).split("|").map(function (k) { var p = k.split(" "); return '<span><i class="ipa">' + p[0] + "</i> " + p[1] + "</span>"; }).join("") + "</div>" +
      "</div></article>";
  }

  function quickRefPage(side) {
    var rows = [
      ["rule-of-thirds", "Balances a subject off-centre", "Landscapes, portraits, most scenes"],
      ["leading-lines", "Moves the eye to the subject", "Roads, rivers, architecture"],
      ["negative-space", "Isolates and gives weight", "Minimal scenes, text layouts"],
      ["golden-ratio", "Organic, flowing balance", "Curves, spirals, careful crops"],
      ["framing", "Focuses attention, adds depth", "Doorways, windows, foliage"],
      ["symmetry", "Order, calm, formality", "Architecture, reflections"],
      ["depth-of-field", "Separates or unites planes", "Portraits, landscapes, street"],
      ["juxtaposition", "Creates meaning by contrast", "Street, documentary, humour"]
    ];
    return '<article class="page page--' + side + ' page--front" data-page="21" aria-label="Quick reference" id="quick-reference-page">' +
      runhead("Quick reference", folio(21), "Photo Dictionary") +
      '<div class="body"><h2 class="sec-h">Choosing a technique</h2>' +
      '<p class="small">Techniques combine. A strong frame often uses three or four at once: leading lines that end on a third, a subject framed by a doorway, and negative space beyond it.</p>' +
      '<div class="tablewrap"><table class="qref"><thead><tr><th scope="col">Technique</th><th scope="col">What it does</th><th scope="col">Try it with</th></tr></thead><tbody>' +
      rows.map(function (r) { return "<tr><th scope=\"row\">" + go(r[0], bySlug[r[0]].heads[0].hw) + "</th><td>" + r[1] + "</td><td>" + r[2] + "</td></tr>"; }).join("") +
      "</tbody></table></div></div></article>";
  }

  function colophonPage(side) {
    return '<article class="page page--' + side + ' page--front" data-page="22" aria-label="About and contact" id="colophon-page">' +
      runhead("Colophon", folio(22), "Photo Dictionary") +
      '<div class="body colophon">' + F.emblem() +
      '<h2 class="sec-h">About this book</h2>' +
      "<p><b>Photo Dictionary by Storitellah</b> is a visual reference to the language of composition. Definitions follow established photographic usage and have been checked for technical accuracy; examples of practice refer to published work by the photographers named.</p>" +
      '<p>For the full A–Z of 286 photography terms, from <i>aberration</i> to <i>zoom lens</i>, open the companion glossary, <a href="../index.html" rel="noopener">Lumenary</a>.</p>' +
      '<h3 class="sec-h2">Contact</h3>' +
      '<p class="contact">Suggestions, corrections and licensing:<br><a href="mailto:info@storitellah.com">info@storitellah.com</a></p>' +
      '<p class="contact"><a href="https://storitellah.com" rel="noopener">storitellah.com</a></p>' +
      '<p class="small">Set in Libre Baskerville and Source Serif 4, with IPA in Gentium. Plates drawn for this edition.</p>' +
      "</div></article>";
  }

  /* Build all 24 pages; side depends on spread position or single mode. */
  function buildPages(sideFor) {
    var pages = [];
    pages[0] = cover();
    pages[1] = titlePage(sideFor(1));
    pages[2] = contentsPage(sideFor(2));
    pages[3] = howToPage(sideFor(3));
    pages[4] = labelsPage(sideFor(4));
    ENTRIES.forEach(function (e) {
      pages[e.page] = entryLeft(e, sideFor(e.page));
      pages[e.page + 1] = entryRight(e, sideFor(e.page + 1));
    });
    pages[21] = quickRefPage(sideFor(21));
    pages[22] = colophonPage(sideFor(22));
    pages[23] = backCover(sideFor(23));
    return pages;
  }

  /* Hash targets → page index */
  var TARGETS = { "how-to-use": 3, labels: 4, contents: 2, index: 2, "quick-reference": 21, colophon: 22, cover: 0 };
  ENTRIES.forEach(function (e) { TARGETS[e.slug] = e.page; });

  function describe(p) {
    if (p === 0) return "Front cover";
    if (p === TOTAL - 1) return "Back cover";
    var e = null;
    ENTRIES.forEach(function (x) { if (p === x.page || p === x.page + 1) e = x; });
    if (e) return e.heads.map(function (h) { return h.hw; }).join(", ");
    return { 1: "Title page", 2: "Contents", 3: "How to use this dictionary", 4: "Labels and codes", 21: "Quick reference", 22: "About and contact" }[p];
  }

  return { ENTRIES: ENTRIES, TOTAL: TOTAL, buildPages: buildPages, folio: folio, TARGETS: TARGETS, describe: describe };
})();
