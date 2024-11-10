import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { words } from "../assets/words";
import Guess from "./Guess";
import Timer from "./Timer";
import { timerMins } from "./constants";

const letters = new Array(26).fill(65).map((item, index) => {
  return String.fromCharCode(item + index);
});

function KeyBoard({
  life,
  setLife,
  restartGame,
  setScore,
  score,
  finalScoreRef,
  currWord,
  setCurrWord,
}) {
  const [wordsSoFar, setWordsSoFar] = useState([]);

  const [selLetters, setSelLetters] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(timerMins * 60);
  const timerRef = useRef(null);
  // console.log(currWord);
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(timerMins * 60);
  };
  const generateRandomWord = () => {
    let ind = Math.floor(Math.random() * words.length);
    while (wordsSoFar.includes(ind)) {
      ind = Math.floor(Math.random() * words.length);
    }
    const word = words[ind];
    setCurrWord(word);
    const newW = [...wordsSoFar];
    newW.push(ind);
    setWordsSoFar(newW);
    const timeFrom = Date.now();
    resetTimer();
    timerRef.current = setInterval(() => {
      const cD = Date.now();
      const timePassMs = cD - timeFrom;
      const timePassS = timePassMs / 1000;
      const timeLeft = timerMins * 60 - timePassS;
      if (timeLeft < 0) {
        resetTimer();

        restartGame();
      } else setTime(timeLeft);
    }, 1000);
  };
  // console.log(currWord, "WORD");

  useEffect(() => {
    generateRandomWord();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  useEffect(() => {
    const keyPress = (e) => {
      //console.log(e.key);
      //console.log(selLetters, "stale-sel*");
      clickKey(null, true, e.key.toUpperCase());
    };
    addEventListener("keydown", keyPress);
    return () => window.removeEventListener("keydown", keyPress);
  });
  function clickKey(e, keyPress = false, keyVal = null) {
    if (disabled) return;
    // //console.log(e);
    if (keyPress || e.target.classList.contains("letter-key")) {
      const val = keyVal || e.target.value;
      if (selLettersKeys.includes(val)) return;
      const newLArr = [...selLetters];

      let count = 0;
      for (let i of currWord) {
        if (i === val.toLowerCase()) count++;
      }
      const newL = {
        key: val,
        count,
      };
      if (!currWord.includes(val.toLowerCase())) {
        setLife(life - 1);
        newL["sel"] = 0;
        if (life - 1 === 0) {
          setDisabled(true);
          setTimeout(() => {
            // setSelLetters([]);

            restartGame();
            // setDisabled(false);
          }, 1000);
        }
      } else {
        newL["sel"] = 1;
      }
      newLArr.push(newL);
      setSelLetters(newLArr);
      const corrLets = newLArr.reduce((acc, item) => {
        return acc + item["count"];
      }, 0);
      //   const
      //   //console.log(corrLets, currWord, "fin?");
      if (corrLets === currWord.length) {
        //console.log(score, "END********");
        finalScoreRef.current = score + 10;
        setDisabled(true);
        // resetTimer();
        //Todo-> show loader
        setTimeout(() => {
          setSelLetters([]);

          setDisabled(false);
          if (score + 10 === 80) {
            //console.log(score, "END********2");
            // finalScoreRef.current = score + 10;
            restartGame();
          } else {
            setScore((score) => score + 10);

            generateRandomWord();
          }
        }, 1000);
      }
    }
  }
  //console.log(selLetters, "bruvsel*");
  const selLettersKeys = selLetters.map((item) => item.key);
  return (
    <>
      <Guess currWord={currWord} selLettersKeys={selLettersKeys} />
      <div className="key-board" onClick={clickKey}>
        {letters.map((item) => {
          let cl = "letter-key ";
          if (selLetters.length) {
            const sel = selLetters.find((i) => i.key === item);
            // //console.log(sel, "sel");
            if (!sel) cl += "unsel-key";
            else if (sel["sel"]) cl += "corr-key";
            else cl += "wrong-key";
          } else {
            cl += "unsel-key";
          }

          return (
            <button className={cl} key={item} value={item} disabled={disabled}>
              {item}
            </button>
          );
        })}
      </div>
      <Timer time={time} />
    </>
  );
}

export default KeyBoard;
