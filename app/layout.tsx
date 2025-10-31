import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import { portfolioData } from '@/lib/portfolio-data';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import dynamic from 'next/dynamic';

const MagneticCursor = dynamic(() => import('@/components/effects/MagneticCursor').then(mod => ({ default: mod.MagneticCursor })), {
  ssr: false,
  loading: () => null
});

const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })), {
  ssr: false,
  loading: () => null
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} - ${portfolioData.personal.title}`,
  description: portfolioData.personal.tagline,
  keywords: [
    'Zachary Sluss',
    'Enterprise Technology Leader',
    'CRM Systems Analyst',
    'Salesforce Expert',
    'Digital Transformation',
    'Lead CRM Analyst',
    'Fortune 500',
    'AI Portfolio',
    'React',
    'Next.js',
    'TypeScript',
    'OpenAI',
    'Enterprise Architecture',
  ],
  authors: [{ name: portfolioData.personal.name }],
  creator: portfolioData.personal.name,
  openGraph: {
    type: 'website',
    title: `${portfolioData.personal.name} - Portfolio`,
    description: portfolioData.personal.tagline,
    siteName: portfolioData.personal.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.personal.name} - Portfolio`,
    description: portfolioData.personal.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <ErrorBoundary>
          <MagneticCursor />
          {children}
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
