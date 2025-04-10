// components/PageShell.tsx
'use client';

import {usePathname} from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from './Navbar';

export default function PageShell({children}: {children: React.ReactNode}) {
  const homePaths = ['/', '/signup', '/signin'];
  const pathname = usePathname();
  const isHome = homePaths.includes(pathname);

  return (
    <div className="flex">
      {!isHome && <Sidebar />}
      <main className={`mx-auto w-full ${isHome ? 'mx-auto' : 'flex-1'}`}>
        {isHome && <Navbar />}
        {children}
      </main>
    </div>
  );
}
