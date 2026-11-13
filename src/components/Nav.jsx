import { useState } from 'react'
import { nav, site, contact } from '../data/content.js'
import { galleryKeys } from '../lib/images.js'

// The Gallery link only exists while there are paintings in /assets/gallery/.
const links = nav.filter((l) => l.href !== '#gallery' || galleryKeys.length > 0)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <div className="nav-wrap">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <nav className="nav" aria-label="Main">
        <a className="nav__brand" href="#top" onClick={close}>
          <span className="nav__dab" aria-hidden="true" />
          <span>{site.name}</span>
        </a>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <ul id="nav-links" className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={close}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a className="nav__resume" href={contact.resume} target="_blank" rel="noopener noreferrer" onClick={close}>
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
