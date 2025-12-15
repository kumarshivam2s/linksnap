import { useState, useEffect } from 'react';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';

function App() {
  // State for storing URLs
  const [urls, setUrls] = useState([]);

  // State for loading status
  const [loading, setLoading] = useState(true);

  // State for error
  const [error, setError] = useState('');

  // Function to fetch all URLs from API
  const fetchUrls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/url/all');

      if (!response.ok) {
        throw new Error('Failed to fetch URLs');
      }

      const data = await response.json();
      setUrls(data);
      setError('');

    } catch (err) {
      console.error(err);
      setError('Failed to load URLs. Is the server running?');
    }

    setLoading(false);
  };

  // Fetch URLs when component mounts
  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Container */}
      <div className="container mx-auto px-4 py-10 max-w-2xl">

        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">
            🔗 LinkSnap
          </h1>
          <p className="text-gray-400">
            Shorten your URLs and track clicks with ease
          </p>
        </header>

        {/* URL Form */}
        <UrlForm onUrlAdded={fetchUrls} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 
                          px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 
                            border-t-transparent rounded-full mx-auto mb-4">
            </div>
            <p className="text-gray-400">Loading your links...</p>
          </div>
        ) : (
          /* URL List */
          <UrlList urls={urls} onDelete={fetchUrls} />
        )}

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-16">
          Built with React, Node.js, Express & MongoDB
        </footer>

      </div>
    </div>
  );
}

export default App;