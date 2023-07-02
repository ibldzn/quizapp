import { useQuestions } from "../context/Questions";
import { Category } from "../components/Category";
import { useAnswer } from "../hooks/useAnswer";

export const Categories = () => {
  const questions = useQuestions();
  const categories = Object.keys(questions);
  const totalQuestions = categories
    .map((category) => questions[category].length)
    .reduce((acc, curr) => acc + curr, 0);
  const correctAnswers = categories
    .map((category) => {
      const { answers } = useAnswer(category);
      return answers?.filter((answer) => answer.isCorrect);
    })
    .filter((answer) => answer?.length)
    .reduce((acc, curr) => acc + curr?.length, 0);

  return (
    <div className="grid place-items-center w-screen h-screen bg-[#86BBD8] overflow-auto">
      <div className="flex flex-col my-4 text-white">
        <span className="font-silkscreen text-3xl sm:text-5xl text-center">
          Categories
        </span>
        <span className="font-inter font-semibold uppercase sm:text-xl text-center">
          Pick a category
        </span>
        <span className="font-inter font-semibold uppercase sm:text-xl text-center">
          Score: {correctAnswers}/{totalQuestions}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-3/4 mb-4">
        {categories.map((category) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </div>
  );
};
