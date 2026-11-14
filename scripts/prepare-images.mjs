// Prepares every image the site uses. Runs automatically before `npm run dev`
// and `npm run build`, or by hand with `npm run images`.
//
//   assets/hero.png            original portrait (never modified)
//   assets/cutouts/hero.png    transparent copy of the portrait
//   assets/projects/<name>/    project screenshots
//   assets/gallery/            your paintings (Gallery section)
//   assets/events/<project>/   event photos for a project (optional)
//   assets/art/                painted art used as small accents (optional)
//   assets/signature.png       nav logo (optional)
//   assets/fonts/handwriting.woff2   handwriting font (optional)
//   public/assets/img/**       compressed WebP files the site actually loads
//   public/assets/resume.pdf   copy of the resume PDF found in assets/
//   src/data/images.generated.json   sizes + srcsets, read by src/lib/images.js
//
// To hand-fix the cutout, edit or replace the PNG in assets/cutouts/ (for example
// with rembg). The script keeps an existing cutout unless the original is newer.

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ASSETS = path.join(root, 'assets')
const CUTOUTS = path.join(ASSETS, 'cutouts')
const OUT = path.join(root, 'public', 'assets')
const OUT_IMG = path.join(OUT, 'img')
const MANIFEST = path.join(root, 'src', 'data', 'images.generated.json')
const force = process.argv.includes('--force')

// Original painted illustrations. Their paper background
// is removed. `holes` also clears paper-coloured areas enclosed by the subject
// (for example between an arm and the body).
const ILLUSTRATIONS = {
  hero: { widths: [560, 900, 1400], holes: true },
  coffee: { widths: [240, 480], holes: true },
  strawberry: { widths: [160, 320], holes: false },
}

const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i
const mtime = (f) => (fs.existsSync(f) ? fs.statSync(f).mtimeMs : 0)
const fresh = (src, outs) => !force && outs.every((o) => mtime(o) >= mtime(src))
const walk = (dir) =>
  !fs.existsSync(dir)
    ? []
    : fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name)
        return e.isDirectory() ? walk(p) : IMAGE_EXT.test(e.name) ? [p] : []
      })

// ---------------------------------------------------------------- cutouts --
// Flood fill from the image border through "paper coloured" pixels, then
// soften the mask so the painted edges stay rough rather than scissor sharp.
async function makeCutout(src, dest, { holes = false } = {}) {
  const img = sharp(src).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const soft = await sharp(src).removeAlpha().blur(2.2).raw().toBuffer()
  const n = w * h

  // Paper colour: median of the (blurred) border pixels.
  const border = []
  for (let x = 0; x < w; x += 3) border.push(x, (h - 1) * w + x)
  for (let y = 0; y < h; y += 3) border.push(y * w, y * w + w - 1)
  const med = (c) => {
    const v = border.map((i) => soft[i * 3 + c]).sort((a, b) => a - b)
    return v[v.length >> 1]
  }
  const bg = [med(0), med(1), med(2)]
  const dist = (i) => {
    const r = soft[i * 3] - bg[0], g = soft[i * 3 + 1] - bg[1], b = soft[i * 3 + 2] - bg[2]
    return Math.sqrt(r * r + g * g + b * b)
  }

  const T = 46
  const isBg = new Uint8Array(n)
  const stack = []
  const push = (i) => {
    if (!isBg[i] && dist(i) < T) { isBg[i] = 1; stack.push(i) }
  }
  for (const i of border) push(i)
  for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x) }
  const fill = () => {
    while (stack.length) {
      const i = stack.pop()
      const x = i % w
      if (x > 0) push(i - 1)
      if (x < w - 1) push(i + 1)
      if (i >= w) push(i - w)
      if (i < n - w) push(i + w)
    }
  }
  fill()

  if (holes) {
    // Enclosed paper areas (for example between an arm and the body).
    const seen = new Uint8Array(n)
    const tight = 30
    for (let s = 0; s < n; s++) {
      if (isBg[s] || seen[s] || dist(s) >= tight) continue
      const region = [s]
      seen[s] = 1
      for (let k = 0; k < region.length; k++) {
        const i = region[k], x = i % w
        for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w]) {
          if (j < 0 || j >= n || seen[j] || isBg[j] || dist(j) >= tight) continue
          seen[j] = 1
          region.push(j)
        }
      }
      if (region.length > n * 0.004) for (const i of region) isBg[i] = 1
    }
  }

  const mask = Buffer.alloc(n)
  for (let i = 0; i < n; i++) mask[i] = isBg[i] ? 0 : 255
  // Grow the subject by a hair, then feather.
  const alpha = await sharp(mask, { raw: { width: w, height: h, channels: 1 } })
    .blur(1.6)
    .linear(1.5, -40)
    .extractChannel(0)
    .raw()
    .toBuffer()

  let x0 = w, y0 = h, x1 = 0, y1 = 0
  for (let i = 0; i < n; i++) {
    data[i * 4 + 3] = alpha[i]
    if (alpha[i] > 24) {
      const x = i % w, y = (i / w) | 0
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
  const pad = 6
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad)
  x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad)
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
    .png({ compressionLevel: 9 })
    .toFile(dest)
}

// ------------------------------------------------------------------- webp --
async function toWebp(src, key, widths, manifest, { quality = 80 } = {}) {
  const meta = await sharp(src).metadata()
  const base = key.replace(IMAGE_EXT, '')
  const sizes = [...new Set(widths.map((x) => Math.min(x, meta.width)))].sort((a, b) => a - b)
  const outs = sizes.map((s) => path.join(OUT_IMG, `${base}-${s}.webp`))
  if (!fresh(src, outs)) {
    fs.mkdirSync(path.dirname(outs[0]), { recursive: true })
    await Promise.all(
      sizes.map((s, i) => sharp(src).resize({ width: s }).webp({ quality, effort: 5 }).toFile(outs[i])),
    )
    console.log('  webp', key)
  }
  const url = (s) => `/assets/img/${base}-${s}.webp`.split('/').map(encodeURIComponent).join('/')
  manifest[key] = {
    src: url(sizes[sizes.length - 1]),
    srcSet: sizes.map((s) => `${url(s)} ${s}w`).join(', '),
    width: meta.width,
    height: meta.height,
  }
}

async function main() {
  console.log('Preparing images…')
  fs.mkdirSync(CUTOUTS, { recursive: true })
  fs.mkdirSync(OUT_IMG, { recursive: true })
  const manifest = {}

  for (const [name, opt] of Object.entries(ILLUSTRATIONS)) {
    const src = path.join(ASSETS, `${name}.png`)
    if (!fs.existsSync(src)) { console.warn(`  missing assets/${name}.png`); continue }
    const cut = path.join(CUTOUTS, `${name}.png`)
    if (!fresh(src, [cut])) {
      await makeCutout(src, cut, opt)
      console.log('  cutout', name)
    }
    await toWebp(cut, name, opt.widths, manifest, { quality: 84 })
  }
  // Project screenshots: assets/projects/<name>/<file>
  for (const src of walk(path.join(ASSETS, 'projects'))) {
    await toWebp(src, path.relative(ASSETS, src).split(path.sep).join('/'), [640, 1280], manifest)
  }

  // Gallery: every image in assets/gallery/, sorted by file name.
  const gallery = []
  for (const src of walk(path.join(ASSETS, 'gallery')).sort()) {
    const key = path.relative(ASSETS, src).split(path.sep).join('/')
    await toWebp(src, key, [700, 1400], manifest, { quality: 84 })
    gallery.push(key)
  }
  manifest.__gallery = gallery

  // Event photos: assets/events/<project id>/<file>, grouped by project.
  const events = {}
  for (const src of walk(path.join(ASSETS, 'events')).sort()) {
    const key = path.relative(ASSETS, src).split(path.sep).join('/')
    const parts = key.split('/')
    if (parts.length < 3) {
      console.warn(`  skipped ${key}: put event photos in assets/events/<project id>/`)
      continue
    }
    await toWebp(src, key, [360, 1600], manifest, { quality: 82 })
    ;(events[parts[1]] ||= []).push(key)
  }
  manifest.__events = events

  // Optional painted art: assets/art/<file>
  const art = []
  for (const src of walk(path.join(ASSETS, 'art')).sort()) {
    const key = path.relative(ASSETS, src).split(path.sep).join('/')
    await toWebp(src, key, [240, 900], manifest, { quality: 84 })
    art.push(key)
  }
  manifest.__art = art

  // Optional signature for the nav logo: assets/signature.png
  const signature = path.join(ASSETS, 'signature.png')
  if (fs.existsSync(signature)) await toWebp(signature, 'signature.png', [480], manifest, { quality: 90 })

  // Optional handwriting font: assets/fonts/handwriting.woff2
  const font = path.join(ASSETS, 'fonts', 'handwriting.woff2')
  manifest.__handFont = fs.existsSync(font)
  if (manifest.__handFont) {
    fs.mkdirSync(path.join(OUT, 'fonts'), { recursive: true })
    fs.copyFileSync(font, path.join(OUT, 'fonts', 'handwriting.woff2'))
  }

  // Resume: assets/resume.pdf, or the first PDF with "resume" in its name.
  const pdf =
    ['resume.pdf'].find((f) => fs.existsSync(path.join(ASSETS, f))) ||
    fs.readdirSync(ASSETS).find((f) => /resume.*\.pdf$/i.test(f))
  if (pdf) fs.copyFileSync(path.join(ASSETS, pdf), path.join(OUT, 'resume.pdf'))
  else console.warn('  no resume PDF found in assets/')

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  const count = Object.keys(manifest).filter((k) => !k.startsWith('__')).length
  console.log(`Done. ${count} images (${gallery.length} gallery, ${Object.values(events).flat().length} event photos, ${art.length} art).`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
