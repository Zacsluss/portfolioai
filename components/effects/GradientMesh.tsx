'use client';

import { useEffect, useRef } from 'react';

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Gradient orbs configuration - increased speed 50x for visible movement
    const orbs = [
      { x: 0.2, y: 0.3, size: 400, color: [14, 165, 233], speed: 0.015, pulseSpeed: 0.01 }, // Sky blue
      { x: 0.8, y: 0.6, size: 350, color: [99, 102, 241], speed: 0.020, pulseSpeed: 0.012 }, // Indigo
      { x: 0.5, y: 0.8, size: 300, color: [168, 85, 247], speed: 0.010, pulseSpeed: 0.008 }, // Purple
    ];

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas completely each frame for crisp animation
      ctx.clearRect(0, 0, width, height);

      time += 1;

      orbs.forEach((orb, index) => {
        // Smooth floating motion
        const offsetX = Math.sin(time * orb.speed + index) * 100;
        const offsetY = Math.cos(time * orb.speed * 0.7 + index) * 80;

        const x = width * orb.x + offsetX;
        const y = height * orb.y + offsetY;

        // Pulsing size and opacity
        const sizePulse = Math.sin(time * orb.pulseSpeed) * 0.2 + 1; // Range: 0.8 to 1.2
        const opacityPulse = Math.sin(time * orb.pulseSpeed * 0.5) * 0.15 + 1; // Range: 0.85 to 1.15
        const currentSize = orb.size * sizePulse;

        // Create radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentSize);

        const [r, g, b] = orb.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.4 * opacityPulse})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${0.2 * opacityPulse})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${0.05 * opacityPulse})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
    />
  );
}
