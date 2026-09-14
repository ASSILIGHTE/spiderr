import React, { useEffect, useRef } from 'react';

export const CornerWebTL: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    className={`absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 pointer-events-none z-10 ${className}`} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0,0 L200,0 M0,0 L0,200 M0,0 L180,180 M0,0 L70,190 M0,0 L190,70" stroke="rgba(229,9,20,0.4)" strokeWidth="1.5" />
    <path d="M0,40 Q40,40 40,0 M0,80 Q80,80 80,0 M0,120 Q120,120 120,0 M0,160 Q160,160 160,0 M0,200 Q200,200 200,0" stroke="rgba(229,9,20,0.3)" strokeWidth="1" />
    <circle cx="40" cy="40" r="2" fill="#E50914" />
    <circle cx="80" cy="80" r="2" fill="#E50914" />
    <circle cx="120" cy="120" r="2" fill="#0055FF" />
  </svg>
);

export const CornerWebTR: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    className={`absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 pointer-events-none z-10 ${className}`} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M200,0 L0,0 M200,0 L200,200 M200,0 L20,180 M200,0 L130,190 M200,0 L10,70" stroke="rgba(229,9,20,0.4)" strokeWidth="1.5" />
    <path d="M200,40 Q160,40 160,0 M200,80 Q120,80 120,0 M200,120 Q80,120 80,0 M200,160 Q40,160 40,0 M200,200 Q0,200 0,0" stroke="rgba(229,9,20,0.3)" strokeWidth="1" />
    <circle cx="160" cy="40" r="2" fill="#E50914" />
    <circle cx="120" cy="80" r="2" fill="#0055FF" />
  </svg>
);

export const FloatingParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle array: mix of subtle red embers, blue web glints, and white sparkles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      color: Math.random() > 0.4 ? 'rgba(229, 9, 20, ' : Math.random() > 0.5 ? 'rgba(0, 85, 255, ' : 'rgba(255, 204, 0, ',
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -Math.random() * 0.8 - 0.2,
      pulse: Math.random() * 0.05
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * 0.003) * 0.005;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.1, Math.min(0.8, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color.includes('229') ? '#E50914' : '#0055FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />;
};
