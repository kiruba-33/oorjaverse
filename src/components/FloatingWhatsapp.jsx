import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsapp() {
  const whatsappNumber = "YOUR_PHONE_NUMBER"; // example: 919876543210

  return (
     <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6
                 w-12 h-12 flex items-center justify-center
                 bg-green-500 text-white rounded-full shadow-lg
                 hover:scale-110 transition z-[9999]"
    >
      <FaWhatsapp size={22} />
    </a>
  );
}
