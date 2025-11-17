import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import ParticlesClient from "../components/ParticlesClient"
import Particles from "react-tsparticles";

export default function MainLayout() {
  return (
    <>
      <Navbar />

            {/* Background particles only on desktop */}
      <div className="relative w-full">
        <ParticlesClient className="absolute inset-0 -z-10" />
        
        {/* All pages will load here */}
        <main className="relative z-10">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}
