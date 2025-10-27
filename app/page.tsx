'use client';

import { Navigation } from '@/components/navigation/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import AdditionalWork from '@/components/sections/AdditionalWork';
import { Contact } from '@/components/sections/Contact';
import { Assistant } from '@/components/AIAssistant/Assistant';

export default function Home() {
  return (
    <main className="relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none" />

      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <AdditionalWork />
        <Contact />
      </div>

      {/* AI Assistant */}
      <Assistant />
    </main>
  );
}
