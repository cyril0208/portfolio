import './Footer.css'
import { Github, LinkedIn, Email } from './icons'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">Cyril <span>Zhang</span></p>
        <div className="footer-links">
          <a href="https://github.com/cyril0208" target="_blank" rel="noreferrer" className="footer-link" aria-label="GitHub">
            <Github size={18} />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/cyril-zhang-3a0bba250/" target="_blank" rel="noreferrer" className="footer-link" aria-label="LinkedIn">
            <LinkedIn size={18} />
            LinkedIn
          </a>
          <a href="mailto:cyrilyiming@gmail.com" className="footer-link" aria-label="Email">
            <Email size={18} />
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
