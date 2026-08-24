# GitHub Showcase — Suraj Vaghela

A static portfolio site that walks recruiters through five projects without making the
underlying repositories public. Plain HTML, CSS and JavaScript — no framework, no build step,
no dependencies.

Live at **https://svog23.github.io/GithubShowcase/**

**Projects covered:** Vouchlist · ModelMarketplace · unrot · Clipr.AI · Kivo

## Design

The through-line across all five projects is that the client is never trusted — guarantees are
enforced by the database, not the screen that asks for them. The page is built around that:

- **Guarantee ledger.** Each project carries a two-column table — what the client asks for, and
  what actually decides the answer — split by a boundary rule that draws itself on scroll. It is
  the page's signature element and recurs in the nav (as scroll progress) and under the hero.
- **Two semantic accents.** Amber marks the claimed side, cyan the enforced side. Colour carries
  meaning here rather than decorating.
- **Type.** Bricolage Grotesque for display, IBM Plex Sans for body, IBM Plex Mono for labels and
  the enforcement column.
- **Motion** is orchestrated around the boundary motif: a hero load sequence, rules that draw,
  ledger rows that stagger in. All of it is disabled under `prefers-reduced-motion`.

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

No build step — open `index.html` directly, or serve it:

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

- **Content** — inline in `index.html`; each project is one `<article class="project">`.
- **Colour and type** — the `:root` and `html[data-theme="light"]` token blocks at the top of
  `assets/styles.css`.
- **Adding a project** — copy an existing `<article class="project">`, give it a unique `id`, and
  keep the `data-ledger` attribute so its rule and rows animate on scroll.
