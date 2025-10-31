'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const principles = [
  {
    icon: "⚡",
    title: "Empower, Don't Bottleneck",
    description: "Build systems and people that scale beyond me. The best leaders create force multipliers, not dependencies."
  },
  {
    icon: "🤖",
    title: "Automate Relentlessly",
    description: "If it's manual, it's technical debt. Every repeated process is an opportunity to give someone hours of their day back."
  },
  {
    icon: "🎯",
    title: "Align to Business Outcomes",
    description: "Technology for technology's sake is waste. Every platform, every integration, every line of code must drive measurable business value."
  },
  {
    icon: "📊",
    title: "Lead with Data, Decide with Context",
    description: "Analytics inform strategy, but context drives decisions. Numbers tell you what happened — understanding why requires human insight."
  },
  {
    icon: "🌱",
    title: "Lead by Example",
    description: "If I'm asking my team to learn, I'm learning twice as hard. If I'm asking for innovation, I'm shipping personal projects at 60 FPS."
  },
  {
    icon: "🔄",
    title: "Change is the Only Constant",
    description: "Digital transformation isn't a project — it's a mindset. The enterprises that win are the ones that treat change as their competitive advantage."
  }
];

export function Leadership() {
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
    <section id="leadership" className="relative py-[6.9rem] px-[1.725rem]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[4.6rem]"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-[1.725rem] quantum-text">
            Leadership & Passions
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            I believe the best technology leaders are <strong>force multipliers</strong> — not gatekeepers.
            Over the past 6+ years leading enterprise transformations, I&apos;ve developed a philosophy that combines
            strategic vision with tactical execution, data-driven decision-making with human-centered design.
          </p>
        </motion.div>

        {/* Leadership Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1.725rem] mb-[4.6rem]">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card-hover glass-flash p-[1.725rem]"
            >
              <div className="text-4xl mb-[1.15rem]">{principle.icon}</div>
              <h3 className="text-xl font-bold mb-[0.86rem] text-accent-400">{principle.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-[1.725rem] mb-[4.6rem]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-hover p-[2.3rem] text-center"
          >
            <div className="text-5xl font-bold text-accent-400 mb-2">40%</div>
            <div className="text-lg font-semibold text-white mb-2">Productivity Gains</div>
            <div className="text-sm text-white/60">Through strategic automation & process redesign</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card-hover p-[2.3rem] text-center"
          >
            <div className="text-5xl font-bold text-accent-400 mb-2">1,000+</div>
            <div className="text-lg font-semibold text-white mb-2">Hours Automated</div>
            <div className="text-sm text-white/60">Annually across 3,000+ global users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-hover p-[2.3rem] text-center"
          >
            <div className="text-5xl font-bold text-accent-400 mb-2">100%</div>
            <div className="text-lg font-semibold text-white mb-2">SOX Compliance</div>
            <div className="text-sm text-white/60">Zero breaches while enabling rapid innovation</div>
          </motion.div>
        </div>

        {/* Passions & Creative Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[3.45rem]"
        >
          <h3 className="text-3xl font-bold mb-[1.15rem] text-center">Beyond the Enterprise</h3>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-[3.45rem]">
            Multi-passionate about AI/ML, digital art, music production, and 360° drone photography —
            because curiosity makes better strategists.
          </p>

          <div className="space-y-[3.45rem]">
            {Object.entries(groupedLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h4 className="text-2xl font-bold mb-[1.725rem] text-accent-400">
                  {category}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.725rem]">
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
                      className="glass-card-hover glass-flash p-[1.725rem] hover:bg-white/10 transition-all group overflow-hidden"
                    >
                      <div className="flex items-start gap-[1.15rem]">
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
                          <h5 className="text-xl font-semibold mb-2 group-hover:text-accent-400 transition-colors flex items-center gap-2">
                            {link.title}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </h5>
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
        </motion.div>
      </div>
    </section>
  );
}
