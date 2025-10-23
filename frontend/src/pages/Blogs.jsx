import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/public/blogs");
        const data = res.data.blogs || res.data; // handle both shapes
        setBlogs(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // 🔍 Search + Filter logic
  useEffect(() => {
    let list = [...blogs];
    if (filter !== "All") list = list.filter((b) => b.category === filter);
    if (search.trim())
      list = list.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(list);
  }, [search, filter, blogs]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading blogs...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    (blogs && blogs.length > 0 ? (<><div className="min-h-screen pt-24 px-6 sm:px-12 bg-gradient-to-b from-gray-950 to-black text-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-cyan-400 text-center mb-10"
      >
        My Blogs
      </motion.h1>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-500 w-full sm:w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-500 w-full sm:w-1/5"
        >
          <option>All</option>
          <option>Technology</option>
          <option>Programming</option>
          <option>Web Dev</option>
          <option>AI / ML</option>
          <option>Other</option>
        </select>
      </div>

      {/* 📰 Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map((blog, i) => (
          <motion.div
            key={blog._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
            onClick={() => setSelected(blog)}
            className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="h-48 bg-gray-800 overflow-hidden">
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {blog.category} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                {blog.content?.slice(0, 120)}...
              </p>
              <span className="text-cyan-400 text-sm hover:underline">
                Read more →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🪟 Modal for Blog Reading */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-lg max-h-[80vh] overflow-y-auto"
            >
              {selected.image && (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="rounded-xl mb-4"
                />
              )}
              <h2 className="text-3xl font-bold text-cyan-400 mb-2">
                {selected.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {selected.category} •{" "}
                {new Date(selected.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 whitespace-pre-line">
                {selected.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div></>) : (<div className="min-h-screen pt-24 px-6 sm:px-12 bg-gradient-to-b from-gray-950 to-black text-gray-200"><motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-cyan-400 text-center mb-10"
      >
        Blogs Coming Soon ....
      </motion.h1></div>)))
  ;
}
