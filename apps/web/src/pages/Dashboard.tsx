import { useEffect, useState } from "react";
import { authService, portfolioService, projectsService } from "../services/api";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Get current user
      const userRes = await authService.getCurrentUser();
      if (!userRes.ok) throw new Error("Failed to load user");
      setUser(userRes.data);

      // Get portfolio
      const portfolioRes = await portfolioService.getMine();
      if (portfolioRes.ok) {
        setPortfolio(portfolioRes.data);

        // Get projects
        const projectsRes = await projectsService.getByPortfolio(portfolioRes.data.id);
        if (projectsRes.ok) {
          setProjects(projectsRes.data || []);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-400 mt-1">Welcome, {user?.first_name || user?.username}</p>
            </div>
            <button
              onClick={() => authService.logout()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Portfolio Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Your Portfolio</h2>
          {portfolio ? (
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{portfolio.title}</h3>
                  <p className="text-slate-400 mt-1">
                    {window.location.origin}/p/{portfolio.slug}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-slate-300">
                      <strong>Views:</strong> {portfolio.view_count}
                    </p>
                    <p className="text-slate-300">
                      <strong>Theme:</strong> {portfolio.theme || "default"}
                    </p>
                    <p className="text-slate-300">
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          portfolio.is_published
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {portfolio.is_published ? "Published" : "Draft"}
                      </span>
                    </p>
                  </div>
                </div>
                <a
                  href="/builder"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  Edit Portfolio
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
              <p className="text-slate-400">No portfolio created yet</p>
              <a
                href="/builder"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                Create Portfolio
              </a>
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Your Projects</h2>
            {portfolio && (
              <button
                onClick={async () => {
                  const newProject = {
                    title: "New Project",
                    description: "",
                    image_url: "",
                    technologies: [],
                    tags: [],
                    portfolio_id: portfolio.id,
                  };
                  const res = await projectsService.create(newProject);
                  if (res.ok) {
                    setProjects([...projects, res.data]);
                  }
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
              >
                + Add Project
              </button>
            )}
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800 rounded-lg border border-slate-700 p-4"
                >
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {project.description}
                  </p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      // Navigate to edit project
                      alert("Edit project - coming soon");
                    }}
                    className="mt-4 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded transition"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
              <p className="text-slate-400">
                {portfolio ? "No projects yet" : "Create a portfolio first"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
