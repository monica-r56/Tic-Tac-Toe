
import React, { useEffect, useState } from 'react';

interface TimerProps {
  isActive: boolean;
  onTimeout: () => void;
  reset: boolean;
}

const Timer: React.FC<TimerProps> = ({ isActive, onTimeout, reset }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    if (reset) {
      setTimeLeft(30);
    }
  }, [reset]);
  
  useEffect(() => {
    let timer: number | undefined;
    
    if (isActive && timeLeft > 0) {
      timer = window.setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      onTimeout();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, timeLeft, onTimeout]);
  
  const dashoffset = circumference * (1 - timeLeft / 30);
  
  const timerColor = () => {
    if (timeLeft > 20) return 'stroke-green-500';
    if (timeLeft > 10) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="relative w-24 h-24 flex items-center justify-center glass-card rounded-full animate-pulse-scale">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          className="stroke-gray-200/30"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          className={`${timerColor()} transition-colors duration-300`}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <span className="text-2xl font-bold z-10">{timeLeft}</span>
    </div>
  );
};

export default Timer;
