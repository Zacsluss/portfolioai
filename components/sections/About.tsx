'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import { MapPin, User } from 'lucide-react';
import dynamic from 'next/dynamic';

const AmbientParticles = dynamic(() => import('@/components/effects/AmbientParticles').then(mod => ({ default: mod.AmbientParticles })), {
  ssr: false,
  loading: () => null
});

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { personal } = portfolioData;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Subtle parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AmbientParticles />
      </div>

      {/* Parallax grid - more visible */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf810_1px,transparent_1px),linear-gradient(to_bottom,#38bdf810_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
        }}
      />

      {/* Light beams */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`
        }}
      >
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
      </div>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <User className="w-8 h-8 text-accent-400" />
            <h2 className="text-4xl font-bold text-white quantum-heading">About Me</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-accent-400 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Headshot */}
              <div className="flex justify-center md:justify-start mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                  <img
                    src="/headshot.jpeg"
                    alt="Zachary Sluss"
                    className="relative w-48 h-48 rounded-full object-cover border-4 border-gray-800 shadow-2xl"
                  />
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {personal.bio}
              </p>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-accent-400" />
                <span>{personal.location}</span>
              </div>
            </motion.div>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card-hover p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold text-accent-400 mb-4">Quick Facts</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Current Role</p>
                  <p className="text-white font-medium">{personal.title}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">{personal.location}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-accent-400 hover:text-accent-300 transition-colors font-medium"
                  >
                    {personal.email}
                  </a>
                </div>

                {personal.phone && (
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a
                      href={`tel:${personal.phone}`}
                      className="text-accent-400 hover:text-accent-300 transition-colors font-medium"
                    >
                      {personal.phone}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
