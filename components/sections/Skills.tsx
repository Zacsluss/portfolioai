'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import { Zap } from 'lucide-react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { skills } = portfolioData;

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Expert':
        return 'text-green-400 border-green-400';
      case 'Advanced':
        return 'text-blue-400 border-blue-400';
      case 'Intermediate':
        return 'text-yellow-400 border-yellow-400';
      case 'Beginner':
        return 'text-gray-400 border-gray-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center py-[5.75rem] px-[1.15rem] sm:px-[1.725rem] lg:px-[2.3rem] bg-gray-900/30">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-[1.15rem] mb-[3.45rem]">
            <Zap className="w-8 h-8 text-accent-400" />
            <h2 className="text-4xl font-bold text-white quantum-heading">Skills & Technologies</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-accent-400 to-transparent" />
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-[1.725rem]">
            {skills.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
                className="bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden hover:border-accent-400/30 transition-all h-[400px] flex flex-col"
              >
                <div className="p-[1.725rem] pb-[1.15rem]">
                  <h3 className="text-xl font-bold text-accent-400 mb-[1.15rem] flex items-center gap-2">
                    <span className="w-2 h-2 bg-matrix-500 rounded-full" />
                    {category.category}
                  </h3>
                </div>

                <div className="px-[1.725rem] pb-[1.725rem] space-y-3 overflow-y-auto flex-1">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: catIndex * 0.15 + skillIndex * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        {skill.level && (
                          <span className={`text-xs px-2 py-0.5 border rounded-full ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        )}
                        {skill.years && (
                          <span className="text-sm text-gray-500">
                            {skill.years}y
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-[2.3rem] flex flex-wrap items-center justify-center gap-[1.15rem] text-sm"
          >
            <span className="text-gray-500">Skill Level:</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-gray-400">Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-gray-400">Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-gray-400">Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full" />
              <span className="text-gray-400">Beginner</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
