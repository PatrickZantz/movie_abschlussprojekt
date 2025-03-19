import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Untergeordnete Routen wie MovieList werden hier gerendert */}
      </main>
    </div>
  );
}
