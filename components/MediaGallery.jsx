import { motion } from 'framer-motion';

export default function MediaGallery({ items = [] }) {
  return (
    <div className="min-h-screen w-full overflow-y-auto bg-black p-4 overscroll-contain">
      {(!items || items.length === 0) ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-white text-center">No media found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative aspect-square group overflow-hidden rounded-lg bg-gray-900 touch-auto"
            >
              {item.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
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

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 cursor-pointer pointer-events-none group-hover:pointer-events-auto">
                <a 
                  href={item.downloadUrl} 
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
