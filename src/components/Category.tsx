import { Link } from "react-router-dom";

export interface ICategoryProps {
  category: string;
}

export const Category = ({ category }: ICategoryProps) => {
  return (
    <Link
      to={`/categories/${category}`}
      className="flex flex-col justify-center items-center bg-[#73B1D2] w-full sm:w-[calc(50%_-_2rem)] p-4 rounded-lg"
    >
      <img
        src={`/${category}-logo.png`}
        alt={category}
        className="w-16 h-16 object-cover rounded-full"
      />
      <div className="font-silkscreen text-center mt-2">{category}</div>
    </Link>
  );
};
