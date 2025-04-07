import React, { useRef, useState } from 'react';

const App = () => {
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const intervalRef = useRef(null);

  const handleStart = () => {
    const now = Date.now();
    setStartTime(now);
    setCurrentTime(now);

    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now());
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const getFormattedTime = () => {
    if (!startTime || !currentTime) return "00:00:00";

    const elapsed = currentTime - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = Math.floor((elapsed % 1000) / 10); // show 2-digit ms

    const pad = (num) => num.toString().padStart(2, '0');

    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>{getFormattedTime()}</h2>

      <div className="stopwatch">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default App;
