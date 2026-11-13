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

export const galleryKeys = manifest.__gallery || []
