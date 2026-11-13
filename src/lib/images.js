// Looks up the compressed versions of an image from /assets.
// The manifest is written by scripts/prepare-images.mjs.
import manifest from '../data/images.generated.json'

export function getImage(key) {
  const hit = manifest[key]
  if (!hit && import.meta.env.DEV) {
    console.warn(`[images] "${key}" not found. Check the path in content.js, then run "npm run images".`)
  }
  return hit || null
}

// Same lookup, but silent: for optional files that may not exist.
export const findImage = (key) => (key && manifest[key]) || null

export const galleryKeys = manifest.__gallery || []
export const eventPhotos = manifest.__events || {}
export const artKeys = manifest.__art || []
export const hasHandFont = Boolean(manifest.__handFont)

const baseName = (key) => key.split('/').pop().replace(/\.[^.]+$/, '')

// Finds art by explicit path ('art/foo.png') or by file name ('about').
export function findArt(explicit, name) {
  if (explicit) return findImage(explicit) ? explicit : null
  return artKeys.find((k) => baseName(k).toLowerCase() === String(name).toLowerCase()) || null
}

export const prettyName = (key) => baseName(key).replace(/[-_]+/g, ' ')
