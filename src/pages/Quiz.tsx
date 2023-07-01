import { useNavigate, useParams } from "react-router-dom";
import { Timer } from "../components/Timer";
import { useQuestions } from "../context/Questions";
import { useEffect, useState } from "react";
import { Options } from "../components/Options";
import { useTimer } from "../hooks/useTimer";

export const Quiz = () => {
  const navigate = useNavigate();
  const questions = useQuestions();
  const { category } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);

  const handleNext = () => {
    if (questionNumber + 1 === activeQuestions.length) {
      navigate("/categories");
      return;
    }
    resetCountdown();
    setQuestionNumber((prev) => prev + 1);
  };

  const [countdown, { startCountdown, stopCountdown, resetCountdown }] =
    useTimer({
      durationMs: 3000,
      onTimeUp: handleNext,
    });

  if (!category) {
    navigate("/categories");
    return null;
  }

  const activeQuestions = questions[category];
  if (!activeQuestions) {
    navigate("/categories");
    return null;
  }

  useEffect(() => {
    startCountdown();
    return () => setQuestionNumber(0);
  }, [questionNumber]);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-[#86BBD8]">
      <h1 className="text-3xl sm:text-5xl text-center font-silkscreen text-white">
        {category}
      </h1>
      <span className="font-silkscreen text-center">
        Question {questionNumber + 1}/{activeQuestions.length}
      </span>
      <div className="w-full h-auto">
        <Timer durationMs={countdown as number} onTimeUp={handleNext} />
      </div>
      <div className="flex flex-col justify-center items-center bg-white w-[calc(100%_-_1rem)] m-4 p-4 rounded-lg">
        <span className="font-inter text-center overflow-auto mb-4">
          {activeQuestions[questionNumber].question}
        </span>
        <Options options={activeQuestions[questionNumber].choices} />
      </div>
    </div>
  );
};

// <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
//   {activeQuestions[questionNumber].choices.map((answer) => (
//     <button
//       key={answer}
//       className="bg-[#73B1D2] w-full sm:w-[calc(50%_-_2rem)] p-4 rounded-lg"
//     >
//       {answer}
//     </button>
//   ))}
//
//   <button
//     className="bg-[#73B1D2] w-full sm:w-[calc(50%_-_2rem)] p-4 rounded-lg"
//     onClick={() => {
//       setQuestionNumber((prev) => prev + 1);
//     }}
//   >
//     Next
//   </button>
// </div>
