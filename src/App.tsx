import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MovieList from './components/movieList/MovieList';
import MainProvider from './context/MainProvider'; // Importieren Sie den MainProvider

export default function App() {
  return (
    <MainProvider> {/* Wickeln Sie den MainProvider um den Router */}
      <Router>
        <Routes>
          {/* Root Route mit Layout */}
          <Route path="/" element={<Layout />}>
            {/* Child Route für die MovieList */}
            <Route index element={<MovieList />} />
          </Route>
        </Routes>
      </Router>
    </MainProvider>
  );
}
