'use client';

import { useState, useEffect } from 'react';

interface ParallaxValues {
  x: number;
  y: number;
}

export function useMouseParallax(intensity: number = 1): ParallaxValues {
  const [parallax, setParallax] = useState<ParallaxValues>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      // Calculate parallax values with intensity multiplier
      setParallax({
        x: x * intensity,
        y: y * intensity
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity]);

  return parallax;
}
