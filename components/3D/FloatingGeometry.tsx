'use client';

import { useEffect, useRef } from 'react';

export function FloatingGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation variables
    let animationFrameId: number;
    let rotation = 0;
    let time = 0;

    // Draw animated geometry
    const animate = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Clear canvas
      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update rotation and time
      rotation += 0.005;
      time += 0.02;

      // Draw multiple rotating rings with glow effect
      const rings = 3;
      for (let i = 0; i < rings; i++) {
        const radius = 150 + i * 80;
        const offset = (i * Math.PI * 2) / rings;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation + offset);

        // Create gradient for glow effect - blue accent
        const gradient = ctx.createRadialGradient(0, 0, radius - 20, 0, 0, radius + 20);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
        gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

        // Draw ring
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw connecting lines
        const points = 6;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
        ctx.lineWidth = 0.5;
        for (let j = 0; j < points; j++) {
          const angle = (j * Math.PI * 2) / points + time;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(x, y);
          ctx.stroke();

          // Draw small circles at endpoints
          ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Draw central pulsing sphere
      const pulseRadius = 25 + Math.sin(time * 1.5) * 8;
      const pulseGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, pulseRadius * 1.5
      );
      pulseGradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
      pulseGradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.2)');
      pulseGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');

      ctx.fillStyle = pulseGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner core
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, pulseRadius
      );
      coreGradient.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
      coreGradient.addColorStop(1, 'rgba(14, 165, 233, 0.3)');

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

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
      className="w-full h-full"
      style={{ opacity: 0.25 }}
    />
  );
}
