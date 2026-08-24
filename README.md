# GitHub Showcase: Suraj Vaghela

A static portfolio site that walks recruiters through five projects without making the
underlying repositories public. Plain HTML, CSS and JavaScript: no framework, no build step,
no dependencies.

Live at **https://svog23.github.io/GithubShowcase/**

**Projects covered:** Vouchlist · ModelMarketplace · unrot · Clipr.AI · Kivo

## Design

Written for how recruiters actually read a portfolio: they scan for a few seconds, they are
often not engineers, and they want to know what a thing does before how it was made.

- **Project index in the hero.** All five projects (name, one line, status) sit on the first
  screen, so the page reads as project-first without any scrolling.
- **Case-study blocks.** Each project is a short write-up plus a two-column panel: the problem
  on one side, what came of it on the other. Amber marks the problem, cyan the outcome, so
  colour carries the structure.
- **Plain language.** Projects are described by what they do for people. Implementation detail
  is deliberately left out; each one ends with a compact role and stack line instead.
- **Type.** Bricolage Grotesque for display, IBM Plex Sans for body, IBM Plex Mono for labels.
- **Motion** is orchestrated around the dividing rule: a hero load sequence, rules that draw,
  problem and outcome arriving in order. All of it is disabled under `prefers-reduced-motion`.

## Files

```
index.html                    the whole page
assets/styles.css             tokens, layout, light/dark themes, motion
assets/main.js                theme, scroll progress, reveals, scroll-spy
assets/suraj-vaghela.jpg      portrait shown in About (see below)
.nojekyll                     serve files as-is (skips Jekyll processing)
.github/workflows/pages.yml   deploys to GitHub Pages on push to main
```

### Portrait

The About section loads `assets/suraj-vaghela.jpg`. If the file is missing the frame falls back
to an `SV` monogram rather than a broken image, so the page never looks broken. Replace it with a
square image (roughly 600×600 or larger) using that exact filename.

## Local preview

No build step. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing

Deployment is automated. `.github/workflows/pages.yml` publishes the repository root to GitHub
Pages on every push to `main` (and on manual dispatch), with the Pages source set to
*GitHub Actions*.

To serve from a custom domain, add a `CNAME` file containing the domain and point a DNS record at
GitHub Pages.

## Editing

- **Content**: inline in `index.html`; each project is one `<article class="project">`.
- **Colour and type**: the `:root` and `html[data-theme="light"]` token blocks at the top of
  `assets/styles.css`.
- **Adding a project**: copy an existing `<article class="project">`, give it a unique `id`, keep
  the `data-case` attribute so its divider and text animate on scroll, and add a matching row to
  the hero's project index.
