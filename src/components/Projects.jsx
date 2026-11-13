import { projects } from '../data/content.js'
import { Brush, Frame, LinkButton, SectionHeading, TornEdge, isRealLink } from './bits.jsx'
import { site } from '../data/content.js'

// One project per full-width row. Every row has the same structure:
// screenshot (if any) on the left, text on the right.
function ProjectRow({ p, first }) {
  const hasImage = p.images.length > 0
  const links = p.links.filter((l) => isRealLink(l.url) || site.showPlaceholderLinks)
  return (
    <li className={`prow reveal ${hasImage ? '' : 'prow--text'}`}>
      {!first && <Brush className="prow__rule" variant={2} />}
      <article className="prow__grid">
        {hasImage && (
          <div className="prow__media">
            {p.images.map((im) => (
              <Frame key={im.src} src={im.src} alt={im.alt} sizes="(min-width: 800px) 420px, 92vw" />
            ))}
          </div>
        )}

        <header className="prow__head">
          <p className="prow__event">
            {p.event}
            {p.year && <span> · {p.year}</span>}
          </p>
          <h3 className="prow__title">
            {p.title}
            {p.short && <span className="prow__short"> ({p.short})</span>}
          </h3>
          {p.award.length > 0 && (
            <ul className="awards" aria-label="Awards">
              {p.award.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          )}
        </header>

        <div className="prow__body">
          {p.quote && <p className="prow__quote">“{p.quote}”</p>}
          <p className="prow__summary">{p.summary}</p>
          {p.details.map((d) => (
            <p key={d} className="prow__detail">
              {d}
            </p>
          ))}
          {p.highlights?.length > 0 && (
            <p className="prow__highlights">
              <span className="prow__label">Highlights</span>
              {p.highlights.map((h) => (
                <mark key={h}>{h}</mark>
              ))}
            </p>
          )}
          <ul className="tags" aria-label="Tech">
            {p.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {links.length > 0 && (
            <ul className="prow__links">
              {links.map((l) => (
                <li key={l.label}>
                  <LinkButton url={l.url}>{l.label}</LinkButton>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </li>
  )
}

export default function Projects() {
  return (
    <section className="band band--paper section" aria-labelledby="projects">
      <TornEdge seed={21} />
      <div className="wrap">
        <SectionHeading id="projects" variant={2}>
          {projects.heading}
        </SectionHeading>
        <p className="section__intro reveal">{projects.intro}</p>
        <ol className="prows">
          {projects.items.map((p, i) => (
            <ProjectRow key={p.id} p={p} first={i === 0} />
          ))}
        </ol>
      </div>
      <TornEdge seed={27} bottom />
    </section>
  )
}
