import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";
import Intro from "./components/Intro";
import Theme, { ThemeContext } from "./components/Theme";
import Play from "./components/Play";

function getTheme() {
  let th = localStorage.getItem("hangman-theme");
  if (!th) {
    th = "light";
    localStorage.setItem("hangman-theme", "light");
  }
  return th;
}
function App() {
  const [play, setPlay] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const finalScoreRef = useRef(0);
  const [finScore, setFinScore] = useState(0);
  function restartGame() {
    setPlay(false);
    setGameOver(true);
    setFinScore(finalScoreRef.current);
    //console.log(score, "sc");
    setScore(0);
  }
  function startGame() {
    setPlay(true);
    setGameOver(false);
  }
  return (
    <div className="container">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Theme />
        <Card>
          {!play && (
            <Intro
              restartGame={restartGame}
              gameOver={gameOver}
              startGame={startGame}
              finalScoreRef={finalScoreRef}
              finScore={finScore}
              score={score}
            />
          )}
          {play && (
            <Play
              setPlay={setPlay}
              setGameOver={setGameOver}
              restartGame={restartGame}
              score={score}
              setScore={setScore}
              finalScoreRef={finalScoreRef}
            />
          )}
        </Card>
        <div className="footer">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/spandan-banerjee-1119b5172/"
            target="_blank"
          >
            Spandan
          </a>
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
