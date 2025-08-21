// src/components/layout/ThemeContext.tsx

import { createContext, useContext } from "react";

// Interface para definir os tipos do nosso contexto
export interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

// Criamos o contexto com um valor padrão
export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleTheme: () => {}, // função vazia como padrão
});

// Criamos e exportamos o hook que consome o contexto
export const useTheme = () => useContext(ThemeContext);