import { useLocalStorage } from "usehooks-ts";
import { Answer } from "../interfaces/Answer";

export const useAnswer = (category: string) => {
  const [answer, setAnswer] = useLocalStorage<Answer>("answer", {} as Answer);

  const addAnswer = (
    questionNumber: number,
    answer: number,
    isCorrect: boolean
  ) => {
    setAnswer((prev) => ({
      ...prev,
      [category]: [
        ...(prev[category] || []),
        {
          questionNumber,
          answer,
          isCorrect,
        },
      ],
    }));
  };

  return {
    answers: answer[category],
    addAnswer,
  };
};
