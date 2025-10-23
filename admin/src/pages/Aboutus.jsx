import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";

export default function About() {
  const [about, setAbout] = useState(null); // full about object from backend
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state (fields)
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]); // array of strings (tags)
  const [techInput, setTechInput] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const [goal, setGoal] = useState("");
  const [learning, setLearning] = useState("");

  const techInputRef = useRef(null);
  const hobbyInputRef = useRef(null);

  // Fetch about data
  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/about");
        const data = res.data;
        // Controller returns about object (or message + about); handle both
        const aboutObj = data.about || data;
        setAbout(aboutObj);

        // populate form defaults for editing
        setTitle(aboutObj?.title || "");
        setSubtitle(aboutObj?.subtitle || "");
        setDescription(aboutObj?.description || "");
        setTechnologies(Array.isArray(aboutObj?.technologies) ? aboutObj.technologies : []);
        setHobbies(Array.isArray(aboutObj?.hobbies) ? aboutObj.hobbies : []);
        setGoal(aboutObj?.goal || "");
        setLearning(aboutObj?.learning || "");
      } catch (err) {
        // 404 might mean no about yet — that's fine (admin can create it)
        if (err.response && err.response.status === 404) {
          setAbout(null);
        } else {
          setError(err.response?.data?.message || err.message || "Failed to fetch About");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  // Tag helpers
  const addTech = (value) => {
    const v = value.trim();
    if (!v) return;
    if (!technologies.includes(v)) setTechnologies((prev) => [...prev, v]);
  };
  const removeTech = (index) => {
    setTechnologies((prev) => prev.filter((_, i) => i !== index));
  };

  const addHobby = (value) => {
    const v = value.trim();
    if (!v) return;
    if (!hobbies.includes(v)) setHobbies((prev) => [...prev, v]);
  };
  const removeHobby = (index) => {
    setHobbies((prev) => prev.filter((_, i) => i !== index));
  };

  // Key handlers for tag inputs
  const onTechKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech(techInput);
      setTechInput("");
    } else if (e.key === "Backspace" && techInput === "" && technologies.length) {
      // quick remove last tag
      setTechnologies((prev) => prev.slice(0, -1));
    }
  };

  const onHobbyKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addHobby(hobbyInput);
      setHobbyInput("");
    } else if (e.key === "Backspace" && hobbyInput === "" && hobbies.length) {
      setHobbies((prev) => prev.slice(0, -1));
    }
  };

  // Save / Upsert
  const handleSave = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    // Basic validation for required fields
    if (!title.trim() || !subtitle.trim() || !description.trim()) {
      setError("Title, subtitle and description are required.");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        technologies,
        hobbies,
        goal: goal.trim(),
        learning: learning.trim(),
      };

      // use PUT as your controller supports upsert
      const res = await axios.put("/api/about", payload);
      const aboutObj = res.data.about || res.data;
      setAbout(aboutObj);
      setSuccess("About updated successfully.");
      setEditOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative mt-24 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Card / Display */}
        <div className="bg-gray-800 text-white rounded shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-extrabold">{about?.title || "Your Name / Title"}</h1>
              <p className="text-gray-300 mt-1">{about?.subtitle || "Subtitle (e.g. MERN Stack Developer)"}</p>
            </div>

            <div className="ml-4">
              <button
                onClick={() => { setEditOpen(true); setSuccess(""); setError(""); }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="mt-6 text-gray-200 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-200">About</h3>
              <p className="mt-2 text-gray-300 whitespace-pre-line">
                {about?.description || "Add a short professional summary about yourself."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-200">Tech & Tools</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {(about?.technologies || []).length === 0 ? (
                  <span className="text-gray-400">No technologies added yet.</span>
                ) : (
                  about.technologies.map((t, i) => (
                    <span key={i} className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm">
                      {t}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-200">Hobbies</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {(about?.hobbies || []).length === 0 ? (
                  <span className="text-gray-400">No hobbies added yet.</span>
                ) : (
                  about.hobbies.map((h, i) => (
                    <span key={i} className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm">
                      {h}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-200">Goal</h3>
              <p className="text-gray-300 mt-1">{about?.goal || "Your career goal."}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-200">Currently learning</h3>
              <p className="text-gray-300 mt-1">{about?.learning || "What you're learning now."}</p>
            </div>
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}
          {success && <p className="text-green-400 mt-4">{success}</p>}
        </div>
      </div>

      {/* Overlay */}
      {editOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md z-40"
          onClick={() => setEditOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 right-0 h-[calc(100%-4rem)] w-96 bg-gray-900 shadow-lg z-50 transform transition-transform ${
          editOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Edit About</h2>
            <button
              onClick={() => setEditOpen(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4 overflow-auto">
            <label className="text-gray-300">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            />

            <label className="text-gray-300">Subtitle *</label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            />

            <label className="text-gray-300">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 resize-vertical"
            />

            {/* Technologies tags */}
            <label className="text-gray-300">Technologies</label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {technologies.map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTech(i)}
                      className="ml-1 text-gray-300 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <input
                ref={techInputRef}
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={onTechKey}
                placeholder="Type tech and press Enter"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
              <div className="text-xs text-gray-400">Press Enter or comma to add</div>
            </div>

            {/* Hobbies tags */}
            <label className="text-gray-300">Hobbies</label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {hobbies.map((h, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {h}
                    <button
                      type="button"
                      onClick={() => removeHobby(i)}
                      className="ml-1 text-gray-300 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <input
                ref={hobbyInputRef}
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyDown={onHobbyKey}
                placeholder="Type hobby and press Enter"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
              <div className="text-xs text-gray-400">Press Enter or comma to add</div>
            </div>

            <label className="text-gray-300">Goal</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={2}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 resize-vertical"
            />

            <label className="text-gray-300">Currently learning</label>
            <textarea
              value={learning}
              onChange={(e) => setLearning(e.target.value)}
              rows={2}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 resize-vertical"
            />

            <div className="mt-2 flex items-center gap-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-600 disabled:opacity-60 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>

            {/* small note */}
            <div className="text-xs text-gray-400 mt-2">
              Tip: add technologies & hobbies using Enter or comma. Required: Title,
              subtitle, description.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
