# Anusha Agarwal: portfolio

A painted zine style portfolio built with Vite and React. No UI libraries: the torn paper, brush strokes, paint dividers, and grain are all CSS and SVG. The only illustration is the hero portrait.

## Run it

You need Node 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173. Images are prepared automatically every time you run `dev` or `build`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Prepares images, then starts the dev server |
| `npm run build` | Prepares images, then builds the site into `dist/` |
| `npm run preview` | Serves the built site locally |
| `npm run images` | Only prepares images (add `-- --force` to redo all of them) |
| `npm run og` | Rebuilds the link preview image `public/og.png` and the favicon |
| `npm run screenshots` | Takes desktop and phone screenshots of the running dev site into `screenshots/` |

`npm run og` and `npm run screenshots` use Playwright. The first time, run `npx playwright install chromium`.

## Edit the content

Everything you can read on the site lives in **`src/data/content.js`**: name, tagline, bio, the "At a glance" card, experience, projects, skills, contact links, footer. You never need to open a component.

- **Tagline:** three options sit in a comment inside `hero`. Paste the one you want into `tagline`.
- **Projects:** each project is one object in `projects.items` and becomes one full-width row, in that order. `award` makes the red tags, `highlights` the number facts, `tech` the tags, `summary` and `details` the text (all of it is always visible).
- **Links:** a link only shows up as a button when it has a real `url`. Links with an empty `url` are hidden, so nothing unfinished ever appears on the site. Fill in the address and the button appears.
- **Skills:** each entry in `skills.groups` is one row of tags.
- **Find what is left:** search `content.js` for `TODO`.

## Images

```
assets/
  hero.png                        the portrait, the only illustration on the site
  cutouts/hero.png                transparent copy, made automatically
  projects/<name>/                project screenshots
  gallery/                        your own paintings (empty for now)
  Resume-Anusha Agarwal.pdf       served at /assets/resume.pdf
  (other .png files)              earlier illustrations, kept but not used
```

- **Project screenshots:** drop the file in `assets/projects/<name>/`, then add `{ src: 'projects/<name>/<file>.png', alt: '...' }` to that project's `images` list in `content.js`. A project with no image becomes a text-only row.
- **Gallery:** drop paintings (png, jpg, or webp) into `assets/gallery/`. While that folder is empty, the Gallery section and its nav link are hidden. As soon as it has an image, both appear on their own, showing whatever is in the folder sorted by file name. Optional titles and alt text go in `gallery.captions` in `content.js`.
- **Resume:** replace the PDF in `assets/`. Any PDF with "resume" in its name works, or name it `resume.pdf`.
- **Portrait cutout:** the script removes the cream background from `hero.png` and saves the result in `assets/cutouts/`. If you ever want a cleaner edge, replace the file there (for example with one made by `rembg`) and it will be used as is.
- **Favicon and link preview:** `public/favicon.png` (a cobalt "A"), `public/apple-touch-icon.png`, and `public/og.png` are made by `npm run og` and committed. Rerun it if you change your name or the portrait.

After adding or changing images, restart `npm run dev` (or run `npm run images`). The script compresses everything to WebP in `public/assets/`, which is generated and not committed.

## Deploy

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New Project** and import the repository.
3. Vercel detects Vite. Keep the defaults (build command `npm run build`, output `dist`) and deploy.

Or from the terminal: `npx vercel`, then `npx vercel --prod`.

### Netlify or GitHub Pages

Build command `npm run build`, publish directory `dist`. For GitHub Pages under a sub path, also set `base: '/<repo-name>/'` in `vite.config.js`.

### After the first deploy

Set `site.url` in `src/data/content.js` to your live address and redeploy. Link previews (LinkedIn, iMessage, Slack) need the full address of `og.png`.

## How it is put together

```
src/data/content.js       all text, links, and image paths
src/components/           Nav, Hero, Projects, and the other sections
src/components/bits.jsx   brush strokes, paint divider, torn edges, tape, buttons, image frame
src/lib/                  scroll reveal, parallax, image lookup, torn paper shapes
src/styles.css            the whole look, mobile first
scripts/                  image pipeline, link preview image and favicon, screenshots
```

Accessibility notes: every image has alt text, the page is keyboard navigable with visible focus rings, there is a skip link, and all motion (parallax, reveals, smooth scroll) is switched off when the visitor prefers reduced motion.
