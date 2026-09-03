import { useState } from 'react'
import './Projects.css'
import { projects } from '../content/projects'
import { Github, External } from './icons'

function CollegeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 10 12 5 2 10l10 5 10-5z"/>
      <path d="M6 12v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5"/>
    </svg>
  )
}

function Modal({ project, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-summary">{project.summary}</p>
        </div>

        {project.screenshot && (
          <img className="modal-screenshot" src={project.screenshot} alt={`${project.title} screenshot`} loading="lazy" />
        )}

        <ul className="modal-details">
          {project.details.map(d => <li key={d}>{d}</li>)}
        </ul>

        <div className="modal-tech">
          <h4>Tech Stack</h4>
          <div className="tech-tags">
            {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
        </div>

        <div className="modal-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="modal-link modal-link--live">
              <External size={13} /> Visit Site
            </a>
          )}
          {project.college && (
            <a href={project.college} target="_blank" rel="noreferrer" className="modal-link modal-link--college">
              <CollegeIcon /> College Site
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="modal-link modal-link--github">
              <Github size={16} /> Source
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects-header" data-reveal="">
          <p className="section-label">Selected work</p>
          <h2 className="section-title">Things I've shipped.</h2>
          <p className="section-desc">Production projects. More coming as I build and complete them.</p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={p.id} data-reveal="" style={{ '--reveal-delay': `${0.1 + i * 0.1}s` }}>
              <button className="project-card" onClick={() => setSelected(p)}>
                <div className="project-card-media">
                  {p.screenshot
                    ? <img src={p.screenshot} alt={`${p.title} screenshot`} loading="lazy" />
                    : <span className="project-card-placeholder">Project screenshot</span>}
                </div>
                <div className="project-card-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-summary">{p.summary}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
