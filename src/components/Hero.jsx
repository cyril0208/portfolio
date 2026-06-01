import { useState, useEffect } from 'react'
import './Hero.css'

const ROLES = [
  'AI Engineer',
  'LLM Systems Builder',
  'RAG Pipeline Architect',
  'LLMOps Engineer',
]

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const [typed, setTyped] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout

    if (!erasing) {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 70)
      } else {
        timeout = setTimeout(() => setErasing(true), 1800)
      }
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40)
      } else {
        setErasing(false)
        setRoleIdx((roleIdx + 1) % ROLES.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [typed, erasing, roleIdx])

  return (
    <section id="hero" className="hero">
      <div className="hero-glow-1" aria-hidden />
      <div className="hero-glow-2" aria-hidden />

      <div className="container hero-inner">
        <div className="hero-text">
          <h1 className="hero-name hero-animate" style={{'--delay': '0.1s'}}>
            Hi, I'm<br /><span className="highlight">Cyril Zhang</span>
          </h1>
          <p className="hero-title hero-animate" style={{'--delay': '0.25s'}}>
            {typed}<span className="typewriter-cursor typewriter-cursor--blink">|</span>
          </p>

          <p className="hero-tagline hero-animate" style={{'--delay': '0.4s'}}>
            Results-driven AI Engineer specializing in designing and deploying production-grade
            LLM applications, RAG pipelines, and end-to-end AI workflows. Proven track record of
            integrating large language models into scalable enterprise systems and building
            LLMOps infrastructure that drives measurable outcomes.
          </p>

          <div className="hero-actions hero-animate" style={{'--delay': '0.7s'}}>
            <button className="btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
            </button>
            <a href="mailto:cyrilyiming@gmail.com" className="btn-outline">
              Get in Touch
            </a>
          </div>

          <div className="hero-socials hero-animate" style={{'--delay': '0.85s'}}>
            <span className="hero-socials-label">Find me on</span>
            <a href="mailto:cyrilyiming@gmail.com" className="hero-social-link" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
            <a href="https://github.com/cyril0208" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/cyril-zhang-3a0bba250/" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="hero-scroll-hint" onClick={() => scrollTo('about')}>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 3v14M2 11l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Scroll</span>
      </div>
    </section>
  )
}
