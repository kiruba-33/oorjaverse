import React, { useEffect, useState, useRef } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const teamMembers = [
  { name: "Ronaldo Bump", role: "Executive Officer", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Marie Ramirez", role: "Project Manager", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Stanley Watson", role: "Senior Consultant", img: "https://randomuser.me/api/portraits/men/28.jpg" },
  { name: "Nancy Patterson", role: "Senior Consultant", img: "https://randomuser.me/api/portraits/women/65.jpg" },
];

const Team = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <section className="relative py-24 bg-[#FAF8F6] overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        }}
      ></div>

      <div className="relative text-center mb-16">
        <p className="text-red-500 font-semibold tracking-wide">— CONSULTING TEAM —</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          DEDICATED EXPERT TEAM
        </h2>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto px-6 flex items-center gap-6">
        {/* Prev Button */}
        <button
          onClick={prev}
          className="hidden sm:flex text-xl p-3 bg-white shadow-md rounded-full hover:bg-red-500 hover:text-white transition"
        >
          <FaChevronLeft />
        </button>

        {/* Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex-1 transition-all duration-500">
          {teamMembers
            .slice(index, index + 4)
            .concat(teamMembers.slice(0, Math.max(0, index + 4 - teamMembers.length)))
            .map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-[#F1EDE4] rounded-full scale-[1.6] -z-10"></div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.role}</p>

                {/* Social Icons */}
                <div className="flex justify-center gap-4">
                  {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, key) => (
                    <div
                      key={key}
                      className="w-10 h-10 bg-[#1b2433] text-white rounded-full flex justify-center items-center hover:bg-red-500 transition cursor-pointer"
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="hidden sm:flex text-xl p-3 bg-white shadow-md rounded-full hover:bg-red-500 hover:text-white transition"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Team;
