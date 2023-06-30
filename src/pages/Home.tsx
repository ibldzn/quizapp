import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-wrap justify-around sm:justify-center sm:items-center w-screen h-screen bg-[#F26419]">
      <img
        src="main-logo.png"
        alt="logo"
        className="w-1/2 sm:w-1/4 object-contain"
      />
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl sm:text-5xl text-center font-silkscreen">
          Brain Kom Simulation
        </h1>
        <Link
          to="/categories"
          className="text-2xl sm:text-4xl sm:w-full w-3/4 bg-[#73B1D2] text-center text-white hover:text-[#F26419] rounded-full font-silkscreen"
        >
          Start
        </Link>
      </div>
    </div>
  );
};
