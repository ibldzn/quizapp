import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";

export interface IUseTimerProps {
  durationMs: number;
  onTimeUp?: () => void;
}

export const useTimer = ({ durationMs, onTimeUp }: IUseTimerProps) => {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      intervalMs: 1000,
      countStart: durationMs,
    });

  useEffect(startCountdown, [startCountdown]);

  useEffect(() => {
    if (count === 0) {
      stopCountdown();
      onTimeUp?.();
    }
  }, [count, stopCountdown, onTimeUp]);

  return [count, { startCountdown, stopCountdown, resetCountdown }];
};
