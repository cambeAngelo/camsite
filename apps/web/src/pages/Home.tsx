import { useState, useEffect } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">camsite</div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <a href="/dashboard" className="text-slate-300 hover:text-white transition">
                  Dashboard
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="text-slate-300 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-slate-300 hover:text-white transition">
                  Login
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Build Your Portfolio in Minutes
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Create a stunning, professional portfolio website without writing any code. 
            Showcase your work, impress clients, and land your dream job.
          </p>
          
          {!isLoggedIn && (
            <div className="space-x-4">
              <a
                href="/register"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Get Started Free
              </a>
              <a
                href="/explore"
                className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
              >
                Explore Portfolios
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Why Choose camsite?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-white mb-2">Beautiful Themes</h3>
            <p className="text-slate-400">
              Choose from professionally designed templates or customize your own.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-400">
              Optimized performance means your portfolio loads instantly for visitors.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
            <p className="text-slate-400">
              Track views and engagement to understand your audience better.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-blue-100 mb-6">
            Join thousands of creators who've already built their portfolios.
          </p>
          {!isLoggedIn && (
            <a
              href="/register"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              Create Your Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">camsite</h4>
              <p className="text-slate-400 text-sm">
                The easiest way to build a beautiful portfolio.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/explore" className="hover:text-white">Explore</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2024 camsite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
