import { useContext } from "react";
import "../styles/card.css";
import { ThemeContext } from "./Theme";
function Card({ children }) {
  const { theme, setTheme } = useContext(ThemeContext);
  //console.log(theme, "the");

  return (
    <div
      className={"card" + (theme === "light" ? " light-theme" : " dark-theme")}
    >
      {children}
    </div>
  );
}

export default Card;
