import { useEffect, useState } from "react";

export const TimersContainer = () => {
  const [initialTime, setInitialTime] = useState(100);
  const [remainingTime, setRemainingTime] = useState(100);
  const [status, setStatus] = useState("paused");

  const onChangeInitialTime = (e) => {
    const time = Number(e.target.value);
    setInitialTime(time);
    setRemainingTime(time);
  };

  const onPlay = () => {
    setStatus("play");
  };

  const onPause = () => {
    setStatus("paused");
  };

  const onReset = () => {
    setStatus("paused");
    setRemainingTime(initialTime);
  };

  useEffect(() => {
    if (status === "paused") return;

    const timeout = setTimeout(() => {
      setRemainingTime((prev) => {
        if (prev === 0) return prev;
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [remainingTime, status]);

  return (
    <div>
      <h1>{remainingTime}</h1>

      <input type="number" value={initialTime} onChange={onChangeInitialTime} />

      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
