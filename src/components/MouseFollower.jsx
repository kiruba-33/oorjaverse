import { useState, useEffect } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Navbar.css";

const Navbar = () => {
  
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [q, setQ] = useState("");

  // 🟢 Scroll detector
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // 🔥 UPDATED ONLY THIS SECTION BELOW (TESLA STYLE)
  const navbarStyle = isHome
    ? isScrolled
      ? "bg-white/95 backdrop-blur-md text-black shadow-md" // scrolled look
      : "bg-transparent text-white" // at top
    : "bg-white/95 text-black shadow-md backdrop-blur-md"; // other pages

  return (
    // 🟠 Smooth transition
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out">
      <nav className={`flex justify-between items-center px-6 md:px-12 py-4 ${navbarStyle}`}>

        {/* LOGO */}
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-24 md:w-28 lg:w-32 object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex flex-1 justify-center items-center space-x-10 font-semibold text-lg">

          {/* Home Dropdown */}
          <li
            onMouseEnter={() => setActiveDropdown("Home")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="relative cursor-pointer"
          >
            <span className="flex items-center hover:text-red-500 transition">
              Home <FaChevronDown className="ml-1 text-sm" />
            </span>
            <AnimatePresence>
              {activeDropdown === "Home" && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute bg-white text-black rounded-lg shadow-lg mt-3 w-48 z-50"
                >
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/">Home 1</Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li><Link to="/about" className="hover:text-red-500">About</Link></li>

          {/* Services Dropdown */}
          <li
            onMouseEnter={() => setActiveDropdown("Services")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="relative cursor-pointer"
          >
            <Link to="/services" className="flex items-center hover:text-red-500 transition">
              Services <FaChevronDown className="ml-1 text-sm" />
            </Link>
            <AnimatePresence>
              {activeDropdown === "Services" && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute bg-white text-black rounded-lg shadow-lg mt-3 w-56 z-50"
                >
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/services/it-services">IT Services</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/services/app-development">App Development</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/services/quality-testing">Quality Testing</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/services/website-development">Website Development</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/services/hosting">Hosting</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/services/cloud-server">Cloud Server</Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Blog Dropdown */}
          <li
            onMouseEnter={() => setActiveDropdown("Blog")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="relative cursor-pointer"
          >
            <span className="flex items-center hover:text-red-500 transition">
              Blog <FaChevronDown className="ml-1 text-sm" />
            </span>

            <AnimatePresence>
              {activeDropdown === "Blog" && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute bg-white text-black rounded-lg shadow-lg mt-3 w-56 z-50"
                >
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/blog">All Blogs</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/blog/tech-news">Tech News</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/blog/how-to-guides">How-To Guides</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                    <Link to="/blog/company-updates">Company Updates</Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li><Link to="/portfolio" className="hover:text-red-500">Portfolio</Link></li>
          <li><Link to="/contact" className="hover:text-red-500">Contact</Link></li>
        </ul>

        {/* SEARCH + MOBILE MENU BUTTON */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setShowSearch(true)} className="hidden md:block text-2xl hover:text-red-500 transition">
            <FaSearch />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden text-3xl transition ${isHome && !isScrolled ? "text-white" : "text-black"}`}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* MOBILE & SEARCH remain unchanged */}
      {/* FULL CODE NOT TOUCHED BELOW THIS LINE */}
      {/* .......................................................................... */}
      {/* .......................................................................... */}

      {/* MOBILE MENU with DROPDOWNS */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-full w-72  custom-gradient from-red-600 to-red-800 text-white z-50 shadow-xl flex flex-col"
            >
              {/* ... */}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH MODAL */}
      {/* ... unchanged ... */}
    </header>
  );
};

export default Navbar;
