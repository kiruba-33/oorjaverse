import { useState, useEffect } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navbarStyle = isHome
    ? isScrolled
      ? "bg-white text-black shadow-lg"
      : "bg-transparent text-white"
    : "bg-white text-black shadow-md";

  const submitSearch = () => {
    if (!q.trim()) return setShowSearch(false);
    setShowSearch(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] transition-all duration-300">
      <nav className={`flex justify-between items-center px-6 md:px-12 py-4 ${navbarStyle}`}>

        {/* LOGO */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${isScrolled || !isHome ? "h-16" : "h-24"}`}
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
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/">Home 1</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/home2">Home 2</Link></li>
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
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/services/it-services">IT Services</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/services/app-development">App Development</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/services/quality-testing">Quality Testing</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/services/website-development">Website Development</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/services/hosting">Hosting</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/services/cloud-server">Cloud-Based Server</Link></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* ✅ RESTORED BLOG MENU WITH DROPDOWN */}
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
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/blog">All Blogs</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/blog/tech-news">Tech News</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/blog/how-to-guides">How-To Guides</Link></li>
                  <li className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition"><Link to="/blog/company-updates">Company Updates</Link></li>
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

      {/* ✅ MOBILE MENU (unchanged except link works) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-40" onClick={() => setIsMobileMenuOpen(false)} />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-red-600 to-red-800 text-white z-50 shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-red-300">
                <img src={logo} alt="Logo" className="h-12" />
                <FaTimes className="text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
              </div>

              <ul className="flex flex-col px-5 mt-4 space-y-4 text-lg font-medium">
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
                <li><Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
                <li><Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link></li>
                <li><Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link></li>
                <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
              </ul>

              <button
                onClick={() => { setShowSearch(true); setIsMobileMenuOpen(false); }}
                className="mx-5 mt-auto mb-6 bg-white text-red-600 font-bold py-3 rounded-lg flex items-center justify-center gap-3"
              >
                <FaSearch /> Search
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {showSearch && (
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[99999]" onClick={() => setShowSearch(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} className="relative bg-white p-4 max-w-2xl w-[90%] rounded-xl shadow-2xl flex items-center gap-3">
              <button onClick={() => setShowSearch(false)} className="absolute -top-4 -right-4 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:text-red-600">
                <FaTimes />
              </button>

              <FaSearch className="text-gray-500 text-xl" />
              <input className="flex-1 px-3 py-3 outline-none text-lg" placeholder="Search here..." value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitSearch()} />
              <button onClick={submitSearch} className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md">Search</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
