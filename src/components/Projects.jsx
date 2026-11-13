import { useState } from 'react'
import { projects, site } from '../data/content.js'
import { eventPhotos, findArt, getImage, prettyName } from '../lib/images.js'
import { Brush, Details, Frame, Lightbox, LinkButton, Pic, SectionHeading, TornEdge, isRealLink } from './bits.jsx'

const FEATURED_COUNT = 3 // the first 3 projects are featured unless a project says otherwise
const MORE_VISIBLE = 6 // "More projects" shows this many before the "Show all" button
const MAX_THUMBS = 4

const isFeatured = (p, i) => (typeof p.featured === 'boolean' ? p.featured : i < FEATURED_COUNT)

// Event photos: the project's own `photos` list, or everything in assets/events/<id>/.
function photosFor(p) {
  if (p.photos?.length) return p.photos.filter((ph) => getImage(ph.src))
  return (eventPhotos[p.id] || []).map((src) => ({ src, caption: prettyName(src) }))
}

const visibleLinks = (p) => p.links.filter((l) => isRealLink(l.url) || site.showPlaceholderLinks)

function Head({ p, compact = false }) {
  const artKey = findArt(p.art, p.id)
  return (
    <header className="phead">
      {artKey && <Pic className="phead__art" src={artKey} alt="" sizes="64px" />}
      <div>
        <p className="phead__event">
          {p.event}
          {p.year && <span> · {p.year}</span>}
        </p>
        <h3 className={compact ? 'phead__title phead__title--small' : 'phead__title'}>
          {p.title}
          {p.short && <span className="phead__short"> ({p.short})</span>}
        </h3>
        {p.award.length > 0 && (
          <ul className="awards" aria-label="Awards">
            {p.award.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}

function TagsAndLinks({ p }) {
  const links = visibleLinks(p)
  return (
    <>
      <ul className="tags" aria-label="Tech">
        {p.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {links.length > 0 && (
        <ul className="plinks">
          {links.map((l) => (
            <li key={l.label}>
              <LinkButton url={l.url}>{l.label}</LinkButton>
            </li>
          ))}
        </ul>
      )}
      {p.details?.length > 0 && (
        <Details id={`details-${p.id}`} about={p.title}>
          {p.details.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </Details>
      )}
    </>
  )
}

// Featured row: small screenshot on the left (about 30%), text on the right.
function FeaturedRow({ p, first, onOpen }) {
  const shots = p.images || []
  const photos = photosFor(p)
  // One viewer per project: screenshots first, then event photos.
  const viewer = [...shots.map((im) => ({ src: im.src, alt: im.alt, caption: im.note || im.alt })), ...photos]
  const extra = photos.length - MAX_THUMBS
  return (
    <li className="feat reveal">
      {!first && <Brush className="rule" variant={2} />}
      <article className={`feat__grid ${shots.length ? '' : 'feat__grid--text'}`}>
        {shots.length > 0 && (
          <div className="feat__media">
            {shots.map((im, i) => (
              <figure key={im.src} className="shot">
                <button type="button" className="shot__btn" onClick={() => onOpen(viewer, i)} aria-label={`Enlarge screenshot: ${im.alt}`}>
                  <Frame src={im.src} alt={im.alt} sizes="(min-width: 800px) 320px, 92vw" />
                </button>
                {im.note && <figcaption className="shot__note">{im.note}</figcaption>}
              </figure>
            ))}
          </div>
        )}
        <div className="feat__text">
          <Head p={p} />
          {p.quote && <p className="feat__quote">“{p.quote}”</p>}
          <p className="feat__summary">{p.summary}</p>
          {p.highlights?.length > 0 && (
            <p className="highlights">
              <span className="highlights__label">Highlights</span>
              {p.highlights.map((h) => (
                <mark key={h}>{h}</mark>
              ))}
            </p>
          )}
          <TagsAndLinks p={p} />
        </div>
      </article>

      {photos.length > 0 && (
        <div className="strip">
          <p className="strip__label">Event photos</p>
          <ul>
            {photos.slice(0, MAX_THUMBS).map((ph, i) => {
              const overflow = i === MAX_THUMBS - 1 && extra > 0
              return (
                <li key={ph.src}>
                  <button
                    type="button"
                    className="strip__thumb"
                    onClick={() => onOpen(viewer, shots.length + i)}
                    aria-label={overflow ? `View all ${photos.length} event photos` : `Enlarge photo: ${ph.caption || ph.alt || p.title}`}
                  >
                    <Pic src={ph.src} alt={ph.alt || ph.caption || `${p.title} event photo`} sizes="120px" />
                    {overflow && <span className="strip__more">+{extra}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </li>
  )
}

// Compact card for the "More projects" grid: no screenshot.
function MiniCard({ p, reveal }) {
  return (
    <li className={`mini ${reveal ? 'reveal' : ''}`}>
      <article>
        <Head p={p} compact />
        <p className="mini__summary">{p.summary}</p>
        <TagsAndLinks p={p} />
      </article>
    </li>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [viewer, setViewer] = useState(null) // { items, index }
  const featured = projects.items.filter(isFeatured)
  const more = projects.items.filter((p, i) => !isFeatured(p, i))
  const shown = showAll ? more : more.slice(0, MORE_VISIBLE)

  return (
    <section className="band band--sheet section" aria-labelledby="projects">
      <TornEdge seed={21} />
      <div className="wrap">
        <SectionHeading id="projects" variant={2}>
          {projects.heading}
        </SectionHeading>
        <p className="section__intro reveal">{projects.intro}</p>

        <ol className="feats">
          {featured.map((p, i) => (
            <FeaturedRow key={p.id} p={p} first={i === 0} onOpen={(items, index) => setViewer({ items, index })} />
          ))}
        </ol>

        {more.length > 0 && (
          <>
            <h3 className="more-heading reveal" id="more-projects">
              {projects.moreHeading || 'More projects'}
            </h3>
            <ul className="minis" id="more-list">
              {shown.map((p, i) => (
                <MiniCard key={p.id} p={p} reveal={i < MORE_VISIBLE} />
              ))}
            </ul>
            {more.length > MORE_VISIBLE && !showAll && (
              <button className="showall" type="button" aria-controls="more-list" onClick={() => setShowAll(true)}>
                Show all {more.length} projects
              </button>
            )}
          </>
        )}
      </div>
      <TornEdge seed={27} bottom />

      {viewer && (
        <Lightbox
          items={viewer.items}
          index={viewer.index}
          onIndex={(index) => setViewer((v) => ({ ...v, index }))}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  )
}
