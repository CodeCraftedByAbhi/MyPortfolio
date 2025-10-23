import { Navigate, useLocation } from "react-router-dom";

const RouteProtect = ({ children, isPublic }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (isPublic && token) {
    return <Navigate to="/home" replace />;
  }

  if (!isPublic && !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RouteProtect;
