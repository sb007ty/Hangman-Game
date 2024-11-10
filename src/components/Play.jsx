import { useEffect, useState } from "react";
import "../styles/play.css";
import KeyBoard from "./KeyBoard";
import Life from "./Life";
function Play({ restartGame, score, setScore, finalScoreRef }) {
  const [life, setLife] = useState(8);
  return (
    <div className="play-div">
      <div>
        <div className="score">Score- {score}</div>
        <div>Levels Remaining - {(80 - score) / 10}</div>
      </div>

      <Life life={life} />
      <KeyBoard
        setLife={setLife}
        life={life}
        restartGame={restartGame}
        setScore={setScore}
        score={score}
        finalScoreRef={finalScoreRef}
      />
    </div>
  );
}

export default Play;
