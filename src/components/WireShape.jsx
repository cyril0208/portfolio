import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Decorative rotating wireframe icosahedron. No interactivity — it sits behind
// the About copy as an accent shape.
const ACCENT = 0x8fa3ff

export default function WireShape({ className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const size = () => ({ w: canvas.clientWidth, h: canvas.clientHeight })
    let { w, h } = size()
    if (!w || !h) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 50)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h, false)

    const geo = new THREE.IcosahedronGeometry(2.4, 1)
    const edges = new THREE.EdgesGeometry(geo)
    const mat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.5 })
    const shape = new THREE.LineSegments(edges, mat)
    shape.rotation.set(0.4, 0.2, 0)
    scene.add(shape)

    const onResize = () => {
      ({ w, h } = size())
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      renderer.render(scene, camera)
    }
    window.addEventListener('resize', onResize)

    let raf = null
    if (reduce) {
      renderer.render(scene, camera)
    } else {
      const animate = () => {
        raf = requestAnimationFrame(animate)
        if (document.hidden) return
        shape.rotation.x += 0.0022
        shape.rotation.y += 0.0032
        renderer.render(scene, camera)
      }
      animate()
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      edges.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
