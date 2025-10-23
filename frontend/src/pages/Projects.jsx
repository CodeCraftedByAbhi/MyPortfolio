import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/public/projects");
        setProjects(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 🔍 Search + Filter Logic
  useEffect(() => {
    let list = [...projects];
    if (filter !== "All") {
      list = list.filter((p) => p.type?.toLowerCase() === filter.toLowerCase());
    }
    if (search.trim()) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(list);
  }, [search, filter, projects]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading Projects...
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
        My Projects
      </motion.h1>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-1/5"
        >
          <option>All</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full Stack</option>
          <option>Other</option>
        </select>
      </div>

      {/* 🧊 Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            onClick={() => setSelectedProject(p)}
            className="cursor-pointer p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="h-48 bg-gray-800 rounded-xl overflow-hidden mb-4">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* Project Info */}
            <h3 className="text-xl font-semibold text-cyan-400 mb-1">
              {p.title}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{p.type}</p>

            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
              {p.description}
            </p>

            {/* Tech Tags */}
            {p.technologies && (
              <div className="flex flex-wrap gap-2">
                {p.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-2 px-5 py-2  text-cyan-300 transition text-center">
              <p>Click to view </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 💎 Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-lg w-full shadow-lg max-h-[85vh] overflow-y-auto"
            >
              {selectedProject.imageUrl && (
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="rounded-xl mb-4 w-full h-64 object-cover"
                />
              )}
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-gray-400 mb-3">{selectedProject.type}</p>
              <p className="text-gray-300 mb-4">
                {selectedProject.description}
              </p>

              {/* Tech Tags */}
              {selectedProject.technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Project Link */}
              {selectedProject.projectLink && (
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 transition"
                >
                  Visit Project →
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
