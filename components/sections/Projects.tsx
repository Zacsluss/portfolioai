'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import { Code2, ExternalLink, Github, Star } from 'lucide-react';
import dynamic from 'next/dynamic';

const AmbientParticles = dynamic(() => import('@/components/effects/AmbientParticles').then(mod => ({ default: mod.AmbientParticles })), {
  ssr: false,
  loading: () => null
});

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { projects } = portfolioData;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen flex items-center py-[5.75rem] px-[1.15rem] sm:px-[1.725rem] lg:px-[2.3rem] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AmbientParticles />
      </div>

      {/* Parallax grid */}
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
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-[1.15rem] mb-[3.45rem]">
            <Code2 className="w-8 h-8 text-accent-400" />
            <h2 className="text-4xl font-bold text-white quantum-heading">Projects</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-accent-400 to-transparent" />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-[1.725rem]">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative glass-card-hover glass-flash rounded-lg p-[1.725rem] hover:border-matrix-500/50 transition-all group ${
                  project.highlighted ? 'md:col-span-2' : ''
                }`}
              >
                {/* Highlighted Badge */}
                {project.highlighted && (
                  <div className="absolute top-[1.15rem] right-[1.15rem] flex items-center gap-1 px-2 py-1 bg-matrix-500/20 border border-matrix-500/50 rounded-full text-xs text-accent-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-[1.15rem]">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300">{project.description}</p>
                    {project.longDescription && (
                      <p className="text-gray-400 text-sm mt-2">{project.longDescription}</p>
                    )}
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Key Features:</p>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                            <span className="text-accent-400 mt-1">▹</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-matrix-500/10 text-accent-400 border border-matrix-500/30 rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-matrix-500/20 border border-gray-600 hover:border-matrix-500 rounded-lg transition-all text-sm text-gray-300 hover:text-accent-400"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-matrix-500/10 hover:bg-matrix-500/20 border border-matrix-500/30 hover:border-matrix-500 rounded-lg transition-all text-sm text-accent-400"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
