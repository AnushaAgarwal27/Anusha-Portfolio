import { hero } from '../data/content.js'
import { Brush, Button, PaintPatch, Pic, TornEdge } from './bits.jsx'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__text">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__name">
            {hero.name.map((word) => (
              <span key={word}>{word} </span>
            ))}
            <Brush className="hero__stroke" variant={1} />
          </h1>
          <p className="hero__tagline">{hero.tagline}</p>
          <div className="hero__cta">
            <Button href={hero.primaryButton.href}>{hero.primaryButton.label}</Button>
            <Button href={hero.secondaryButton.href} ghost>
              {hero.secondaryButton.label}
            </Button>
          </div>
        </div>

        <div className="hero__art">
          <PaintPatch className="hero__patch" data-depth="0.05" />
          <Pic className="hero__portrait" src={hero.image.src} alt={hero.image.alt} sizes="(min-width: 900px) 720px, 96vw" eager />
        </div>
      </div>

      <div className="hero__facts">
        <TornEdge seed={5} />
        <ul>
          {hero.facts.map((f) => (
            <li key={f.label}>
              <span className="hero__fact-label">{f.label}</span>
              <span className="hero__fact-text">{f.text}</span>
            </li>
          ))}
        </ul>
        <TornEdge seed={9} bottom />
      </div>
    </header>
  )
}
