import { timerMins } from "./constants";

function Timer({ time }) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  // console.log(mins, secs, "min", time);
  return (
    <div className="timer">
      <span className="mins">{mins + ":"}</span>
      <span className="secs">{secs}</span>
    </div>
  );
}

export default Timer;
