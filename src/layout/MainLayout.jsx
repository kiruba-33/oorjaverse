import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import Particles from "react-tsparticles";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="relative">

        <Particles/>
{/* All pages will load here */}
      <Outlet />
      </div>
      

      <Footer />
    </>
  );
}
