import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeProvider } from "./context/ThemeContext";
import { useLenis } from "./hooks/useLenis";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/ui/Preloader";
import ScrollProgress from "./components/ui/ScrollProgress";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Tools from "./components/sections/Tools";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

function AppInner() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>

      <div className="grain-overlay" aria-hidden="true" />

     
      <ScrollProgress />

      
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Navbar visible={loaded} />

        <main>
          <div
            className="fixed inset-0 pointer-events-none"
            style={{ background: "var(--theme-bg)", zIndex: -1 }}
          />
          <Hero visible={loaded} />
          <Divider />
          <About />
          <Divider />
          <Tools />
          <Divider />
          <Projects />
          <Divider />
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </>
  );
}

function Divider() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
      <div
        className="h-px"
        style={{ background: "var(--theme-glass-border)" }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
