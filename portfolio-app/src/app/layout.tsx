import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import CursorWrapper from '@/components/ui/CursorWrapper';

export const metadata: Metadata = {
  title: 'Yuvraj — Developer Portfolio',
  description:
    'Explore Yuvraj\'s gamified portfolio — an interactive brain-hub experience showcasing projects, skills, and creativity.',
  keywords: ['portfolio', 'developer', 'engineer', 'interactive', '3D', 'gamified'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <NavigationProvider>
            <CursorWrapper />
            {children}
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
