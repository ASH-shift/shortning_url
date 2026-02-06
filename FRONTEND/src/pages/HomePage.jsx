import React from "react";
import UrlForm from "../components/UrlForm";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-10"
      >

        <h1 className="text-4xl font-bold text-center text-white mb-2">
          URL Shortener 🚀
        </h1>

        <p className="text-center text-white/80 mb-6">
          Turn long links into short & shareable ones
        </p>

        <UrlForm />

      </motion.div>

    </div>
  );
};

export default HomePage;
