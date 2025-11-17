import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      {/* All pages will load here */}
      <Outlet />

      <Footer />
    </>
  );
}
