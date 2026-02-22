import { motion } from 'framer-motion';

export default function MediaGallery({ items = [] }) {
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <div className="w-full min-h-screen bg-black p-4 overflow-y-auto overscroll-contain">
      {!hasItems ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-white text-center">No media found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
          {items.map((item, idx) => (
            <motion.div
              key={item.key || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-900"
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt="Gallery upload"
                  className="w-full h-full object-cover transition-transform duration-500 md:hover:scale-110"
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

              {/* Download Button */}
              <div className="absolute bottom-2 right-2">
                <a
                  href={item.downloadUrl}
                  className="text-xs text-white underline bg-black/60 px-2 py-1 rounded"
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
