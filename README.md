# Anusha Agarwal: portfolio

A painted zine style portfolio built with Vite and React. No UI libraries: the torn paper, brush strokes, paint dividers, and grain are all CSS and SVG. The only illustration is the hero portrait. This is a personal collection of my projects, experiences, and interests.

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

- **Tagline and About opener:** alternates sit in comments inside `hero` and `about`.
- **Projects:** a new project is one object in `projects.items`. The first 3 are featured rows (small screenshot, summary, highlights, tags, links, and a collapsed "Details" toggle). The rest go into the compact "More projects" grid, which shows 6 and puts the others behind a "Show all N projects" button. Add `featured: true` or `featured: false` to override.
- **Links:** a link only shows up as a button when it has a real `url`. Empty ones are hidden.
- **Handwritten notes:** `hero.note` and the `note` on a project screenshot. Only write notes that are true.
- **Skills:** each entry in `skills.groups` is one row of tags.
- **Colours:** forest `#1F4D3A`, moss `#14352A`, sage `#A9BBA0`, leaf `#6E8B4E`, and paper `#F4EEDC` are defined once at the top of `src/styles.css`. The link preview generator reads these same variables.
- **Find what is left:** search `content.js` for `TODO`.

## Images and optional extras

```
assets/
  hero.png                        the portrait, the only illustration on the site
  cutouts/hero.png                transparent copy, made automatically
  projects/<name>/                project screenshots
  events/<project id>/            event photos for a project (optional)
  art/                            your own painted art (optional)
  gallery/                        your own paintings (optional)
  signature.png                   replaces the text name in the nav (optional)
  fonts/handwriting.woff2         replaces Caveat for handwritten notes (optional)
  Resume-Anusha Agarwal.pdf       bundled by Vite for the resume links
  (other .png files)              earlier illustrations, kept but never used
```

The site works with every optional folder empty.

- **Project screenshots:** drop the file in `assets/projects/<name>/`, then add `{ src: 'projects/<name>/<file>.png', alt: '...' }` to that project's `images` list. Screenshots show on featured rows.
- **Event photos:** drop photos into `assets/events/<project id>/` (the `id` from `content.js`, for example `assets/events/docket/`). A featured project then shows up to 4 thumbnails, with a "+N" tile for the rest, and they open in a viewer with captions. The caption is the file name, so name files like `demo-table-at-cal-hacks.jpg`. For hand-written captions, list them in the project's `photos` array instead. No photos, no strip.
- **Painted art:** files in `assets/art/` are used by name: `about.png` beside the About text, `divider.png` as a small tile in the paint divider, and `<project id>.png` as a small header on that project. You can also point at any file from the `art` block or a project's `art` field in `content.js`. Nothing is shown while the folder is empty.
- **Gallery:** drop paintings into `assets/gallery/`. While that folder is empty, the Gallery section and its nav link are hidden.
- **Signature:** `assets/signature.png` (dark ink on a white or transparent background works best) replaces the text name in the nav.
- **Handwriting font:** `assets/fonts/handwriting.woff2` replaces Caveat for every handwritten note and label.
- **Resume:** replace `assets/Resume-Anusha Agarwal.pdf`. All three résumé links use the source PDF through Vite, which emits a deployable URL including any configured base path. If you rename the PDF, update `contact.resume` in `src/data/content.js`. The image pipeline also keeps `/assets/resume.pdf` available for older bookmarks.
- **Favicon and link preview:** `public/favicon.png`, `public/apple-touch-icon.png`, and `public/og.png` are made by `npm run og` and committed. Rerun it if you change your name or the portrait.

After adding or changing anything in `assets/`, restart `npm run dev` (or run `npm run images`).

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
src/components/bits.jsx   brush strokes, paint divider, torn edges, tape, buttons, details toggle, photo viewer
src/lib/                  scroll reveal, parallax, image lookup, torn paper shapes
src/styles.css            the whole look, mobile first
scripts/                  image pipeline, link preview image and favicon, screenshots
```

Accessibility notes: every image has alt text, the page is keyboard navigable with visible focus rings, there is a skip link, and all motion (parallax, reveals, smooth scroll) is switched off when the visitor prefers reduced motion.
