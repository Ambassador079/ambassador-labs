import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ============================================
   Projects — Premium animated project cards
   - Shows 2 featured projects initially
   - "View All" reveals remaining 3 in a modal/stack
   - Hover reveals tech stack + links

   HOW TO ADD PROJECT IMAGES:
   1. Place images in: src/assets/images/
   2. Import: import proj1 from '../../assets/images/project1.png'
   3. Set image: proj1 in the PROJECTS array below
   ============================================ */

const PROJECTS = [
  {
    id: 1,
    title: 'NovaDash',
    subtitle: 'SaaS Analytics Platform',
    desc: 'A real-time analytics dashboard with cinematic data visualizations, live WebSocket feeds, and immersive dark UI that makes data feel alive.',
    tech: ['React', 'Three.js', 'WebSocket', 'Tailwind'],
    featured: true,
    color: '#00f5ff',
    // image: proj1, // ← Replace with your import
    emoji: '📊',
    live: 'https://example.com',
    github: 'https://github.com',
    year: '2024',
    tag: 'Featured',
  },
  {
    id: 2,
    title: 'Spectra UI',
    subtitle: 'Design System & Component Library',
    desc: 'A fully animated, accessibility-first React component library with 80+ components, Storybook integration, and physics-based motion.',
    tech: ['React', 'Framer Motion', 'Storybook', 'GSAP'],
    featured: true,
    color: '#ff4d88',
    emoji: '🎨',
    live: 'https://example.com',
    github: 'https://github.com',
    year: '2024',
    tag: 'Open Source',
  },
  {
    id: 3,
    title: 'Orbit',
    subtitle: 'Portfolio Template Suite',
    desc: 'A collection of premium, customizable portfolio templates built with Next.js and Framer Motion for creatives and developers.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind', 'Lenis'],
    featured: false,
    color: '#7b61ff',
    emoji: '🚀',
    live: 'https://example.com',
    github: 'https://github.com',
    year: '2023',
    tag: 'Template',
  },
  {
    id: 4,
    title: 'FlowCMS',
    subtitle: 'Headless Content Management',
    desc: 'A developer-first headless CMS with a beautiful visual editor, drag-and-drop block system, and instant API generation.',
    tech: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
    featured: false,
    color: '#00ff88',
    emoji: '⚡',
    live: 'https://example.com',
    github: 'https://github.com',
    year: '2023',
    tag: 'Full Stack',
  },
  {
    id: 5,
    title: 'Prism',
    subtitle: '3D Product Showcase',
    desc: 'An interactive 3D product visualization platform for e-commerce, featuring real-time lighting, material swapping, and AR preview.',
    tech: ['Three.js', 'React Three Fiber', 'Drei', 'GSAP'],
    featured: false,
    color: '#f7df1e',
    emoji: '🔮',
    live: 'https://example.com',
    github: 'https://github.com',
    year: '2024',
    tag: '3D / WebGL',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const featured = PROJECTS.filter(p => p.featured)
  const rest = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" ref={ref} className="relative py-32 md:py-40 overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,245,255,0.02) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <span className="line-accent" />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--theme-accent)' }}>
            03 — Work
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-title"
            style={{ color: 'var(--theme-text-primary)' }}
          >
            Selected <span className="text-gradient-accent">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs"
            style={{ color: 'var(--theme-text-secondary)' }}
          >
            {PROJECTS.length} total projects
          </motion.p>
        </div>

        {/* Featured 2 projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center my-10"
        >
          <button
            onClick={() => setShowAll(v => !v)}
            className="btn-ghost magnetic-wrap inline-flex items-center gap-3"
          >
            <span>{showAll ? 'Show Less' : `View All Projects (${PROJECTS.length})`}</span>
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </button>
        </motion.div>

        {/* Expandable: remaining projects */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                {rest.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    isInView={true}
                    compact
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ============================================
   ProjectCard component
   ============================================ */
function ProjectCard({ project, index, isInView, compact = false, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative group rounded-2xl overflow-hidden transition-all duration-500 cursor-none"
      style={{
        border: `1px solid ${hovered ? project.color + '30' : 'var(--theme-glass-border)'}`,
        background: 'var(--theme-surface)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}20` : 'none',
      }}
      data-cursor-hover
    >
      {/* Image placeholder / emoji display */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          height: compact ? '140px' : '220px',
          background: `linear-gradient(135deg, ${project.color}10 0%, var(--theme-surface-2) 100%)`,
        }}
      >
        {/* Replace this emoji display with an <img> when you have project images */}
        <span
          className="text-6xl transition-transform duration-500"
          style={{ filter: `drop-shadow(0 0 20px ${project.color})`, transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        >
          {project.emoji}
        </span>

        {/* Corner tag */}
        <span
          className="absolute top-3 right-3 font-mono text-[10px] tracking-widest px-2 py-1 rounded"
          style={{
            background: project.color + '20',
            color: project.color,
            border: `1px solid ${project.color}30`,
          }}
        >
          {project.tag}
        </span>

        {/* Year */}
        <span
          className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest"
          style={{ color: 'var(--theme-text-secondary)' }}
        >
          {project.year}
        </span>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, ${project.color}08)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-syne font-bold text-lg mb-1 transition-colors duration-200"
          style={{ color: hovered ? project.color : 'var(--theme-text-primary)' }}
        >
          {project.title}
        </h3>
        <p className="text-xs mb-3" style={{ color: 'var(--theme-accent)', fontFamily: 'JetBrains Mono, monospace' }}>
          {project.subtitle}
        </p>
        {!compact && (
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
            {project.desc}
          </p>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-1 rounded tracking-wider"
              style={{
                background: 'var(--theme-glass)',
                border: '1px solid var(--theme-glass-border)',
                color: 'var(--theme-text-secondary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="magnetic-wrap flex-1 text-center py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            style={{
              background: project.color,
              color: '#000',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="magnetic-wrap px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            style={{
              border: '1px solid var(--theme-glass-border)',
              color: 'var(--theme-text-secondary)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================
   Project Detail Modal
   ============================================ */
function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[8000] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: 'var(--theme-surface)',
          border: `1px solid ${project.color}30`,
          boxShadow: `0 0 60px ${project.color}15, 0 40px 80px rgba(0,0,0,0.5)`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header image */}
        <div
          className="flex items-center justify-center"
          style={{
            height: '200px',
            background: `linear-gradient(135deg, ${project.color}15 0%, var(--theme-surface-2) 100%)`,
          }}
        >
          <span className="text-8xl" style={{ filter: `drop-shadow(0 0 30px ${project.color})` }}>
            {project.emoji}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-4xl mb-1" style={{ color: project.color }}>
                {project.title}
              </h3>
              <p className="font-mono text-xs tracking-widest" style={{ color: 'var(--theme-text-secondary)' }}>
                {project.subtitle} · {project.year}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{ border: '1px solid var(--theme-glass-border)', color: 'var(--theme-text-secondary)' }}
            >
              ✕
            </button>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span
                key={t}
                className="font-mono text-xs px-3 py-1.5 rounded-full"
                style={{ background: project.color + '15', color: project.color, border: `1px solid ${project.color}25` }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 rounded-xl font-syne font-semibold text-sm tracking-widest uppercase"
              style={{ background: project.color, color: '#000' }}
            >
              Visit Live Site →
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-syne font-semibold text-sm tracking-widest uppercase"
              style={{
                border: '1px solid var(--theme-glass-border)',
                color: 'var(--theme-text-secondary)',
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
