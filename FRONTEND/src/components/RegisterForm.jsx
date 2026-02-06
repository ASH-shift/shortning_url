import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const RegisterForm = ({ state }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(name, password, email);
     navigate({ to: "/auth" })
state(true)

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl px-10 py-10 text-white"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-white/80 text-sm mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-4 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl font-semibold hover:scale-105 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Switch */}
        <div className="text-center mt-6">
          <p className="text-white/80">
            Already have an account?{" "}
            <span
              onClick={() => state(true)}
              className="text-purple-300 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>

      </motion.form>

    </div>
  );
};

export default RegisterForm;
