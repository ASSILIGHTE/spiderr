import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, CheckCircle } from 'lucide-react';
import { SiteConfig } from '../../config/siteConfig';
import { sfx } from '../../utils/soundEffects';

interface InteractiveWebProps {
  config: SiteConfig;
  onUnlockFinalGift: () => void;
}

export const InteractiveWeb: React.FC<InteractiveWebProps> = ({ config, onUnlockFinalGift }) => {
  const [foundHearts, setFoundHearts] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const messages = config.webMessages || [
    { id: 1, x: 22, y: 30, message: "You make me happy." },
    { id: 2, x: 78, y: 25, message: "I'm grateful for you." },
    { id: 3, x: 28, y: 72, message: "You're my favorite person." },
    { id: 4, x: 72, y: 75, message: "I love our memories." },
    { id: 5, x: 50, y: 50, message: "You're my home ❤️" }
  ];

  const allFound = foundHearts.length >= messages.length;

  const handleHeartClick = (msgObj: { id: number; message: string }) => {
    sfx.playHeartCollect();
    if (!foundHearts.includes(msgObj.id)) {
      setFoundHearts((prev) => [...prev, msgObj.id]);
    }
    setActiveMessage(msgObj.message);
  };

  return (
    <section id="interactive-web" className="relative w-full py-20 px-4 sm:px-6 bg-spider-dark border-t-4 border-black overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-red/20 border border-spider-red text-spider-red-glow font-comic tracking-widest text-lg uppercase mb-3"
        >
          <Heart className="w-5 h-5 text-spider-red animate-pulse" />
          <span>MINI MISSION: HEART WEB HUNT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-7xl font-comic text-white tracking-wider uppercase text-glow-red mb-3"
        >
          CATCH THE HEARTS 🕸️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 font-body max-w-xl mx-auto text-base sm:text-lg mb-8"
        >
          Click all glowing hearts trapped in the web to unlock the secret message! ({foundHearts.length}/{messages.length})
        </motion.p>

        {/* Large Spider Web Display */}
        <div className="relative w-full max-w-lg aspect-square mx-auto my-6 bg-spider-card rounded-3xl border-4 border-black shadow-comic shadow-spider-red p-4 flex items-center justify-center overflow-hidden">
          {/* SVG Web Structure */}
          <svg viewBox="0 0 400 400" className="w-full h-full pointer-events-none opacity-40">
            {/* Radial Lines */}
            <line x1="200" y1="0" x2="200" y2="400" stroke="#E50914" strokeWidth="2" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#E50914" strokeWidth="2" />
            <line x1="58" y1="58" x2="342" y2="342" stroke="#E50914" strokeWidth="2" />
            <line x1="58" y1="342" x2="342" y2="58" stroke="#E50914" strokeWidth="2" />

            {/* Concentric Web Rings */}
            <polygon points="200,60 340,200 200,340 60,200" fill="none" stroke="#E50914" strokeWidth="1.5" />
            <polygon points="200,100 300,200 200,300 100,200" fill="none" stroke="#E50914" strokeWidth="1.5" />
            <polygon points="200,140 260,200 200,260 140,200" fill="none" stroke="#E50914" strokeWidth="1.5" />
          </svg>

          {/* Interactive Hearts Placed on Web Points */}
          {messages.map((item) => {
            const isCollected = foundHearts.includes(item.id);

            return (
              <motion.button
                key={item.id}
                style={{ top: `${item.y}%`, left: `${item.x}%` }}
                onClick={() => handleHeartClick(item)}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCollected ? 1.1 : [1, 1.25, 1] }}
                transition={{ repeat: isCollected ? 0 : Infinity, duration: 2 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border-2 border-black transition-all cursor-pointer z-20 ${
                  isCollected
                    ? 'bg-spider-accent text-black shadow-lg shadow-spider-accent scale-110'
                    : 'bg-spider-red text-white shadow-spider-glow hover:scale-125'
                }`}
                title="Tap to reveal secret message!"
              >
                <Heart className={`w-6 h-6 ${isCollected ? 'fill-black' : 'fill-white animate-pulse'}`} />
              </motion.button>
            );
          })}

          {/* Center Spider Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl pointer-events-none opacity-80">
            🕷️
          </div>
        </div>

        {/* Message Popover */}
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-4 inline-block px-6 py-3 bg-spider-accent text-black font-comic text-xl sm:text-2xl rounded-2xl border-3 border-black shadow-comic"
            >
              ❤️ "{activeMessage}"
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Found Banner & Unlock CTA */}
        {allFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-spider-red via-spider-red-dark to-spider-blue border-4 border-black shadow-comic shadow-spider-red max-w-xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle className="w-8 h-8 text-spider-accent" />
              <h3 className="text-3xl sm:text-4xl font-comic text-white tracking-wider uppercase">
                YOU FOUND THEM ALL ❤️
              </h3>
            </div>
            <p className="font-comic text-slate-200 text-lg mb-6">
              All web hearts collected! The final surprise is ready to be unlocked.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sfx.playWebShot();
                onUnlockFinalGift();
              }}
              className="px-8 py-4 bg-spider-accent text-black font-comic text-2xl tracking-wider rounded-2xl border-4 border-black shadow-comic hover:bg-yellow-300 transition-all uppercase cursor-pointer flex items-center justify-center gap-3 mx-auto"
            >
              <Gift className="w-7 h-7 animate-bounce" />
              <span>UNLOCK THE FINAL SURPRISE 🎁</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
