import UrlCard from "./UrlCard";

function UrlList({ urls, onDelete }) {
  if (urls.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No links yet. Create one above.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">Your Links</h2>
        <span className="text-sm text-gray-500">
          {urls.length} {urls.length === 1 ? "link" : "links"}
        </span>
      </div>
      <div className="space-y-3">
        {urls.map((url) => (
          <UrlCard key={url._id} url={url} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default UrlList;
