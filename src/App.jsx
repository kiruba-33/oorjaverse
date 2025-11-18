// src/App.jsx
import React, { Suspense, lazy } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

const Home = lazy(() => import("./pages/Home"));

import MouseFollower from "./components/MouseFollower";
const Contact = lazy (()=> import ('./pages/Contact'))
import LiveChat from "./components/LiveChat";

import About from "./pages/About";
import Search from "./pages/Search";
import Service from "./pages/services/Service";

import BlogIndex, {
  TechNewsPage,
  HowToGuidesPage,
  CompanyUpdatesPage,
} from "./pages/BlogCategories";

const ITServices = lazy (()=> import ('./pages/services/ITServices'))
import AppDevelopment from "./pages/services/AppDevelopment";
import QualityTesting from "./pages/services/QualityTesting";
const WebsiteDev = lazy(() => import("./pages/services/WebsiteDevelopment"));
import Hosting from "./pages/services/Hosting";
import CloudServer from "./pages/services/CloudServer";
import PortfolioPage from "./pages/Portfolio";
import Preloader from "./components/Preloader";
import ScrollToTopButton from "./components/ScrollToTopButton";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import { HelmetProvider } from "react-helmet-async"
import Navbar from "./components/Navbar";

// ❌ REMOVED duplicate MainLayout import here

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
    <HelmetProvider>

      <Suspense fallback={<Preloader />}>
      <Navbar/>
        <MouseFollower />
        <ScrollToTopButton/>
        <FloatingWhatsapp/>

        {/* ROUTING FIXED */}
        <Routes>
          {/* Wrap all routes inside MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/contact"
              element={<Contact openChatGlobal={() => setIsChatOpen(true)} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/services" element={<Service />} />
            <Route path="/portfolio" element={<PortfolioPage />} />

            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/tech-news" element={<TechNewsPage />} />
            <Route path="/blog/how-to-guides" element={<HowToGuidesPage />} />
            <Route path="/blog/company-updates" element={<CompanyUpdatesPage />} />

            {/* Service Pages */}
            <Route path="/services/it-services" element={<ITServices />} />
            <Route path="/services/app-development" element={<AppDevelopment />} />
            <Route path="/services/quality-testing" element={<QualityTesting />} />

            <Route path="/services/website-development" element={<WebsiteDev />} />

            <Route path="/services/hosting" element={<Hosting />} />
            <Route path="/services/cloud-server" element={<CloudServer />} />
          </Route>
        </Routes>

        {/* Live Chat (Global) */}
        <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </Suspense>
      </HelmetProvider>
      </>
  );
}

export default App;
