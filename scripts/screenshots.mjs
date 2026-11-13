// Takes review screenshots of the running site at desktop and phone widths.
//   1. npm run dev          (in one terminal)
//   2. npm run screenshots  (in another)   optional: pass a different URL
// Files land in ./screenshots (ignored by git).
import { chromium } from 'playwright'
import fs from 'node:fs'

const url = process.argv[2] || 'http://localhost:5173/'
const out = 'screenshots'
fs.mkdirSync(out, { recursive: true })

const sizes = [
  { name: 'desktop', width: 1440, height: 900, slice: 1100 },
  { name: 'phone', width: 390, height: 844, slice: 1400 },
]

const browser = await chromium.launch()
for (const s of sizes) {
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height } })
  const problems = []
  page.on('console', (m) => m.type() === 'error' && problems.push(m.text()))
  page.on('pageerror', (e) => problems.push(String(e)))
  page.on('requestfailed', (r) => problems.push(`failed: ${r.url()}`))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  // Scroll through the page so lazy images load and reveal animations run.
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y)
    await page.waitForTimeout(140)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(900)

  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
  )
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

  await page.screenshot({ path: `${out}/${s.name}-full.png`, fullPage: true })
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0, i = 1; y < total; y += s.slice, i++) {
    await page.screenshot({
      path: `${out}/${s.name}-${String(i).padStart(2, '0')}.png`,
      fullPage: true,
      clip: { x: 0, y, width: s.width, height: Math.min(s.slice, total - y) },
    })
  }
  console.log(`${s.name}: ${total}px tall, horizontal overflow ${overflow}px, broken images ${broken.length}`)
  if (broken.length) console.log('  broken:', broken)
  if (problems.length) console.log('  console problems:', problems)
  await page.close()
}
await browser.close()
