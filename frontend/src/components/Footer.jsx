export default function Footer() {
  return (
    <footer className="w-full bg-black/50 backdrop-blur-md text-gray-400 py-6 mt-auto border-t border-white/10 text-center ">
      <p>
        © {new Date().getFullYear()} <span className="text-cyan-400">Abhishek</span> —
        Built with 💙 MERN & Tailwind
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <a href="https://github.com/CodeCraftedByAbhi" className="hover:text-cyan-400">GitHub</a>
        <a href="https://linkedin.com/in/abhishek-das-98038020b" className="hover:text-cyan-400">LinkedIn</a>
        <a href="mailto:codecraftedbyabhi@email.com" className="hover:text-cyan-400">Email</a>
      </div>
    </footer>
  );
}
