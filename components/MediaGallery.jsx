import { motion } from 'framer-motion';

// 1. Add a default empty array for 'items' to prevent .length error
export default function MediaGallery({ items = [] }) {
  
  // 2. Use Optional Chaining (?.) as a safety net
  const hasItems = items?.length > 0;

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-black p-4">
      {!hasItems ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Loading gallery...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative aspect-square group overflow-hidden rounded-lg bg-gray-900 touch-auto"
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt="Gallery content" 
                  className="w-full h-full object-cover" 
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none group-hover:pointer-events-auto">
                <a 
                  href={item.downloadUrl} 
                  download 
                  className="text-xs text-white underline pointer-events-auto"
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
