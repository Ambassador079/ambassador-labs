import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ============================================
   Tools — Floating grid only (no ticker)
   - PNG icons ready: set type:'image', import your png, pass as icon prop
   - Hover: icon stands alone + name fades in below
   - No emoji ticker strip, single clean section

   TO SWAP IN YOUR OWN PNG:
   1. Import:  import reactPng from '../../assets/icons/react.png'
   2. In TOOLS set:  icon: reactPng,  type: 'image'
   3. Done — the ToolCard renders <img> automatically
   ============================================ */

// import reactPng   from '../../assets/icons/react.png'
// import jsPng      from '../../assets/icons/javascript.png'
// ... etc

const TOOLS = [
  { name: 'React',          emoji: '⚛️',  color: '#61dafb', /* icon: reactPng, type:'image' */ },
  { name: 'JavaScript',     emoji: '𝗝𝗦',  color: '#f7df1e' },
  { name: 'Tailwind CSS',   emoji: '🌊',  color: '#38bdf8' },
  { name: 'Framer Motion',  emoji: '🎬',  color: '#ff4d88' },
  { name: 'GSAP',           emoji: '⚡',  color: '#88ce02' },
  { name: 'Three.js',       emoji: '🔺',  color: '#cccccc' },
  { name: 'Vite',           emoji: '🔥',  color: '#646cff' },
  { name: 'Figma',          emoji: '🎨',  color: '#f24e1e' },
  { name: 'VS Code',        emoji: '💙',  color: '#007acc' },
  { name: 'Git',            emoji: '🔀',  color: '#f05032' },
  { name: 'Node.js',        emoji: '🟢',  color: '#339933' },
  { name: 'Next.js',        emoji: '▲',   color: '#ffffff' },
]

export default function Tools() {
  const ref = useRef(null)
  const inV = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tools" ref={ref} className="relative py-32 md:py-40 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,245,255,0.025) 0%, transparent 100%)',
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inV ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-6">
          <span className="line-accent" />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--theme-accent)' }}>
            02 — Tools & Stack
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }} className="section-title" style={{ color: 'var(--theme-text-primary)' }}>
            My <span className="text-gradient-accent">Arsenal</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            className="text-sm" style={{ color: 'var(--theme-text-secondary)', fontFamily: 'DM Sans,sans-serif', maxWidth: 280 }}>
            Hover each tool to reveal it
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} inV={inV} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ToolCard({ tool, index, inV }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 18 }}
      animate={inV ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay: 0.25 + index * 0.04, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center gap-0 rounded-2xl p-5 transition-all duration-300 cursor-default"
      style={{
        border: `1px solid ${hovered ? tool.color + '45' : 'var(--theme-glass-border)'}`,
        background: hovered ? `${tool.color}08` : 'var(--theme-glass)',
        backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-5px) scale(1.06)' : 'none',
        boxShadow: hovered ? `0 10px 32px ${tool.color}18, 0 0 0 1px ${tool.color}25` : 'none',
        minHeight: '96px',
      }}
      data-cursor-hover
    >
      {/* Icon — img when type==='image', otherwise emoji */}
      <div
        className="transition-all duration-300"
        style={{
          fontSize: hovered ? '2.4rem' : '2rem',
          filter: hovered ? `drop-shadow(0 0 14px ${tool.color})` : 'none',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          marginBottom: hovered ? '6px' : '0',
        }}
      >
        {tool.type === 'image' && tool.icon
          ? <img src={tool.icon} alt={tool.name} style={{ width: '2rem', height: '2rem', objectFit: 'contain', display: 'block' }} />
          : tool.emoji
        }
      </div>

      {/* Name — slides in on hover */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6, height: hovered ? 'auto' : 0 }}
        transition={{ duration: 0.2 }}
        className="font-syne font-bold text-xs text-center leading-tight overflow-hidden"
        style={{ color: hovered ? tool.color : 'transparent', whiteSpace: 'nowrap' }}
      >
        {tool.name}
      </motion.span>
    </motion.div>
  )
}
