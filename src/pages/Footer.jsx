import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative bg-[#0c111b] text-white pt-20 pb-10 overflow-hidden"
    >
      {/* Dotted Pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff18 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      ></div>

      {/* Soft Glow */}
      <div className="absolute top-16 left-12 w-52 h-52 bg-red-500 blur-2xl opacity-35 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
        {/* COLUMN 1 */}
        <div>
          <img
            src={logo}
            className="w-36 mb-6 drop-shadow-[0_0_15px_rgba(255,0,80,0.4)]"
            alt="Company Logo"
          />

          <p className="text-gray-300 leading-relaxed">
            We offer smart and effective business growth solutions with strong
            strategy, innovative ideas, and digital execution.
          </p>

          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-[#1b2433] flex justify-center items-center 
                hover:bg-red-600 transition cursor-pointer"
              >
                <Icon className="text-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Useful Links</h3>
          <ul className="space-y-3 text-gray-300">
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" },
              { name: "Services", link: "/services" },
              { name: "Blog", link: "/blog" },
              { name: "Portfolio", link: "/portfolio" },
              { name: "Contact", link: "/contact" },
            ].map((item, i) => (
              <li
                key={i}
                onClick={() => goTo(item.link)}
                className="hover:text-red-500 cursor-pointer transition"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-3 text-gray-300">
            {[
              { name: "IT Services", link: "/services/it-services" },
              { name: "App Development", link: "/services/app-development" },
              { name: "Quality Testing", link: "/services/quality-testing" },
              { name: "Website Development", link: "/services/website-development" },
              { name: "Hosting", link: "/services/hosting" },
              { name: "Cloud-based Server", link: "/services/cloud-server" },
            ].map((item, i) => (
              <li
                key={i}
                onClick={() => goTo(item.link)}
                className="hover:text-red-500 cursor-pointer transition"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ COLUMN 4 — Recent Posts (updated to use local images) */}
        <div>
          <h3 className="text-xl font-bold mb-4">Recent Posts</h3>

          {[
            { id: 1, src: "/portfolIoimages/portimg1.jpg" },
            { id: 2, src: "/portfolIoimages/portimg2.jpg" },
          ].map((post) => (
            <div
              key={post.id}
              onClick={() => goTo("/portfolio")}
              className="flex items-center gap-4 mb-6 cursor-pointer group sm:flex-row flex-col sm:items-center"
            >
              <img
                src={post.src}
                className="w-14 h-14 sm:w-14 sm:h-14 rounded-lg object-cover shadow-md group-hover:shadow-[0_0_12px_rgba(255,0,80,0.4)] transition"
                alt={`post-${post.id}`}
              />
              <div className="mt-2 sm:mt-0 text-center sm:text-left">
                <p className="text-sm text-gray-400">30 October, 2024</p>
                <p className="text-gray-200 font-medium group-hover:text-red-500 transition">
                  Business growth strategy for teams
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-14 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        Copyright © {new Date().getFullYear()} Navi Promotions. All Rights Reserved.
        <br />
        Designed by{" "}
        <a
          href="https://navipromotions.in/"
          target="_blank"
          className="text-red-400 hover:text-red-500 font-semibold"
        >
          Navi Promotions
        </a>
      </div>
    </motion.footer>
  );
};

export default Footer;
