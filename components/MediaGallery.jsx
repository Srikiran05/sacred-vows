"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function MediaGallery({ items = [] }) {
  useEffect(() => {
    console.log("🔍 MediaGallery received items:", items);
    console.log("🔢 Items length:", items?.length);
  }, [items]);

  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <div className="w-full min-h-screen bg-black p-4 overflow-y-auto overscroll-contain">
      
      {/* Debug Info Box */}
      <div className="bg-yellow-600 text-black p-2 rounded mb-4 text-xs">
        <p>Debug Info:</p>
        <p>Items Type: {typeof items}</p>
        <p>Is Array: {Array.isArray(items) ? "Yes" : "No"}</p>
        <p>Length: {items?.length || 0}</p>
      </div>

      {!hasItems ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-white text-center">
            ❌ No media found or items not passed correctly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
          {items.map((item, idx) => {
            console.log("🖼 Rendering item:", item);

            const filename = item.key?.split("/").pop() || "file";
            const isImage = /\.(jpg|jpeg|png|gif|webp|heic)$/i.test(item.url || "");

            return (
              <motion.div
                key={item.key || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-900 border border-red-500"
              >
                {/* Debug overlay */}
                <div className="absolute top-0 left-0 bg-black/70 text-white text-[10px] p-1 z-50">
                  {filename}
                </div>

                {isImage ? (
                  <img
                    src={item.url}
                    alt="Gallery upload"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error("❌ Image failed to load:", item.url);
                      e.target.style.border = "3px solid red";
                    }}
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    onError={() =>
                      console.error("❌ Video failed to load:", item.url)
                    }
                  />
                )}

                {/* Download Button */}
                {item.downloadUrl && (
                  <div className="absolute bottom-2 right-2">
                    <a
                      href={item.downloadUrl}
                      className="text-xs text-white underline bg-black/60 px-2 py-1 rounded"
                    >
                      Download
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
