// components/PageShell.tsx
'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from './Navbar';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const homePaths = ['/', '/signup', '/signin'];
  const pathname = usePathname();
  const isHome = homePaths.includes(pathname);

  return (
    <div className="flex">
      <div className="absolute inset-0 pointer-events-none -z-1 flex items-center justify-center opacity-100">
        <img
          alt="background"
          src="/square-alt-grid.svg"
          className="object-cover pointer-events-none -z-1 w-full h-full opacity-100 dark:opacity-50 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>

      {!isHome && <Sidebar />}
      <main className={`mx-auto w-full ${isHome ? 'mx-auto' : 'flex-1'}`}>
        {isHome && <Navbar />}
        {children}
      </main>
    </div>
  );
}
