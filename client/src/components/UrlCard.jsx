import { useState } from "react";
import ClickChart from "./ClickChart";

function UrlCard({ url, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const shortUrl = `http://localhost:5000/api/url/${url.shortCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/url/${url.shortCode}`, {
        method: "DELETE",
      });
      onDelete();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 font-medium text-sm"
          >
            {url.shortCode}
          </a>
          <p className="text-gray-500 text-sm truncate mt-1" title={url.originalUrl}>
            {url.originalUrl}
          </p>
          <p className="text-gray-600 text-xs mt-2">{formatDate(url.createdAt)}</p>
        </div>

        <div className="text-right">
          <span className="text-xl font-semibold text-white">{url.clicks}</span>
          <span className="text-gray-500 text-sm ml-1">
            {url.clicks === 1 ? "click" : "clicks"}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-white/[0.06]">
        <button
          onClick={copyToClipboard}
          className={`px-3 py-1.5 rounded text-sm ${
            copied
              ? "bg-green-500/20 text-green-400"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>

        <button
          onClick={() => setShowChart(!showChart)}
          className={`px-3 py-1.5 rounded text-sm ${
            showChart
              ? "bg-indigo-500/20 text-indigo-400"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          Stats
        </button>

        <button
          onClick={handleDelete}
          className={`px-3 py-1.5 rounded text-sm ml-auto ${
            confirmDelete
              ? "bg-red-500 text-white"
              : "bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          }`}
        >
          {confirmDelete ? "Confirm" : "Delete"}
        </button>
      </div>

      {showChart && (
        <div className="mt-4 pt-3 border-t border-white/[0.06]">
          <ClickChart clickHistory={url.clickHistory} />
        </div>
      )}
    </div>
  );
}

export default UrlCard;
