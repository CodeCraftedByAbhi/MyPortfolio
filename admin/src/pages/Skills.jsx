import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ _id: "", name: "", icon: null, preview: null });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/api/skills");
        setSkills(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchSkills();
  }, []);

  const resetForm = () => {
    setForm({ _id: "", name: "", icon: null, preview: null });
    setError("");
    setSuccess("");
  };

  const openAdd = () => {
    resetForm();
    setEditOpen(true);
  };

  const handleEdit = (skill) => {
    setForm({
      _id: skill._id,
      name: skill.name || "",
      icon: null,
      preview: skill.icon || null,
    });
    setEditOpen(true);
    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setForm((p) => ({ ...p, icon: f, preview: URL.createObjectURL(f) }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name.trim()) {
      setError("Skill name is required");
      return;
    }
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("name", form.name.trim());
      if (form.icon) payload.append("icon", form.icon);

      let res;
      if (form._id) {
        res = await axios.put(`/api/skills/${form._id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updated = res.data.skill;
        setSkills((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
        setSuccess("Skill updated");
      } else {
        res = await axios.post("/api/skills", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const created = res.data.skill;
        setSkills((prev) => [created, ...prev]);
        setSuccess("Skill added");
      }
      setEditOpen(false);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await axios.delete(`/api/skills/${id}`);
      setSkills((prev) => prev.filter((s) => s._id !== id));
      setSuccess("Skill deleted");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Delete failed");
    }
  };

  return (
    <div className="relative mt-24 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <button
            onClick={openAdd}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Add Skill
          </button>
        </div>

        {error && <p className="text-red-400 mb-3">{error}</p>}
        {success && <p className="text-green-400 mb-3">{success}</p>}

        {/* responsive auto-fit grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
        >
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-gray-800 p-4 rounded text-white flex flex-col items-center justify-between gap-3 transform transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-md bg-gray-700 overflow-hidden">
                {skill.icon ? (
                  // only render img if non-empty string
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "";
                    }}
                  />
                ) : (
                  // inline SVG placeholder
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-200"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
                    <path d="M8 12c1.333-2 4-2 5 0" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="8" r="1.4" fill="#cbd5e1" />
                  </svg>
                )}
              </div>

              <div className="text-center">
                <p className="font-medium">{skill.name}</p>
              </div>

              <div className="flex gap-3 mt-2">
                <button onClick={() => handleEdit(skill)} className="text-blue-400 hover:text-blue-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setEditOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 right-0 h-[calc(100%-4rem)] w-96 bg-gray-900 shadow-lg z-50 transform transition-transform ${
          editOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{form._id ? "Edit Skill" : "Add Skill"}</h2>
            <button onClick={() => setEditOpen(false)} className="text-gray-400 text-2xl">
              &times;
            </button>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4 overflow-auto">
            <label className="text-gray-300">Skill Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. React"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              required
            />

            <label className="text-gray-300">Icon (optional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-white" />
            {form.preview && (
              <img src={form.preview} alt="preview" className="w-28 h-28 object-contain rounded mt-2" />
            )}

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-600 disabled:opacity-60 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={() => { resetForm(); setEditOpen(false); }} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white">
                Cancel
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2">Icon is optional. If none provided, a placeholder appears.</div>
          </form>
        </div>
      </div>
    </div>
  );
}
