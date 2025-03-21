import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MainProvider from "./context/MainProvider";
import SearchPage from "./pages/searchPage/SearchPage";
import MovieDetail from "./pages/movieDetail/MovieDetail";
import Intro from "./pages/intro/Intro";
import FavoriteMovies from "./pages/favoriteMovies/FavoriteMovies";
import NotFound from "./pages/notFound/NotFound";
import HomePage from "./pages/home/HomePage";

export default function App() {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            <Route path="home" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="favorites" element={<FavoriteMovies />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </MainProvider>
  );
}
