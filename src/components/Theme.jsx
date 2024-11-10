import { createContext, useContext } from "react";
import "../styles/theme.css";

export const ThemeContext = createContext();

function Theme() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="theme-container">
      <button
        className="theme-btn"
        onClick={(e) => {
          if (theme === "light") {
            localStorage.setItem("hangman-theme", "dark");
            setTheme("dark");
          } else {
            setTheme("light");
            localStorage.setItem("hangman-theme", "light");
          }
        }}
      >
        Change Theme
      </button>
    </div>
  );
}

export default Theme;
