import { useEffect } from 'react'
import Lenis from 'lenis'

/* ============================================
   useLenis — Smooth scroll initialization
   Wraps Lenis for silky 60fps scrolling
   ============================================ */

let lenisInstance = null

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisInstance = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

// Utility: scroll to element by ID
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el && lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80, duration: 1.6 })
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
