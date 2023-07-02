import { useLocalStorage } from "usehooks-ts";
import { Answer } from "../interfaces/Answer";

export const useAnswer = (category: string) => {
  const [answer, setAnswer] = useLocalStorage<Answer>("answer", {} as Answer);

  const editAnswer = (
    questionNumber: number,
    answerIndex: number,
    isCorrect: boolean
  ) => {
    setAnswer((prev) => ({
      ...prev,
      [category]: prev[category]?.map((answer) => {
        if (answer.questionNumber === questionNumber) {
          return {
            questionNumber,
            answer: answerIndex,
            isCorrect,
          };
        }

        return answer;
      }),
    }));
  };

  const addAnswer = (
    questionNumber: number,
    answerIndex: number,
    isCorrect: boolean
  ) => {
    // if it already exists, edit the answer
    if (
      answer[category]?.find(
        (answer) => answer.questionNumber === questionNumber
      )
    ) {
      return editAnswer(questionNumber, answerIndex, isCorrect);
    }

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
