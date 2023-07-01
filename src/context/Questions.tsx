import { ReactNode, createContext, useContext, useState } from "react";
import { Question } from "../interfaces/Question";
import questionsJson from "../../questions.json";

const QuestionsContext = createContext<Question>({} as Question);

export const QuestionsProvider = ({ children }: { children: ReactNode }) => {
  const [questions, _] = useState<Question>(questionsJson);

  return (
    <QuestionsContext.Provider value={questions}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionsContext);
