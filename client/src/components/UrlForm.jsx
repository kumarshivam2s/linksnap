import { useState } from "react";

function UrlForm({ onUrlAdded }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/url/shorten`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalUrl: url }),
        },
      );

      if (!response.ok) throw new Error("Failed to shorten URL");

      setUrl("");
      onUrlAdded();
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL to shorten..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500/50"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed rounded-lg font-medium text-white"
          >
            {loading ? "..." : "Shorten"}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default UrlForm;
