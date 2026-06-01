import { useState } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Elite Connect',
    summary: 'Career platform connecting Elite College students with verified employers before graduation — video resumes, curated job board, and one-click applications.',
    tags: ['Next.js 14', 'TypeScript', 'MySQL', 'AWS S3', 'NextAuth'],
    status: 'shipped',
    details: 'Job connection platform for Elite College. Students build profiles with 60-second video resumes, apply to curated listings from verified employer partners, and receive direct outreach from companies. Employers access a vetted talent pool with built-in referral network, OTP/2FA authentication, and application tracking.\n\nBuilt with Next.js 14 App Router, TypeScript, MySQL, and NextAuth for auth. AWS S3 for media storage, Resend for transactional email, Zod for validation, Jest for testing. Deployed with full CI/CD pipeline.',
    tech: ['Next.js 14', 'TypeScript', 'React 18', 'Tailwind CSS', 'MySQL', 'NextAuth', 'Cloudflare R2', 'Resend', 'Zod', 'Jest', 'bcryptjs', 'otplib'],
    github: null,
    live: 'https://eliteconnect.ca/',
  },
]

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
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

        <p className="modal-details">{project.details}</p>

        <div className="modal-tech">
          <h4>Tech Stack</h4>
          <div className="tech-tags">
            {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
        </div>

        <div className="modal-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="modal-link modal-link--live">
              <ExternalIcon /> Visit Site
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="modal-link modal-link--github">
              <GithubIcon /> Source
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
        <p className="section-label" data-reveal="">Projects</p>
        <h2 className="section-title" data-reveal="" style={{'--reveal-delay': '0.08s'}}>Things I've shipped</h2>
        <p className="section-desc" data-reveal="" style={{'--reveal-delay': '0.14s'}}>Production projects. More coming as I build and complete them.</p>

        <div className="projects-grid projects-grid--single">
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
                      <ExternalIcon />
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
