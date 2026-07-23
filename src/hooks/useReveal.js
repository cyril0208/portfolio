import { useEffect } from 'react'

// Reveals every [data-reveal] element once as it scrolls into view.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
