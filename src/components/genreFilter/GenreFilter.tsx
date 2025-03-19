const GenreFilter = () => {
  const buttonDesign =
    "bg-secondary flex flex-1 items-center justify-center rounded-md min-w-fit py-3 text-gray-950";
  return (
    <section className="genre-filter flex w-full gap-2">
      <button onClick={() => console.log("Action")} className={buttonDesign}>
        Action
      </button>
      <button onClick={() => console.log("Comedy")} className={buttonDesign}>
        Comedy
      </button>
      <button onClick={() => console.log("Horror")} className={buttonDesign}>
        Horror
      </button>
    </section>
  );
};

export default GenreFilter;
