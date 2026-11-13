import { useRef } from 'react'
import { getImage } from '../lib/images.js'
import { tornPath } from '../lib/paper.js'
import { site, stickers } from '../data/content.js'

// SVG filters used for rough paint edges and dry brush streaks.
export function SvgDefs() {
  return (
    <svg className="svg-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="ink" x="-3%" y="-8%" width="106%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="rough" x="-4%" y="-12%" width="108%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="paint" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.32" numOctaves="2" seed="11" result="streak" />
          <feColorMatrix in="streak" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -8 6.1" result="mask" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="cut" />
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="cut" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="dry" x="-4%" y="-30%" width="108%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.5" numOctaves="2" seed="7" result="streak" />
          <feColorMatrix in="streak" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 5.7" result="mask" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="cut" />
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="cut" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

export function Pic({ src, alt, sizes = '100vw', eager = false, className }) {
  const img = getImage(src)
  if (!img) return null
  return (
    <img
      className={className}
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  )
}

// A painted sticker you can drag around. Wiggles on hover, settles on release.
export function Sticker({ src, className = '', depth = 0.05, sizes = '180px', eager }) {
  const grab = useRef(null)
  const p = useRef({ x: 0, y: 0, ox: 0, oy: 0, on: false })

  const down = (e) => {
    if (e.button) return
    const s = p.current
    s.on = true
    s.ox = e.clientX - s.x
    s.oy = e.clientY - s.y
    grab.current.setPointerCapture(e.pointerId)
    grab.current.classList.remove('is-settling')
    grab.current.classList.add('is-dragging')
  }
  const move = (e) => {
    const s = p.current
    if (!s.on) return
    s.x = e.clientX - s.ox
    s.y = e.clientY - s.oy
    grab.current.style.setProperty('--dx', `${s.x}px`)
    grab.current.style.setProperty('--dy', `${s.y}px`)
  }
  const up = () => {
    if (!p.current.on) return
    p.current.on = false
    grab.current.classList.remove('is-dragging')
    grab.current.classList.add('is-settling')
  }

  return (
    <div className={`sticker ${className}`} data-depth={depth}>
      <div
        ref={grab}
        className="sticker__grab"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onAnimationEnd={(e) => e.currentTarget.classList.remove('is-settling')}
      >
        <Pic src={src} alt={stickers[src] || ''} sizes={sizes} eager={eager} />
      </div>
    </div>
  )
}

export const Tape = ({ className = '' }) => <span className={`tape ${className}`} aria-hidden="true" />

// A dry brush stroke. Colour comes from CSS `color`.
export function Brush({ className = '', variant = 0 }) {
  const d = [
    'M5 14 C 52 6, 108 19, 168 11 S 258 8, 295 13',
    'M5 11 C 70 18, 130 5, 200 13 S 270 16, 295 9',
    'M6 13 C 40 9, 90 16, 150 12 S 250 9, 294 14',
  ][variant % 3]
  return (
    <svg className={`brush ${className}`} viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" filter="url(#dry)" />
    </svg>
  )
}

// A block of stacked brush strokes, used as a painted patch of colour.
export function PaintPatch({ className = '', rows = 7 }) {
  const lines = Array.from({ length: rows }, (_, i) => {
    const y = 40 + (i * 340) / (rows - 1)
    const w = i % 2 ? 6 : -8
    return `M${34 + (i % 3) * 9} ${y} C 130 ${y - 12 + w}, 270 ${y + 14}, ${368 - (i % 2) * 14} ${y + w}`
  })
  return (
    <svg className={`patch ${className}`} viewBox="0 0 400 420" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g filter="url(#paint)" fill="none" stroke="currentColor" strokeWidth="70" strokeLinecap="round">
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}

// Torn paper edge for the top or bottom of a full-width band.
export function TornEdge({ seed = 1, bottom = false }) {
  return (
    <svg
      className={`torn-edge ${bottom ? 'torn-edge--bottom' : 'torn-edge--top'}`}
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className="torn-edge__fiber" d={tornPath(seed + 40, { base: 9 })} />
      <path d={tornPath(seed)} fill="currentColor" />
    </svg>
  )
}

export function SectionHeading({ children, id, variant = 0, tone = 'tomato' }) {
  return (
    <h2 className={`h2 h2--${tone} reveal`} id={id}>
      <span className="h2__text">{children}</span>
      <Brush className="h2__stroke" variant={variant} />
    </h2>
  )
}

const external = (url) => /^https?:/.test(url)

export function Button({ href, children, ghost = false, download }) {
  const ext = external(href)
  return (
    <a
      className={`btn ${ghost ? 'btn--ghost' : ''}`}
      href={href}
      download={download}
      {...(ext || href.endsWith('.pdf') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
    </a>
  )
}

// Text link with a hand-drawn underline. Placeholder urls become a dashed chip.
export function InkLink({ url, children, className = '' }) {
  if (!url || /^TODO/i.test(url)) {
    if (!site.showPlaceholderLinks) return null
    return (
      <span className={`todo-link ${className}`} title={url}>
        {children}: coming soon
      </span>
    )
  }
  const ext = external(url)
  return (
    <a className={`ink ${className}`} href={url} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
      {ext && (
        <span className="ink__arrow" aria-hidden="true">
          ↗
        </span>
      )}
      {ext && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

// A screenshot or painting presented as a printed photo taped to the page.
export function Photo({ src, alt, caption, sizes, rotate = -1.2, className = '', eager }) {
  return (
    <figure className={`photo ${className}`} style={{ '--r': `${rotate}deg` }}>
      <Tape className="tape--a" />
      <Tape className="tape--b" />
      <div className="photo__print">
        <Pic src={src} alt={alt} sizes={sizes} eager={eager} />
      </div>
      {caption && <figcaption className="photo__caption">{caption}</figcaption>}
    </figure>
  )
}
