import { useState, useEffect } from 'react'

// Single source of truth for "which section is in view". Both navs consume it,
// so they can no longer drift. `rootMargin` tunes the active band; `initial` is
// the value before the first intersection (e.g. 'hero' at the top of the page).
export function useActiveSection(ids, { rootMargin = '-40% 0px -55% 0px', initial = null } = {}) {
  const [active, setActive] = useState(initial)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id)
      }),
      { rootMargin }
    )

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return active
}
