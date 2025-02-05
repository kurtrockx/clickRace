import { useState } from "react";
import "./index.css";

function App() {
  const [timer, setTimer] = useState(10);

  const handleSetTimer = (timer) => {
    setTimer(timer);
  };

  return (
    <div className="app">
      <Timer timer={timer} onSetTimer={handleSetTimer} />
    </div>
  );
}

function Timer({ timer, onSetTimer }) {
  const handleIncreaseTimer = () => {
    if (timer >= 20) return;
    onSetTimer((t) => t + 1);
  };
  const handleDecreaseTimer = () => {
    if (timer <= 5) return;
    onSetTimer((t) => t - 1);
  };

  const handleStartTimer = () => {
    const intervalId = setInterval(() => {
      onSetTimer((t) => {
        if (t <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  return (
    <div className="timer-wrapper">
      <TimerButton onClick={handleDecreaseTimer}>◀</TimerButton>
      <h1 className="timer">{timer}</h1>
      <TimerButton onClick={handleIncreaseTimer}>▶</TimerButton>

      <button onClick={() => handleStartTimer()}>Start Game</button>
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

export default App;
