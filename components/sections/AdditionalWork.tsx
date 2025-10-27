'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function AdditionalWork() {
  const additionalLinks = portfolioData.additionalLinks || [];

  // Group links by category
  const groupedLinks = additionalLinks.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, typeof additionalLinks>);

  return (
    <section id="additional-work" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-text">
            Additional Work
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore my diverse portfolio spanning technology, creative arts, and aerial photography
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(groupedLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-accent-400">
                {category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {links.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 hover:bg-white/10 transition-all group overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      {/* Image Thumbnail */}
                      {link.image && (
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-accent-500/20 group-hover:ring-accent-400/50 transition-all">
                          <Image
                            src={link.image}
                            alt={link.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-semibold mb-2 group-hover:text-accent-400 transition-colors flex items-center gap-2">
                          {link.title}
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
