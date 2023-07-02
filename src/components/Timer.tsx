import { useEffect, useState } from "react";

const formatTime = (timeMs: number) => {
  const minutes = Math.floor(timeMs / 1000 / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timeMs / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export interface ITimerProps {
  durationMs: number;
  onTimeUp?: () => void;
}

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative w-full h-2 bg-[#73B1D2] rounded-lg overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-[#F9C74F] transition-[width] ease-linear"
        style={{ width: `${100 - progress}%` }}
      ></div>
    </div>
  );
};

export const Timer = ({ durationMs, onTimeUp }: ITimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationMs);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          return prevTimeLeft;
        }

        return prevTimeLeft - 1000;
      });
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
      onTimeUp?.();
    }

    return () => clearInterval(interval);
  }, [onTimeUp]);

  return (
    <div className="flex flex-col w-full h-auto px-4">
      <div className="font-silkscreen text-md text-end">
        {formatTime(timeLeft)}
      </div>
      <ProgressBar progress={(timeLeft / durationMs) * 100} />
    </div>
  );
};
