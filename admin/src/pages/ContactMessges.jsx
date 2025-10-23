import { useState, useEffect } from "react";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/admin/contact/admin");
        setMessages(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // optional auto-refresh every 30s
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  useEffect(() => {
    let list = [...messages];
    if (filter === "Unread") list = list.filter((m) => !m.read);
    if (filter === "Read") list = list.filter((m) => m.read);
    setFiltered(list);
  }, [filter, messages]);

  const handleMarkRead = async (id, value) => {
    try {
      await axios.put(`/api/admin/contact/${id}`, { read: value });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: value } : m))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this message?")) return;

  try {
    await axios.delete(`/api/admin/contact/${id}`);
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
    setSelected(null);
  } catch (err) {
    console.error(err);
    alert("Failed to delete message.");
  }
};


  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading messages...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-gray-950 to-black text-gray-200">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
        Contact Messages
      </h1>

      {/* Filter Controls */}
      <div className="flex justify-center mb-6 gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white"
        >
          <option>All</option>
          <option>Unread</option>
          <option>Read</option>
        </select>
      </div>

      {/* Message List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtered.map((msg) => (
          <motion.div
            key={msg._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
            onClick={() => setSelected(msg)}
            className={`cursor-pointer p-5 rounded-2xl shadow-md border border-white/20 bg-white/10 backdrop-blur-lg transition-all ${
              msg.read ? "opacity-70" : "border-cyan-400/30"
            }`}
          >
            <h3 className="font-bold text-cyan-400 mb-1">{msg.name}</h3>
            <p className="text-gray-300 text-sm mb-1">{msg.email}</p>
            <p className="text-gray-400 text-sm mb-2">{msg.contact}</p>
            <p className="line-clamp-2 text-gray-200 mb-3">{msg.message}</p>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{new Date(msg.createdAt).toLocaleString()}</span>
              <span
                className={`px-2 py-1 rounded ${
                  msg.read ? "bg-green-600/30 text-green-400" : "bg-red-600/30 text-red-400"
                }`}
              >
                {msg.read ? "Read" : "Unread"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for message view */}
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
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                {selected.name}
              </h2>
              <p className="text-sm text-gray-400 mb-2">
                {selected.email} • {selected.contact}
              </p>
              <p className="text-gray-300 whitespace-pre-line mb-4">
                {selected.message}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  Sent on: {new Date(selected.createdAt).toLocaleString()}
                </span>

                {!selected.read && (
                  <button
                    onClick={() => {
                      handleMarkRead(selected._id, true);
                      setSelected({ ...selected, read: true });
                    }}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Mark as Read
                  </button>                 
                )}

                <button
              onClick={() => handleDelete(selected._id)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
            >
              Delete
            </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
