import { useState } from 'react'
import './Projects.css'

const projects = [
  {
    id: 3,
    title: 'EV RAG Agent',
    summary: 'Bilingual RAG agent that answers Geely Geometry C ownership questions from the official manual with page-level citations — 100% accuracy on 47 held-out questions, 1.6s median latency.',
    tags: ['LangGraph', 'Gemini 2.5 Flash', 'ChromaDB', 'FastAPI', 'Python'],
    status: 'shipped',
    details: [
      'Answers urgent EV ownership questions — warning lights, charging, maintenance — from a 300-page manual, in English and Simplified Chinese.',
      'Cites the printed page number on every answer, and refuses out-of-scope questions instead of guessing.',
      'Hybrid retrieval: Gemini dense embeddings + BM25, since terse specs like "240 kPa" carry too little semantic signal for embeddings alone.',
      'LangGraph ReAct loop with a single search_manual tool — multi-hop reasoning across pages, not single-shot retrieval.',
      'Second-pass grounding verifier catches over-generalization; fail-open, so it never blocks a legitimate answer.',
      '47-question eval: 100% accuracy in-scope, 100% honest refusal out-of-scope, 97.5% citation recall, 1.6s median latency.',
      'Debugged a 90% plateau to retrieval depth drift (k=8 vs k=12) — fixing it took the Chinese subset from 87.5% to 100% and cleared an AEB safety failure.',
    ],
    tech: ['Python', 'LangGraph', 'Gemini 2.5 Flash', 'gemini-embedding-001', 'ChromaDB', 'BM25', 'FastAPI', 'Server-Sent Events', 'pdfplumber', 'Docker'],
    github: 'https://github.com/cyril0208/ev-rag-agent',
    live: 'https://ev-rag-agent-demo.onrender.com',
    college: null,
    screenshot: 'https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/assets/demo.png',
  },
  {
    id: 1,
    title: 'Elite Connect',
    summary: 'Career platform connecting Elite College students with verified employers before graduation — video resumes, curated job board, and one-click applications.',
    tags: ['Next.js 14', 'TypeScript', 'MySQL', 'AWS S3', 'NextAuth'],
    status: 'shipped',
    details: [
      'Job connection platform for Elite College — students reach verified employers before they graduate.',
      'Students build profiles with 60-second video resumes, apply to curated listings, and get direct outreach from companies.',
      'Employers get a vetted talent pool with a built-in referral network and application tracking.',
      'OTP/2FA authentication, Zod validation, Jest coverage, and a full CI/CD pipeline.',
      'Next.js 14 App Router + TypeScript + MySQL, with NextAuth for auth and Cloudflare R2 for video storage.',
    ],
    tech: ['Next.js 14', 'TypeScript', 'React 18', 'Tailwind CSS', 'MySQL', 'NextAuth', 'Cloudflare R2', 'Resend', 'Zod', 'Jest', 'bcryptjs', 'otplib'],
    github: null,
    live: 'https://eliteconnect.ca/',
    college: 'https://elitecollege.school/',
    screenshot: 'https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/assets/eliteconnect-preview.png',
  },
  {
    id: 2,
    title: 'Invoice Management System',
    summary: 'Multi-company invoicing and agreements platform — generate branded invoices, draft and sign agreements, track payments and HST/GST, and report on billing from a single dashboard.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma'],
    status: 'shipped',
    details: [
      'Runs billing for multiple companies under one roof — each keeps its own branding, HST/GST number, and PDF letterhead.',
      'Invoices auto-number as COMPANY-YYYY-NNNN, render on the company letterhead, and email via Resend with every send logged.',
      'Records partial or full payments (E-Transfer, card, cheque, bank, cash); Draft → Sent → Paid → Overdue statuses update automatically.',
      'Service agreements drafted and signed in-app with a rich-text editor and stored signatures.',
      'Dashboard reports billed, collected, outstanding, overdue, and HST/GST — filterable and exportable to Excel or CSV.',
      'Role-based access scopes Staff to assigned companies; Admin sees everything.',
      'Next.js 15 + React 19 + TypeScript on PostgreSQL/Prisma, PDFs via pdf-lib on Cloudflare R2, Vitest coverage.',
    ],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind CSS', 'Radix UI', 'pdf-lib', 'ExcelJS', 'Cloudflare R2', 'Resend', 'Vitest'],
    github: null,
    live: null,
    college: null,
    screenshot: 'https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/assets/invoice-system-preview.png',
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

function CollegeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 10 12 5 2 10l10 5 10-5z"/>
      <path d="M6 12v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5"/>
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
              <ExternalIcon /> Visit Site
            </a>
          )}
          {project.college && (
            <a href={project.college} target="_blank" rel="noreferrer" className="modal-link modal-link--college">
              <CollegeIcon /> College Site
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
