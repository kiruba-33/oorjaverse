import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
  <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-6 bottom-24 md:bottom-[5.5rem] 
                 w-12 h-12 flex items-center justify-center
                 bg-red-600 text-white rounded-full shadow-lg
                 hover:scale-110 transition z-[9999]"
    >
      <FaArrowUp size={22} />
    </button>
    )
  );
}
