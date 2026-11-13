import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { hasHandFont } from './lib/images.js'
import './styles.css'

// Optional: assets/fonts/handwriting.woff2 replaces Caveat for handwritten notes.
if (hasHandFont) {
  const style = document.createElement('style')
  style.textContent =
    "@font-face{font-family:'My Handwriting';src:url('/assets/fonts/handwriting.woff2') format('woff2');font-display:swap}"
  document.head.appendChild(style)
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
