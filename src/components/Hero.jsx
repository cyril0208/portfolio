import { useState, useEffect } from 'react'
import './Hero.css'
import ParticleField from './ParticleField'
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
      <ParticleField className="hero-canvas" />

      <div className="hero-inner">
        <p className="hero-eyebrow hero-animate" style={{ '--delay': '0.1s' }}>
          {typed}<span className="typewriter-cursor">_</span>
        </p>

        <h1 className="hero-name hero-animate" style={{ '--delay': '0.2s' }}>
          Cyril Zhang
        </h1>

        <p className="hero-tagline hero-animate" style={{ '--delay': '0.32s' }}>
          Designing and deploying production-grade LLM applications, RAG pipelines,
          and end-to-end AI workflows.
        </p>

        <div className="hero-actions hero-animate" style={{ '--delay': '0.44s' }}>
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            View my work
          </button>
          <button className="btn-outline" onClick={() => scrollTo('contact')}>
            Get in touch
          </button>
        </div>

        <div className="hero-socials hero-animate" style={{ '--delay': '0.56s' }}>
          <a href="mailto:cyrilyiming@gmail.com" className="hero-social-link" aria-label="Email">
            <Email size={19} />
          </a>
          <a href="https://github.com/cyril0208" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
            <Github size={19} />
          </a>
          <a href="https://www.linkedin.com/in/cyril-zhang-3a0bba250/" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
            <LinkedIn size={19} />
          </a>
        </div>
      </div>

      <button className="hero-scroll-cue" onClick={() => scrollTo('about')} aria-label="Scroll to about">
        <span className="hero-scroll-label">Scroll</span>
        <span className="hero-scroll-track"><span className="hero-scroll-dot" /></span>
      </button>
    </section>
  )
}
