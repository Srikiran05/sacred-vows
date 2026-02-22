import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MediaGallery({ type = 'image' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true);
        const response = await fetch(`/api/gallery?type=${type}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }

        const data = await response.json();
        
        // Map the API response to the format expected by the component
        const mappedItems = (data.files || []).map((file, idx) => ({
          id: file.key || idx,
          url: file.url,
          downloadUrl: file.downloadUrl,
          type: type,
        }));

        setItems(mappedItems);
      } catch (err) {
        console.error('Error fetching media:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [type]);

  const hasItems = items && items.length > 0;

  return (
    <div className="w-full min-h-screen bg-black p-4">
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-white text-center">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-red-400 text-center">Error: {error}</p>
        </div>
      ) : !hasItems ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-white text-center">No media found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
          {items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative aspect-square group overflow-hidden rounded-lg bg-gray-900"
              style={{ touchAction: 'auto' }}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt="Gallery upload" 
                  className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110" 
                  loading="lazy"
                />
              ) : (
                <video 
                  src={item.url} 
                  className="w-full h-full object-cover" 
                  controls 
                  playsInline
                />
              )}

              {/* Overlay for download link */}
              <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-2">
                <a 
                  href={item.downloadUrl} 
                  download 
                  className="text-xs text-white underline bg-black/50 p-1 rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
