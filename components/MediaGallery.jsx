import { motion } from 'framer-motion';

export default function MediaGallery({ items }) {
  return (
    // Parent container must allow vertical overflow
    <div className="min-h-screen w-full overflow-y-auto bg-black p-4">
      {items.length === 0 ? (
        <p className="text-white text-center">No media found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              // touch-auto ensures the browser handles scrolling even if Framer Motion is active
              className="relative aspect-square group overflow-hidden rounded-lg bg-gray-900 touch-auto"
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt="Wedding upload" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
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

              {/* Overlay: pointer-events-none on the div, but auto on the link */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none group-hover:pointer-events-auto">
                <a 
                  href={item.downloadUrl} 
                  download 
                  className="text-xs text-white underline bg-black/50 p-1 rounded"
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
