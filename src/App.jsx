// src/App.jsx
import React,{Suspense,lazy} from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(()=>import('./pages/Home'));
import Navbar from "./components/Navbar";
import MouseFollower from "./components/MouseFollower";
import Contact from "./pages/Contact";
import LiveChat from "./components/LiveChat";

import About from "./pages/About";
import Search from "./pages/Search";
const Footer = lazy(()=> import ('./pages/Footer'));
import Service from "./pages/services/Service";


import BlogIndex, {
 TechNewsPage,
  HowToGuidesPage,
  CompanyUpdatesPage,
} from "./pages/BlogCategories";

import ITServices from "./pages/services/ITServices";
import AppDevelopment from "./pages/services/AppDevelopment";
import QualityTesting from "./pages/services/QualityTesting";
const WebsiteDev = lazy(() => import('./pages/services/WebsiteDevelopment'));
import Hosting from "./pages/services/Hosting";
import CloudServer from "./pages/services/CloudServer";
import PortfolioPage from "./pages/Portfolio";



function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Suspense fallback={<div aira-busy>loading...</div>}>
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
  
<Route path="/services/website-development" element={<WebsiteDev />} />


  <Route path="/services/hosting" element={<Hosting />} />
  <Route path="/services/cloud-server" element={<CloudServer />} />

      </Routes>

      

      {/* ✅ Live Chat (Global) */}
      <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <Footer />
        </Suspense>
  );
}

export default App;
