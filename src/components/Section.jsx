// The label / title / desc scaffold shared by content sections, with the
// reveal-stagger owned here instead of hand-threaded at every call site.
export default function SectionHeader({ label, title, desc }) {
  return (
    <>
      <p className="section-label" data-reveal="">{label}</p>
      <h2 className="section-title" data-reveal="" style={{ '--reveal-delay': '0.08s' }}>{title}</h2>
      {desc && (
        <p className="section-desc" data-reveal="" style={{ '--reveal-delay': '0.14s' }}>{desc}</p>
      )}
    </>
  )
}
