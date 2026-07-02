import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEMES = [
  { id: "matte-black", label: "Void", icon: "⬛" },
  { id: "midnight-blue", label: "Midnight", icon: "🌌" },
  { id: "neon-cyber", label: "Cyber", icon: "🟢" },
  { id: "light", label: "Haze", icon: "☁️" },
  { id: "pure-white", label: "Clean", icon: "⬜" },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ambssador-theme") || "matte-black";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ambssador-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    const idx = THEMES.findIndex((t) => t.id === theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next.id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
