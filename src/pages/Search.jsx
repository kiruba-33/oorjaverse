import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const demoResults = [
  {
    title: "Business Strategy Planning",
    description: "We help businesses create future-ready growth planning.",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60"
  },
  {
    title: "Creative Market Analysis",
    description: "Deep analysis & insights for modern business challenges.",
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde6a?auto=format&fit=crop&w=800&q=60"
  },
  {
    title: "Client Relationship Growth",
    description: "Improve communication & trust with your clients.",
    img: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=60"
  }
];

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = demoResults.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="min-h-screen px-6 py-24 bg-gradient-to-br from-[#0d0d0d] via-[#161616] to-[#0d0d0d] text-white">

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto text-center mb-16 relative">

        <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-full p-3 shadow-[0_0_20px_rgba(255,0,0,0.4)]">

          <FaSearch className="text-red-400 text-xl ml-4" />

          <input
            type="text"
            placeholder="Search here..."
            className="w-full bg-transparent outline-none px-4 py-2 text-white text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* CANCEL BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full mr-2 transition shadow-lg hover:shadow-red-700/40"
          >
            <FaTimes />
          </button>

        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filtered.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl overflow-hidden cursor-pointer shadow-xl"
          >
            <img src={item.img} className="h-52 w-full object-cover" alt="" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Search;
