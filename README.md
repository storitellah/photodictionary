# The Dictionary of Photography by Storitellah

An illustrated flipbook dictionary of photography, laid out like a printed learner's dictionary: guide words and folios in the running heads, justified two-column entries, thumb-index tabs for each letter, and a pronunciation key along the foot of every page.

**395 entries**, each with a pronunciation (British IPA), part of speech, grammar code, subject label, an **IN SHORT** sense in plain English, a **TECHNICAL** sense, examples and cross-references. Coverage includes:

- exposure, light, optics, composition, colour, digital imaging, equipment, film and the darkroom, genres, and business and rights
- **history and vintage processes**: heliograph, calotype, albumen and salt prints, ambrotype, tintype, carte de visite, dry plate, autochrome, Kodachrome, platinum and gum prints, pictorialism, Group f/64 and more
- **social media and mobile**: computational photography, night and portrait modes, HEIF, reels, stories, carousels, alt text, Content Credentials (C2PA), deepfakes, AI-generated images and more
- **ethics, consent and NGO practice**: informed consent, assent, dignity, do no harm, safeguarding, community-led storytelling, participatory photography, photovoice, the Dóchas Code, poverty porn, saviourism, trauma-informed photography and more

Eighteen **study pages** in the middle of the book illustrate eight composition techniques (depth of field, framing, golden ratio, juxtaposition, leading lines, negative space, rule of thirds, symmetry) and set out a consent pathway for photographing people.

The logo links to [storitellah.com](https://storitellah.com). Questions and suggestions: **info@storitellah.com**.

## Reading features

- Two-page spread on wide screens, single pages on phones and narrow tablets; pages are paginated from live measurements, so no entry is ever cut off
- Turn pages by dragging a corner, swiping, tapping either side, the arrow, Page Up/Down, Home and End keys, the buttons or the slider
- Search (press <kbd>/</kbd>) across headwords, abbreviations, variants and definitions; choosing a result turns to the page and highlights the entry
- Index with an A–Z letter grid and the study pages; every entry has a link, such as `#bokeh`
- Light, Neutral and Dark colour modes, and an optional page-turn sound (both remembered per browser)

## Project layout

```
index.html               the book
assets/css/book.css      styles and the three colour modes
assets/js/book.js        flip engine, search, index, colour modes, sound
assets/js/content.js     glossary renderer and paginator, study pages, front and back matter
assets/js/diagrams.js    SVG plates
assets/js/terms.js       generated term data (do not edit by hand)
assets/img/              logo and favicons
src/terms/*.js           term data: edit these
scripts/build.js         rebuilds assets/js/terms.js and validates the data
book/index.html          redirect for the old address
```

## Adding or editing a term

Add an object to a file in `src/terms/`:

```js
{t:"Bokeh", ipa:"ˈbəʊ.keɪ", pos:"noun", gr:"[U]", c:"optics",
 s:"plain-English definition", se:"example sentence",
 a:"technical definition", ae:"example sentence",
 r:["Depth of field","Aperture"]}
```

Optional fields: `ipa`, `gr`, `v` (variant, e.g. `"US color cast"`), `abbr`, `r` (see-also headwords). `c` is one of `exposure`, `light`, `optics`, `composition`, `colour`, `digital`, `gear`, `film`, `genre`, `business`, `history`, `social`, `ethics`.

Then rebuild; the script fails on duplicate headwords, empty required fields or see-also links to missing entries:

```bash
node scripts/build.js
```

## Hosting

Any static host works. For GitHub Pages, enable Pages on the default branch (root folder); `.nojekyll` is included.
