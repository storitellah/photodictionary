# Lumenary

**The Storitellah dictionary of photography.** Lumenary is a searchable A–Z glossary of 286 photography terms, written in the style of a learner's dictionary. Every entry gives two explanations:

- **Plain English**: a short, everyday definition with an example sentence.
- **Technical**: the precise meaning, with the numbers and science behind it, plus a second example.

Entries also carry part of speech, countable/uncountable codes, UK pronunciation in IPA, US spelling variants, abbreviations, a topic label and "See also" cross-references.

The logo links to [storitellah.com](https://storitellah.com). Questions and suggestions: **info@storitellah.com**.

## Photo Dictionary (illustrated flipbook)

`book/` holds **Photo Dictionary by Storitellah**, an illustrated flipbook covering eight core composition techniques: depth of field and layering, framing, the golden ratio and Fibonacci spiral, juxtaposition, leading lines, negative space, the rule of thirds, and symmetry and pattern. Each entry spans two pages: the dictionary entry (pronunciation, part of speech, domain labels, numbered senses, examples, word partners) and a plate with an annotated SVG diagram, an "In practice" note on how named photographers use it, and cross-references.

- Two-page spread on wide screens, single page on phones and narrow tablets
- Turn pages by dragging a corner, swiping, tapping either side, the arrow/Page Up/Page Down/Home/End keys, the buttons or the slider
- Index panel and a contents page, with links such as `book/#rule-of-thirds`
- Files: `book/index.html`, `book/book.css`, `book/book.js` (flip engine), `book/content.js` (entries and page templates), `book/diagrams.js` (plates)

## Features

- Instant search across headwords, abbreviations and definitions, with highlighted matches
- A–Z letter bar and ten topic filters (Exposure, Light & lighting, Lenses & optics, Composition, Colour, Digital & editing, Cameras & gear, Film & darkroom, Genres & styles, Business & rights)
- Show both explanations, plain English only, or technical only (remembered per browser)
- Word of the day, random term, and a shareable link for every entry (`index.html#bokeh`)
- Light and dark themes, phone-friendly layout, keyboard shortcut <kbd>/</kbd> to search
- No frameworks and no build step needed to host: plain HTML, CSS and JavaScript

## Project layout

```
index.html              Lumenary glossary page
book/                   Photo Dictionary flipbook
assets/css/style.css    styles
assets/js/app.js        search, filters, rendering, permalinks
assets/js/terms.js      generated term data (do not edit by hand)
src/terms/*.js          term data, split alphabetically: edit these
scripts/build.js        rebuilds assets/js/terms.js and validates the data
```

## Adding or editing a term

1. Add an object to the right file in `src/terms/`:

   ```js
   {t:"Bokeh", ipa:"ˈbəʊ.keɪ", pos:"noun", gr:"[U]", c:"optics",
    s:"plain-English definition", se:"plain example sentence",
    a:"technical definition", ae:"technical example sentence",
    r:["Depth of field","Aperture"]}
   ```

   Optional fields: `ipa` (UK pronunciation), `gr` (grammar code), `v` (spelling variant, e.g. `"US color cast"`), `abbr` (abbreviation), `r` (see-also headwords). `c` must be one of `exposure`, `light`, `optics`, `composition`, `colour`, `digital`, `gear`, `film`, `genre`, `business`.

2. Rebuild the data file. The script fails if a see-also link points to a missing entry, a headword is duplicated, or a required field is empty:

   ```bash
   node scripts/build.js
   ```

Entries are sorted alphabetically automatically, so order inside the files does not matter.

## Hosting

Open `index.html` directly, or serve the folder with any static host. For GitHub Pages, enable Pages on the default branch (root folder); `.nojekyll` is already included.
