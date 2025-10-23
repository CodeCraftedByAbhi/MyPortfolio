import { useState, useEffect } from "react";
import axios from "../api/axios";

function Profile() {
  const user = localStorage.getItem("user");
  const [profile, setProfile] = useState({});
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/admin/profile/${user}`);
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const res = await axios.put(`/api/admin/profile/${user}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data);
      setPreview(res.data.profilePic);
      setSuccess("Profile updated successfully!");
      setEditOpen(false); // close sidebar after save
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative mt-24 p-4">
      {/* Main Profile View */}
      <div className="flex-1 max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded shadow text-white">
        <div className="flex flex-col items-center mb-4">
          <img
            src={preview || profile.profilePic}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-500 mb-2"
          />
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-300">{profile.email}</p>
          <p className="text-gray-300">{profile.contact}</p>
        </div>

        <button
          onClick={() => setEditOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mt-4 w-full"
        >
          Edit Profile
        </button>

        {error && <p className="text-red-400 mt-2">{error}</p>}
        {success && <p className="text-green-400 mt-2">{success}</p>}
      </div>

      {/* Overlay */}
      {editOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-48"
          onClick={() => setEditOpen(false)}
        ></div>
      )}

      {/* Sidebar for Editing */}
      <div
        className={`fixed top-16 right-0 h-full w-96 bg-gray-900 shadow-lg z-49 transform transition-transform ${
          editOpen ? "translate-x-0" : "translate-x-full p-4"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 
          ">
            <h2 className="text-2xl  font-bold text-white">Edit Profile</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 flex-1 overflow-auto"
          >
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src={preview || profile.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-500 mb-2"
              />
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="profilePic"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Change Profile Picture
              </label>
            </div>

            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name || profile.name || ""}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-2 rounded bg-gray-700 text-white"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email || profile.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 rounded bg-gray-700 text-white"
            />

            {/* Contact */}
            <input
              type="text"
              name="contact"
              value={formData.contact || profile.contact || ""}
              onChange={handleChange}
              placeholder="Contact"
              className="p-2 rounded bg-gray-700 text-white"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="Password"
                className="p-2 rounded bg-gray-700 w-full text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button className="bg-green-600 hover:bg-green-700 p-2 rounded mt-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
