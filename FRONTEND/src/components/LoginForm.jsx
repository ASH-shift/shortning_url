import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const LoginForm = ({ state }) => {

    const [email, setEmail] = useState('ash@ash.com');
    const [password, setPassword] = useState('123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    console.log(auth);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user));
            navigate({ to: "/dashboard" });
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-md mx-auto">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl px-10 py-10 text-white"
            >

                <h2 className="text-3xl font-bold text-center mb-6">
                    Welcome Back 👋
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-xl text-center">
                        {error}
                    </div>
                )}

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
                        className="w-full p-4 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl font-semibold hover:scale-105 transition ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Signing in..." : "Sign In 🚀"}
                </button>

                {/* Switch */}
                <div className="text-center mt-6">
                    <p className="text-white/80">
                        Don't have an account?{" "}
                        <span
                            onClick={() => state(false)}
                            className="text-purple-300 cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>
                </div>

            </motion.div>

        </div>
    );
};

export default LoginForm;
