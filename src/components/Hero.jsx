import { hero } from '../data/content.js'
import { Brush, Button, PaintPatch, Pic, Sticker, TornEdge } from './bits.jsx'

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
          <PaintPatch className="hero__patch" />
          <Pic className="hero__portrait" src={hero.image.src} alt={hero.image.alt} sizes="(min-width: 900px) 560px, 92vw" eager />
          <p className="hero__note" aria-hidden="true">
            hi, that’s me
            <svg viewBox="0 0 60 40" focusable="false">
              <path d="M4 6 C 22 4, 40 12, 50 30 M50 30 L38 26 M50 30 L52 17" />
            </svg>
          </p>
          <Sticker src="strawberry" className="hero__sticker hero__sticker--berry" depth={0.08} sizes="120px" eager />
          <Sticker src="laptop" className="hero__sticker hero__sticker--laptop" depth={-0.06} sizes="170px" eager />
          <Sticker src="coffee" className="hero__sticker hero__sticker--coffee" depth={0.05} sizes="170px" eager />
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
