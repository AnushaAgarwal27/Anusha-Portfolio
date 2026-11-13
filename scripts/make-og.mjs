// Builds the link preview image (public/og.png, 1200x630) from the hero painting,
// plus the favicon: a forest green "A" in the heading font (public/favicon.png
// and public/apple-touch-icon.png). Run with `npm run og` after changing your
// name or hero.png. The results are committed, so the site build does not need this.
import { chromium } from 'playwright'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { hero, site } from '../src/data/content.js'

// Keep in sync with the palette at the top of src/styles.css.
const C = { forest: '#1F4D3A', sage: '#A9BBA0', paper: '#F4EEDC', butter: '#E0B04C', ink: '#1E2B24' }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataUrl = async (file, width) =>
  'data:image/png;base64,' +
  (await sharp(path.join(root, 'assets', 'cutouts', file)).resize({ width }).png().toBuffer()).toString('base64')

const fonts =
  '<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=DM+Mono&family=Fraunces:ital,opsz,wght@0,9..144,900;1,9..144,800&display=swap" rel="stylesheet">'

const html = `<!doctype html><html><head>${fonts}
<style>
  * { box-sizing: border-box; margin: 0 }
  body { width: 1200px; height: 630px; overflow: hidden; background: ${C.paper}; position: relative; font-family: 'DM Mono', monospace; color: ${C.ink} }
  .grain { position: absolute; inset: 0; opacity: .5; mix-blend-mode: multiply; z-index: 9;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .3 0 0 0 0 .2 0 0 0 .5 -.12'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23g)'/%3E%3C/svg%3E") }
  .text { position: absolute; left: 70px; top: 120px; width: 600px }
  .eyebrow { font-size: 21px; letter-spacing: .08em; text-transform: uppercase; opacity: .8 }
  h1 { position: relative; z-index: 1; font: 900 118px/.9 'Fraunces'; letter-spacing: -.03em; color: ${C.forest}; margin: 18px 0 0; transform: rotate(-2deg); transform-origin: left }
  h1 i { font-weight: 800; padding-left: .1em }
  .stroke { width: 520px; height: 34px; margin: -22px 0 0 -8px; transform: rotate(-2deg); color: ${C.butter}; overflow: visible }
  p.tag { font: 700 44px/1.1 'Caveat'; margin-top: 30px; white-space: nowrap }
  .patch { position: absolute; right: 60px; top: 110px; width: 500px; height: 560px; color: ${C.sage}; overflow: visible }
  .me { position: absolute; right: 20px; bottom: -8px; width: 640px; filter: drop-shadow(0 10px 14px rgba(30,43,36,.25)) }
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="paint" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.32" numOctaves="2" seed="11" result="s"/><feColorMatrix in="s" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -8 6.1" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="c"/><feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="2" result="n"/><feDisplacementMap in="c" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs></svg>
<svg class="patch" viewBox="0 0 400 420" preserveAspectRatio="none"><g filter="url(#paint)" fill="none" stroke="currentColor" stroke-width="70" stroke-linecap="round">
${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${34 + (i % 3) * 9} ${40 + i * 57} C 130 ${30 + i * 57}, 270 ${54 + i * 57}, ${368 - (i % 2) * 14} ${40 + i * 57}"/>`).join('')}
</g></svg>
<img class="me" src="${await dataUrl('hero.png', 900)}">
<div class="text">
  <div class="eyebrow">${site.ogEyebrow || ''}</div>
  <h1>${hero.name.map((w, i) => (i % 2 ? `<i>${w}</i>` : w)).join('<br>')}</h1>
  <svg class="stroke" viewBox="0 0 300 24" preserveAspectRatio="none"><path d="M5 11 C 70 18, 130 5, 200 13 S 270 16, 295 9" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" filter="url(#paint)"/></svg>
  <p class="tag">${site.ogLine || ''}</p>
</div>
<div class="grain"></div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(root, 'public', 'og.png') })

// Favicon: the first letter of the name in the heading font, forest on paper.
const letter = hero.name[0][0]
const icon = (size) => `<!doctype html><html><head>${fonts}
<style>
  * { margin: 0 } html, body { background: transparent }
  .i { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: ${C.paper}; border-radius: ${size * 0.2}px }
  span { font: italic 800 ${size * 0.92}px/1 'Fraunces'; color: ${C.forest}; transform: translate(${-size * 0.03}px, ${-size * 0.04}px) }
</style></head><body><div class="i"><span>${letter}</span></div></body></html>`
for (const [file, size] of [['favicon.png', 96], ['apple-touch-icon.png', 180]]) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(icon(size), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(root, 'public', file), omitBackground: true })
}
await browser.close()
console.log('Wrote public/og.png, public/favicon.png, public/apple-touch-icon.png')
