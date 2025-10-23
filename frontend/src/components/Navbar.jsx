import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // clean icons

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Courses", path: "/courses" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-cyan-400 tracking-wider hover:text-cyan-300 transition"
        >
          Abhishek.dev
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium tracking-wide transition duration-300 ${
                  active ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"
                }`}
              >
                {link.name}
                {active && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-400 hover:text-cyan-300 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-lg z-50 border-l border-white/10 shadow-2xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-cyan-400">
                  Menu
                </h2>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-medium text-lg transition-all duration-300 ${
                        active
                          ? "text-cyan-400"
                          : "text-gray-300 hover:text-cyan-300"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* CTA Button */}
              <div className="mt-auto pt-8">
                <a
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center w-full px-4 py-2 rounded-full text-white font-semibold 
                    bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
                    shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
                >
                  Let's Connect
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
