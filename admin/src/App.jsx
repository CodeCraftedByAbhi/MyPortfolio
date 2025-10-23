import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/Aboutus";
import Experience from "./pages/Experience";
import Projects from "./pages/Project";
import Skills from "./pages/Skills";
import Courses from "./pages/Courses";
import Blogs from "./pages/Blogs.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import useAuth from "./hook/useAuth.js";
import ContactMessages from "./pages/ContactMessges.jsx";

function App() {
  useAuth();
  const user = localStorage.getItem("user");
  return (
    <>
      <div>
          <Navbar />
          <Routes>
            <Route
              path="/login"
              element={
                <PrivateRoute isPublic={true}>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRoute isPublic={true}>
                  <Signup />
                </PrivateRoute>
              }
            />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={`/profile/${user}`}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path={`/about`}
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path={`/experience`}
              element={
                <PrivateRoute>
                  <Experience />
                </PrivateRoute>
              }
            />
            <Route
              path={`/projects`}
              element={
                <PrivateRoute>
                  <Projects />
                </PrivateRoute>
              }
            />
            <Route
              path={`/skills`}
              element={
                <PrivateRoute>
                  <Skills />
                </PrivateRoute>
              }
            />
            <Route
              path={`/courses`}
              element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              }
            />
            <Route
              path={`/blogs`}
              element={
                <PrivateRoute>
                  <Blogs />
                </PrivateRoute>
              }
            />
            <Route
              path={`/contact`}
              element={
                <PrivateRoute>
                  <ContactMessages />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
