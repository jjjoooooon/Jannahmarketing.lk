import React, { useEffect, useRef } from 'react';

// Define types outside component to avoid recreation
interface Particle {
  x: number;
  y: number;
  r: number;
  dy: number;
  dx: number;
}

const Bubbles: React.FC<{ color?: string }> = ({ color = 'rgba(255,255,255,0.1)' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]); // Store particles to persist positions across renders
  const requestRef = useRef<number>(); // Store animation ID for clean cancellation

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true }); // Explicitly request alpha channel
    if (!ctx) return;

    let width: number;
    let height: number;

    // Handle High-DPI displays (Retina) for crisp edges
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Set actual buffer size to match device pixels
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Scale visual size back down with CSS
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Normalize coordinate system
      ctx.scale(dpr, dpr);
    };

    // Initialize particles only if they don't exist yet
    if (particlesRef.current.length === 0) {
      const particleCount = 40;
      // We use a temporary width/height here before the first resize fires
      const tempW = window.innerWidth;
      const tempH = window.innerHeight;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * tempW,
          y: Math.random() * tempH,
          r: Math.random() * 4 + 1,
          dy: Math.random() * 1 + 0.2,
          dx: Math.random() * 0.5 - 0.25,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height); // Clear using logical coordinates

      // 1. Begin Path ONCE
      ctx.beginPath();
      ctx.fillStyle = color;

      // 2. Calculate Physics & Add Subpaths
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y -= p.dy;
        p.x += p.dx;

        // Reset if off screen (add buffer to ensure it fully leaves view)
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        // Draw subpath
        // Move to start of arc to avoid connecting lines
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }

      // 3. Fill ONCE (Huge performance gain over filling inside loop)
      ctx.fill();

      requestRef.current = requestAnimationFrame(animate);
    };

    // Initial setup
    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Bubbles;