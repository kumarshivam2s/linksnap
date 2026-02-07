import { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUrls = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/url/all");
      if (!response.ok) throw new Error("Failed to fetch URLs");
      const data = await response.json();
      setUrls(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load URLs. Is the server running?");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const topLink =
    urls.length > 0
      ? urls.reduce(
          (max, url) => (url.clicks > max.clicks ? url : max),
          urls[0],
        )
      : null;

  const filteredUrls = urls.filter(
    (url) =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-semibold mb-2 text-white">LinkSnap</h1>
          <p className="text-gray-500">Shorten and track your links</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UrlForm onUrlAdded={fetchUrls} />

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6 text-red-400 text-sm">
                {error}
              </div>
            )}

            {!loading && urls.length > 0 && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500/50 text-sm"
                />
              </div>
            )}

            {loading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <UrlList urls={filteredUrls} onDelete={fetchUrls} />
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-semibold text-white">
                    {urls.length}
                  </p>
                  <p className="text-sm text-gray-500">Total Links</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">
                    {totalClicks}
                  </p>
                  <p className="text-sm text-gray-500">Total Clicks</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">
                    {urls.length > 0
                      ? (totalClicks / urls.length).toFixed(1)
                      : 0}
                  </p>
                  <p className="text-sm text-gray-500">Avg. Clicks per Link</p>
                </div>
              </div>
            </div>

            {topLink && topLink.clicks > 0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-3">
                  Top Performing
                </h3>
                <p className="text-indigo-400 font-medium text-sm truncate">
                  {topLink.shortCode}
                </p>
                <p className="text-gray-500 text-xs truncate mt-1">
                  {topLink.originalUrl}
                </p>
                <p className="text-white font-semibold mt-2">
                  {topLink.clicks} clicks
                </p>
              </div>
            )}

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Quick Tips
              </h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>Click on a short code to open the link</li>
                <li>Use "Stats" to view click history</li>
                <li>Copy links with one click</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="text-center text-gray-600 text-xs mt-16">
          Built with Love & React JS.
        </footer>
      </div>
    </div>
  );
}

export default App;
