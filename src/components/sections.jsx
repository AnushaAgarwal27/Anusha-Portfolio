import { about, art, contact, contactSection, experience, gallery, site, skills } from '../data/content.js'
import { findArt, galleryKeys, getImage, prettyName } from '../lib/images.js'
import { tornClip } from '../lib/paper.js'
import { Brush, Button, Frame, InkLink, SectionHeading, Tape, Pic } from './bits.jsx'

export function About() {
  const { glance } = about
  const picture = findArt(art.about, 'about')
  return (
    <section className="section wrap about" aria-labelledby="about">
      <div className="about__text">
        <SectionHeading id="about">{about.heading}</SectionHeading>
        {about.paragraphs.map((t) => (
          <p key={t} className="reveal">
            {t}
          </p>
        ))}
      </div>
      <div className="about__side">
      {picture && (
        <div className="about__art reveal" style={{ '--r': '-1.6deg' }}>
          <Frame src={picture} alt={art.aboutAlt} sizes="(min-width: 900px) 300px, 70vw" />
        </div>
      )}
      <aside className="glance reveal" style={{ '--r': '1.3deg' }} aria-labelledby="glance">
        <div className="glance__paper" style={{ clipPath: tornClip(7, { depth: 8 }) }} aria-hidden="true" />
        <Tape className="tape--a" />
        <h3 id="glance">{glance.heading}</h3>
        <dl>
          {glance.items.map((it) => (
            <div key={it.label}>
              <dt>{it.label}</dt>
              <dd>{it.text}</dd>
            </div>
          ))}
        </dl>
      </aside>
      <Pic className="little-coffee" src="coffee" alt="" sizes="160px" />
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="section wrap" aria-labelledby="experience">
      <SectionHeading id="experience" variant={1}>
        {experience.heading}
      </SectionHeading>
      <ol className="jobs">
        {experience.items.map((job, i) => (
          <li key={job.org + job.role} className="job reveal" style={{ '--r': `${[-0.5, 0.45, -0.35][i % 3]}deg` }}>
            <p className="job__dates">{job.dates}</p>
            <div className="job__card">
              <div className="job__paper" style={{ clipPath: tornClip(i + 2, { depth: 6 }) }} aria-hidden="true" />
              <Tape className="tape--a" />
              <h3 className="job__org">{job.org}</h3>
              <p className="job__role">
                {job.role}
                {job.place && <span className="job__place">{job.place}</span>}
              </p>
              <ul className="dabs">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {job.tags?.length > 0 && (
                <ul className="tags" aria-label="Skills used">
                  {job.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

// Reads only from /assets/gallery/. While that folder is empty the whole
// section (and its nav link) is hidden.
export function Gallery() {
  if (galleryKeys.length === 0) return null
  return (
    <section className="section wrap" aria-labelledby="gallery">
      <SectionHeading id="gallery" variant={0}>
        {gallery.heading}
      </SectionHeading>
      {gallery.intro && <p className="section__intro reveal">{gallery.intro}</p>}
      <ul className="gallery">
        {galleryKeys.map((key) => {
          const cap = gallery.captions[key.split('/').pop()] || {}
          const title = cap.title || prettyName(key)
          return (
            <li key={key} className="reveal">
              <a href={getImage(key).src} target="_blank" rel="noopener noreferrer" aria-label={`${title}, open full size in a new tab`}>
                <Frame src={key} alt={cap.alt || title} sizes="(min-width: 900px) 360px, 90vw" />
              </a>
              <p className="gallery__caption">
                {title}
                {cap.note && <span>{cap.note}</span>}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function Skills() {
  const tones = ['forest', 'sage', 'leaf']
  return (
    <section className="section wrap" aria-labelledby="skills">
      <SectionHeading id="skills" variant={2}>
        {skills.heading}
      </SectionHeading>
      <div className="skillsheet reveal" style={{ '--r': '-0.3deg' }}>
        <div className="skillsheet__paper" style={{ clipPath: tornClip(51, { depth: 8, steps: 40 }) }} aria-hidden="true" />
        <Tape className="tape--a" />
        <Tape className="tape--b" />
        <dl>
          {skills.groups.map((g, i) => (
            <div key={g.label} className="skillrow">
              <dt>{g.label}</dt>
              <dd>
                <ul className={`chips chips--${tones[i % tones.length]}`}>
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section contact" aria-labelledby="contact">
      <div className="wrap contact__layout">
        <div className="contact__inner">
          <h2 className="h2 reveal" id="contact">
            <span className="h2__text">{contactSection.heading}</span>
            <Brush className="h2__stroke" variant={1} />
          </h2>
          <p className="contact__text reveal">{contactSection.text}</p>
          <p className="contact__email reveal">
            <a className="ink" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
          <ul className="contact__links reveal">
            <li>
              <span>LinkedIn</span>
              <InkLink url={contact.linkedin}>{contact.linkedinLabel}</InkLink>
            </li>
            <li>
              <span>GitHub</span>
              <InkLink url={contact.github}>{contact.githubLabel}</InkLink>
            </li>
          </ul>
          <div className="contact__cta reveal">
            <Button href={contact.resume}>Resume (PDF)</Button>
          </div>
        </div>
        <div className="forest-friends" aria-hidden="true">
          <Pic src="art/forest-friends.png" alt="" sizes="(min-width: 900px) 320px, 200px" />
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <p>{site.footerNote}</p>
      <p>
        <a className="ink" href="#top">
          Back to top
        </a>
      </p>
    </footer>
  )
}
