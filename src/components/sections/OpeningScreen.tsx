import React from 'react';
import { motion } from 'framer-motion';
import { CornerWebTL, CornerWebTR } from '../ui/SpiderWebDecorations';
import { sfx } from '../../utils/soundEffects';
import { Sparkles, ShieldAlert, Heart } from 'lucide-react';

interface OpeningScreenProps {
  onStartMission: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onStartMission }) => {
  const handleStart = () => {
    sfx.playWebShot();
    onStartMission();
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-spider-darker px-4 sm:px-6 py-12">
      {/* Night City Skyline Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom opacity-25 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1600&auto=format&fit=crop")`
        }}
      />

      {/* Spider Web Pattern Overlay */}
      <div className="absolute inset-0 spider-web-bg opacity-80 pointer-events-none" />

      {/* Spider Webs Corner Animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <CornerWebTL />
        <CornerWebTR />
      </motion.div>

      {/* Red & Blue Glow Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-spider-red/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-spider-blue/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Content Card */}
      <div className="relative z-20 max-w-3xl w-full text-center flex flex-col items-center">
        {/* Classified Mission Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-red/20 border border-spider-red text-spider-red-glow font-comic tracking-widest uppercase text-sm mb-6 shadow-sm shadow-spider-red/50"
        >
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          <span>CLASSIFIED BIRTHDAY DIRECTIVE #101</span>
        </motion.div>

        {/* HERO PORTRAIT PHOTO FRAME WITH SPIDER-MAN COMIC AESTHETIC */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="relative mb-6 cursor-pointer group"
          onClick={() => sfx.playWebShot()}
        >
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-spider-red via-spider-red-glow to-spider-blue border-4 border-black shadow-comic shadow-spider-red group-hover:shadow-spider-glow transition-all duration-500 flex items-center justify-center">
            {/* Inner Photo Container */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-black relative">
              <img
                src="/photos/photo1.jpeg"
                alt="Spider Hero Welcome"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Halftone texture overlay */}
              <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none" />
            </div>

            {/* Floating Heart & Spider Badge */}
            <div className="absolute -bottom-2 -right-2 bg-spider-accent text-black font-comic text-sm px-3 py-1 rounded-full border-2 border-black shadow-md flex items-center gap-1">
              <Heart className="w-4 h-4 fill-spider-red text-spider-red animate-pulse" />
              <span>SPIDEY & ME ❤️</span>
            </div>

            <div className="absolute -top-2 -left-2 text-2xl animate-bounce">
              🕷️
            </div>
          </div>
        </motion.div>

        {/* Heading lines */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-comic text-white tracking-wide uppercase text-glow-red mb-3"
        >
          Hey, My Amazing Person…
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-xl sm:text-2xl md:text-3xl text-slate-200 font-comic tracking-wider mb-8 flex items-center justify-center gap-2"
        >
          <span>I have a little mission for you.</span>
          <span className="inline-block animate-bounce text-2xl">🕷️</span>
        </motion.p>

        {/* Big Start Mission CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 font-comic text-2xl sm:text-3xl tracking-wider text-white uppercase bg-gradient-to-r from-spider-red via-red-600 to-spider-red-dark border-4 border-black rounded-2xl shadow-comic shadow-spider-red hover:shadow-spider-glow transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Animated web shine line */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <Sparkles className="w-7 h-7 mr-3 text-spider-accent animate-spin-slow" />
            <span className="relative z-10 drop-shadow-md">START THE MISSION 🕸️</span>
          </button>
        </motion.div>
      </div>

      {/* Spider-Man Hanging Web Silhouette Indicator */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none hidden sm:block opacity-60"
      >
        <div className="w-0.5 h-32 bg-gradient-to-b from-transparent via-red-500/50 to-red-500" />
        <div className="w-6 h-6 -ml-2.75 text-spider-red text-center text-xl leading-none">🕷️</div>
      </motion.div>
    </section>
  );
};
