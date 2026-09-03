import './SideNav.css'
import { useActiveSection } from '../hooks/useActiveSection'

const sections = [
  { id: 'hero',     label: 'Intro' },
  { id: 'about',    label: 'About Me' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume',   label: 'Experience' },
  { id: 'contact',  label: 'Contact' },
]

const ids = sections.map(s => s.id)

export default function SideNav() {
  const active = useActiveSection(ids, { initial: 'hero' })

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (id === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="side-nav">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`side-nav-item${active === id ? ' active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={label}
        >
          <span className="side-nav-label">{label}</span>
          <span className="side-nav-dot" />
        </button>
      ))}
    </nav>
  )
}
