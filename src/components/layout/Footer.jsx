import { motion } from "framer-motion";
import { scrollToSection } from "../../hooks/useLenis";

/* ============================================
   Footer — Clean premium footer
   ============================================ */

const LINKS = ["Home", "About", "Tools", "Projects", "Contact"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Top accent line */}
      <div className="relative h-px">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--theme-accent), transparent)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,245,255,0.6), transparent)",
            width: "30%",
          }}
        />
      </div>

      <div
        className="relative py-12 md:py-16"
        style={{ background: "var(--theme-surface)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            {/* Logo */}
            <div>
              <span
                className="font-display text-3xl tracking-widest"
                style={{ color: "var(--theme-text-primary)" }}
              >
                AMBSSADOR
              </span>
              <span
                className="block font-mono text-xs mt-0.5 tracking-widest"
                style={{ color: "var(--theme-accent)" }}
              >
                name.labs
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className="font-syne text-xs tracking-widest uppercase transition-colors duration-200"
                  style={{ color: "var(--theme-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--theme-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--theme-text-secondary)")
                  }
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-8"
            style={{ background: "var(--theme-glass-border)" }}
          />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="font-mono text-xs"
              style={{ color: "var(--theme-text-secondary)", opacity: 0.5 }}
            >
              © {year} AMBSSADOR · labs · All rights reserved
            </p>
            <p
              className="font-mono text-xs"
              style={{ color: "var(--theme-text-secondary)", opacity: 0.4 }}
            >
              Designed & Built with ♥ by AMBSSADOR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
