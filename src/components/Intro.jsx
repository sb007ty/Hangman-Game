import hangmanPic from "../assets/noose.svg";
import "../styles/intro.css";
function Intro({ startGame, gameOver, score, finScore, currWord }) {
  return (
    <>
      <h2>Hangman</h2>

      {gameOver && <p>Final Score - {finScore}</p>}
      {gameOver && <p>Word was - {currWord}</p>}
      <img
        src={hangmanPic}
        className="noose-pic"
        alt=""
        height={"300px"}
        width={"300px"}
      />
      <button
        className="play-btn"
        onClick={(e) => {
          startGame();
        }}
      >
        {gameOver ? "Try Again" : "Play"}
      </button>
    </>
  );
}

export default Intro;
