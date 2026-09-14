import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  autoStart?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    // Attempt auto-play on initial load with fade-in
    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setShowPrompt(false);
      } catch {
        // Autoplay blocked by browser policy
        setIsPlaying(false);
        setShowPrompt(true);
      }
    };

    attemptPlay();

    // Global listener on first user interaction to trigger music seamlessly if blocked
    const handleFirstInteraction = () => {
      if (audio && audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        }).catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch(err => console.error(err));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.6;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" preload="auto" />

      {/* Floating Audio Dock (Fixed Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {/* Autoplay Blocked Banner */}
        <AnimatePresence>
          {showPrompt && !isPlaying && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={togglePlay}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-spider-red to-spider-red-dark text-white font-comic text-lg tracking-wider border-2 border-spider-accent shadow-spider-glow hover:scale-105 transition-all duration-300 animate-bounce"
            >
              <Music className="w-5 h-5 animate-spin-slow" />
              <span>🎵 Play Our Song</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Audio Control Bar */}
        <motion.div 
          className="flex items-center gap-2 bg-spider-card/90 backdrop-blur-md p-2 rounded-full border-2 border-spider-red/60 shadow-lg shadow-spider-red/20 text-slate-100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Main Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              isPlaying 
                ? 'bg-spider-red text-white shadow-spider-glow' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Equalizer Animation Bars */}
          {isPlaying && (
            <div className="flex items-end gap-1 px-2 h-5">
              <span className="w-1 bg-spider-red animate-[bounce_1s_infinite_100ms] rounded-full h-3" />
              <span className="w-1 bg-spider-accent animate-[bounce_1s_infinite_300ms] rounded-full h-5" />
              <span className="w-1 bg-spider-blue animate-[bounce_1s_infinite_200ms] rounded-full h-4" />
              <span className="w-1 bg-spider-red animate-[bounce_1s_infinite_400ms] rounded-full h-2" />
            </div>
          )}

          {/* Settings / Volume expand toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-spider-accent transition-colors"
            title="Volume Control"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Expanded Volume Slider */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center gap-2 pr-2 overflow-hidden"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-spider-red cursor-pointer"
                />
                <button
                  onClick={toggleMute}
                  className="text-xs text-slate-400 hover:text-white uppercase font-bold"
                >
                  {isMuted ? "Unmute" : `${Math.round(volume * 100)}%`}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
