import { useState, useEffect } from "react";

export function useCountdownTimer(initialTime, startTimer) {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    let countdown;
    if (startTimer) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [startTimer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const resetTimer = () => {
    setTimer(initialTime);
  };
  return {
    timer,
    formatTime,
    resetTimer,
  };
}
