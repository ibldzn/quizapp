import { useEffect } from "react";
import { useQuestions } from "../context/Question";
import { Category } from "../components/Category";

export const Categories = () => {
  const questions = useQuestions();
  const categories = Object.keys(questions);

  useEffect(() => {
    console.log(categories);
  }, [questions]);

  return (
    <>
      <div className="grid place-items-center w-screen h-screen bg-[#86BBD8] overflow-auto">
        <div className="flex flex-col my-4">
          <span className="font-silkscreen text-3xl sm:text-5xl text-center">
            Categories
          </span>
          <span className="font-inter font-semibold uppercase sm:text-xl text-center">
            Pick a category
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-3/4 mb-4">
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </div>
      </div>
    </>
  );
};
