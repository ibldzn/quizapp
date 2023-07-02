import { Link, useNavigate, useParams } from "react-router-dom";
import { useAnswer } from "../hooks/useAnswer";

export const Results = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { answers, resetAnswers } = useAnswer(category!);

  return (
    <div className="flex flex-col w-screen h-screen bg-[#86BBD8] overflow-auto relative">
      <Link
        to="/categories"
        className="absolute top-0 left-0 m-4 text-white font-silkscreen text-2xl"
      >
        <span className="text-white font-silkscreen text-sm sm:text-md md:text-2xl">
          ← Back
        </span>
      </Link>
      <span className="font-silkscreen text-3xl sm:text-5xl text-center text-white">
        Results
      </span>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="flex flex-col justify-center items-center bg-white w-3/4 p-4 rounded-lg">
          <img
            src={`/${category}-logo.png`}
            alt={category}
            className="w-16 h-16 object-cover rounded-full"
          />
          <span className="font-inter font-semibold uppercase sm:text-xl text-center mt-4">
            {category}
          </span>
          <div className="flex flex-col justify-center items-center mt-4">
            <span className="font-inter font-semibold uppercase sm:text-xl text-center">
              Correct Answers
            </span>
            <span className="font-inter font-semibold uppercase sm:text-xl text-center">
              {answers?.filter((answer) => answer.isCorrect).length || 0}
            </span>

            <span className="font-inter font-semibold uppercase sm:text-xl text-center mt-4">
              Wrong Answers
            </span>
            <span className="font-inter font-semibold uppercase sm:text-xl text-center">
              {answers?.filter((answer) => !answer.isCorrect).length || 0}
            </span>

            <span className="font-inter font-semibold uppercase sm:text-xl text-center mt-4">
              Total Answers
            </span>
            <span className="font-inter font-semibold uppercase sm:text-xl text-center">
              {answers?.length || 0}
            </span>

            <span className="font-inter font-semibold uppercase sm:text-xl text-center mt-4">
              Score
            </span>
            <span className="font-inter font-semibold uppercase sm:text-xl text-center">
              {answers?.filter((answer) => answer.isCorrect).length || 0}/
              {answers?.length || 0}
            </span>
          </div>
          <button
            className="flex flex-col text-start text-white font-inter bg-red-600 p-4 rounded-lg hover:cursor-pointer hover:bg-red-700 mt-4"
            onClick={() => {
              resetAnswers();
              navigate(`/categories/${category}`);
            }}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};
