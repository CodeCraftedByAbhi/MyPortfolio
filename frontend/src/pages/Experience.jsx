import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/api/public/experience");
        setExperiences(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading Experiences...
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
        className="text-4xl font-bold text-cyan-400 text-center mb-12"
      >
        Work Experience
      </motion.h1>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-purple-600/40"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0
                  ? "md:items-end md:text-right md:pr-12"
                  : "md:items-start md:text-left md:pl-12"
              }`}
            >
              {/* Connector Dot */}
              <div
                className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-2 border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-500/40`}
              ></div>

              {/* Experience Card */}
              <div
                className={`mt-4 md:mt-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-cyan-400">
                    {exp.role}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                  <p className="text-gray-300 text-sm mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.techUsed?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
