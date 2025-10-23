import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/api/public/skills");
        setSkills(res.data);
        console.log(res.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading skills...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen pt-24 px-6 sm:px-12 bg-gradient-to-b from-gray-950 to-black text-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-cyan-400 text-center mb-10"
      >
        My Skills
      </motion.h1>

      {/* 🧊 Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.08 }}
            className="relative flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            {/* Skill Icon */}
            {skill.icon ? (
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-16 h-16 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-cyan-500/10 border border-cyan-400/30 rounded-full mb-3 text-cyan-300 text-xl font-bold">
                {skill.name[0]}
              </div>
            )}

            {/* Skill Name */}
            <p className="text-sm text-gray-200 font-semibold tracking-wide">
              {skill.name}
            </p>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-blue-500/5 opacity-0 hover:opacity-30 blur-xl transition duration-500"></div>
          </motion.div>
        ))}
      </div>

      {/* 🌈 Bottom Glow Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1 }}
        className="mt-16 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
      ></motion.div>
    </div>
  );
}
