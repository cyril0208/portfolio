import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['about', 'skills', 'projects', 'resume']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
      const sections = links.map(id => document.getElementById(id))
      const current = sections.find(s => {
        if (!s) return false
        const rect = s.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom > 100
      })
      setActive(current?.id || '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="nav-inner container">
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Cyril <span className="nav-logo-last">Zhang</span>
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {links.map(id => (
            <li key={id}>
              <button
                className={`nav-link${active === id ? ' active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <a href="https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/resume_ai_engineer.pdf" download className="nav-resume">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </a>
          </li>
        </ul>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
