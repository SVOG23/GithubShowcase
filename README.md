# GitHub Showcase — Suraj Vaghela

A static portfolio site that walks recruiters through five projects without making the
underlying repositories public. Plain HTML, CSS and JavaScript — no framework, no build step,
no dependencies.

**Projects covered:** Vouchlist · ModelMarketplace · unrot · Clipr.AI · Kivo

## Files

```
index.html                    the whole page
assets/styles.css             design tokens, layout, light/dark themes
assets/main.js                theme toggle, scroll-spy, reveal-on-scroll
.nojekyll                     serve files as-is (skips Jekyll processing)
.github/workflows/pages.yml   deploys to GitHub Pages on push to main
```

## Local preview

No build step — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing to GitHub Pages

Deployment is automated. `.github/workflows/pages.yml` publishes the repository root to
GitHub Pages on every push to `main` (and on manual dispatch). The workflow enables Pages
itself the first time it runs, so there is nothing to click in Settings.

Live at **https://svog23.github.io/GithubShowcase/**

To serve it from a custom domain instead, add a `CNAME` file containing the domain and point a
DNS record at GitHub Pages.

## Editing

- **Content** — everything is inline in `index.html`; each project is one `<article class="project">` block.
- **Colours** — the `:root` and `[data-theme="dark"]` token blocks at the top of `assets/styles.css`.
- **Adding a project** — copy an existing `<article class="project">`, bump the `.project-index`
  number, and give it a unique `id`.
