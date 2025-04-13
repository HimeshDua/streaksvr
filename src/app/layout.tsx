// layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import PageShell from '@/components/PageShell';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Streaksvr – Build Habits, Stay Consistent',
  description: 'Track your progress, build powerful habits, and stay productive with Streaksvr.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <AuthProvider>

          <PageShell>{children}</PageShell>
        </AuthProvider>
      </body>
    </html>
  );
}
