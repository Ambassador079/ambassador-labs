import { useScrollProgress } from '../../hooks/useScrollProgress'

/* ============================================
   ScrollProgress — Top progress indicator bar
   ============================================ */

export default function ScrollProgress() {
  const { progress } = useScrollProgress()

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  )
}
