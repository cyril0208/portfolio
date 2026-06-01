import { useState } from 'react'
import './Skills.css'

function IconBrain() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/>
    </svg>
  )
}

function IconCloud() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  )
}

function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}

function IconML() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

const groups = [
  {
    category: 'LLMs & Agents',
    Icon: IconBrain,
    skills: ['OpenAI API', 'LangChain', 'LangGraph', 'crewAI', 'RAG Pipelines', 'Prompt Engineering', 'LLMOps', 'Hugging Face', 'Tool-calling'],
  },
  {
    category: 'Cloud & DevOps',
    Icon: IconCloud,
    skills: ['AWS (SES, S3)', 'Cloudflare R2', 'Docker', 'CI/CD Pipelines', 'Build Automation', 'Multi-platform Deploy', 'SSH / Linux'],
  },
  {
    category: 'Languages',
    Icon: IconCode,
    skills: ['Python', 'Golang', 'Bash', 'PowerShell', 'JavaScript', 'Java', 'Dart'],
  },
  {
    category: 'Machine Learning',
    Icon: IconML,
    skills: [
      'Supervised Learning',
      'Linear & Logistic Regression',
      'Neural Networks',
      'Decision Trees',
      'Unsupervised Learning',
      'Clustering & Anomaly Detection',
      'Recommender Systems',
      'Reinforcement Learning',
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState(0)
  const current = groups[active]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="section-label" data-reveal="">Skills</p>
        <h2 className="section-title" data-reveal="" style={{'--reveal-delay': '0.08s'}}>What I work with</h2>

        {/* Tab bar */}
        <div className="skills-tabs" data-reveal="" style={{'--reveal-delay': '0.16s'}}>
          {groups.map(({ category, Icon }, i) => (
            <button
              key={category}
              className={`skills-tab${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <Icon />
              {category}
            </button>
          ))}
        </div>

        {/* Skill cards grid */}
        <div className="skills-panel" data-reveal="" style={{'--reveal-delay': '0.24s'}}>
          <div className="skills-card-grid">
            {current.skills.map(skill => (
              <div key={skill} className="skill-item">
                <span className="skill-item-name">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
