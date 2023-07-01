import { Link } from "react-router-dom";
import { useQuestions } from "../context/Questions";
import { useAnswer } from "../hooks/useAnswer";

export interface ICategoryProps {
  category: string;
}

export const Category = ({ category }: ICategoryProps) => {
  const questions = useQuestions()[category];
  const { answers, addAnswer } = useAnswer(category);

  const correctAnswers = answers?.filter((answer) => answer.isCorrect);
  const wrongAnswers = answers?.filter((answer) => !answer.isCorrect);

  const renderCorrectAnswers = () => (
    <span className="text-green-500">{correctAnswers?.length || 0}</span>
  );

  const renderWrongAnswers = () => (
    <span className="text-red-500">{wrongAnswers?.length || 0}</span>
  );

  return (
    <Link
      to={`/categories/${category}`}
      className="flex flex-col justify-center items-center relative bg-[#73B1D2] w-full sm:w-[calc(50%_-_2rem)] p-4 rounded-lg"
    >
      <div className="absolute top-4 right-4 w-4 h-4 flex justify-center items-center">
        <div className="flex flex-col font-inter text-xs text-white">
          <span>
            {answers?.length || 0}/{questions?.length || 0}
          </span>
          <div className="flex justify-end">
            {renderCorrectAnswers()}/{renderWrongAnswers()}
          </div>
        </div>
      </div>
      <img
        src={`/${category}-logo.png`}
        alt={category}
        className="w-16 h-16 object-cover rounded-full"
      />
      <div className="font-silkscreen text-center mt-2">{category}</div>
    </Link>
  );
};
