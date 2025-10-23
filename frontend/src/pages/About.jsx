import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("/api/public/about");
        setAbout(res.data[0]);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading About section...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  if (!about)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        No About info found.
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-12 bg-gradient-to-b from-gray-950 to-black text-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-cyan-400 text-center mb-12"
      >
        About Me
      </motion.h1>

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
        {/* 🧊 Intro Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-8 hover:shadow-cyan-500/20"
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">
            {about.title}
          </h2>
          <h3 className="text-xl text-gray-300 mb-4">{about.subtitle}</h3>
          <p className="text-gray-400 leading-relaxed">{about.description}</p>
        </motion.div>

        {/* 🧠 Tech Stack */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-8 hover:shadow-cyan-500/20"
        >
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {about.technologies && about.technologies.length > 0 ? (
              about.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 text-cyan-300 rounded-full text-sm font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No technologies listed.</p>
            )}
          </div>
        </motion.div>

        {/* 🎯 Goal */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-8 hover:shadow-purple-500/20"
        >
          <h2 className="text-2xl font-semibold text-purple-400 mb-3">Goal</h2>
          <p className="text-gray-400 leading-relaxed">
            {about.goal || "No goal specified yet."}
          </p>
        </motion.div>

        {/* 🚀 Learning */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-8 hover:shadow-blue-500/20"
        >
          <h2 className="text-2xl font-semibold text-blue-400 mb-3">
            Currently Learning
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {about.learning || "Nothing added yet."}
          </p>
        </motion.div>

        {/* 🎮 Hobbies */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-8 hover:shadow-pink-500/20 lg:col-span-2"
        >
          <h2 className="text-2xl font-semibold text-pink-400 mb-4">Hobbies</h2>
          <div className="flex flex-wrap gap-3">
            {about.hobbies && about.hobbies.length > 0 ? (
              about.hobbies.map((hobby, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/30 text-pink-300 rounded-full text-sm font-medium"
                >
                  {hobby}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No hobbies listed.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* 🔗 Call-to-Action */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mt-16 flex justify-center"
      >
        <a
          href="/projects"
          className="px-8 py-3 rounded-full text-white font-semibold 
            bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
            shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
        >
          View My Work →
        </a>
      </motion.div>
    </div>
  );
}
