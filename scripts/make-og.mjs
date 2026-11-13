// Builds the link preview image (public/og.png, 1200x630) from the hero painting.
// Run with `npm run og` after changing your name, tagline, or hero.png.
import { chromium } from 'playwright'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { hero, site } from '../src/data/content.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataUrl = async (file, width) =>
  'data:image/png;base64,' +
  (await sharp(path.join(root, 'assets', 'cutouts', file)).resize({ width }).png().toBuffer()).toString('base64')

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Caveat+Brush&family=DM+Mono&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0 }
  body { width: 1200px; height: 630px; overflow: hidden; background: #F3E6CC; position: relative; font-family: 'DM Mono', monospace; color: #2A1B12 }
  .grain { position: absolute; inset: 0; opacity: .5; mix-blend-mode: multiply; z-index: 9;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .42 0 0 0 0 .28 0 0 0 0 .14 0 0 0 .55 -.12'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23g)'/%3E%3C/svg%3E") }
  .text { position: absolute; left: 70px; top: 120px; width: 600px }
  .eyebrow { font-size: 21px; letter-spacing: .08em; text-transform: uppercase; color: #59452F }
  h1 { font: 400 104px/.92 'Bowlby One SC'; color: #1F3FA3; margin: 18px 0 0; transform: rotate(-2deg); transform-origin: left; filter: url(#ink) }
  .stroke { width: 560px; height: 30px; margin: 8px 0 0 -8px; transform: rotate(-2deg); color: #D4432A; overflow: visible }
  p.tag { font: 40px/1.1 'Caveat Brush'; margin-top: 34px; white-space: nowrap }
  .patch { position: absolute; right: 60px; top: 110px; width: 500px; height: 560px; color: #1F3FA3; overflow: visible }
  .me { position: absolute; right: 20px; bottom: -8px; width: 640px; filter: drop-shadow(0 10px 14px rgba(40,20,5,.25)) }
  .berry { position: absolute; left: 600px; top: 60px; width: 120px; transform: rotate(-14deg); filter: drop-shadow(0 6px 6px rgba(60,35,10,.25)) }
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="ink" x="-3%" y="-8%" width="106%" height="116%"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>
  <filter id="paint" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.32" numOctaves="2" seed="11" result="s"/><feColorMatrix in="s" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -8 6.1" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="c"/><feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="2" result="n"/><feDisplacementMap in="c" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs></svg>
<svg class="patch" viewBox="0 0 400 420" preserveAspectRatio="none"><g filter="url(#paint)" fill="none" stroke="currentColor" stroke-width="70" stroke-linecap="round">
${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${34 + (i % 3) * 9} ${40 + i * 57} C 130 ${30 + i * 57}, 270 ${54 + i * 57}, ${368 - (i % 2) * 14} ${40 + i * 57}"/>`).join('')}
</g></svg>
<img class="me" src="${await dataUrl('hero.png', 900)}">
<img class="berry" src="${await dataUrl('strawberry.png', 300)}">
<div class="text">
  <div class="eyebrow">Software engineer who paints</div>
  <h1>${hero.name.join('<br>')}</h1>
  <svg class="stroke" viewBox="0 0 300 24" preserveAspectRatio="none"><path d="M5 11 C 70 18, 130 5, 200 13 S 270 16, 295 9" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" filter="url(#paint)"/></svg>
  <p class="tag">${site.ogLine || 'Penn State CS · APIs, agents, and paint'}</p>
</div>
<div class="grain"></div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(root, 'public', 'og.png') })
await browser.close()
console.log('Wrote public/og.png')
