// src/pages/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = ({ openChatGlobal }) => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-white to-red-50 px-6 md:px-8 pt-[180px] md:pt-[200px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Page Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Contact <span className="text-red-600">Us</span>
        </h1>
        <div className="mt-3 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We're here to help and answer any questions you might have. Let’s get in touch!
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 relative"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Get In Touch
          </h2>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-red-600 text-xl mt-1" />
              <span>
                <strong>Our Office:</strong> Innov8 Orchid Centre, 3rd Floor, Golf Course Road, Sector 53, Gurgaon
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-red-600 text-xl" />
              <span>
                <strong>Call Us:</strong> +91 8178106141
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-red-600 text-xl" />
              <span>
                <strong>Email:</strong> info@oorjaverse.com
              </span>
            </li>
          </ul>

          {/* ✅ Start Live Chat Button */}
        <motion.button
  onClick={openChatGlobal} // ✅ triggers global chat
  whileTap={{ scale: 0.95 }}
  className="mt-8 bg-red-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:bg-red-700 transition w-full sm:w-auto"
>
  💬 Start Live Chat
</motion.button>

        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-red-100"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Phone"
                className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500"
              />
            </div>
            <textarea
              placeholder="Your Message"
              className="border p-3 rounded-md w-full h-32 focus:ring-2 focus:ring-red-500"
            ></textarea>
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition shadow-md">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
