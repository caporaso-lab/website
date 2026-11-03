# CLAUDE.md — Caporaso Lab website

## Project overview

This is the source for the [Caporaso Lab](https://www.caplab.dev) website, built with Astro + Tailwind CSS on top of the [AstroWind](https://github.com/onwidget/astrowind) template.
Pages are `.astro` or `.mdx` files under `src/pages/`.
Site-wide config is in `src/config.yaml` and `src/navigation.ts`.

Hosting (Cloudflare Pages project `caplab-website-2`) and the canonical address `https://www.caplab.dev` are described in `README.md` under "Hosting and domain"; keep that section current when the setup changes.
The other domains that redirect to `www.caplab.dev` stay out of the README, by Greg's choice.
`site` in `src/config.yaml` must always be the address that actually serves the site.
Do not suggest moving the Pages project or the `caplab.dev` zone between Cloudflare accounts, or removing `cap-lab.us` from the project's custom domains (it is a deliberate fallback).

To check a change in Claude's sandbox, build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build` and inspect `dist/`.
Astro's telemetry otherwise fails writing `~/Library/Preferences/astro/config.json`, and `npx` tries to reach the npm registry.

## Development context

The primary developer is **Jeff Meilander ([@jmeilander](https://github.com/jmeilander))**, who is new to web development and git and works with Claude Code to add and update content.
**Greg Caporaso** reviews branches and merges them into `main`.
When Jeff is the author of changes on a branch, attribute commits with:

```
Co-Authored-By: jmeilander <jmeilander@users.noreply.github.com>
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Asset management

### Images

Never commit uncompressed images.
Before adding any image, check its file size and compress it with `sips` if it exceeds ~500 KB:

```sh
# Photos and general images — max 1920px on the longest dimension, JPEG quality 85
sips -s format jpeg -s formatOptions 85 -Z 1920 input.jpg --out input.jpg

# Poster images intended for full-size viewing — max 2400px, quality 85
sips -s format jpeg -s formatOptions 85 -Z 2400 poster.jpg --out poster.jpg

# PNG thumbnails (display only) — max 1200px
sips -Z 1200 thumbnail.png --out thumbnail.png
```

Target sizes: photos under 500 KB, poster JPEGs under 1.5 MB, PNG thumbnails under 1 MB.

Detailed photos (trees, grass) can still exceed the target at 1920px and quality 85.
Then size the image to twice the width it is displayed at and lower the quality to 75–80: the Compost Microbiome Lab photo was 1.06 MB at 1920px/q85 and 564 KB at 1664px/q75 (twice its 832px display width) with no visible loss.

Source size matters most for images shown with a plain `<img src={img.src}>`, which serves the committed file unchanged.
Astro's `<Image>` component (used by `Hero` and the other widgets) serves resized WebP copies, so there the committed file is only the starting point.

### Front page image

The front page hero image, `src/assets/images/2026.11-lab-overview.jpg`, is the single slide of [this Google Slides deck](https://docs.google.com/presentation/d/1nzPj4tIf-Wn26f1_GgUpLaGAs_leCKJ0USC20W5xfHc/edit).
To regenerate it after the slide changes, export the deck as PDF (the PNG export is only 960×540) and render it at 1920×1080:

```sh
curl -sL -o slide.pdf 'https://docs.google.com/presentation/d/1nzPj4tIf-Wn26f1_GgUpLaGAs_leCKJ0USC20W5xfHc/export/pdf'
pdftoppm -singlefile -scale-to-x 1920 -scale-to-y 1080 -jpeg -jpegopt quality=85 slide.pdf src/assets/images/2026.11-lab-overview
```

`Hero.astro` defaults its image to `width={1000} height={625}` with `object-fit: cover`, which crops anything that is not 16:10.
`src/pages/index.mdx` therefore passes `width: 1920, height: 1080` in the `image` object.
A `class` in the `image` object replaces the component's default classes rather than adding to them, so it repeats `mx-auto rounded-md w-full` before adding `shadow-lg hidden md:block` (drop shadow; hidden below 768px, where the slide's text is unreadable).

### PDFs

Never commit PDFs to the repository.
PDFs are hosted as assets on the GitHub Release tagged [`poster-assets`](https://github.com/caporaso-lab/website/releases/tag/poster-assets).
To add a new PDF:

```sh
gh release upload poster-assets path/to/file.pdf
```

Link to PDFs using the release download URL pattern:

```
https://github.com/caporaso-lab/website/releases/download/poster-assets/filename.pdf
```

## Commit hygiene

Jeff's branches typically accumulate many small commits from iterative Claude Code sessions.
Before merging any branch, squash it to 2–3 logical commits:

1. Binary assets (images, any other media)
2. New pages and structural changes
3. Content and styling updates (can be combined with #2 if the branch is small)

To squash a branch onto `main`:

```sh
# Create a backup before rewriting history
git push origin <current-tip-sha>:refs/heads/backup/<branch-name>-pre-rebase

MERGE_BASE=$(git merge-base HEAD origin/main)
git reset --soft $MERGE_BASE
# stage and commit in groups, then force-push the branch
git push --force-with-lease origin <branch-name>
```

After squashing, merge the branch and push `main` directly:

```sh
git checkout main && git pull
git merge <branch-name>
git push origin main
```

## Code review checklist

When reviewing a branch from Jeff, check for:

- [ ] **Large files**: run `git ls-tree -r --long origin/<branch> | sort -rn | head -20` and flag anything over 500 KB.
- [ ] **PDFs committed**: run `git ls-tree -r origin/<branch> | grep '\.pdf'` — there should be none.
- [ ] **Many commits**: more than ~10 commits ahead of `main` is a signal to squash.
- [ ] **Unused assets**: images added but not referenced in any source file.
- [ ] **Duplicate assets**: old file left behind after a rename (e.g., both `file.jpg` and `File.JPG`).
- [ ] **Non-responsive layout**: new pages should work at mobile widths. Prefer Tailwind responsive prefixes (`md:`, `lg:`) over fixed pixel widths.
- [ ] **Inline styles**: prefer Tailwind utility classes over `style="..."` attributes.
- [ ] **Hardcoded colors or sizes**: use Tailwind theme values (`text-primary`, `max-w-4xl`, etc.) rather than arbitrary values.
- [ ] **Inaccessible images**: every `<img>` should have a meaningful `alt` attribute.

## Proactive suggestions

When working with Jeff on a branch, proactively:

- Check image file sizes before staging; compress if needed.
- Flag if the commit count is growing large and suggest a squash before the PR.
- Note any of the anti-patterns above and suggest corrections rather than silently fixing them, so Jeff can learn.
