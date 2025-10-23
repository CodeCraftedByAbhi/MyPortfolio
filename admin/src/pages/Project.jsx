import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    technologies: [],
    type: "Full Stack",
    projectLink: "",
    image: null,
    preview: null,
  });

  const [techInput, setTechInput] = useState("");

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...formData,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const addTech = () => {
    const t = techInput.trim();
    if (!t || formData.technologies.includes(t)) return;
    setFormData({ ...formData, technologies: [...formData.technologies, t] });
    setTechInput("");
  };

  const removeTech = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    if (!formData.title || !formData.description || !formData.type) {
      setError("Title, description and type are required.");
      setSaving(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("type", formData.type);
      payload.append("projectLink", formData.projectLink);
      payload.append("technologies", JSON.stringify(formData.technologies));
      if (formData.image) payload.append("image", formData.image);

      let res;
      if (formData._id) {
        res = await axios.put(`/api/projects/${formData._id}`, payload);
      } else {
        res = await axios.post("/api/projects", payload);
      }

      const updatedProj = res.data.project;
      setProjects((prev) => {
        const idx = prev.findIndex((p) => p._id === updatedProj._id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = updatedProj;
          return copy;
        } else {
          return [updatedProj, ...prev];
        }
      });

      setSuccess(res.data.message || "Project saved successfully");
      setEditOpen(false);
      setFormData({
        _id: "",
        title: "",
        description: "",
        technologies: [],
        type: "Full Stack",
        projectLink: "",
        image: null,
        preview: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      _id: project._id,
      title: project.title,
      description: project.description,
      technologies: project.technologies || [],
      type: project.type,
      projectLink: project.projectLink || "",
      image: null,
      preview: project.imageUrl || null,
    });
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative mt-24 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <button
            onClick={() =>
              setEditOpen(true) ||
              setFormData({
                _id: "",
                title: "",
                description: "",
                technologies: [],
                type: "Full Stack",
                projectLink: "",
                image: null,
                preview: null,
              })
            }
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Add Project
          </button>
        </div>

        {projects.length === 0 && <p className="text-gray-400">No projects added yet.</p>}

        {projects.map((proj) => (
          <div key={proj._id} className="bg-gray-800 p-4 rounded mb-4 text-white flex flex-col md:flex-row gap-4">
            <img src={proj.imageUrl} alt={proj.title} className="w-full md:w-48 h-32 object-cover rounded" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-xl">{proj.title}</h2>
                  <p className="text-gray-300">{proj.description}</p>
                  <p className="text-gray-400">{proj.type}</p>
                  {proj.projectLink && (
                    <a href={proj.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      View Project
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(proj)} className="text-blue-400 hover:text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(proj._id)} className="text-red-400 hover:text-red-600">Delete</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.technologies.map((t, i) => (
                  <span key={i} className="bg-gray-700 px-2 py-1 rounded text-sm">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {error && <p className="text-red-400 mt-2">{error}</p>}
        {success && <p className="text-green-400 mt-2">{success}</p>}
      </div>

      {/* Overlay */}
      {editOpen && <div className="fixed inset-0 backdrop-blur-md z-40" onClick={() => setEditOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`fixed top-16 right-0 h-[calc(100%-4rem)] w-96 bg-gray-900 shadow-lg z-50 transform transition-transform ${editOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col h-full overflow-auto">
          <h2 className="text-2xl font-bold text-white mb-4">{formData._id ? "Edit Project" : "Add Project"}</h2>

          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <label className="text-gray-300">Title *</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />

            <label className="text-gray-300">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />

            <label className="text-gray-300">Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700">
              <option>Full Stack</option>
              <option>Frontend</option>
              <option>Backend</option>
            </select>

            <label className="text-gray-300">Project Link</label>
            <input name="projectLink" value={formData.projectLink} onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />

            <label className="text-gray-300">Technologies</label>
            <div className="flex flex-wrap gap-2 mb-1">
              {formData.technologies.map((t, i) => (
                <span key={i} className="bg-gray-700 px-2 py-1 rounded flex items-center gap-1 text-sm">
                  {t} <button type="button" onClick={() => removeTech(i)} className="text-gray-300 hover:text-white">&times;</button>
                </span>
              ))}
            </div>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="Add tech & press Enter" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />

            <label className="text-gray-300">Project Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-white" />
            {formData.preview && <img src={formData.preview} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />}

            <div className="mt-2 flex gap-2">
              <button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">{saving ? "Saving..." : "Save"}</button>
              <button type="button" onClick={() => setEditOpen(false)} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
