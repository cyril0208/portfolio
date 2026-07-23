import { useState } from 'react'
import './Skills.css'
import { groups } from '../content/skills'
import SectionHeader from './Section'

export default function Skills() {
  const [active, setActive] = useState(0)
  const current = groups[active]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionHeader label="Skills" title="What I work with" />

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
