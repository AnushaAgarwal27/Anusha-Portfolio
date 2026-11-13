// Prepares every image the site uses. Runs automatically before `npm run dev`
// and `npm run build`, or by hand with `npm run images`.
//
//   assets/*.png               originals (never modified)
//   assets/cutouts/*.png       transparent copies of the illustrations
//   public/assets/img/**       compressed WebP files the site actually loads
//   public/assets/resume.pdf   copy of the resume PDF found in assets/
//   src/data/images.generated.json   sizes + srcsets, read by src/lib/images.js
//
// To hand-fix a cutout, edit or replace the PNG in assets/cutouts/ (for example
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

// Illustrations that get their cream background removed.
// `holes` also clears paper-coloured areas fully enclosed by the subject.
const ILLUSTRATIONS = {
  hero: { widths: [560, 1100], holes: true },
  'eyes-banner': { widths: [800, 1600] },
  laptop: { widths: [320, 640] },
  coffee: { widths: [320, 640], holes: true },
  strawberry: { widths: [96, 240, 480] },
  cassette: { widths: [320, 640], holes: true },
}
// Illustrations kept on their painted paper background (shown as taped photos).
const FRAMED = { 'portrait-2': { widths: [480, 900] } }

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
  for (const [name, opt] of Object.entries(FRAMED)) {
    const src = path.join(ASSETS, `${name}.png`)
    if (fs.existsSync(src)) await toWebp(src, name, opt.widths, manifest, { quality: 82 })
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

  // Favicon + touch icon from the strawberry.
  const berry = path.join(CUTOUTS, 'strawberry.png')
  if (fs.existsSync(berry)) {
    for (const [file, size, bg] of [
      ['favicon.png', 64, { r: 0, g: 0, b: 0, alpha: 0 }],
      ['apple-touch-icon.png', 180, '#F3E6CC'],
    ]) {
      const dest = path.join(OUT, file)
      if (fresh(berry, [dest])) continue
      const inner = Math.round(size * (file === 'favicon.png' ? 1 : 0.78))
      const buf = await sharp(berry)
        .resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer()
      await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
        .composite([{ input: buf }])
        .png()
        .toFile(dest)
    }
  }

  // Resume: assets/resume.pdf, or the first PDF with "resume" in its name.
  const pdf =
    ['resume.pdf'].find((f) => fs.existsSync(path.join(ASSETS, f))) ||
    fs.readdirSync(ASSETS).find((f) => /resume.*\.pdf$/i.test(f))
  if (pdf) fs.copyFileSync(path.join(ASSETS, pdf), path.join(OUT, 'resume.pdf'))
  else console.warn('  no resume PDF found in assets/')

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`Done. ${Object.keys(manifest).length - 1} images, ${gallery.length} in gallery.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
