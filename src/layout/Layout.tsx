import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {location.pathname !== "/" &&
        !location.pathname.startsWith("/movie/") && <Header />}
      <main className="grow">
        <Outlet />
      </main>
      {location.pathname !== "/" && !location.pathname.startsWith("/movie/") && <Footer />}
    </div>
  );
}

