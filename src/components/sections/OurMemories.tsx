import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Calendar, Heart, ZoomIn } from 'lucide-react';
import { SiteConfig, MemoryPhoto } from '../../config/siteConfig';

interface OurMemoriesProps {
  config: SiteConfig;
}

export const OurMemories: React.FC<OurMemoriesProps> = ({ config }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  return (
    <section id="memories" className="relative w-full py-20 px-4 sm:px-6 bg-spider-dark border-t-4 border-black">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-blue/20 border border-spider-blue text-spider-blue-glow font-comic tracking-widest text-lg uppercase mb-3"
          >
            <Camera className="w-5 h-5" />
            <span>SCRAPBOOK VAULT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-comic text-white tracking-wider uppercase text-glow-blue"
          >
            THE AMAZING MEMORIES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-body max-w-xl mx-auto text-base sm:text-lg mt-2"
          >
            Captured moments in our Multiverse of love. Click any snapshot to zoom in!
          </motion.p>
        </div>

        {/* Comic Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {config.memories.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, rotate: idx % 2 === 0 ? 1 : -1 }}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white p-4 rounded-2xl border-4 border-black shadow-comic shadow-spider-blue hover:shadow-blue-glow cursor-pointer transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Top Bar with Date & Spider Badge */}
              <div className="flex items-center justify-between text-xs font-comic text-black mb-3">
                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded border border-black">
                  <Calendar className="w-3.5 h-3.5 text-spider-red" />
                  {photo.date}
                </span>
                <span className="text-spider-red font-bold">🕷️ PHOTO #{idx + 1}</span>
              </div>

              {/* Photo Frame Container */}
              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-black bg-black mb-4 group">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
                
                {/* Zoom overlay on hover */}
                <div className="absolute inset-0 bg-spider-red/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 bg-black/80 rounded-full border border-white text-white">
                    <ZoomIn className="w-6 h-6" />
                  </span>
                </div>

                {/* Corner Spider Web Graphic */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-80">
                  <svg viewBox="0 0 100 100" fill="none" stroke="#E50914">
                    <path d="M100,0 L0,0 M100,0 L100,100" strokeWidth="3" />
                    <path d="M100,40 Q60,40 60,0 M100,80 Q20,80 20,0" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* Speech Bubble */}
              {photo.speechBubble && (
                <div className="relative bg-spider-accent text-black font-comic text-sm px-3 py-1.5 rounded-lg border-2 border-black mb-3 self-start shadow-sm">
                  <span>{photo.speechBubble}</span>
                  {/* Little speech tail */}
                  <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
                </div>
              )}

              {/* Caption */}
              <div className="border-t border-slate-200 pt-2">
                <h4 className="font-comic text-xl text-black uppercase tracking-wide leading-tight">
                  {photo.title}
                </h4>
                <p className="font-handwritten text-lg text-slate-700 font-bold mt-1">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white rounded-3xl border-4 border-black p-4 sm:p-6 shadow-comic shadow-spider-red text-black max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-spider-red text-white rounded-full border-2 border-black shadow hover:scale-110 transition-transform z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border-3 border-black bg-black">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-5 space-y-4">
                  <div className="inline-block px-3 py-1 bg-spider-red text-white font-comic text-sm rounded border border-black uppercase">
                    {selectedPhoto.date}
                  </div>
                  <h3 className="text-3xl font-comic uppercase leading-tight">
                    {selectedPhoto.title}
                  </h3>
                  <div className="p-4 bg-slate-100 rounded-xl border-2 border-black font-handwritten text-2xl font-semibold text-slate-800">
                    "{selectedPhoto.caption}"
                  </div>
                  {selectedPhoto.speechBubble && (
                    <div className="p-3 bg-spider-accent font-comic text-lg rounded-xl border-2 border-black">
                      💬 {selectedPhoto.speechBubble}
                    </div>
                  )}
                  <p className="text-sm font-comic text-slate-500 uppercase">
                    🕷️ MEMORY LOGGED IN THE SPIDER-VERSE
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
