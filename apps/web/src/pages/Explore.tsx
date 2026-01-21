import { useEffect, useState } from "react";
import { http } from "../services/api";

export default function ExplorePage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const res = await http.get("/api/portfolios/explore");
      if (res.ok) {
        setPortfolios(res.data || []);
      } else {
        setError(res.error || "Failed to load portfolios");
      }
    } catch (err) {
      setError("Error loading portfolios");
    } finally {
      setLoading(false);
    }
  };

  const filtered = portfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.user_name && p.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-white">
            camsite
          </a>
          <div className="space-x-4">
            <a href="/" className="text-slate-300 hover:text-white transition">
              Home
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              Create Portfolio
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Portfolios
          </h1>
          <p className="text-slate-400 mb-8">
            Discover amazing portfolios created with camsite
          </p>

          {/* Search */}
          <input
            type="text"
            placeholder="Search portfolios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading portfolios...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900 border border-red-700 text-red-100 px-6 py-4 rounded">
            {error}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((portfolio) => (
              <a
                key={portfolio.id}
                href={`/p/${portfolio.slug}`}
                className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-blue-500 transition group"
              >
                <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-white text-sm">Portfolio Preview</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                    {portfolio.title}
                  </h3>
                  {portfolio.user_name && (
                    <p className="text-slate-400 text-sm">
                      by {portfolio.user_name}
                    </p>
                  )}
                  <p className="text-slate-500 text-xs mt-2">
                    {portfolio.view_count || 0} views
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">
              {searchTerm
                ? "No portfolios found matching your search"
                : "No portfolios yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
