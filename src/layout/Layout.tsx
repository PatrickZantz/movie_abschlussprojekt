import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Layout() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <Header />}
      <main>
        <Outlet />
      </main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}
