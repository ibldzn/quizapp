import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuestions } from "../context/Questions";
import { useEffect, useRef, useState } from "react";
import { Options } from "../components/Options";

const TIME_LIMIT = 5; // seconds

const formatTime = (timeMs: number) => {
  const minutes = Math.floor(timeMs / 1000 / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timeMs / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export const Quiz = () => {
  const navigate = useNavigate();
  const questions = useQuestions();
  const { category } = useParams();
  const timerRef = useRef<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState(questions[category!]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    activeQuestions[questionNumber]
  );

  const setupTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimePassed((prev) => (prev >= TIME_LIMIT ? TIME_LIMIT : prev + 1));
    }, 1000);
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
      if (questionNumber + 1 < activeQuestions.length) {
        setQuestionNumber((prev) => prev + 1);
        setCurrentQuestion(activeQuestions[questionNumber + 1]);
        setTimePassed(0);
      } else {
        setQuizFinished(true);

        // setTimeout(() => {
        //   navigate(`/results/${category}`);
        // }, 2000);
      }
    }
  }, [timePassed]);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-[#86BBD8] overflow-auto">
      <h1 className="text-3xl sm:text-5xl text-center font-silkscreen text-white">
        {category}
      </h1>
      <span className="font-silkscreen text-center">
        Question {questionNumber + 1}/{activeQuestions.length}
      </span>
      <div
        key={questionNumber}
        className="flex justify-center items-center w-full mt-[18px] px-4"
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
        className={`flex flex-col items-center bg-white w-[calc(100%_-_1rem)] h-${
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
          {currentQuestion.choices.map((choice) => (
            <div
              key={choice}
              className="flex flex-col justify-center bg-[#6595d0] w-full p-4 rounded-lg hover:cursor-pointer hover:bg-[#4a80c0]"
            >
              <div className="font-inter">{choice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
