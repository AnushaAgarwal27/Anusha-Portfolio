import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import { About, Contact, Experience, EyesBanner, Footer, Gallery, Skills } from './components/sections.jsx'
import { SvgDefs } from './components/bits.jsx'
import { useParallax, useReveal } from './lib/motion.js'

export default function App() {
  useReveal()
  useParallax()
  return (
    <>
      <SvgDefs />
      <Nav />
      <Hero />
      <main id="main">
        <About />
        <EyesBanner />
        <Experience />
        <Projects />
        <Gallery />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
