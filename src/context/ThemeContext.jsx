import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    isDark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark((p) => !p) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);