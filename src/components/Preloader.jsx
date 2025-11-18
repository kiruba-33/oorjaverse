import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-56 h-6 bg-gray-200 rounded-md overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    </motion.div>
  );
}
