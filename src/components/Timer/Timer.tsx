import { useState, useRef, useEffect } from 'react';
import styled from './Timer.module.css';

interface TimerProps {
  title: string;
  onClose: () => void;
}

const Timer: React.FC<TimerProps> = ({ title, onClose }) => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number>();

  useEffect(() => {
    return () => stopTimer();
  }, []);

  const addTick = () => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1);
  };

  const startTimer = () => {
    setIsRunning(true);
    addTick();
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const continueTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      addTick();
    }
  };

  const resetTimer = () => {
    setTime(0);
    stopTimer();
  };

  return (
    <div className={styled.timer}>
      <div className={styled.header}>
        <div className={styled.head}>
          <h2 className={styled.title}>{title}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <p className={styled.time}>{time}</p>
      </div>
      <div className={styled.buttons}>
        {!isRunning && time === 0 && (
          <button onClick={startTimer}>Start</button>
        )}
        {time > 0 && (
          <>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={continueTimer}>Continue</button>
          </>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
