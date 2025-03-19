import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MainProvider from "./context/MainProvider";
import Home from "./pages/home/Home";
import SearchPage from "./pages/searchPage/SearchPage";
import MovieDetail from "./pages/movieDetail/MovieDetail";

export default function App() {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movie/:id" element={<MovieDetail />} />
          </Route>
        </Routes>
      </Router>
    </MainProvider>
  );
}
