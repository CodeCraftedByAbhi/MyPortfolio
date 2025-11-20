import { motion } from "framer-motion";

export default function Services() {
  // 🔥 Hard-coded data (edit anytime)
  const services = [
    {
      title: "Starter Website",
      subtitle: "Perfect for small businesses & creators",
      price: "₹15,000 / $150",
      features: [
        "1–3 Page Modern Website",
        "Mobile Responsive Design",
        "Contact Form Integration",
        "Fast Deployment on Vercel",
        "3–5 Days Delivery",
      ],
    },
    {
      title: "Business Website",
      subtitle: "Best for startups & growing brands",
      price: "₹50,000 / $500",
      features: [
        "Custom Multi-Page Website",
        "Admin Panel / Dashboard",
        "Custom Forms & Integrations",
        "SEO Optimization",
        "1 Month Free Support",
      ],
    },
    {
      title: "Pro SaaS / Full App",
      subtitle: "Ideal for full products, internal tools, dashboards",
      price: "₹120,000+ / $1500+",
      features: [
        "Full Stack Application",
        "Authentication + Role-based Access",
        "Custom API Development",
        "Database + Cloud Deployment",
        "Technical Documentation",
        "2 Months Support",
      ],
    },
  ];

  // ⭐ Hard-coded Add-Ons
  const addons = [
    {
      name: "Hosting Setup",
      description: "Complete deployment setup on Vercel / Netlify",
      price: "$30",
    },
    {
      name: "Payment Gateway",
      description: "Stripe / Razorpay integration",
      price: "$50",
    },
    {
      name: "Admin Panel Add-on",
      description: "Add admin functionality to any package",
      price: "$120",
    },
    {
      name: "Maintenance Plan",
      description: "Monthly updates + bug fixes",
      price: "$40/month",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-12 bg-gradient-to-b from-gray-950 to-black text-gray-200">

      {/* 🔥 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-cyan-400 text-center mb-12"
      >
        Services & Packages
      </motion.h1>

      {/* ⭐ Packages */}
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
        {services.map((pkg, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-8 hover:shadow-cyan-500/20 flex flex-col"
          >
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">{pkg.title}</h2>
            <p className="text-lg text-gray-300 mb-3">{pkg.subtitle}</p>

            <h3 className="text-3xl font-bold text-purple-400 mb-4">{pkg.price}</h3>

            <div className="flex-1">
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                {pkg.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            <motion.a
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              href="/contact"
              className="mt-6 block text-center px-6 py-2 rounded-full 
              bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold
              hover:opacity-90"
            >
              Contact to Start →
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* 🎁 Add-ons Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto mt-20 rounded-3xl bg-white/10 backdrop-blur-lg 
        border border-white/20 shadow-lg p-10"
      >
        <h2 className="text-3xl font-bold text-pink-400 mb-6 text-center">
          Add-ons & Extras
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {addons.map((addon, i) => (
            <div
              key={i}
              className="px-5 py-4 border border-pink-500/30 rounded-2xl bg-white/5"
            >
              <h3 className="text-xl text-pink-300 font-medium">{addon.name}</h3>
              <p className="text-gray-400 mt-1">{addon.description}</p>
              <p className="text-pink-400 font-semibold mt-2">{addon.price}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mt-16 flex justify-center"
      >
        <a
          href="/contact"
          className="px-8 py-3 rounded-full text-white font-semibold 
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
          shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
        >
          Get a Free Quote →
        </a>
      </motion.div>
    </div>
  );
}
