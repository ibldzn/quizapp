import { useNavigate, useParams } from "react-router-dom";
import { Timer } from "../components/Timer";
import { useQuestions } from "../context/Question";
import { useState } from "react";

export const Quiz = () => {
  const navigate = useNavigate();
  const questions = useQuestions();
  const { category } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);

  if (!category) {
    navigate("/categories");
    return null;
  }

  const activeQuestions = questions[category];

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-[#86BBD8]">
      <h1 className="text-3xl sm:text-5xl text-center font-silkscreen text-white">
        {category}
      </h1>
      <span className="font-silkscreen text-center">
        Question {questionNumber + 1}/{activeQuestions.length}
      </span>
      <div className="w-full h-auto">
        <Timer durationMs={60000} />
      </div>
      <div className="flex flex-col justify-center items-center bg-white w-[calc(100%_-_1rem)] m-4 p-4 rounded-lg h-1/5">
        <span className="font-inter text-center overflow-auto">
          {activeQuestions[questionNumber].question}
        </span>
      </div>
    </div>
  );
};
