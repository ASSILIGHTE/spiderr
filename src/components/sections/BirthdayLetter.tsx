import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { SiteConfig } from '../../config/siteConfig';
import { sfx } from '../../utils/soundEffects';

interface BirthdayLetterProps {
  config: SiteConfig;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  const lines = config.letterContent || [
    "Happy birthday, my love.",
    "Thank you for being there through the good days, the bad days, and all the little moments in between.",
    "You make my world brighter just by being in it.",
    "I hope this new chapter brings you everything you've been wishing for.",
    "And if I get to be beside you through it all, then I already have everything I need.",
    "Happy birthday, my favorite person.",
    "I love you. ❤️"
  ];

  // Typewriter Animation Logic
  useEffect(() => {
    if (!isOpen || isTypingComplete) return;

    if (currentLineIndex < lines.length) {
      const currentLineText = lines[currentLineIndex];
      
      if (currentCharIndex < currentLineText.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const next = [...prev];
            if (!next[currentLineIndex]) next[currentLineIndex] = "";
            next[currentLineIndex] = currentLineText.slice(0, currentCharIndex + 1);
            return next;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 35); // typing speed ms
        return () => clearTimeout(timeout);
      } else {
        // Line complete, move to next line after brief pause
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 400);
        return () => clearTimeout(timeout);
      }
    } else {
      setIsTypingComplete(true);
    }
  }, [isOpen, currentLineIndex, currentCharIndex, lines, isTypingComplete]);

  const handleOpenEnvelope = () => {
    sfx.playWebShot();
    setIsOpen(true);
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTypingComplete(false);
  };

  const handleRestartTypewriter = () => {
    sfx.playCardFlip();
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTypingComplete(false);
  };

  return (
    <section id="birthday-letter" className="relative w-full py-20 px-4 sm:px-6 bg-spider-darker border-t-4 border-black overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-red/20 border border-spider-red text-spider-red-glow font-comic tracking-widest text-lg uppercase mb-3"
          >
            <Mail className="w-5 h-5 text-spider-red" />
            <span>CONFIDENTIAL LOVE LETTER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-6xl font-comic text-white tracking-wider uppercase text-glow-red"
          >
            {config.letterTitle || "A LETTER FROM YOUR FRIENDLY NEIGHBOR… ❤️"}
          </motion.h2>
        </div>

        {!isOpen ? (
          /* Envelope View */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.04, rotate: 1 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenEnvelope}
              className="relative max-w-xl w-full aspect-[1.6/1] bg-gradient-to-br from-spider-card via-slate-900 to-black rounded-3xl border-4 border-black shadow-comic shadow-spider-red p-8 flex flex-col items-center justify-between cursor-pointer group"
            >
              {/* Top Envelope Flap SVG Design */}
              <div className="absolute top-0 inset-x-0 h-1/2 pointer-events-none opacity-40">
                <svg viewBox="0 0 500 250" className="w-full h-full">
                  <path d="M0 0 L250 180 L500 0" fill="none" stroke="#E50914" strokeWidth="3" />
                </svg>
              </div>

              {/* Spider Web Seal */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-spider-red to-spider-red-dark border-3 border-black flex items-center justify-center text-4xl shadow-spider-glow group-hover:scale-110 transition-transform">
                🕸️
              </div>

              <div className="text-center z-10">
                <h3 className="font-comic text-2xl sm:text-3xl text-spider-accent uppercase tracking-wider">
                  CLICK ENVELOPE TO UNSEAL ❤️
                </h3>
                <p className="font-comic text-xs text-slate-400 uppercase tracking-widest mt-1">
                  SEALED WITH SPIDER-SENSE & ENDLESS LOVE
                </p>
              </div>

              <div className="flex justify-between w-full text-xs font-comic text-slate-500 uppercase">
                <span>TO: MY HERO</span>
                <span>FROM: YOUR SPIDEY 🕷️</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Opened Letter Paper with Typewriter Text */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative bg-amber-50 rounded-3xl border-4 border-black p-6 sm:p-12 shadow-comic shadow-spider-red text-slate-900 font-handwritten"
          >
            {/* Top Comic Stamp */}
            <div className="flex items-center justify-between border-b-2 border-black/20 pb-4 mb-6 font-comic text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-spider-red fill-spider-red" />
                OFFICIAL LOVE LETTER
              </span>
              <span className="uppercase text-spider-red">STRICTLY FOR {config.partnerName}</span>
            </div>

            {/* Typewriter Output */}
            <div className="space-y-6 text-2xl sm:text-3xl font-semibold leading-relaxed text-slate-900 min-h-[300px]">
              {displayedLines.map((line, idx) => (
                <p key={idx} className="relative">
                  {line}
                  {idx === currentLineIndex && !isTypingComplete && (
                    <span className="inline-block w-2 h-7 bg-spider-red ml-1 animate-pulse" />
                  )}
                </p>
              ))}
            </div>

            {/* Restart Typewriter Button */}
            <div className="mt-10 border-t-2 border-black/20 pt-6 flex flex-wrap items-center justify-between gap-4 font-comic text-sm text-slate-600">
              <span className="flex items-center gap-1 text-slate-800">
                <Sparkles className="w-4 h-4 text-spider-red" />
                FOREVER YOURS, {config.yourName}
              </span>
              <button
                onClick={handleRestartTypewriter}
                className="flex items-center gap-2 px-4 py-2 bg-spider-red text-white rounded-xl border border-black hover:bg-spider-red-dark transition-colors font-comic text-xs uppercase"
              >
                <RefreshCw className="w-4 h-4" />
                Replay Letter 📜
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
