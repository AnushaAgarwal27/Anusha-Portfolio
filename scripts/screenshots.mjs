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
  { name: 'phone-small', width: 320, height: 740, slice: 1400 },
  { name: 'tablet', width: 768, height: 1024, slice: 1400 },
]

let failed = false
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
    [...document.images]
      .filter((i) => i.getClientRects().length > 0 && (!i.complete || i.naturalWidth === 0))
      .map((i) => i.currentSrc || i.src),
  )
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

  // Every resume entry must serve the actual source PDF, not an HTML fallback.
  const resumes = await page.locator('a').evaluateAll((links) =>
    links.filter((a) => /resume/i.test(a.textContent)).map((a) => a.href),
  )
  if (resumes.length !== 3) problems.push(`Expected 3 resume links, found ${resumes.length}`)
  for (const href of new Set(resumes)) {
    const response = await page.request.get(href)
    if (!response.ok() || !response.headers()['content-type']?.includes('application/pdf') ||
        !(await response.body()).equals(fs.readFileSync('assets/Resume-Anusha Agarwal.pdf'))) {
      problems.push(`Resume does not serve the source PDF: ${href}`)
    }
  }
  const copy = await page.locator('body').innerText()
  if (/seeking|looking for internships?|recruiter|open to (?:work|opportunities)/i.test(copy)) {
    problems.push('Job-seeking copy remains')
  }
  if (s.width < 900) {
    const menu = page.locator('button[aria-controls="nav-links"]')
    await menu.click()
    if (await menu.getAttribute('aria-expanded') !== 'true') problems.push('Phone menu did not open')
    await page.screenshot({ path: `${out}/${s.name}-menu.png` })
    await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click()
    if (await menu.getAttribute('aria-expanded') !== 'false') problems.push('Phone menu did not close')
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(500)
  }
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
  if (problems.length) console.log('  problems:', problems)
  console.log(`  resume links: ${resumes.length}, PDF verified against source`)
  if (overflow > 0 || broken.length || problems.length) failed = true
  await page.close()
}
await browser.close()

if (failed) process.exitCode = 1
