import { useState } from 'react'
import { projects } from '../data/content.js'
import { tornClip } from '../lib/paper.js'
import { InkLink, Photo, SectionHeading, Sticker, Tape, TornEdge } from './bits.jsx'

const TILT = [-0.5, 0.6, -0.7, 0.4, -0.4, 0.7, -0.6]
const PLATE = ['sienna', 'olive', 'cobalt']

function ProjectCard({ p, i }) {
  const [open, setOpen] = useState(false)
  const many = p.images.length > 1
  return (
    <article className={`project reveal ${p.featured ? 'project--featured' : ''}`} style={{ '--r': `${TILT[i % TILT.length]}deg` }}>
      <div className="project__paper" style={{ clipPath: tornClip(i + 11) }} aria-hidden="true" />

      <div className={`project__media ${many ? 'project__media--pair' : ''}`}>
        {p.images.length ? (
          p.images.map((im, k) => (
            <Photo
              key={im.src}
              src={im.src}
              alt={im.alt}
              caption={im.caption}
              rotate={k % 2 ? 1.6 : -1.4 + (i % 2) * 2.4}
              sizes={p.featured ? '(min-width: 900px) 460px, 86vw' : '(min-width: 900px) 420px, 86vw'}
            />
          ))
        ) : (
          <div className={`plate plate--${PLATE[i % PLATE.length]}`} style={{ '--r': `${i % 2 ? 1.2 : -1.2}deg` }} aria-hidden="true">
            <Tape className="tape--a" />
            <Tape className="tape--b" />
            <div className="plate__paint">
              <span>{p.short || p.title}</span>
            </div>
          </div>
        )}
      </div>

      <div className="project__body">
        <p className="project__event">{p.event}</p>
        <h3 className="project__title">
          {p.title}
          {p.short && <span className="project__short"> ({p.short})</span>}
        </h3>
        {p.award.length > 0 && (
          <ul className="awards" aria-label="Awards">
            {p.award.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        )}
        {p.quote && <p className="project__quote">“{p.quote}”</p>}
        <p className="project__summary">{p.summary}</p>
        {p.stats && (
          <ul className="project__stats">
            {p.stats.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        <ul className="tags" aria-label="Tech">
          {p.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ul className="project__links">
          {p.links.map((l) => (
            <li key={l.label}>
              <InkLink url={l.url}>{l.label}</InkLink>
            </li>
          ))}
        </ul>

        <button className="more" type="button" aria-expanded={open} aria-controls={`more-${p.id}`} onClick={() => setOpen((o) => !o)}>
          <span className="more__sign" aria-hidden="true">
            {open ? '×' : '+'}
          </span>
          {open ? 'Close' : 'Read more'}
          <span className="sr-only"> about {p.title}</span>
        </button>
        <div id={`more-${p.id}`} className={`project__details ${open ? 'is-open' : ''}`} inert={!open}>
          <div>
            {p.details.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="band band--kraft section" aria-labelledby="projects">
      <TornEdge seed={21} />
      <div className="wrap">
        <div className="section__head section__head--marker">
          <div>
            <SectionHeading id="projects" variant={2}>
              {projects.heading}
            </SectionHeading>
            <p className="section__intro reveal">{projects.intro}</p>
          </div>
          <div className="marker marker--laptop">
            <Sticker src="laptop" depth={0.04} sizes="(min-width: 900px) 220px, 130px" />
          </div>
        </div>
        <div className="projects">
          {projects.items.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
      <TornEdge seed={27} bottom />
    </section>
  )
}
