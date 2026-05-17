import { useEffect, useRef } from 'react'

/* ============================================
   CustomCursor — Animated dual-ring cursor
   Tracks mouse with spring-like lag on ring
   ============================================ */

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      // Dot follows instantly
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }

    // Smooth ring follows with lerp
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1)
      ringEl.style.left = `${ring.current.x}px`
      ringEl.style.top = `${ring.current.y}px`
      raf.current = requestAnimationFrame(animate)
    }

    // Toggle hover class on interactive elements
    const onEnter = () => ringEl.classList.add('hover')
    const onLeave = () => ringEl.classList.remove('hover')

    const interactives = document.querySelectorAll(
      'a, button, .magnetic-wrap, [data-cursor-hover]'
    )
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    document.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
