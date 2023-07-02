import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuestions } from "../context/Questions";
import { useEffect, useRef, useState } from "react";
import { useAnswer } from "../hooks/useAnswer";

const TIME_LIMIT = 30; // seconds

const formatTime = (timeMs: number) => {
  const minutes = Math.floor(timeMs / 1000 / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timeMs / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const correctIndicator = () => (
  <div className="flex justify-center items-center w-8 h-8 rounded-full bg-green-600 absolute">
    <span className="text-white font-bold">✓ Correct</span>
  </div>
);

const wrongIndicator = () => (
  <div className="flex justify-center items-center w-8 h-8 rounded-full bg-red-600 absolute">
    <span className="text-white font-bold">✗ Wrong</span>
  </div>
);

export const Quiz = () => {
  const navigate = useNavigate();
  const questions = useQuestions();
  const { category } = useParams();
  const { answers, addAnswer, resetAnswers } = useAnswer(category!);
  const timerRef = useRef<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [activeQuestions, _] = useState(questions[category!]);
  const [questionNumber, setQuestionNumber] = useState(
    answers && answers.length ? answers.length - 1 : 0
  );
  const [currentQuestion, setCurrentQuestion] = useState(
    activeQuestions[questionNumber]
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const setupTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimePassed((prev) => (prev >= TIME_LIMIT ? TIME_LIMIT : prev + 1));
    }, 1000);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);

    if (questionNumber + 1 < activeQuestions.length) {
      setQuestionNumber((prev) => prev + 1);
      setCurrentQuestion(activeQuestions[questionNumber + 1]);
      setTimePassed(0);
    } else {
      setQuizFinished(true);
      setTimeout(() => {
        navigate(`/results/${category}`);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!quizFinished) {
      setupTimer();
    }

    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [quizFinished]);

  useEffect(() => {
    if (timePassed >= TIME_LIMIT) {
      handleNextQuestion();
      addAnswer(questionNumber, -1, false);
    }
  }, [timePassed]);

  return (
    <div className="flex flex-col items-center relative w-screen h-screen bg-[#86BBD8] overflow-auto p-4">
      <Link
        to="/categories"
        className="absolute top-0 left-0 m-4 text-white font-silkscreen text-2xl"
      >
        <span className="text-white font-silkscreen text-sm sm:text-md md:text-2xl">
          ← Back
        </span>
      </Link>
      <h1 className="text-3xl sm:text-5xl text-center font-silkscreen text-white">
        {category}
      </h1>
      <span className="font-silkscreen text-center">
        Question {questionNumber + 1}/{activeQuestions.length}
      </span>
      <div
        key={questionNumber}
        className="flex justify-center items-center w-full mt-[18px]"
      >
        {/* Start time */}
        <span className="text-gray-600 text-xs font-normal">
          {formatTime(timePassed * 1000)}
        </span>

        {/* Bar */}
        <div className="relative flex-1 h-3 bg-[#F0F0F0] mx-1 rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-brand-cerulean-blue rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(timePassed / TIME_LIMIT) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        {/* End time */}
        <span className="text-gray-600 text-xs font-normal">
          {formatTime(TIME_LIMIT * 1000)}
        </span>
      </div>
      <div
        className={`flex flex-col items-center bg-white w-full h-${
          currentQuestion.image ? "full" : "auto"
        } m-4 p-4 rounded-lg`}
      >
        {currentQuestion.image && (
          <img
            className="w-1/4 h-1/4 object-contain"
            src={`/${currentQuestion.image}`}
            alt="Image"
          />
        )}
        <span className="font-inter text-center overflow-auto mb-4">
          {currentQuestion.question}
        </span>
        <div className="flex flex-col w-full gap-4">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={choice}
              disabled={selectedOption !== null}
              className={`flex flex-col text-start font-inter ${
                index !== selectedOption ? "bg-[#6595d0]" : "bg-[#4a80c0]"
              } w-full p-4 rounded-lg hover:cursor-pointer hover:bg-[#4a80c0]`}
              onClick={() => {
                if (
                  !answers?.find(
                    (answer) => answer.questionNumber === questionNumber
                  ) &&
                  !selectedOption
                ) {
                  clearInterval(timerRef.current!);
                  addAnswer(
                    questionNumber,
                    index,
                    index === currentQuestion.answer
                  );
                  setSelectedOption(index);
                }
                setTimeout(() => {
                  handleNextQuestion();
                  setupTimer();
                }, 1000);
              }}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full gap-2">
        <button
          className="flex flex-col text-start text-white font-inter bg-red-600 w-full p-4 rounded-lg hover:cursor-pointer hover:bg-red-700"
          onClick={() => {
            resetAnswers();
            window.location.reload();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
