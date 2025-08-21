// src/components/layout/ThemeToggle.tsx

import { useTheme } from "./ThemeContext";
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button className={`theme-toggle ${darkMode ? 'dark' : 'light'}`} onClick={toggleTheme}>
      <div className="toggle-circle"></div>
      {/* O span foi removido para um visual mais limpo, mas pode ser adicionado de volta se preferir */}
    </button>
  );
}

export default ThemeToggle;