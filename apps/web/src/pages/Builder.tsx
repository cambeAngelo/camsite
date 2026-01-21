import { useEffect, useState } from "react";
import { portfolioService } from "../services/api";

export default function BuilderPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    theme: "minimal",
    color_scheme: "blue",
    is_published: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const res = await portfolioService.getMine();
      if (res.ok && res.data) {
        setPortfolio(res.data);
        setFormData({
          title: res.data.title || "",
          theme: res.data.theme || "minimal",
          color_scheme: res.data.color_scheme || "blue",
          is_published: res.data.is_published || false,
        });
      }
    } catch (err) {
      console.error("Failed to load portfolio:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await portfolioService.update(formData);
      if (res.ok) {
        setPortfolio(res.data);
        setMessage("Portfolio saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save portfolio");
      }
    } catch (err) {
      setMessage("Error saving portfolio");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Portfolio Builder</h1>
          <div className="space-x-2">
            <a
              href="/dashboard"
              className="px-4 py-2 text-slate-300 hover:text-white transition"
            >
              Back
            </a>
            {portfolio && (
              <a
                href={`/p/${portfolio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                View Live
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Editor */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Settings</h2>

              {message && (
                <div
                  className={`p-3 rounded mb-4 ${
                    message.includes("successfully")
                      ? "bg-green-900 text-green-200"
                      : "bg-red-900 text-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Portfolio Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                    placeholder="My Portfolio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Theme
                  </label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="minimal">Minimal</option>
                    <option value="modern">Modern</option>
                    <option value="creative">Creative</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Color Scheme
                  </label>
                  <select
                    name="color_scheme"
                    value={formData.color_scheme}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="green">Green</option>
                    <option value="orange">Orange</option>
                    <option value="pink">Pink</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published || false}
                    onChange={handleChange}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="is_published" className="ml-2 text-sm text-slate-300">
                    Publish portfolio (make it public)
                  </label>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded transition"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
              <div className="bg-slate-700 rounded p-4 text-center">
                <h3 className="text-white font-semibold">
                  {formData.title || "Your Portfolio"}
                </h3>
                <p className="text-slate-400 text-sm mt-2">Theme: {formData.theme}</p>
                <p className="text-slate-400 text-sm">Color: {formData.color_scheme}</p>
                {portfolio && (
                  <p className="text-slate-400 text-xs mt-4 break-all">
                    {window.location.origin}/p/{portfolio.slug}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
