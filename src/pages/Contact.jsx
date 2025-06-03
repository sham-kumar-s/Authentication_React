import React from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Contact Us</h2>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-2 mb-3 text-gray-700 transition"
        >
          <Mail className="w-5 h-5 text-pink-500" />
          <a href="mailto:sham79198@gmail.com" className="hover:underline">
             sham79198@gmail.com
          </a>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-2 text-gray-700 transition"
        >
          <Phone className="w-5 h-5 text-pink-500" />
          <span>+91 93619 909512</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
