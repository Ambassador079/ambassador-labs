import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, THEMES } from "../../context/ThemeContext";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { scrollToSection } from "../../hooks/useLenis";
import logoImg from "../../assets/images/logo.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "tools", label: "Tools" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ visible }) {
  const { theme, cycleTheme } = useTheme();
  const { activeSection } = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -28 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -28 }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
        className="fixed top-5 left-1/2 z-[9000]"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          className="glass flex items-center gap-1 px-3 py-2 rounded-full"
          style={{
            border: "1px solid var(--theme-glass-border)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px var(--theme-glass-border)"
              : "0 4px 20px rgba(0,0,0,0.2)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* LOGO IMAGE */}
          <button
            onClick={() => go("home")}
            className="magnetic-wrap mr-2 flex items-center justify-center"
            title="Ambassador Labs"
            style={{ flexShrink: 0 }}
          >
            <img
              src={logoImg}
              alt="Ambassador Labs"
              style={{
                width: "28px",
                height: "28px",
                objectFit: "cover",
                borderRadius: "50%",
                display: "block",
                border: "1px solid var(--theme-glass-border)",
              }}
            />
          </button>

          <div
            className="w-px h-4 opacity-20 mr-1"
            style={{ background: "var(--theme-text-secondary)" }}
          />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavPill
                key={item.id}
                item={item}
                active={activeSection === item.id}
                onClick={() => go(item.id)}
              />
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className="magnetic-wrap ml-2 w-7 h-7 flex items-center justify-center rounded-full text-xs transition-all duration-300 hover:scale-110"
            style={{
              border: "1px solid var(--theme-glass-border)",
              color: "var(--theme-text-secondary)",
              flexShrink: 0,
            }}
            title={"Theme: " + theme}
          >
            {THEMES.find((t) => t.id === theme)?.icon}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden ml-2 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            style={{ flexShrink: 0 }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: "var(--theme-text-primary)",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(2px, 2px)"
                      : i === 2
                        ? "rotate(-45deg) translate(2px, -2px)"
                        : "none"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed top-20 left-1/2 z-[8999] -translate-x-1/2 w-64 glass rounded-2xl p-3 flex flex-col gap-0.5"
            style={{ border: "1px solid var(--theme-glass-border)" }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.055 }}
                onClick={() => go(item.id)}
                className="text-left px-4 py-3 rounded-xl font-syne font-semibold text-sm tracking-wider uppercase transition-all duration-200"
                style={{
                  color:
                    activeSection === item.id
                      ? "var(--theme-accent)"
                      : "var(--theme-text-secondary)",
                  background:
                    activeSection === item.id
                      ? "var(--theme-glow)"
                      : "transparent",
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavPill({ item, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative magnetic-wrap px-3.5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 group"
      style={{
        fontFamily: "Syne,sans-serif",
        color: active ? "var(--theme-accent)" : "var(--theme-text-secondary)",
      }}
    >
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--theme-glow)" }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
        />
      )}
      <span className="relative z-10 group-hover:text-[var(--theme-text-primary)] transition-colors duration-150">
        {item.label}
      </span>
    </button>
  );
}
