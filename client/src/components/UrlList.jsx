import UrlCard from './UrlCard';

function UrlList({ urls, onDelete }) {
  // Show empty state if no URLs
  if (urls.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔗</div>
        <h3 className="text-xl text-gray-400 mb-2">No URLs yet</h3>
        <p className="text-gray-500">
          Paste a long URL above to create your first short link!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Links</h2>
        <span className="text-gray-400 text-sm">
          {urls.length} {urls.length === 1 ? 'link' : 'links'}
        </span>
      </div>

      {/* URL Cards List */}
      <div className="space-y-4">
        {urls.map((url) => (
          <UrlCard 
            key={url._id} 
            url={url} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
}

export default UrlList;