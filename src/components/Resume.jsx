import { useState, useEffect } from 'react'
import './Resume.css'
import { timeline } from '../content/resume'
import { Download } from './icons'

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }

function parseMonth(str) {
  const s = str.trim()
  if (/present/i.test(s)) return new Date()
  const [mon, yr] = s.split(/\s+/)
  return new Date(Number(yr), MONTHS[mon], 1)
}

// Day you became an engineer (first job start). Period strings carry only month
// granularity, so the exact day lives here. Edit this to move the clock's anchor.
const ENGINEER_START = new Date(2023, 6, 2) // Jul 2, 2023

function monthsBetween(a, b) {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

// Per-role length, LinkedIn-style: months inclusive of both endpoints. "Present" runs to now.
function roleDuration(period) {
  const [a, b] = period.split('–')
  const end = /present/i.test(b) ? new Date() : parseMonth(b)
  const months = monthsBetween(parseMonth(a), end) + 1
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`)
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`)
  return parts.join(' ') || '0 mos'
}

// Calendar diff between two dates, broken into y / mo / d / h / m / s.
function diffParts(from, to) {
  let y = to.getFullYear() - from.getFullYear()
  let mo = to.getMonth() - from.getMonth()
  let d = to.getDate() - from.getDate()
  let h = to.getHours() - from.getHours()
  let mi = to.getMinutes() - from.getMinutes()
  let s = to.getSeconds() - from.getSeconds()
  if (s < 0) { s += 60; mi-- }
  if (mi < 0) { mi += 60; h-- }
  if (h < 0) { h += 24; d-- }
  if (d < 0) { d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); mo-- }
  if (mo < 0) { mo += 12; y-- }
  return { y, mo, d, h, mi, s }
}

const pad = n => String(n).padStart(2, '0')

export default function Resume() {
  const [now, setNow] = useState(() => new Date())
  // Fixed anchor: today minus total worked time. Counting up from it = live worked time.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const t = diffParts(ENGINEER_START, now)

  return (
    <section id="resume" className="resume section--alt">
      <div className="container">
        <div className="resume-header" data-reveal="">
          <div>
            <p className="section-label">Experience</p>
            <h2 className="section-title">Where I've worked.</h2>
            <div className="engineer-clock" aria-label="Time as an engineer">
              <span className="engineer-clock-label">Time As An Engineer</span>
              <span className="engineer-clock-value">
                {t.y}<span className="engineer-clock-unit">y</span>{' '}
                {t.mo}<span className="engineer-clock-unit">mo</span>{' '}
                {t.d}<span className="engineer-clock-unit">d</span>{' '}
                <span className="engineer-clock-time">{pad(t.h)}:{pad(t.mi)}:{pad(t.s)}</span>
              </span>
            </div>
          </div>
          <a href="https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/resume_ai_engineer.pdf" target="_blank" rel="noreferrer" className="btn-outline">
            <Download size={14} />
            Download PDF
          </a>
        </div>

        <div className="timeline">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`timeline-item timeline-item--${item.type}`}
              data-reveal=""
              style={{ '--reveal-delay': `${0.08 + i * 0.1}s` }}
            >
              <span className="timeline-dot" />
              <span className="timeline-period">
                {item.period}{item.type === 'work' ? ` · ${roleDuration(item.period)}` : ''}
              </span>
              <h3 className="timeline-role">{item.role} — {item.org}</h3>
              <p className="timeline-org">{item.location}</p>
              <ul className="timeline-bullets">
                {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              {item.tech && (
                <div className="timeline-tech">
                  {item.tech.map(t => <span key={t} className="timeline-tag">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
