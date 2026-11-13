import { useEffect } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Adds the "in" class to .reveal elements as they scroll into view.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('in')
          io.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Gentle parallax: anything with data-depth drifts as the page scrolls.
export function useParallax() {
  useEffect(() => {
    if (reduced()) return
    const els = [...document.querySelectorAll('[data-depth]')]
    let frame = 0
    const update = () => {
      frame = 0
      const mid = window.innerHeight / 2
      for (const el of els) {
        const r = el.parentElement.getBoundingClientRect()
        if (r.bottom < -200 || r.top > window.innerHeight + 200) continue
        const offset = (r.top + r.height / 2 - mid) * Number(el.dataset.depth)
        el.style.setProperty('--py', `${offset.toFixed(1)}px`)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
}
