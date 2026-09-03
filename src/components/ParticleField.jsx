import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Hero background: a slowly rotating point cloud with lines drawn between any
// two points closer than `thresh` — the "neural network" look. Tilts toward the
// cursor. Renders on a transparent canvas so the page background shows through.
const ACCENT = 0x8fa3ff

const INTENSITY = {
  subtle: { count: 45, speed: 0.0009, thresh: 3.6 },
  normal: { count: 70, speed: 0.0016, thresh: 4.4 },
  bold:   { count: 100, speed: 0.0026, thresh: 5.0 },
}

export default function ParticleField({ className, intensity = 'normal' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const level = INTENSITY[intensity] || INTENSITY.normal
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = parent.clientWidth
    let h = parent.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.z = 16

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h, false)

    const group = new THREE.Group()
    scene.add(group)

    const pts = Array.from({ length: level.count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 22,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10,
    ))

    const posArr = new Float32Array(level.count * 3)
    pts.forEach((p, i) => { posArr.set([p.x, p.y, p.z], i * 3) })
    const pointGeo = new THREE.BufferGeometry()
    pointGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
    const pointMat = new THREE.PointsMaterial({ color: ACCENT, size: 0.14, transparent: true, opacity: 0.9 })
    group.add(new THREE.Points(pointGeo, pointMat))

    const linePos = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < level.thresh) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3))
    const lineMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.12 })
    group.add(new THREE.LineSegments(lineGeo, lineMat))

    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
    }

    const onResize = () => {
      w = parent.clientWidth
      h = parent.clientHeight
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
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      const animate = () => {
        raf = requestAnimationFrame(animate)
        if (document.hidden) return
        group.rotation.y += level.speed
        group.rotation.x += (mouse.y * 0.4 - group.rotation.x) * 0.03
        camera.position.x += (mouse.x * 2.4 - camera.position.x) * 0.02
        camera.position.y += (-mouse.y * 1.6 - camera.position.y) * 0.02
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }
      animate()
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      pointGeo.dispose()
      pointMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
    }
  }, [intensity])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
