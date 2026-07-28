import { useEffect, useState } from 'react'
import GhostCursor from './GhostCursor'

// Whole-page cursor trail. Skipped on touch devices (no hover) and when the
// visitor prefers reduced motion.
export default function GhostCursorOverlay() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(!touch && !reduce)
  }, [])

  if (!enabled) return null

  return (
    <div className="ghost-overlay" aria-hidden>
      <GhostCursor global color="#60a5fa" size={0.4} brightness={0.85} />
    </div>
  )
}
