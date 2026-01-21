import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { portfolioService, projectsService } from "../services/api";

export default function PortfolioPublicPage() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async () => {
    try {
      // Get portfolio by slug
      const portfolioRes = await portfolioService.getPublic(slug);
      if (!portfolioRes.ok) {
        throw new Error(portfolioRes.error || "Portfolio not found");
      }

      const portfolio = portfolioRes.data;
      setPortfolio(portfolio);

      // Get projects
      const projectsRes = await projectsService.getByPortfolio(portfolio.id);
      if (projectsRes.ok) {
        setProjects(projectsRes.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-700 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-700 text-xl">Portfolio not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-2xl font-bold text-gray-900">
            camsite
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900">{portfolio.title}</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Welcome to my portfolio • {portfolio.view_count || 0} views
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Featured Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{project.description}</p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600">
            This portfolio was created with{" "}
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              camsite
            </a>
            , a modern portfolio builder for creators.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-400">© 2024 camsite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
