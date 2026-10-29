import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'demos.lol — your link, your world',
  description: 'The most expressive bio-link platform on the internet.',
  openGraph: {
    title: 'demos.lol',
    description: 'your link, your world',
    url: 'https://demos.lol',
    siteName: 'demos.lol',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
