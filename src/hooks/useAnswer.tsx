import { useLocalStorage } from "usehooks-ts";
import { Answer } from "../interfaces/Answer";

export const useAnswer = (category: string) => {
  const [answer, setAnswer] = useLocalStorage<Answer>("answer", {} as Answer);

  const addAnswer = (
    questionNumber: number,
    answerIndex: number,
    isCorrect: boolean
  ) => {
    setAnswer((prev) => ({
      ...prev,
      [category]: [
        ...(prev[category] || []),
        {
          questionNumber,
          answer: answerIndex,
          isCorrect,
        },
      ],
    }));
  };

  const resetAnswers = () => {
    setAnswer((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  return {
    answers: answer[category],
    addAnswer,
    resetAnswers,
  };
};
