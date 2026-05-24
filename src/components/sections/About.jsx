import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "10+", label: "Projects" },
  { value: "1+", label: "Years" },
  { value: "5+", label: "Clients" },
  { value: "∞", label: "Ideas" },
];

export default function About() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-100px" });

  const headline = "Crafting the digital future, one pixel at a time.";
  const words = headline.split(" ");

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(0,102,255,0.035) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <span className="line-accent" />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--theme-accent)" }}
          >
            01 — About
          </span>
          <span className="line-accent" />
        </motion.div>

        <h2
          className="section-title mb-10"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 5rem)",
            color: "var(--theme-text-primary)",
            lineHeight: 1.05,
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={inV ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.65,
                delay: i * 0.07,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="inline-block mr-[0.22em]"
              style={{
                color:
                  word === "digital"
                    ? "var(--theme-accent)"
                    : "var(--theme-text-primary)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-base md:text-lg leading-relaxed mb-5 mx-auto max-w-xl"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          I'm{" "}
          <span style={{ color: "var(--theme-text-primary)", fontWeight: 600 }}>
            Ambassador
          </span>{" "}
          a frontend developer obsessed with the boundary between design and
          engineering. I build interfaces that feel alive.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base leading-relaxed mx-auto max-w-lg mb-14"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          From cinematic preloaders to physics-based interactions, I craft
          experiences that leave users asking{" "}
          <em style={{ color: "var(--theme-accent)" }}>
            "how did they do that?"
          </em>
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={inV ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.85 + i * 0.1 }}
              className="glass p-5 rounded-2xl text-center"
              style={{ border: "1px solid var(--theme-glass-border)" }}
            >
              <div
                className="font-display text-3xl mb-1"
                style={{ color: "var(--theme-accent)" }}
              >
                {s.value}
              </div>
              <div
                className="text-xs font-mono tracking-wider"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
