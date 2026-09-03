import { useEffect, useRef, useState } from 'react'
import './CursorDot.css'

// Small blend-mode dot that eases toward the real cursor. Skipped on coarse
// pointers (no hover) and when the visitor prefers reduced motion.
const EASE = 0.18
const SIZE = 12

export default function CursorDot() {
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(!coarse && !reduce)
  }, [])

  useEffect(() => {
    const el = dotRef.current
    if (!enabled || !el) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { x: target.x, y: target.y }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf = null
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (document.hidden) return
      pos.x += (target.x - pos.x) * EASE
      pos.y += (target.y - pos.y) * EASE
      el.style.transform = `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0)`
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={dotRef} className="cursor-dot" aria-hidden />
}
