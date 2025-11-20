import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Courses from "./pages/Courses";
import Blogs from "./pages/Blogs";
import Experience from "./pages/Experience"
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Services from "./pages/Service";

function App() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Services />} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
