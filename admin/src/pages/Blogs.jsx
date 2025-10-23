import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    content: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`/api/blogs?search=${search}`);
      setBlogs(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const form = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) form.append(key, formData[key]);
      }

      const res = formData._id
        ? await axios.put(`/api/blogs/${formData._id}`, form)
        : await axios.post("/api/blogs", form);

      setSuccess(res.data.message);
      setEditOpen(false);
      setFormData({ _id: "", title: "", description: "", content: "", image: null });
      setPreview(null);
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({ ...blog, image: null });
    setPreview(blog.image || null);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative mt-24 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Blogs</h1>
          <button onClick={() => setEditOpen(true)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
            Add Blog
          </button>
        </div>

        <input
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-700"
        />

        <table className="w-full text-white bg-gray-800 rounded overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} className="border-b border-gray-600">
                <td className="p-2">{b.image && <img src={b.image} alt={b.title} className="w-16 h-16 object-cover rounded" />}</td>
                <td className="p-2">{b.title}</td>
                <td className="p-2">{b.description}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(b)} className="text-blue-400 hover:text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(b._id)} className="text-red-400 hover:text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Sidebar */}
        {editOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setEditOpen(false)}></div>}
        <div
          className={`fixed top-16 right-0 h-[calc(100%-4rem)] w-96 bg-gray-900 shadow-lg z-50 transform transition-transform ${editOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full overflow-auto">
            <h2 className="text-2xl font-bold text-white mb-4">{formData._id ? "Edit Blog" : "Add Blog"}</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <label className="text-gray-300">Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white border border-gray-700" />

              <label className="text-gray-300">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="p-2 rounded bg-gray-800 text-white border border-gray-700" />

              <label className="text-gray-300">Content *</label>
              <textarea name="content" value={formData.content} onChange={handleChange} rows={5} className="p-2 rounded bg-gray-800 text-white border border-gray-700" />

              <label className="text-gray-300">Image</label>
              {preview && <img src={preview} className="w-24 h-24 mb-2 object-cover rounded" />}
              <input type="file" accept="image/*" onChange={handleImageChange} />

              <div className="flex gap-2 mt-2">
                <button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">{saving ? "Saving..." : "Save"}</button>
                <button type="button" onClick={() => setEditOpen(false)} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
