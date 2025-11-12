import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 🧹 Clear messages automatically when the chat closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]); // reset chat messages
      setInput("");    // clear input
    }
  }, [isOpen]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden border border-red-200 z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-red-600 text-white px-4 py-3">
            <h3 className="font-semibold text-lg">Live Chat</h3>
            <button onClick={onClose} className="hover:text-gray-200">
              <FaTimes />
            </button>
          </div>

          {/* Messages area */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center mt-20">Start a conversation!</p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-red-100 ml-auto text-right"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Input box */}
          <div className="flex items-center border-t p-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveChat;
