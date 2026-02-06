import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";
import { motion } from "framer-motion";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">

      {/* URL Input */}
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste your long URL here..."
        className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Custom Slug */}
      {isAuthenticated && (
        <input
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="Custom slug (optional)"
          className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      )}

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white font-semibold hover:scale-105 transition"
      >
        Shorten URL 🚀
      </button>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-500/20 text-red-200 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Result */}
      {shortUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-md p-5 rounded-xl"
        >
          <p className="text-white mb-2 font-semibold">
            Your shortened URL
          </p>

          <div className="flex items-center">
            <input
              readOnly
              value={shortUrl}
              className="flex-1 p-3 rounded-l-xl bg-white/30 text-white outline-none"
            />

            <button
              onClick={handleCopy}
              className={`px-5 py-3 rounded-r-xl transition ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UrlForm;
