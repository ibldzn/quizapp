export interface IOptionsProps {
  options: string[];
}

export const Options = ({ options }: IOptionsProps) => {
  return (
    <div className="flex flex-col w-full gap-4">
      {options.map((option) => (
        <div
          key={option}
          className="flex flex-col justify-center bg-[#6595d0] w-full p-4 rounded-lg hover:cursor-pointer hover:bg-[#4a80c0]"
        >
          <div className="font-inter">{option}</div>
        </div>
      ))}
    </div>
  );
};
