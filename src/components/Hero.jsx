import { useState, useEffect } from 'react'
import './Hero.css'
import { Github, LinkedIn, Email } from './icons'

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
              <Email size={20} />
            </a>
            <a href="https://github.com/cyril0208" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/cyril-zhang-3a0bba250/" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <LinkedIn size={20} />
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
