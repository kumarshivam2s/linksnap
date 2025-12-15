import { useState } from 'react';
import ClickChart from './ClickChart';

function UrlCard({ url, onDelete }) {
  // State for copy button text
  const [copied, setCopied] = useState(false);

  // State for showing/hiding chart
  const [showChart, setShowChart] = useState(false);

  // State for delete confirmation
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Construct full short URL
  const shortUrl = `http://localhost:5000/api/url/${url.shortCode}`;

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Delete URL
  const handleDelete = async () => {
    if (!confirmDelete) {
      // Show confirmation
      setConfirmDelete(true);

      // Auto-reset after 3 seconds
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/url/${url.shortCode}`, {
        method: 'DELETE'
      });

      // Notify parent to refresh list
      onDelete();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 
                    hover:border-gray-600 transition">
      {/* Main Content */}
      <div className="flex justify-between items-start gap-4">
        {/* URL Info */}
        <div className="flex-1 min-w-0">
          {/* Short URL */}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium 
                       transition inline-flex items-center gap-1"
          >
            {shortUrl}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {/* Original URL */}
          <p className="text-gray-400 text-sm truncate mt-1" title={url.originalUrl}>
            {url.originalUrl}
          </p>

          {/* Created Date */}
          <p className="text-gray-500 text-xs mt-2">
            Created {formatDate(url.createdAt)}
          </p>
        </div>

        {/* Click Count Badge */}
        <div className="flex flex-col items-end">
          <div className="bg-gray-700 px-3 py-1.5 rounded-full">
            <span className="text-lg font-semibold">{url.clicks}</span>
            <span className="text-gray-400 text-sm ml-1">
              {url.clicks === 1 ? 'click' : 'clicks'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className={`px-3 py-1.5 rounded text-sm font-medium transition
            ${copied 
              ? 'bg-green-600/20 text-green-400' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>

        {/* Stats Button */}
        <button
          onClick={() => setShowChart(!showChart)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition
            ${showChart 
              ? 'bg-blue-600/20 text-blue-400' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
        >
          📊 {showChart ? 'Hide Stats' : 'Show Stats'}
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ml-auto
            ${confirmDelete 
              ? 'bg-red-600 text-white' 
              : 'bg-red-600/20 hover:bg-red-600/40 text-red-400'
            }`}
        >
          {confirmDelete ? 'Click again to confirm' : '🗑️ Delete'}
        </button>
      </div>

      {/* Click Chart (conditionally rendered) */}
      {showChart && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <ClickChart clickHistory={url.clickHistory} />
        </div>
      )}
    </div>
  );
}

export default UrlCard;