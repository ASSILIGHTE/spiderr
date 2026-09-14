import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart } from 'lucide-react';
import { SiteConfig } from '../../config/siteConfig';

interface OurStoryProps {
  config: SiteConfig;
}

export const OurStory: React.FC<OurStoryProps> = ({ config }) => {
  return (
    <section id="our-story" className="relative w-full py-20 px-4 sm:px-6 bg-spider-darker overflow-hidden">
      {/* Spider-Man Comic Grid Background */}
      <div className="absolute inset-0 bg-halftone-dark opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spider-red/20 border border-spider-red text-spider-red-glow font-comic tracking-widest text-lg uppercase mb-3"
          >
            <BookOpen className="w-5 h-5" />
            <span>ORIGIN CHRONICLES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-comic text-white tracking-wider uppercase text-glow-red"
          >
            OUR STORY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-body max-w-xl mx-auto text-base sm:text-lg mt-2"
          >
            Every superhero adventure starts with a legendary origin. Here is ours.
          </motion.p>
        </div>

        {/* Comic Timeline Vertical / Grid */}
        <div className="relative border-l-4 border-spider-red/50 ml-4 sm:ml-12 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
          {config.chapters.map((chapter, idx) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Spider Icon Node on Timeline */}
              <div className="absolute -left-[43px] sm:-left-[59px] top-4 w-10 h-10 sm:w-12 sm:h-12 bg-spider-card border-3 border-spider-red rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-comic shadow-spider-red group-hover:scale-110 transition-transform">
                {chapter.icon}
              </div>

              {/* Comic Panel Box */}
              <div className="bg-spider-card rounded-2xl border-4 border-black p-6 sm:p-8 shadow-comic shadow-spider-red relative overflow-hidden group-hover:shadow-spider-glow transition-all duration-300">
                {/* Comic Header Header strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/80 pb-3 mb-4">
                  <span className="px-3 py-1 bg-spider-red text-white font-comic text-sm uppercase rounded tracking-wider border border-black">
                    {chapter.chapterNum}
                  </span>
                  <span className="text-spider-accent font-comic text-sm tracking-wider uppercase flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {chapter.subtitle}
                  </span>
                </div>

                {/* Chapter Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Text Quote Box */}
                  <div className={`space-y-3 ${chapter.image ? 'md:col-span-7' : 'md:col-span-12'}`}>
                    <h3 className="text-2xl sm:text-4xl font-comic text-white tracking-wide uppercase">
                      {chapter.title}
                    </h3>
                    <div className="relative bg-black/60 p-4 rounded-xl border border-slate-800">
                      <p className="text-lg sm:text-xl font-handwritten text-slate-200 leading-relaxed italic">
                        "{chapter.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Comic Panel Image */}
                  {chapter.image && (
                    <div className="md:col-span-5 relative">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-black shadow-md bg-black">
                        <img
                          src={chapter.image}
                          alt={chapter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Corner Comic Stamp */}
                <div className="absolute bottom-2 right-2 text-xs font-comic text-slate-500 uppercase tracking-widest pointer-events-none">
                  PAGE 0{idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
