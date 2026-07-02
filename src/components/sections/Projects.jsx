import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import proj1 from "../../assets/images/kassy.png";
import proj2 from "../../assets/images/chiamaka.png";
import proj3 from "../../assets/images/ucanada.png";
import proj4 from "../../assets/images/bankynails.png";
import proj5 from "../../assets/images/carrentals.png";
import proj6 from "../../assets/images/mosshakes.png";

const PROJECTS = [
  {
    id: 1,
    title: "Kassy Beauty",
    subtitle: "Beauty & Cosmetics Website",
    desc: "A modern beauty brand website showcasing nail tech, makeup, gel styling, and lash services with elegant visuals, smooth animations, and a luxurious user experience.",
    tech: ["React", "Tailwind", "Framer Motion"],
    featured: true,
    color: "#ff4fa3",
    image: proj1,
    live: "https://kassy-beauty.vercel.app/",
    github: "https://github.com/Ambassador079/kassy_beauty",
    year: "2026",
    tag: "Featured",
  },
  {
    id: 2,
    title: "Chiamaka Weekend Meals",
    subtitle: "Restaurant Landing Page",
    desc: "A vibrant food landing page designed to promote delicious weekend meals with mouthwatering visuals, clean layouts, and an engaging mobile-friendly experience.",
    tech: ["React", "Framer Motion", "Tailwind", "JavaScript"],
    featured: true,
    color: "#ff7a00",
    image: proj2,
    live: "https://chi-amaka.vercel.app/",
    github: "https://github.com/Ambassador079/chi-amaka",
    year: "2026",
    tag: "Food",
  },
  {
    id: 3,
    title: "UCanada",
    subtitle: "Immigration & Opportunity Platform",
    desc: "A platform designed to guide users seeking opportunity in Canada, providing structured information on jobs, study pathways, and relocation steps.",
    tech: ["React", "Framer Motion", "Tailwind", "JavaScript"],
    featured: false,
    color: "#7b61ff",
    image: proj3,
    live: "https://ucanada.vercel.app/",
    github: "https://github.com/Ambassador079/Ucanada",
    year: "2026",
    tag: "Live",
  },
  {
    id: 4,
    title: "Banky Nails",
    subtitle: "Nail Technician Portfolio",
    desc: "A stylish nail technician website showcasing luxury nail designs, acrylic sets, gel polish services, and booking information with a clean modern aesthetic.",
    tech: ["React", "Tailwind", "JavaScript", "Framer Motion"],
    featured: false,
    color: "#ff5ca8",
    image: proj4,
    live: "https://banky-nails.vercel.app/",
    github: "https://github.com/Ambassador079/Banky-Nails",
    year: "2026",
    tag: "Beauty",
  },
  {
    id: 5,
    title: "Teejay x Miso Premium Autos",
    subtitle: "Luxury Car Rental Platform",
    desc: "A sleek premium car rental website showcasing luxury vehicles, seamless booking experiences, and modern automotive visuals designed for elegance and performance.",
    tech: ["React", "Tailwind", "JavaScript", "Framer Motion"],
    featured: false,
    color: "#00c2ff",
    image: proj5,
    live: "https://teejayautos.vercel.app/",
    github: "https://github.com/Ambassador079/Teejayautos",
    year: "2026",
    tag: "Automotive",
  },
  {
    id: 6,
    title: "MosShake",
    subtitle: "Milkshake Brand Landing Page",
    desc: "A vibrant and refreshing landing page for a milkshake brand featuring bold visuals, smooth animations, and a playful modern design crafted to attract customers instantly.",
    tech: ["React", "Tailwind", "JavaScript", "Framer Motion"],
    featured: false,
    color: "#ff8c42",
    image: proj6,
    live: "https://mos-shakes.vercel.app/",
    github: "https://github.com/Ambassador079/mo-s_shake",
    year: "2026",
    tag: "Food & Drinks",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);

  const featured = PROJECTS.filter((p) => p.featured); // exactly 2
  const rest = PROJECTS.filter((p) => !p.featured); // remaining 4

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,245,255,0.02) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <span className="line-accent" />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--theme-accent)" }}
          >
            03 — Work
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-title"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Selected <span className="text-gradient-accent">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {PROJECTS.length} total projects
          </motion.p>
        </div>

        {/* Always show exactly 2 featured */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {featured.map((p, i) => (
            <Card
              key={p.id}
              project={p}
              index={i}
              isInView={isInView}
              tall
              onClick={() => setSelected(p)}
            />
          ))}
        </div>

        {/* View All toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center my-10"
        >
          <button
            onClick={() => setShowAll((v) => !v)}
            className="btn-ghost magnetic-wrap inline-flex items-center gap-3"
          >
            <span>
              {showAll
                ? "Show Less"
                : "View All Projects (" + PROJECTS.length + ")"}
            </span>
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </button>
        </motion.div>

        {/* Remaining 4 in a 3-col grid */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 pt-4">
                {rest.map((p, i) => (
                  <Card
                    key={p.id}
                    project={p}
                    index={i}
                    isInView
                    onClick={() => setSelected(p)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <Modal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Card({ project, index, isInView, onClick, tall = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.13,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        height: tall ? "520px" : "380px",
        boxShadow: hovered
          ? "0 30px 70px rgba(0,0,0,0.6)"
          : "0 8px 30px rgba(0,0,0,0.3)",
        transform: hovered
          ? "translateY(-6px) scale(1.015)"
          : "translateY(0) scale(1)",
        transition:
          "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease",
      }}
    >
      {/* Full bleed image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      {/* Dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Colour wash on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "linear-gradient(135deg, " +
            project.color +
            "18 0%, transparent 60%)",
        }}
      />

      {/* Top: year + tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {project.year}
        </span>
        {project.tag && (
          <span
            className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
              border: "1px solid " + project.color + "50",
              color: project.color,
            }}
          >
            {project.tag}
          </span>
        )}
      </div>

      {/* Bottom glass panel */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="mb-3">
          <h3
            className="font-syne font-bold mb-0.5"
            style={{
              fontSize: tall ? "1.4rem" : "1.05rem",
              color: hovered ? project.color : "#ffffff",
              transition: "color 0.3s ease",
            }}
          >
            {project.title}
          </h3>
          <p
            className="font-mono text-[11px] tracking-wider"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Description slides in on hover — tall cards only */}
        {tall && (
          <motion.p
            animate={{
              opacity: hovered ? 1 : 0,
              height: hovered ? "auto" : 0,
              marginBottom: hovered ? "12px" : "0px",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-xs leading-relaxed overflow-hidden"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {project.desc}
          </motion.p>
        )}

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] px-2 py-0.5 rounded-full tracking-wider"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center py-2 rounded-lg text-[11px] font-semibold tracking-widest uppercase"
            style={{
              background: hovered ? project.color : "rgba(255,255,255,0.12)",
              color: hovered ? "#000" : "#fff",
              backdropFilter: "blur(10px)",
              border:
                "1px solid " +
                (hovered ? project.color : "rgba(255,255,255,0.12)"),
              fontFamily: "Syne, sans-serif",
              transition: "all 0.3s ease",
            }}
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 rounded-lg text-[11px] font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Syne, sans-serif",
              transition: "all 0.3s ease",
            }}
          >
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Modal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[8000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(24px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: "var(--theme-surface)",
          border: "1px solid " + project.color + "30",
          boxShadow:
            "0 0 80px " + project.color + "15, 0 40px 80px rgba(0,0,0,0.6)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{ height: "260px", position: "relative", overflow: "hidden" }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "24px",
              right: "24px",
            }}
          >
            <h3
              className="font-display"
              style={{
                fontSize: "2.5rem",
                color: project.color,
                lineHeight: 1,
              }}
            >
              {project.title}
            </h3>
            <p
              className="font-mono text-xs tracking-widest mt-1"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {project.subtitle} · {project.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: project.color + "18",
                  color: project.color,
                  border: "1px solid " + project.color + "28",
                }}
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
              style={{ background: project.color, color: "#000" }}
            >
              Visit Live Site →
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-syne font-semibold text-sm tracking-widest uppercase"
              style={{
                border: "1px solid var(--theme-glass-border)",
                color: "var(--theme-text-secondary)",
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
