import TrendingMovies from "../../components/trendingMovies/TrendingMovies";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <section className="searchHome">
      <div className="mt-30">
        <TrendingMovies />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
