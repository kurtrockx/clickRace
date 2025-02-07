import { useState } from "react";
import "./index.css";

function App() {
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      <Score score={score} timer={timer} />
      <ClickButton
        timer={timer}
        onSetScore={setScore}
        gameStarted={gameStarted}
      />
      <Timer
        timer={timer}
        onSetTimer={setTimer}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
        onSetScore={setScore}
      />
    </div>
  );
}

function Timer({ timer, onSetTimer, gameStarted, setGameStarted, onSetScore }) {
  const replay = () => {
    if (timer === 0) {
      onSetScore(0);
      onSetTimer(5);
    }
  };

  const handleIncreaseTimer = () => {
    replay();
    if (timer >= 20 || gameStarted) return;
    onSetTimer((t) => t + 1);
  };
  const handleDecreaseTimer = () => {
    replay();
    if (timer <= 5 || gameStarted) return;
    onSetTimer((t) => t - 1);
  };

  const handleStartTimer = () => {
    replay();
    if (gameStarted) return;
    setGameStarted(true);
    const intervalId = setInterval(() => {
      onSetTimer((t) => {
        if (t <= 1) {
          clearInterval(intervalId);
          setGameStarted(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  return (
    <div className="timer-wrapper">
      <TimerButton onClick={handleDecreaseTimer}>◀</TimerButton>
      <h1 className="timer">
        {timer}
        <span className="seconds">s</span>
      </h1>
      <TimerButton onClick={handleIncreaseTimer}>▶</TimerButton>

      <button className="start-button" onClick={() => handleStartTimer()}>
        {timer === 0 ? "Try again?" : 'Start Game'}
      </button>
    </div>
  );
}

function TimerButton({ children, onClick }) {
  return (
    <button className="timer-button" onClick={onClick}>
      {children}
    </button>
  );
}

function ClickButton({ timer, onSetScore, gameStarted }) {
  const increaseScore = () => {
    if (timer <= 0 || !gameStarted) return;
    onSetScore((s) => s + 1);
  };
  return (
    <button className="click-button" onClick={() => increaseScore()}>
      <p>Click Me!</p>
    </button>
  );
}

function Score({ score, timer }) {
  return timer === 0 ? (
    <h1 className="score">Your score is {score}!</h1>
  ) : (
    <h1 className="score not-finished">{score}</h1>
  );
}

export default App;
