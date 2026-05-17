import { useEffect, useRef } from 'react'

/* ============================================
   MouseGlow — Follows cursor with ambient light
   Subtle radial gradient that tracks mouse
   ============================================ */

export default function MouseGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    let raf
    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      current.x = lerp(current.x, target.x, 0.05)
      current.y = lerp(current.y, target.y, 0.05)
      glow.style.left = `${current.x}px`
      glow.style.top = `${current.y}px`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[100]"
      style={{
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
        willChange: 'transform, left, top',
      }}
    />
  )
}
