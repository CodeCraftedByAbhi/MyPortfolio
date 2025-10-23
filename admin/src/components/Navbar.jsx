import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const isloggedIn = localStorage.getItem("token")
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 z-50 shadow-lg">
  <nav className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center px-4 py-3">
    {/* Logo / Title */}
    <div className="flex-shrink-0 mb-2 md:mb-0">
      <Link to="/home" className="flex flex-col">
        <h1 className="font-extrabold text-xl md:text-2xl text-white hover:text-yellow-400 truncate">
          PortFolio
        </h1>
        <span className="text-gray-300 text-sm md:text-base truncate">Admin Dashboard</span>
      </Link>
    </div>

    {/* Links / Buttons */}
    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
      {!isloggedIn ? (
        <>
        {(location.pathname === "/signup") ?
          (<Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/login">
            LogIn
          </Link> ):(<Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/signup">
            SignUp
          </Link>)         
        }        
        </>
      ) : (
        <>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to={`/profile/${user}`}>
            Profile
          </Link>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/about">
            About Me
          </Link>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/experience">
            Experience
          </Link>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/projects">
            Projects
          </Link>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/skills">
            Skills
          </Link>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/courses">
            Courses
          </Link>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/blogs">
            Blogs
          </Link>
          <Link className="px-3 py-1 text-white font-medium rounded hover:bg-blue-700 transition" to="/contact">
            Customer
          </Link>
          <button
            onClick={handleLogOut}
            className="px-3 py-1 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </nav>
</div>
  );
}

export default Navbar;
