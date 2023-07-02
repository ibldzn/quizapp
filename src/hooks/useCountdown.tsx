import { useEffect, useState } from "react";

export const useCountdown = (durationMs: number) => {
  const [timeLeft, setTimeLeft] = useState(durationMs);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMs]);

  return timeLeft;
};
