import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import GhostCursorOverlay from './components/GhostCursorOverlay'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <GhostCursorOverlay />
      <Navbar />
      <SideNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
