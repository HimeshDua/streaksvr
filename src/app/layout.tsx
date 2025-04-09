// layout.tsx
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {AuthProvider} from '@/contexts/AuthContext';
import {ThemeProvider} from 'next-themes';
import Sidebar from '@/components/Sidebar'; // Assuming your sidebar component is named Navbar
import PageShell from '@/components/PageShell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Streaksvr – Build Habits, Stay Consistent',
  description:
    'Track your progress, build powerful habits, and stay productive with Streaksvr.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <PageShell>{children}</PageShell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
