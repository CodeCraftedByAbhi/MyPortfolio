import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/public/courses");
        setCourses(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // 🔍 Search + Filter Logic
  useEffect(() => {
    let list = [...courses];
    if (filter !== "All") list = list.filter((c) => c.category === filter);
    if (search.trim())
      list = list.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(list);
  }, [search, filter, courses]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading courses...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    (courses && courses.length > 0 ? (<><div className="min-h-screen pt-24 px-6 sm:px-12 bg-gradient-to-b from-gray-950 to-black text-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-cyan-400 text-center mb-10"
      >
        Available Courses
      </motion.h1>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-500 w-full sm:w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-neutral-500 focus:ring-2 focus:ring-cyan-500 w-full sm:w-1/5"
        >
          <option>All</option>
          <option>Web Development</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Fullstack</option>
          <option>Other</option>
        </select>
      </div>

      {/* 🎓 Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map((course, i) => {
          const discounted =
            course.discount && course.discount > 0
              ? (course.price - (course.price * course.discount) / 100).toFixed(0)
              : course.price;

          return (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
              onClick={() => setSelected(course)}
              className="cursor-pointer p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <div className="h-44 bg-gray-800 rounded-xl overflow-hidden mb-4">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">{course.category}</p>
              <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                {course.description}
              </p>

              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-cyan-400">
                  ₹{discounted}
                  {course.discount > 0 && (
                    <span className="text-gray-400 text-sm line-through ml-2">
                      ₹{course.price}
                    </span>
                  )}
                </p>
                {course.discount > 0 && (
                  <span className="text-xs bg-green-500/20 border border-green-400/30 text-green-300 px-2 py-1 rounded-full">
                    {course.discount}% OFF
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 💎 Modal for Course Details */}
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
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-lg w-full shadow-lg"
            >
              {selected.image && (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="rounded-xl mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                {selected.title}
              </h2>
              <p className="text-gray-400 mb-3">{selected.category}</p>
              <p className="text-gray-300 mb-4">{selected.description}</p>

              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-cyan-400">
                  ₹
                  {selected.discount > 0
                    ? (selected.price -
                        (selected.price * selected.discount) / 100).toFixed(0)
                    : selected.price}
                </p>
                {selected.discount > 0 && (
                  <span className="text-sm bg-green-500/20 border border-green-400/30 text-green-300 px-3 py-1 rounded-full">
                    {selected.discount}% OFF
                  </span>
                )}
              </div>

              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition">
                Enroll Now →
              </button>
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
        Courses Coming Soon ....
      </motion.h1></div>))
  );
}
