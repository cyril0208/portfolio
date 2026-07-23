import { useState } from 'react'
import './Projects.css'
import { projects } from '../content/projects'
import { Github, External } from './icons'
import SectionHeader from './Section'

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
        <SectionHeader
          label="Projects"
          title="Things I've shipped"
          desc="Production projects. More coming as I build and complete them."
        />

        <div className="projects-grid">
          {projects.map((p, i) => (
            <button key={p.id} className="project-card" data-reveal="" style={{'--reveal-delay': `${0.2 + i * 0.1}s`}} onClick={() => setSelected(p)}>
              <div className="project-card-top">
                <div className="project-folder-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="project-card-actions">
                  <span className="status-pill status-pill--shipped">Shipped</span>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="project-github-link" aria-label="Visit site">
                      <External size={13} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-summary">{p.summary}</p>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
