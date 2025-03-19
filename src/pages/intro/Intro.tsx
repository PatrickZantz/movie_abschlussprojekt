import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadingTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    return () => {
      clearTimeout(fadingTimer);
    };
  }, []);

  return (
    <div>
      <section
        className={`bg-primary absolute inset-0 flex h-dvh items-center justify-center text-4xl font-bold text-white transition-all duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        <span className="animate-bounce">.MOV</span>
      </section>
      <section
        className={`from-primary relative flex h-dvh flex-col justify-between bg-linear-to-tl to-red-400 ${isFading ? "opacity-100" : "opacity-0"} transition-all duration-500 ease-in-out`}
      >
        <div className="flex h-1/2 items-center justify-center">
          <img
            src="/intro.png"
            alt="intro image"
            className="absolute inset-0 w-full overflow-clip object-contain px-5 pt-10"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 bg-white py-14">
          <h1 className="px-8 text-center text-3xl leading-10 font-bold">
            Enjoy Your Movie
            <br />
            Watch Everywhere
          </h1>
          <p className="px-8 text-center leading-6">
            Stream unlimited movies and TV shows on your phone,tablet, laptop,
            and TV.
          </p>
          <Link to="/home">
            <button className="bg-primary mx-auto rounded-md px-4 py-2 text-lg font-bold text-white">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Intro;
