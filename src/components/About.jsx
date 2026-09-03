import { useRef } from 'react'
import './About.css'
import { certs } from '../content/about'
import WireShape from './WireShape'

export default function About() {
  const photoRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = photoRef.current
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transition = 'transform 0.08s ease'
    el.style.transform = `perspective(700px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.03)`
  }

  const handleMouseLeave = () => {
    const el = photoRef.current
    el.style.transition = 'transform 0.5s ease'
    el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  return (
    <section id="about" className="about section--alt">
      <WireShape className="about-shape" />

      <div className="container about-inner">
        <div
          className="about-photo"
          ref={photoRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/photo.jpg"
            alt="Cyril Zhang"
            className="about-photo-img"
          />
        </div>

        <div className="about-content">
          <p className="section-label" data-reveal="">About</p>
          <h2 className="section-title" data-reveal="" style={{ '--reveal-delay': '0.08s' }}>
            Building at the edge of LLM systems and product.
          </h2>
          <p className="about-body" data-reveal="" style={{ '--reveal-delay': '0.16s' }}>
            I'm an AI Engineer with 3 years shipping <strong>production LLM systems at scale</strong>.
            At Web Industrial Solutions I architected AI infrastructure that scaled 100x and processed
            2M+ monthly transactions — applying engineering discipline to LLMs, cloud infra, and CI/CD pipelines.
          </p>
          <p className="about-body" data-reveal="" style={{ '--reveal-delay': '0.24s' }}>
            I specialize in designing and deploying <strong>production-grade LLM applications, RAG pipelines,
            and end-to-end AI workflows</strong> — integrating large language models into scalable enterprise
            systems and building LLMOps infrastructure that drives measurable outcomes.
          </p>
        </div>
      </div>

      {/* Certifications — full width below bio */}
      <div className="container certs-inline" data-reveal="">
        <p className="certs-inline-label">Certifications</p>
        <div className="certs-list">
          {certs.map(c => (
            <a key={c.name} href={c.pdf} target="_blank" rel="noreferrer" className="cert-card">
              <div className="cert-card-left">
                <div className="cert-dot" />
              </div>
              <div className="cert-card-body">
                <div className="cert-card-meta">
                  <span className="cert-card-issuer">{c.issuer}</span>
                  <span className="cert-card-year">{c.year}</span>
                </div>
                <h4 className="cert-card-name">{c.name}</h4>
                <div className="cert-card-skills">
                  {c.skills.map(s => <span key={s} className="cert-skill-tag">{s}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
