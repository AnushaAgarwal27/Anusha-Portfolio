// Small deterministic helpers for hand-made looking shapes.

function rng(seed) {
  let a = seed * 2654435761
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// CSS clip-path polygon with a torn bottom edge (and slightly uneven top).
export function tornClip(seed = 1, { depth = 7, steps = 26, top = 1.5 } = {}) {
  const r = rng(seed)
  const pts = []
  for (let i = 0; i <= 8; i++) pts.push(`${(i / 8) * 100}% ${(r() * top).toFixed(2)}px`)
  for (let i = steps; i >= 0; i--) {
    const x = Math.min(100, Math.max(0, (i / steps) * 100 + (r() - 0.5) * 2))
    pts.push(`${x.toFixed(2)}% calc(100% - ${(r() * depth).toFixed(2)}px)`)
  }
  return `polygon(${pts.join(',')})`
}

// SVG path for a full-width torn strip. viewBox is 0 0 1200 40.
export function tornPath(seed = 1, { amp = 16, steps = 70, base = 14 } = {}) {
  const r = rng(seed)
  let d = `M0 40 L0 ${base}`
  let y = base
  for (let i = 1; i <= steps; i++) {
    y = Math.max(2, Math.min(30, y + (r() - 0.5) * amp))
    d += ` L${((i / steps) * 1200).toFixed(1)} ${y.toFixed(1)}`
  }
  return d + ' L1200 40 Z'
}
