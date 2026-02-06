import React from "react";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm">

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Shortify 🔗
          </Link>

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">

            <Link
              to="/dashboard"
              className="text-white font-medium hover:text-gray-200 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/auth"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Login
            </Link>

          </div>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;
