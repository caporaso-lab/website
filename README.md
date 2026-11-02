# Caporaso Lab website source

This repository contains the source for the [Caporaso Lab](https://www.caplab.dev) website, hosted at [www.caplab.dev](https://www.caplab.dev).

The site is built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), using the [AstroWind](https://github.com/onwidget/astrowind) template as its starting point.

Site content is written by Caporaso Lab members.
Site development is assisted by [Claude Code](https://claude.ai/code).

## Local development

```sh
git clone https://github.com/caporaso-lab/website
cd website
npm install
npm run dev
```

Open the URL printed by `npm run dev` (default: <http://localhost:4321>).

## Common commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Check the project for errors |

## Project structure

Pages are `.astro` or `.mdx` files under `src/pages/` — each file maps directly to a route.
Site-wide configuration lives in `src/config.yaml` and `src/navigation.ts`.
Shared components are in `src/components/`.
Images and other processed assets are in `src/assets/`.
Static files served as-is (e.g., poster PNG thumbnails) are in `public/`.

## Hosting and domain

The site is built and served by the Cloudflare Pages project `caplab-website-2`, in the lab's Cloudflare account.
Every push to `main` deploys to production, and every other branch gets a preview build at its own `*.caplab-website-2.pages.dev` address.

The canonical address is `https://www.caplab.dev`.
It is set as `site` in `src/config.yaml`, which generates the canonical tags, the sitemap and the `Sitemap:` line in `robots.txt`.
`www.caplab.dev` is a custom domain on the Pages project, reached through a DNS-only CNAME to `caplab-website-2.pages.dev` in the `caplab.dev` zone, which Greg manages in a separate Cloudflare account.
Pages can attach a bare domain such as `caplab.dev` only when its zone is in the same account as the project, which is why the site lives at `www`.

## Attribution

This site is based on [AstroWind](https://github.com/onwidget/astrowind), created by [onWidget](https://onwidget.com) and licensed under the [MIT License](./LICENSE.md).
