import './Resume.css'

const timeline = [
  {
    type: 'work',
    role: 'Software Engineer — AI Infrastructure & DevOps',
    org: 'Web Industrial Solutions',
    location: 'Markham, ON',
    period: 'Jul 2023 – Jan 2026',
    bullets: [
      'Architected LLM inference pipelines using OpenAI API — scaled platform 100x with zero additional headcount',
      'Designed Golang + AWS SES system processing 2M+ transactions/month at enterprise reliability standards',
      'Built automated data-formatting pipelines (JSON/HTML/structured), reducing manual processing >80%',
      'Optimized cloud infra utilization, achieving ~75% cost reduction while maintaining strict SLA standards',
      'Created multi-platform CI/CD automation: 250+ app variants/release, cycle from 7 days to under 2 days',
    ],
  },
  {
    type: 'edu',
    role: 'Bachelor of Computing',
    org: "School of Computing, Queen's University",
    location: 'Kingston, ON',
    period: 'Sep 2020 – May 2025',
    bullets: [
      "Dean's List 2020–2021, 2021–2022",
      "Queen's Excel Scholarship 2020",
    ],
  },
]

export default function Resume() {
  return (
    <section id="resume" className="resume">
      <div className="container">
        <div className="resume-header" data-reveal="">
          <div>
            <p className="section-label">Resume</p>
            <h2 className="section-title">Experience & Education</h2>
          </div>
          <a href="https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/resume_ai_engineer.pdf" target="_blank" rel="noreferrer" className="btn-download">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
        </div>

        <div className="timeline">
          {timeline.map((item, i) => (
            <div key={i} className={`timeline-item timeline-item--${item.type}`} data-reveal="" style={{'--reveal-delay': `${0.1 + i * 0.15}s`}}>
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {i < timeline.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-type">{item.type === 'work' ? 'Work' : 'Education'}</span>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-org">{item.org} · {item.location}</p>
                <ul className="timeline-bullets">
                  {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
