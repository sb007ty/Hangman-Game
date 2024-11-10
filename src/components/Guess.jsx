const Guess = ({ currWord, selLettersKeys }) => {
  return (
    <div className="guess-letter-container">
      {new Array(currWord.length).fill(0).map((item, index) => {
        let disp = "_";
        const currL = currWord[index].toUpperCase();
        //console.log(currL, selLettersKeys, "bruv*");

        if (selLettersKeys.includes(currL)) {
          disp = currL;
        }
        return (
          <span className="guess-letter" key={index}>
            {disp}
          </span>
        );
      })}
    </div>
  );
};

export default Guess;
