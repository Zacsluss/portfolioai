'use client';

import { useEffect, useState, useRef } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export function MagneticCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const cursorRef = useRef({ x: -100, y: -100 }); // Lagged cursor position
  const trailIdRef = useRef(0);

  useEffect(() => {
    let animationFrame: number;
    const maxTrailLength = 8;
    const trailLifetime = 400; // ms

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const currentTime = Date.now();

      // Smooth cursor position with spring physics (0.7 = more responsive)
      cursorRef.current = {
        x: cursorRef.current.x + (mouseRef.current.x - cursorRef.current.x) * 0.7,
        y: cursorRef.current.y + (mouseRef.current.y - cursorRef.current.y) * 0.7
      };
      setPosition({ ...cursorRef.current });

      // Update trail - spawn from the LAGGED cursor position, not actual mouse
      setTrail(prev => {
        // Remove old particles
        const filtered = prev.filter(p => currentTime - p.timestamp < trailLifetime);

        // Add new particle if cursor moved enough from last particle
        const lastParticle = filtered[filtered.length - 1];
        const shouldAddParticle = !lastParticle ||
          Math.hypot(cursorRef.current.x - lastParticle.x, cursorRef.current.y - lastParticle.y) > 15;

        if (shouldAddParticle) {
          const newParticle: TrailParticle = {
            x: cursorRef.current.x,
            y: cursorRef.current.y,
            id: trailIdRef.current++,
            timestamp: currentTime
          };
          return [...filtered.slice(-maxTrailLength + 1), newParticle];
        }

        return filtered;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        className="fixed w-4 h-4 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-full h-full rounded-full bg-accent-400/60 blur-[2px]" />
      </div>

      {/* Particle trail */}
      {trail.map((particle) => {
        const age = Date.now() - particle.timestamp;
        const opacity = Math.max(0, 1 - age / 400) * 0.5;

        return (
          <div
            key={particle.id}
            className="fixed w-2 h-2 pointer-events-none z-[9998] mix-blend-screen"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: opacity
            }}
          >
            <div className="w-full h-full rounded-full bg-accent-300 blur-[1px]" />
          </div>
        );
      })}
    </>
  );
}
