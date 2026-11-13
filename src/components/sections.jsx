import { about, contact, contactSection, experience, eyesBanner, gallery, nowBuilding, site, skills, stickers } from '../data/content.js'
import { galleryKeys, getImage } from '../lib/images.js'
import { tornClip } from '../lib/paper.js'
import { Brush, Button, InkLink, Photo, Pic, SectionHeading, Sticker, Tape, TornEdge } from './bits.jsx'

export function About() {
  return (
    <section className="section wrap about" aria-labelledby="about">
      <div className="about__media reveal" style={{ '--r': '-2.2deg' }}>
        <Photo src={about.image.src} alt={about.image.alt} caption={about.imageCaption} rotate={0} sizes="(min-width: 900px) 400px, 80vw" />
        <Sticker src="strawberry" className="about__berry" depth={0.07} sizes="90px" />
      </div>
      <div className="about__text">
        <SectionHeading id="about">{about.heading}</SectionHeading>
        {about.paragraphs.map((t) => (
          <p key={t} className="reveal">
            {t}
          </p>
        ))}
        <p className="about__signoff reveal">{about.signoff}</p>

        {nowBuilding.show && (
          <aside className="now reveal" style={{ '--r': '1.4deg' }} aria-label={nowBuilding.label}>
            <Tape className="tape--a" />
            <div className="now__art">
              <Sticker src="cassette" depth={0} sizes="150px" />
            </div>
            <p>
              <span className="now__label">{nowBuilding.label}</span>
              <span className="now__text">{nowBuilding.text}</span>
            </p>
          </aside>
        )}
      </div>
    </section>
  )
}

export function EyesBanner() {
  return (
    <div className="eyes">
      <div className="eyes__inner reveal" style={{ '--r': '-0.8deg' }}>
        <Tape className="tape--a" />
        <Tape className="tape--b" />
        <Pic src="eyes-banner" alt={stickers['eyes-banner']} sizes="(min-width: 1100px) 1040px, 96vw" />
        {eyesBanner.note && <p className="eyes__note">{eyesBanner.note}</p>}
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <section className="section wrap" aria-labelledby="experience">
      <SectionHeading id="experience" variant={1} tone="ochre">
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
              <ul className="berries">
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

const prettyName = (key) =>
  key
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')

// Reads only from /assets/gallery/. Empty folder shows the placeholder.
export function Gallery() {
  return (
    <section className="section wrap" aria-labelledby="gallery">
      <SectionHeading id="gallery" variant={0} tone="olive">
        {gallery.heading}
      </SectionHeading>
      {galleryKeys.length === 0 ? (
        <div className="studio reveal" style={{ '--r': '-1deg' }}>
          <Tape className="tape--a" />
          <Tape className="tape--b" />
          <div className="studio__sheet" style={{ clipPath: tornClip(31, { depth: 9 }) }}>
            <div className="studio__swatches" aria-hidden="true">
              <Brush variant={0} />
              <Brush variant={1} />
              <Brush variant={2} />
              <Brush variant={0} />
            </div>
            <p className="studio__title">{gallery.emptyTitle}</p>
            <p className="studio__text">{gallery.emptyText}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="section__intro reveal">{gallery.intro}</p>
          <ul className="gallery">
            {galleryKeys.map((key, i) => {
              const file = key.split('/').pop()
              const cap = gallery.captions[file] || {}
              const title = cap.title || prettyName(key)
              return (
                <li key={key} className="reveal">
                  <a href={getImage(key).src} target="_blank" rel="noopener noreferrer" aria-label={`${title}, open full size in a new tab`}>
                    <Photo
                      src={key}
                      alt={cap.alt || `Painting: ${title}`}
                      caption={cap.note ? `${title}. ${cap.note}` : title}
                      rotate={[-1.5, 1, -0.6, 1.8][i % 4]}
                      sizes="(min-width: 900px) 360px, 90vw"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}

export function Skills() {
  return (
    <section className="section wrap" aria-labelledby="skills">
      <SectionHeading id="skills" variant={2}>
        {skills.heading}
      </SectionHeading>
      <div className="skills">
        {skills.groups.map((g, i) => (
          <div key={g.label} className="skillset reveal" style={{ '--r': `${[-0.8, 0.6, -0.4, 0.9, -0.6][i % 5]}deg` }}>
            <div className="skillset__paper" style={{ clipPath: tornClip(i + 51, { depth: 5 }) }} aria-hidden="true" />
            <Tape className="tape--a" />
            <h3>{g.label}</h3>
            <ul className={`chips chips--${['cobalt', 'sienna', 'olive', 'cobalt', 'sienna'][i % 5]}`}>
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="band band--cobalt section contact" aria-labelledby="contact">
      <TornEdge seed={61} />
      <div className="wrap contact__inner">
        <div className="contact__art">
          <Sticker src="coffee" depth={0.025} sizes="(min-width: 900px) 380px, 240px" />
        </div>
        <div>
          <h2 className="h2 h2--cream reveal" id="contact">
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
