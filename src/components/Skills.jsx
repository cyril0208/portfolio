import './Skills.css'
import { groups } from '../content/skills'

export default function Skills() {
  return (
    <section id="skills" className="skills section--tight">
      <div className="container">
        <p className="section-label" data-reveal="">Skills</p>

        <div className="skills-rows">
          {groups.map(({ category, skills }, i) => (
            <div
              key={category}
              className="skills-row"
              data-reveal=""
              style={{ '--reveal-delay': `${0.08 + i * 0.08}s` }}
            >
              <span className="skills-row-label">{category}</span>
              <div className="skills-row-chips">
                {skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
