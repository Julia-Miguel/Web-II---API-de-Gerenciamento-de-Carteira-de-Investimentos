// src/components/layout/ThemeProvider.tsx

import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicializa o estado com base no localStorage ou preferência do sistema
  const [darkMode, setDarkMode] = useState(() => {
    // Verifica se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    
    // Se não há preferência salva, usa a preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setDarkMode((prevMode: boolean): boolean => {
      const newMode: boolean = !prevMode;
      // Salva a preferência no localStorage
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    // Aplica a classe no body
    document.body.className = darkMode ? 'dark-mode' : '';
    
    // Atualiza a meta tag theme-color para mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', darkMode ? '#121212' : '#ffffff');
    }
  }, [darkMode]);

  // Listener para detectar mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Só atualiza se não há preferência salva pelo usuário
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};