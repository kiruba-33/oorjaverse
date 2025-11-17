// src/pages/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

/* ===== Animation Variants (Performance Optimized) ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 }
};

const Contact = ({ openChatGlobal }) => {
  return (
    <motion.div
      className="min-h-screen bg-white px-6 md:px-8 pt-[180px] md:pt-[200px]"
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <div className="text-center mb-16 transform-gpu">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-gray-900"
        >
          Contact <span className="text-red-600">Us</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-3 w-24 h-1 bg-red-600 mx-auto rounded-full"
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
        >
          We're here to help and answer any questions you might have. Let’s get in touch!
        </motion.p>
      </div>

      {/* Contact Info + Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* LEFT BOX */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 transform-gpu"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Get In Touch</h2>

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

          {/* Live Chat Button */}
          <motion.button
            onClick={openChatGlobal}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-red-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:bg-red-700 transition w-full sm:w-auto"
          >
            💬 Start Live Chat
          </motion.button>
        </motion.div>

        {/* RIGHT BOX – FORM */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 transform-gpu"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500" />
              <input type="email" placeholder="Email" className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Phone" className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500" />
              <input type="text" placeholder="Subject" className="border p-3 rounded-md w-full focus:ring-2 focus:ring-red-500" />
            </div>

            <textarea placeholder="Your Message" className="border p-3 rounded-md w-full h-32 focus:ring-2 focus:ring-red-500"></textarea>

            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition shadow-md">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* GOOGLE MAP SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-16 overflow-hidden rounded-2xl shadow-xl border border-red-100 transform-gpu"
      >
        <iframe
          title="Oorjaverse Location"
          loading="lazy"
          className="w-full h-[350px] md:h-[450px]"
          style={{ border: 0 }}
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.64060040406!2d77.0887581!3d28.4594968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193f0db1f3d7%3A0x1daa1c08bcf3a1ad!2sGolf%20Course%20Rd%2C%20Sector%2053%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1731841476403!5m2!1sen!2sin"
        ></iframe>
      </motion.div>

      {/* BOTTOM SPACING */}
      <div className="h-20" />
    </motion.div>
  );
};

export default Contact;
