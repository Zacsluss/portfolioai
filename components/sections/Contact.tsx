'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/lib/portfolio-data';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Download, FileText } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { personal, social } = portfolioData;

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center py-[5.75rem] px-[1.15rem] sm:px-[1.725rem] lg:px-[2.3rem]">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-[3.45rem]">
            <h2 className="text-4xl font-bold text-white quantum-heading mb-[1.15rem]">Get In Touch</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              I&apos;m always open to new opportunities and interesting projects.
              Feel free to reach out if you&apos;d like to connect!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-[1.725rem] mb-[3.45rem]">
            {/* Email */}
            <motion.a
              href={`mailto:${personal.email}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card-hover glass-flash rounded-lg p-[1.725rem] hover:border-matrix-500/50 transition-all group"
            >
              <div className="flex items-start gap-[1.15rem]">
                <div className="p-3 bg-matrix-500/10 rounded-lg group-hover:bg-matrix-500/20 transition-colors">
                  <Mail className="w-6 h-6 text-accent-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-gray-400 text-sm mb-2">Send me a message</p>
                  <p className="text-accent-400 group-hover:text-matrix-400 transition-colors">
                    {personal.email}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Phone */}
            {personal.phone && (
              <motion.a
                href={`tel:${personal.phone}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card-hover glass-flash rounded-lg p-[1.725rem] hover:border-matrix-500/50 transition-all group"
              >
                <div className="flex items-start gap-[1.15rem]">
                  <div className="p-3 bg-matrix-500/10 rounded-lg group-hover:bg-matrix-500/20 transition-colors">
                    <Phone className="w-6 h-6 text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <p className="text-gray-400 text-sm mb-2">Give me a call</p>
                    <p className="text-accent-400 group-hover:text-matrix-400 transition-colors">
                      {personal.phone}
                    </p>
                  </div>
                </div>
              </motion.a>
            )}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card-hover glass-flash rounded-lg p-[1.725rem]"
            >
              <div className="flex items-start gap-[1.15rem]">
                <div className="p-3 bg-matrix-500/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-accent-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-gray-400 text-sm mb-2">Based in</p>
                  <p className="text-accent-400">{personal.location}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card-hover glass-flash rounded-lg p-[1.725rem]"
          >
            <h3 className="text-white font-semibold mb-[1.15rem] text-center">Connect With Me</h3>
            <div className="flex flex-wrap items-center justify-center gap-[1.15rem]">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-matrix-500/20 border border-gray-600 hover:border-matrix-500 rounded-lg transition-all text-gray-300 hover:text-accent-400"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-matrix-500/20 border border-gray-600 hover:border-matrix-500 rounded-lg transition-all text-gray-300 hover:text-accent-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-matrix-500/20 border border-gray-600 hover:border-matrix-500 rounded-lg transition-all text-gray-300 hover:text-accent-400"
                  aria-label="Twitter"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
              )}
              {social.website && (
                <a
                  href={social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-matrix-500/20 border border-gray-600 hover:border-matrix-500 rounded-lg transition-all text-gray-300 hover:text-accent-400"
                  aria-label="Website"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-[2.3rem] text-center"
          >
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-matrix-500/10 hover:bg-matrix-500/20 border-2 border-matrix-500/50 hover:border-matrix-500 rounded-lg transition-all text-accent-400 hover:text-matrix-400 font-semibold group"
            >
              <FileText className="w-5 h-5" />
              <span>Download My Resume</span>
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
