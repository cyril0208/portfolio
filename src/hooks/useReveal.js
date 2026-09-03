import { useEffect } from 'react'

// Reveals every [data-reveal] element once as it scrolls into view.
//
// The hidden state is opt-in per element: this hook adds `reveal-armed` to the
// elements it actually observes, and only armed elements are hidden by CSS. So
// anything the hook never reached — a node mounted later, an HMR replacement,
// or any element at all when JS fails — renders visible rather than blank.
// Elements already on screen are revealed outright, since an observer that
// never delivers would otherwise leave them at opacity 0.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!els.length || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )

    els.forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed')
      } else {
        el.classList.add('reveal-armed')
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
      els.forEach(el => el.classList.remove('reveal-armed'))
    }
  }, [])
}
