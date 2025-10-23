import { useState } from "react";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const user= useSelector((state)=>{state.auth.user})
  console.log(user)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/admin/login", formData);
      console.log(res)
      const admin = res.data.admin._id
      console.log(admin)
      const token = res.data.token;
      if (!token) {
        throw new Error("No Token Found....Logging Out");
      }

      localStorage.setItem("token", token);
      dispatch(login(admin));
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Login Failed")
    }
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-24 p-4 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-400 mb-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
