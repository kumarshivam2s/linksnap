import { useState } from 'react';

function UrlForm({ onUrlAdded }) {
  // State for input value
  const [url, setUrl] = useState('');
  
  // State for loading status
  const [loading, setLoading] = useState(false);
  
  // State for error message
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Clear previous error
    setError('');

    // Validate input
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Start loading
    setLoading(true);

    try {
      // Make API request
      const response = await fetch('http://localhost:5000/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl: url })
      });

      // Check if request was successful
      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      // Clear input
      setUrl('');

      // Notify parent component to refresh list
      onUrlAdded();

    } catch (err) {
      console.error(err);
      setError('Failed to shorten URL. Please try again.');
    }

    // Stop loading
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {/* Input and Button Container */}
      <div className="flex gap-3">
        {/* URL Input */}
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                     focus:border-blue-500 focus:outline-none focus:ring-1 
                     focus:ring-blue-500 transition"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 
                     disabled:cursor-not-allowed rounded-lg font-medium transition"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Shortening...
            </span>
          ) : (
            'Shorten'
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}
    </form>
  );
}

export default UrlForm;