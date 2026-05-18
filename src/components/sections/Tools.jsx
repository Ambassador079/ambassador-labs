import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import react from "../../assets/icons/react.png";
import css from "../../assets/icons/css.png";
import js from "../../assets/icons/javascripts.png";
import tailwind from "../../assets/icons/tailwind.png";
import vscode from "../../assets/icons/vscode.png";
import html from "../../assets/icons/html.png";
import git from "../../assets/icons/git.png";
import framer from "../../assets/icons/framer.png";
import chatgpt from "../../assets/icons/chatgpt.png";
import claude from "../../assets/icons/claude.png";
import vercel from "../../assets/icons/vercel.png";
import github from "../../assets/icons/github.png";

const TOOLS = [
  { name: "React", icon: react, color: "#61dafb" },
  { name: "JavaScript", icon: js, color: "#f7df1e" },
  { name: "CSS", icon: css, color: "#264de4" },
  { name: "HTML", icon: html, color: "#e44d26" },
  { name: "Tailwind CSS", icon: tailwind, color: "#38bdf8" },
  { name: "Framer Motion", icon: framer, color: "#ff4d88" },
  { name: "VS Code", icon: vscode, color: "#007acc" },
  { name: "Git", icon: git, color: "#f05032" },
  { name: "ChatGPT", icon: chatgpt, color: "#10a37f" },
  { name: "Claude", icon: claude, color: "#cc9b7a" },
  { name: "Vercel", icon: vercel, color: "#ffffff" },
  { name: "GitHub", icon: github, color: "#24292e" },
];

export default function Tools() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tools"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,245,255,0.025) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inV ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <span className="line-accent" />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--theme-accent)" }}
          >
            02 — Tools & Stack
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-title"
            style={{ color: "var(--theme-text-primary)" }}
          >
            My <span className="text-gradient-accent">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inV ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-sm"
            style={{
              color: "var(--theme-text-secondary)",
              fontFamily: "DM Sans,sans-serif",
              maxWidth: 280,
            }}
          >
            Hover each tool to reveal it
          </motion.p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} inV={inV} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool, index, inV }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 18 }}
      animate={inV ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.48,
        delay: 0.25 + index * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center rounded-2xl p-5 transition-all duration-300 cursor-pointer"
      style={{
        border: `1px solid ${hovered ? tool.color + "50" : "var(--theme-glass-border)"}`,
        background: hovered ? `${tool.color}0d` : "var(--theme-glass)",
        backdropFilter: "blur(12px)",
        transform: hovered ? "translateY(-6px) scale(1.08)" : "none",
        boxShadow: hovered
          ? `0 12px 36px ${tool.color}20, 0 0 0 1px ${tool.color}30`
          : "none",
        minHeight: "100px",
        gap: hovered ? "10px" : "0px",
      }}
    >
      <img
        src={tool.icon}
        alt={tool.name}
        style={{
          width: hovered ? "3rem" : "2.2rem",
          height: hovered ? "3rem" : "2.2rem",
          objectFit: "contain",
          display: "block",
          filter: hovered ? `drop-shadow(0 0 12px ${tool.color})` : "none",
          transition: "all 0.3s ease",
        }}
      />

      <motion.span
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.2 }}
        className="font-syne font-bold text-xs text-center leading-tight"
        style={{ color: tool.color, whiteSpace: "nowrap" }}
      >
        {tool.name}
      </motion.span>
    </motion.div>
  );
}
