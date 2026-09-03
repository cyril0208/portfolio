import './Footer.css'

const links = [
  { label: 'Email', href: 'mailto:cyrilyiming@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/cyril0208' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cyril-zhang-3a0bba250/' },
  {
    label: 'Resume',
    href: 'https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/resume_ai_engineer.pdf',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-contact" data-reveal="">
          <h2 className="footer-title">Let's build something.</h2>
          <p className="footer-sub">
            Open to interesting problems in LLM systems, AI infrastructure, and applied ML. Reach out.
          </p>
          <div className="footer-links">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="footer-link"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bar">
          <span>© {year} Cyril Zhang</span>
          <span>Built with care</span>
        </div>
      </div>
    </footer>
  )
}
