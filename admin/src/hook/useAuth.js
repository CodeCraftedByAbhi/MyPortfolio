import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Public routes (no auth required)
  const publicRoutes = ["/login", "/signup", "/forgot-password"];

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      // Allow public routes even without a token
      if (publicRoutes.includes(location.pathname)) return;

      if (!token) {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    };

    const interval = setInterval(checkAuth, 2000);
    return () => clearInterval(interval);
  }, [navigate, location.pathname]);
};

export default useAuth;
