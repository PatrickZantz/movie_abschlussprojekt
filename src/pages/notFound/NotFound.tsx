import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <section className="flex justify-center">
      {location.pathname === "/profile" ? (
        <article className="flex flex-col items-center gap-10 px-10 pt-20 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">
              🪞 Mirror, mirror on the wall...
            </h2>
            <h3 className="text-lg font-semibold">
              ...still no profile at all. 😢
            </h3>
          </div>
          <p>
            Oops! Looks like we’re not quite ready to show you your fairest self
            yet.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-secondary hover:bg-primary cursor-pointer rounded-md px-4 py-3 font-bold hover:text-white"
          >
            Go to Home
          </button>
        </article>
      ) : location.pathname === "/downloads" ? (
        <article className="flex flex-col items-center gap-10 px-10 pt-20 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">🌀 Buffering reality...</h2>
          </div>
          <p>
            Sorry, offline watching is still a dream — even our popcorn needs
            Wi-Fi. 🍿
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-secondary hover:bg-primary cursor-pointer rounded-md px-4 py-3 font-bold hover:text-white"
          >
            Go to Home
          </button>
        </article>
      ) : (
        <article className="flex flex-col items-center gap-4 px-10 pt-20 text-center">
          <div className="mb-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">🎬 404 – Scene Not Found</h2>
            <h3 className="text-lg font-semibold">
              The page you’re looking for didn’t make the final cut.
            </h3>
          </div>
          <h4 className="font-semibold">What now? 🤷‍♀️</h4>
          <div className="flex flex-col gap-2 text-start">
            <p>👉 Go back to the homepage</p>
            <p>👉 Refresh like a hopeful Netflix user</p>
            <p>
              👉 Or stare dramatically into the distance like in every
              Oscar-nominated film 🎭
            </p>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="bg-secondary hover:bg-primary cursor-pointer rounded-md px-4 py-3 font-bold hover:text-white"
          >
            Go to Home
          </button>
        </article>
      )}
    </section>
  );
};

export default NotFound;
