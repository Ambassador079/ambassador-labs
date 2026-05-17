import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "AMBASSADOR".split("");

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("slide"); // slide → hold → glitch → explode → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1000);
    const t2 = setTimeout(() => setPhase("glitch"), 1600);
    const t3 = setTimeout(() => setPhase("explode"), 2200);
    const t4 = setTimeout(() => setPhase("done"), 3100);
    const t5 = setTimeout(onComplete, 3200);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#030303",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Glow blob — appears when they meet */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === "slide" ? 0 : phase === "explode" ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(0,245,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* AMBASSADOR — slides in from TOP */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: '"Bebas Neue", cursive',
          fontSize: "clamp(3.5rem, 12vw, 11rem)",
          lineHeight: 1,
          letterSpacing: "0.04em",
          position: "relative",
          zIndex: 2,
        }}
      >
        {LETTERS.map((ch, i) => (
          <AmbassadorLetter
            key={i}
            char={ch}
            index={i}
            phase={phase}
            total={LETTERS.length}
          />
        ))}
      </div>

      {/* LABS — slides in from BOTTOM */}
      <motion.div
        initial={{ y: "50vh", opacity: 0 }}
        animate={
          phase === "explode"
            ? { opacity: 0, y: "50vh", transition: { duration: 0.4 } }
            : phase === "slide"
              ? { y: "50vh", opacity: 1, transition: { duration: 0 } }
              : {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.75, ease: [0.2, 1.1, 0.4, 1] },
                }
        }
        style={{
          fontFamily: '"Bebas Neue", cursive',
          fontSize: "clamp(1.6rem, 5vw, 4rem)",
          color: "#00f5ff",
          letterSpacing: "0.55em",
          marginTop: "6px",
          position: "relative",
          zIndex: 2,
          textShadow: "0 0 30px rgba(0,245,255,0.4)",
        }}
      >
        LABS
      </motion.div>

      {/* Fade to black on explode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "explode" ? 1 : 0 }}
        transition={{ duration: 0.5, delay: phase === "explode" ? 0.45 : 0 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "#030303",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </div>
  );
}

function AmbassadorLetter({ char, index, phase, total }) {
  const delay = index * 0.055;

  // Each letter gets a unique explosion vector
  const side = index % 2 === 0 ? -1 : 1;
  const explodeX = side * (150 + index * 60);
  const explodeY = index < total / 2 ? -700 : 700;
  const explodeR = (index % 2 === 0 ? -1 : 1) * (90 + index * 25);

  const glitchColor =
    index % 3 === 0 ? "#00f5ff" : index % 3 === 1 ? "#ff0055" : "#f5f5f5";

  return (
    <motion.span
      initial={{ y: "-50vh", opacity: 0 }}
      animate={
        phase === "explode"
          ? {
              opacity: 0,
              y: explodeY,
              x: explodeX,
              rotate: explodeR,
              scale: 0.15,
              filter: "blur(10px)",
              transition: {
                duration: 0.6,
                delay: index * 0.025,
                ease: [0.4, 0, 1, 1],
              },
            }
          : phase === "glitch"
            ? {
                opacity: 1,
                y: 0,
                x: [
                  0,
                  index % 2 === 0 ? -10 : 10,
                  0,
                  index % 2 === 0 ? 6 : -6,
                  0,
                ],
                color: glitchColor,
                filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"],
                transition: { duration: 0.4, delay: index * 0.018 },
              }
            : phase === "hold"
              ? {
                  y: 0,
                  opacity: 1,
                  x: 0,
                  color: "#f5f5f5",
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.7,
                    delay,
                    ease: [0.2, 1.2, 0.4, 1],
                  },
                }
              : { y: "-50vh", opacity: 0 }
      }
      style={{
        display: "inline-block",
        color: "#f5f5f5",
        textShadow: "0 0 40px rgba(0,245,255,0.15)",
        transformOrigin: "50% 50%",
      }}
    >
      {char}
    </motion.span>
  );
}
