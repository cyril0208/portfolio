import { useState, useEffect } from 'react'
import './SideNav.css'

const sections = [
  { id: 'hero',     label: 'Intro' },
  { id: 'about',    label: 'About Me' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume',   label: 'Experience' },
]

export default function SideNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (id === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="side-nav">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`side-nav-item${active === id ? ' active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={label}
        >
          <span className="side-nav-label">{label}</span>
          <span className="side-nav-dot" />
        </button>
      ))}
    </nav>
  )
}
