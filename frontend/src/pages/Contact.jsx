import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("/api/public/contact", form);
      setStatus({ type: "success", msg: "Message sent successfully ✅" });
      setForm({ name: "", email: "", contact: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Failed to send message ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-gray-950 to-black px-6 pt-24 pb-16 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-cyan-400 mb-10"
      >
        Let’s Connect 🤝
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl max-w-lg w-full shadow-xl"
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Your Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Contact Number</label>
          <input
            type="tel"
            name="contact"
            required
            placeholder="+91 98765 43210"
            value={form.contact}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Message</label>
          <textarea
            name="message"
            rows="5"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 font-semibold py-3 rounded-lg transition-all duration-300"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p
            className={`mt-4 text-center ${
              status.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {status.msg}
          </p>
        )}
      </motion.form>
    </div>
  );
}
