import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "../../hooks/useLenis";

const TYPING_STRINGS = [
  "Creative UI Engineer",
  "Motion Designer",
  "Digital Architect",
  "Immersive Builder",
];

export default function Hero({ visible }) {
  const [typedText, setTypedText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [strIdx, setStrIdx] = useState(0);

  useEffect(() => {
    const current = TYPING_STRINGS[strIdx];
    let timeout;
    if (!deleting && typedText === current) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && typedText === "") {
      setDeleting(false);
      setStrIdx((i) => (i + 1) % TYPING_STRINGS.length);
    } else {
      timeout = setTimeout(
        () => {
          setTypedText(
            deleting
              ? current.slice(0, typedText.length - 1)
              : current.slice(0, typedText.length + 1),
          );
        },
        deleting ? 42 : 72,
      );
    }
    return () => clearTimeout(timeout);
  }, [typedText, deleting, strIdx]);

  const wrap = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.13, delayChildren: 0.25 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "100px" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          style={{
            position: "absolute",
            top: "-15%",
            right: "-10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,245,255,0.055) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 12s ease-in-out infinite",
            animationDelay: "-5s",
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(rgba(0,245,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.012) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <Particles />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        <motion.div
          variants={wrap}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          className="flex flex-col"
        >
          <motion.h1
            variants={item}
            className="hero-title text-gradient no-select"
          >
            Frontend
          </motion.h1>
          <motion.h1
            variants={item}
            className="hero-title no-select"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Developer
          </motion.h1>

          <motion.p
            variants={item}
            className="font-syne font-semibold tracking-wider mt-5 md:mt-7"
            style={{
              fontSize: "clamp(1rem, 2.6vw, 1.7rem)",
              color: "var(--theme-accent)",
            }}
          >
            {typedText}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "var(--theme-accent)",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
                animation: "glowPulse 1s step-end infinite",
              }}
            />
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg font-body text-base md:text-lg leading-relaxed"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            Building immersive digital experiences at the intersection of design
            and engineering.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary magnetic-wrap"
            >
              View Projects <span>→</span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-ghost magnetic-wrap"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-11 flex items-center gap-5"
          ></motion.div>
        </motion.div>
      </div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "var(--theme-text-secondary)", opacity: 0.35 }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "36px",
            background:
              "linear-gradient(to bottom, var(--theme-accent), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

function Particles() {
  const pts = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 0.6,
    dur: Math.random() * 12 + 10,
    del: -(Math.random() * 20),
    op: Math.random() * 0.45 + 0.1,
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {pts.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            background: "var(--theme-accent)",
            opacity: p.op,
            boxShadow: `0 0 ${p.s * 3}px var(--theme-accent)`,
          }}
          animate={{ y: [0, -50, 0], opacity: [p.op, p.op * 1.8, p.op] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.del,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
