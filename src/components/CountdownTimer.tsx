
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 30,
  initialSeconds = 0,
  onComplete,
  className = ""
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          if (onComplete) onComplete();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(myInterval);
  }, [minutes, seconds, onComplete]);

  return (
    <div className={`flex items-center font-mono text-lg font-bold ${className}`}>
      <div className="bg-gray-800 px-3 py-2 rounded-md">
        {minutes < 10 ? `0${minutes}` : minutes}
      </div>
      <span className="mx-1">:</span>
      <div className="bg-gray-800 px-3 py-2 rounded-md">
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default CountdownTimer;
