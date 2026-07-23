import { useState, useEffect } from 'react'
import './Navbar.css'
import { useActiveSection } from '../hooks/useActiveSection'
import { Download } from './icons'

const links = ['about', 'skills', 'projects', 'resume']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const active = useActiveSection(links, { initial: '' })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
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
            <a href="https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/resume_ai_engineer.pdf" target="_blank" rel="noreferrer" className="nav-resume">
              <Download size={13} />
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
