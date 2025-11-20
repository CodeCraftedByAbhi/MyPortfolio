import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* 🧊 Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          background: { color: { value: "#000" } },
          fpsLimit: 120,
          particles: {
            number: { value: 70 },
            color: { value: ["#00ffff", "#ff00ff"] },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
            links: {
              enable: true,
              color: "#00ffff",
              distance: 150,
              opacity: 0.2,
              width: 1,
            },
            move: { enable: true, speed: 1.5, direction: "none", outModes: "bounce" },
          },
          detectRetina: true,
        }}
      />

      {/* 🪟 Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto shadow-xl cont">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
          >
            Hi, I’m Abhishek 👋
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl sm:text-2xl text-gray-300 mt-4 font-light"
          >
            I build high-quality Websites & SaaS Apps that help businesses grow.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gray-400 mt-6 leading-relaxed max-w-2xl mx-auto"
          >
            I specialize in building scalable, modern web applications using React,
            Node.js, MongoDB, and TailwindCSS. Passionate about UI/UX, automation, and
            AI-powered development. India + US-based developer.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gray-400 mt-2 leading-relaxed max-w-2xl mx-auto font-extrabold"
          >
           Book a Free Consultation
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="/projects"
              className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 rounded-full text-cyan-400 font-semibold transition backdrop-blur-md"
            >
              View My Work 🚀
            </a>
            <a
              href="/about"
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 rounded-full text-purple-400 font-semibold transition backdrop-blur-md"
            >
              About Me 💡
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/50 rounded-full text-pink-400 font-semibold transition backdrop-blur-md"
            >
              Contact 📞
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
