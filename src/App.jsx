// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MouseFollower from "./components/MouseFollower";
import Contact from "./pages/Contact";
import LiveChat from "./components/LiveChat";

import About from "./pages/About";
import Search from "./pages/Search";
import Footer from "./pages/Footer";
import Service from "./pages/services/Service";
import Portfolio from "./pages/Portfolio";

import BlogIndex, {
 TechNewsPage,
  HowToGuidesPage,
  CompanyUpdatesPage,
} from "./pages/BlogCategories";

import ITServices from "./pages/services/ITServices";
import AppDevelopment from "./pages/services/AppDevelopment";
import QualityTesting from "./pages/services/QualityTesting";
import WebsiteDevelopment from "./pages/services/WebsiteDevelopment";
import Hosting from "./pages/services/Hosting";
import CloudServer from "./pages/services/CloudServer";
import PortfolioPage from "./pages/Portfolio";



function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <MouseFollower />
      <Navbar />

      {/* ✅ PAGE ROUTING */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact openChatGlobal={() => setIsChatOpen(true)} />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/services" element={<Service/>}/>
        <Route path="portfolio" element={<PortfolioPage/>}/>

<Route path="/blog" element={<BlogIndex />} />
<Route path="/blog/tech-news" element={<TechNewsPage />} />
<Route path="/blog/how-to-guides" element={<HowToGuidesPage />} />
<Route path="/blog/company-updates" element={<CompanyUpdatesPage />} />

          {/* ✅ Added Service Pages */}
  <Route path="/services/it-services" element={<ITServices />} />
  <Route path="/services/app-development" element={<AppDevelopment />} />
  <Route path="/services/quality-testing" element={<QualityTesting />} />
  <Route path="/services/website-development" element={<WebsiteDevelopment />} />
  <Route path="/services/hosting" element={<Hosting />} />
  <Route path="/services/cloud-server" element={<CloudServer />} />

      </Routes>

      

      {/* ✅ Live Chat (Global) */}
      <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <Footer />
    </>
  );
}

export default App;
