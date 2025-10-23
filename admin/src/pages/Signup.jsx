import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Preview
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setFormData({ ...formData, profilePic: file });

  const reader = new FileReader();

  reader.onload = () => {
    // reader.result is a base64 encoded string
    setPreview(reader.result);
  };

  reader.onerror = () => {
    console.error("Failed to read file!");
  };

  reader.readAsDataURL(file); // THIS IS KEY
};


  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return setError("Passwords do not match!");
    }

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("contact", formData.contact);
      form.append("password", formData.password);
      form.append("profilePic", formData.profilePic);

      await axios.post("/api/admin/signup", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4 mt-20 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-md text-white border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Signup</h2>

        {error && <p className="text-red-400 text-center mb-2">{error}</p>}
        {success && (
          <p className="text-green-400 text-center mb-2">{success}</p>
        )}

        {/* Profile Picture Upload */}
        <div className="mb-4 flex flex-col items-center">
          <label className="text-sm mb-2">Profile Picture</label>

          {/* Preview Circle */}
         <div className="relative flex items-center justify-center w-28 h-28 mb-3 rounded-full overflow-hidden border border-gray-600 bg-gray-700 shadow">
  {preview ? (
    <img
      src={preview}
      alt="Profile Preview"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-gray-300 text-sm">No Image</span>
  )}
</div>


          {/* Hidden File Input */}
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Styled Upload Button */}
          <label
            htmlFor="profilePic"
            className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded shadow transition"
          >
            Upload Image
          </label>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded mt-2 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
