// layout.tsx
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {AuthProvider} from '@/contexts/AuthContext';
import {ThemeProvider} from 'next-themes';
import Sidebar from '@/components/Navbar'; // Assuming your sidebar component is named Navbar

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
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
              </main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
