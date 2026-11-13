import { useEffect, useRef, useState } from 'react'
import { findArt, getImage } from '../lib/images.js'
import { tornPath } from '../lib/paper.js'
import { art, site } from '../data/content.js'

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
export function PaintPatch({ className = '', rows = 7, ...rest }) {
  const lines = Array.from({ length: rows }, (_, i) => {
    const y = 40 + (i * 340) / (rows - 1)
    const w = i % 2 ? 6 : -8
    return `M${34 + (i % 3) * 9} ${y} C 130 ${y - 12 + w}, 270 ${y + 14}, ${368 - (i % 2) * 14} ${y + w}`
  })
  return (
    <svg className={`patch ${className}`} viewBox="0 0 400 420" preserveAspectRatio="none" aria-hidden="true" focusable="false" {...rest}>
      <g filter="url(#paint)" fill="none" stroke="currentColor" strokeWidth="70" strokeLinecap="round">
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}

// Three loose brush strokes used as a divider between sections. If there is
// a divider tile in /assets/art/, it sits in the middle of the strokes.
export function PaintDivider() {
  const tile = findArt(art.divider, 'divider')
  return (
    <div className={`divider reveal ${tile ? 'divider--art' : ''}`} aria-hidden={tile ? undefined : 'true'}>
      <Brush variant={0} />
      {tile && <Pic className="divider__tile" src={tile} alt={art.dividerAlt} sizes="120px" />}
      <Brush variant={1} />
      <Brush variant={2} />
    </div>
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

export function SectionHeading({ children, id, variant = 0 }) {
  return (
    <h2 className="h2 reveal" id={id}>
      <span className="h2__text">{children}</span>
      <Brush className="h2__stroke" variant={variant} />
    </h2>
  )
}

const external = (url) => /^https?:/.test(url)
const newTab = { target: '_blank', rel: 'noopener noreferrer' }
export const isRealLink = (url) => Boolean(url) && !/^TODO/i.test(url)

// Big painted button.
export function Button({ href, children, ghost = false }) {
  return (
    <a className={`btn ${ghost ? 'btn--ghost' : ''}`} href={href} {...(external(href) || href.endsWith('.pdf') ? newTab : {})}>
      <span>{children}</span>
    </a>
  )
}

// Small outlined link button. Links without a real url are not rendered.
export function LinkButton({ url, children }) {
  if (!isRealLink(url)) {
    return site.showPlaceholderLinks ? <span className="todo-link">{children}: coming soon</span> : null
  }
  const ext = external(url)
  return (
    <a className="lbtn" href={url} {...(ext ? newTab : {})}>
      {children}
      {ext && <span aria-hidden="true">↗</span>}
      {ext && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

// Text link with a hand-drawn underline.
export function InkLink({ url, children }) {
  const ext = external(url)
  return (
    <a className="ink" href={url} {...(ext ? newTab : {})}>
      {children}
      {ext && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

// An image in a plain paper frame: thin border, soft shadow.
export function Frame({ src, alt, sizes, className = '' }) {
  return (
    <div className={`frame ${className}`}>
      <Pic src={src} alt={alt} sizes={sizes} />
    </div>
  )
}

// "Details" toggle: long text stays collapsed until asked for.
export function Details({ id, label = 'Details', about, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="details">
      <button className="details__btn" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className="details__sign" aria-hidden="true">
          {open ? '×' : '+'}
        </span>
        {open ? 'Hide details' : label}
        <span className="sr-only"> about {about}</span>
      </button>
      <div id={id} className={`details__panel ${open ? 'is-open' : ''}`} inert={!open}>
        <div>{children}</div>
      </div>
    </div>
  )
}

// Full screen photo viewer with captions. Esc, the close button, or a click
// on the backdrop closes it. Arrow keys move between photos.
export function Lightbox({ items, index, onIndex, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current.open) ref.current.showModal()
  }, [])
  const n = items.length
  const go = (step) => onIndex((index + step + n) % n)
  const item = items[index]
  const img = getImage(item.src)
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Photo viewer"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      onKeyDown={(e) => {
        if (n < 2) return
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      <figure className="lightbox__figure">
        {img && <img src={img.src} srcSet={img.srcSet} sizes="92vw" alt={item.alt || item.caption || ''} />}
        <figcaption>
          <span className="lightbox__caption">{item.caption}</span>
          {n > 1 && (
            <span className="lightbox__count">
              {index + 1} / {n}
            </span>
          )}
        </figcaption>
      </figure>
      {n > 1 && (
        <>
          <button className="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo" onClick={() => go(-1)}>
            ‹
          </button>
          <button className="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo" onClick={() => go(1)}>
            ›
          </button>
        </>
      )}
      <button className="lightbox__close" type="button" aria-label="Close photo viewer" onClick={() => ref.current.close()}>
        ×
      </button>
    </dialog>
  )
}
