import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [techInput, setTechInput] = useState("");

  // Form Data State
  const [formData, setFormData] = useState({
    _id: "",
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    techUsed: [],
  });

  // Fetch data when component loads
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/api/experience");
        setExperiences(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchExperiences();
  }, []);

  // Handle inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add tech chip
  const addTech = () => {
    const val = techInput.trim();
    if (!val || formData.techUsed.includes(val)) return;
    setFormData({ ...formData, techUsed: [...formData.techUsed, val] });
    setTechInput("");
  };

  const removeTech = (i) => {
    setFormData({
      ...formData,
      techUsed: formData.techUsed.filter((_, index) => index !== i),
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      techUsed: [],
    });
    setTechInput("");
  };

  // Save (POST/PUT)
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    if (!formData.company || !formData.role || !formData.startDate) {
      setError("Company, Role and Start Date are required.");
      setSaving(false);
      return;
    }

    try {
      const payload = { ...formData };
      if (!payload._id) delete payload._id; // ✅ Fix here

      const res = payload._id
        ? await axios.put("/api/experience", payload)
        : await axios.post("/api/experience", payload);

      const updatedExp = res.data.experience;

      setExperiences((prev) => {
        const exists = prev.find((exp) => exp._id === updatedExp._id);
        return exists
          ? prev.map((exp) => (exp._id === updatedExp._id ? updatedExp : exp))
          : [updatedExp, ...prev];
      });

      setSuccess("Experience saved successfully!");
      setEditOpen(false);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  // Edit button
  const handleEdit = (exp) => {
    setFormData(exp);
    setEditOpen(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/experience/${id}`);
      setExperiences((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative mt-24 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Work Experience</h1>
          <button
            onClick={() => {
              resetForm();
              setEditOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Add Experience
          </button>
        </div>

        {experiences.length === 0 && (
          <p className="text-gray-400">No experience added yet.</p>
        )}

        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="bg-gray-800 p-4 rounded mb-4 text-white"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold">
                  {exp.role} @ {exp.company}
                </h2>
                <p className="text-gray-300">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(exp)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-300">{exp.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {exp.techUsed?.map((t, i) => (
                <span key={i} className="bg-gray-700 px-2 py-1 rounded text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {error && <p className="text-red-400 mt-2">{error}</p>}
        {success && <p className="text-green-400 mt-2">{success}</p>}
      </div>

      {editOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md z-40"
          onClick={() => setEditOpen(false)}
        />
      )}

      <div
        className={`fixed top-16 right-0 h-[calc(100%-4rem)] w-96 bg-gray-900 shadow-lg z-50 transform transition-transform ${
          editOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            {formData._id ? "Edit Experience" : "Add Experience"}
          </h2>

          <form
            onSubmit={handleSave}
            className="flex flex-col gap-3 overflow-auto"
          >
            <input
              required
              name="company"
              placeholder="Company *"
              value={formData.company}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800 text-white"
            />
            <input
              required
              name="role"
              placeholder="Role *"
              value={formData.role}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800 text-white"
            />
            <input
              required
              type="month"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800 text-white"
            />
            <div className="flex items-center gap-2">
              <input
                type="month"
                name="endDate"
                value={formData.endDate !== "Present" ? formData.endDate : ""}
                onChange={handleChange}
                disabled={formData.endDate === "Present"}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 disabled:opacity-50"
              />
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={formData.endDate === "Present"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      endDate: e.target.checked ? "Present" : "",
                    })
                  }
                />
                Present
              </label>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 rounded bg-gray-800 text-white"
            />

            <div>
              <div className="flex gap-2 items-center mb-2">
                <input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTech())
                  }
                  placeholder="Add tech"
                  className="flex-grow p-2 rounded bg-gray-800 text-white"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="bg-green-600 px-3 py-1 rounded text-white"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techUsed?.map((t, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 px-2 py-1 rounded flex items-center gap-2"
                  >
                    {t}{" "}
                    <button
                      type="button"
                      onClick={() => removeTech(i)}
                      className="text-red-400"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              disabled={saving}
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
