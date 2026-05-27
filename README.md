# Caporaso Lab website source

This repository contains the source for the [Caporaso Lab](https://caplab.dev) website, hosted at [caplab.dev](https://caplab.dev).

The site is built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), using the [AstroWind](https://github.com/onwidget/astrowind) template as its starting point.

Site development is assisted by [Claude Code](https://claude.ai/code).
Site content is written by Caporaso Lab members.

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
Site-wide configuration lives in `src/config.yaml` and `src/navigation.js`.
Shared components are in `src/components/`.
Images and other processed assets are in `src/assets/`.
Static files served as-is (e.g., poster PNG thumbnails) are in `public/`.

## Attribution

This site is based on [AstroWind](https://github.com/onwidget/astrowind), created by [onWidget](https://onwidget.com) and licensed under the [MIT License](./LICENSE.md).
